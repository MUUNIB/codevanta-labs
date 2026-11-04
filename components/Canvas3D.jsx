'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

const CYAN = new THREE.Color('#00F0FF');
const VIOLET = new THREE.Color('#7C3AED');
const ICE = new THREE.Color('#E6FDFF');

// Pointer in normalised device coords (-1..1), tracked on window so the
// overlaid hero text never blocks it.
const pointer = { x: 0, y: 0 };

const clamp01 = (x) => Math.min(1, Math.max(0, x));
const easeOutBack = (x) => {
  const c1 = 1.55;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

/* ------------------------------------------------------------------ */
/* Crystal geometry                                                    */
/* ------------------------------------------------------------------ */

// Turns a convex, counter-clockwise outline into a faceted gem: a raised apex
// on the front, a shallower one on the back and a thin rim between them.
function gemGeometry(points) {
  const n = points.length;
  let cx = 0;
  let cy = 0;
  let area = 0;
  for (let i = 0; i < n; i++) {
    const [ax, ay] = points[i];
    const [bx, by] = points[(i + 1) % n];
    cx += ax;
    cy += ay;
    area += ax * by - bx * ay;
  }
  cx /= n;
  cy /= n;
  const size = Math.sqrt(Math.abs(area) / 2);
  const depth = THREE.MathUtils.clamp(size * 0.42, 0.16, 0.46);
  const back = depth * 0.55;
  const rim = 0.045;

  const pos = [];
  const col = [];
  const c = new THREE.Color();
  const push = (x, y, z, ice = 0) => {
    pos.push(x, y, z);
    const f = clamp01(0.42 + x * 0.3 - y * 0.06);
    c.copy(CYAN).lerp(VIOLET, f);
    if (ice) c.lerp(ICE, ice);
    col.push(c.r, c.g, c.b);
  };

  for (let i = 0; i < n; i++) {
    const [ax, ay] = points[i];
    const [bx, by] = points[(i + 1) % n];
    const glint = i % 2 ? 0.08 : 0.32;
    push(ax, ay, rim);
    push(bx, by, rim);
    push(cx, cy, depth, glint);
    push(bx, by, -rim);
    push(ax, ay, -rim);
    push(cx, cy, -back, 0.05);
    push(ax, ay, rim);
    push(ax, ay, -rim);
    push(bx, by, -rim);
    push(ax, ay, rim);
    push(bx, by, -rim);
    push(bx, by, rim);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.computeVertexNormals();
  return g;
}

// The emblem as three pieces: the hexagonal "C" chevron, the arrow and the
// small triangle. Each piece is built from convex parts.
const HEX_CENTER = [-1.08, 0.02];
const hexPoint = (r, deg) => [
  HEX_CENTER[0] + r * Math.cos((deg * Math.PI) / 180),
  HEX_CENTER[1] + r * Math.sin((deg * Math.PI) / 180),
];

const PIECES = [
  {
    key: 'chevron',
    parts: [60, 120, 180, 240].map((a) => [hexPoint(1, a), hexPoint(1, a + 60), hexPoint(0.58, a + 60), hexPoint(0.58, a)]),
    from: [-2.6, 0.8, -1.4],
    spin: [0.7, -1.1, 0.5],
  },
  {
    key: 'arrow',
    parts: [
      [
        [1.55, 0.55],
        [2.0, 2.0],
        [0.55, 1.55],
      ],
      [
        [-0.05, -0.45],
        [1.35, 0.95],
        [0.95, 1.35],
        [-0.45, -0.05],
      ],
    ],
    from: [2.4, 1.7, -1],
    spin: [-0.6, 0.9, -0.7],
  },
  {
    key: 'triangle',
    parts: [
      [
        [-0.12, -0.62],
        [0.12, -1.3],
        [0.78, -0.5],
      ],
    ],
    from: [0.8, -2.6, 1],
    spin: [1, 0.5, 0.9],
  },
];

function useGlowTexture() {
  return useMemo(() => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.28, 'rgba(255,255,255,0.45)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Crystal() {
  const root = useRef();
  const pieceRefs = useRef([]);
  const life = useRef(0);
  const hover = useRef(0);
  const ndc = useMemo(() => new THREE.Vector3(), []);
  const glow = useGlowTexture();

  const geometries = useMemo(() => PIECES.map((p) => p.parts.map((pts) => gemGeometry(pts))), []);
  const edges = useMemo(() => geometries.map((list) => list.map((g) => new THREE.EdgesGeometry(g, 1))), [geometries]);
  const dirs = useMemo(() => PIECES.map((p) => new THREE.Vector3(...p.from).normalize()), []);

  const crystalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        vertexColors: true,
        flatShading: true,
        metalness: 0.15,
        roughness: 0.14,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        emissive: new THREE.Color('#1e1050'),
        emissiveIntensity: 0.18,
        envMapIntensity: 1.5,
      }),
    []
  );
  const edgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#ffffff',
        transparent: true,
        opacity: 0.75,
        blending: THREE.NormalBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    []
  );

  useEffect(
    () => () => {
      geometries.flat().forEach((g) => g.dispose());
      edges.flat().forEach((g) => g.dispose());
      crystalMaterial.dispose();
      edgeMaterial.dispose();
      glow.dispose();
    },
    [geometries, edges, crystalMaterial, edgeMaterial, glow]
  );

  useFrame((state, delta) => {
    const g = root.current;
    if (!g) return;
    life.current += Math.min(delta, 0.1);
    const t = life.current;

    // Responsive placement: right half on wide screens, top centre on narrow ones.
    const { width, height } = state.viewport;
    const narrow = width / height < 1;
    const scale = narrow ? Math.min(0.46, (width * 0.6) / 4.3) : Math.min(0.85, (width * 0.36) / 4.3);
    g.scale.setScalar(scale);
    g.position.set(narrow ? 0 : width * 0.29, narrow ? height * 0.27 : 0.1, 0);

    // Follow the cursor with damped rotation plus a slow idle sway.
    const ry = pointer.x * 0.55 + Math.sin(t * 0.35) * 0.2;
    const rx = -pointer.y * 0.32 + Math.cos(t * 0.3) * 0.07;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ry, 3.5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, rx, 3.5, delta);

    // Pieces drift apart a little when the cursor is over the emblem.
    ndc.copy(g.position).project(state.camera);
    const near = clamp01(1 - Math.hypot(pointer.x - ndc.x, pointer.y - ndc.y) * 1.8);
    hover.current = THREE.MathUtils.damp(hover.current, near, 4, delta);

    // Assembly on load: pieces fly in and snap together.
    const p = easeOutBack(clamp01((t - 0.2) / 1.7));
    PIECES.forEach((piece, i) => {
      const m = pieceRefs.current[i];
      if (!m) return;
      const apart = 1 - p;
      const push = hover.current * 0.32;
      m.position.set(
        piece.from[0] * apart + dirs[i].x * push,
        piece.from[1] * apart + dirs[i].y * push,
        piece.from[2] * apart + dirs[i].z * push
      );
      m.rotation.set(
        piece.spin[0] * apart + Math.sin(t * 0.8 + i) * 0.03,
        piece.spin[1] * apart + Math.cos(t * 0.7 + i) * 0.03,
        piece.spin[2] * apart
      );
    });
  });

  return (
    <group ref={root}>
      <sprite position={[0, 0.2, -1.2]} scale={[7.5, 7.5, 1]}>
        <spriteMaterial map={glow} color="#a78bfa" transparent opacity={0.32} depthWrite={false} />
      </sprite>
      <sprite position={[0.3, 0.6, -0.8]} scale={[4, 4, 1]}>
        <spriteMaterial map={glow} color="#67e8f9" transparent opacity={0.3} depthWrite={false} />
      </sprite>
      <group position={[0.04, -0.35, 0]}>
        {PIECES.map((piece, i) => (
          <group key={piece.key} ref={(el) => (pieceRefs.current[i] = el)}>
            {geometries[i].map((geo, j) => (
              <group key={j}>
                <mesh geometry={geo} material={crystalMaterial} />
                <lineSegments geometry={edges[i][j]} material={edgeMaterial} />
              </group>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Particle floor and dust                                             */
/* ------------------------------------------------------------------ */

const floorVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  varying float vAlpha;
  varying float vMix;
  void main() {
    vec3 p = position;
    p.z = mod(p.z + 20.0 + uTime * 0.55, 26.0) - 20.0;
    p.y += sin(p.x * 0.42 + uTime * 0.7) * 0.16 + cos(p.z * 0.38 + uTime * 0.5) * 0.16;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize / -mv.z;
    vAlpha = smoothstep(30.0, 9.0, -mv.z) * smoothstep(0.8, 3.5, -mv.z);
    vMix = clamp(0.5 + p.x / 22.0, 0.0, 1.0);
  }
`;

const floorFragment = /* glsl */ `
  uniform vec3 uA;
  uniform vec3 uB;
  varying float vAlpha;
  varying float vMix;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(uA, uB, vMix), a * 0.7);
    #include <colorspace_fragment>
  }
`;

function Floor({ cols, rows }) {
  const { gl } = useThree();
  const geometry = useMemo(() => {
    const arr = new Float32Array(cols * rows * 3);
    let k = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr[k++] = -14 + (28 * c) / (cols - 1);
        arr[k++] = 0;
        arr[k++] = -20 + (26 * r) / (rows - 1);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, [cols, rows]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: 50 },
          uA: { value: new THREE.Color('#0891b2') },
          uB: { value: new THREE.Color('#7c3aed') },
        },
        vertexShader: floorVertex,
        fragmentShader: floorFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    []
  );

  useEffect(() => () => (geometry.dispose(), material.dispose()), [geometry, material]);

  useFrame((_, delta) => {
    material.uniforms.uTime.value += Math.min(delta, 0.1);
    material.uniforms.uSize.value = 48 * gl.getPixelRatio();
  });

  return <points geometry={geometry} material={material} position={[0, -2.5, 0]} frustumCulled={false} />;
}

function Dust({ count }) {
  const ref = useRef();
  const texture = useGlowTexture();
  const geometry = useMemo(() => {
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rand() - 0.5) * 26;
      arr[i * 3 + 1] = -2 + rand() * 8;
      arr[i * 3 + 2] = -16 + rand() * 18;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    return g;
  }, [count]);

  useEffect(() => () => (geometry.dispose(), texture.dispose()), [geometry, texture]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.015;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        map={texture}
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.45}
        color="#0891b2"
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Camera parallax                                                     */
/* ------------------------------------------------------------------ */

function Rig() {
  const scroll = useRef(0);
  useEffect(() => {
    const onScroll = () => (scroll.current = window.scrollY / Math.max(1, window.innerHeight));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state, delta) => {
    const s = Math.min(scroll.current, 1.2);
    const cam = state.camera;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, pointer.x * 0.7, 2.4, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, 0.35 + pointer.y * 0.35 + s * 1.3, 2.4, delta);
    cam.lookAt(0, s * 0.7, 0);
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* Canvas                                                              */
/* ------------------------------------------------------------------ */

export default function Canvas3D({ active = true, onReady }) {
  const [lite, setLite] = useState(false);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const small = window.innerWidth < 768;
    const weak = (navigator.hardwareConcurrency || 8) <= 4;
    setLite(small || weak);
    setDpr(Math.min(window.devicePixelRatio || 1, small || weak ? 1.5 : 2));

    const onMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 0.35, 7.5], fov: 40, near: 0.1, far: 60 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        requestAnimationFrame(() => onReady?.());
      }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <fog attach="fog" args={['#f6f8fc', 10, 26]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 5]} intensity={45} color="#00F0FF" />
      <pointLight position={[-4, -2, 4]} intensity={40} color="#7C3AED" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} color="#00F0FF" position={[3, 2, 4]} scale={[4, 2, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#7C3AED" position={[-4, -1, 3]} scale={[4, 3, 1]} />
        <Lightformer form="ring" intensity={2} color="#ffffff" position={[0, 4, -4]} scale={3} />
        <Lightformer form="rect" intensity={1.6} color="#ffffff" position={[0, 0, 6]} scale={[8, 6, 1]} />
      </Environment>
      <Floor cols={lite ? 44 : 72} rows={lite ? 40 : 64} />
      <Dust count={lite ? 350 : 900} />
      <Crystal />
      <Rig />
    </Canvas>
  );
}
