/*
  Illustrated interface previews for the project cards and case studies.

  Each preview is drawn with HTML and CSS inside a device frame (browser, phone or desktop window).
  Every size is in `em`, and the stage sets its font size from its own width (container units),
  so a preview scales as one picture from a phone-width card up to the flagship card.
  The data shown inside is sample interface content, not results.

  To use a real screenshot instead, set `image` on the project in lib/content.js.
*/

/* ------------------------------------------------------------------ */
/* Frames                                                              */
/* ------------------------------------------------------------------ */

const DEVICE_SHADOW = 'shadow-[0_2.6em_5em_-2em_rgb(15_23_42/0.45),0_0.4em_1em_-0.4em_rgb(15_23_42/0.18)]';

function Lock() {
  return (
    <svg viewBox="0 0 16 16" className="h-[1em] w-[1em] flex-none" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
    </svg>
  );
}

function Browser({ url, children }) {
  return (
    <div className={`w-[50em] overflow-hidden rounded-[1em] border border-slate-900/[0.08] bg-white ${DEVICE_SHADOW}`}>
      <div className="flex items-center gap-[1em] border-b border-slate-900/[0.06] bg-slate-50 px-[1em] py-[0.7em]">
        <div className="flex gap-[0.45em]">
          <span className="h-[0.7em] w-[0.7em] rounded-full bg-[#ff5f57]" />
          <span className="h-[0.7em] w-[0.7em] rounded-full bg-[#febc2e]" />
          <span className="h-[0.7em] w-[0.7em] rounded-full bg-[#28c840]" />
        </div>
        <div className="flex h-[2em] flex-1 items-center gap-[0.5em] rounded-full bg-white px-[1em] text-[0.8em] text-slate-500 ring-1 ring-slate-900/[0.06]">
          <Lock />
          {url}
        </div>
      </div>
      <div className="h-[27em]">{children}</div>
    </div>
  );
}

function Window({ title, children }) {
  return (
    <div className={`w-[50em] overflow-hidden rounded-[0.7em] border border-slate-900/[0.1] bg-white ${DEVICE_SHADOW}`}>
      <div className="flex items-center justify-between border-b border-slate-900/[0.06] bg-slate-50 pl-[1em]">
        <div className="flex items-center gap-[0.6em] text-[0.8em] font-medium text-slate-700">
          <span className="h-[1em] w-[1em] rounded-[0.25em] bg-linear-to-br from-cyan-500 to-violet-600" />
          {title}
        </div>
        <div className="flex text-[0.8em] text-slate-500">
          {['–', '▢', '✕'].map((c) => (
            <span key={c} className="grid h-[2.4em] w-[3em] place-items-center">
              {c}
            </span>
          ))}
        </div>
      </div>
      <div className="h-[27.5em]">{children}</div>
    </div>
  );
}

function Phone({ children }) {
  return (
    <div className={`relative h-[33em] w-[16em] rounded-[2.6em] bg-slate-900 p-[0.5em] ${DEVICE_SHADOW}`}>
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.15em] bg-white">
        <div className="flex items-center justify-between px-[1.6em] pt-[0.85em] text-[0.68em] font-semibold text-slate-900">
          <span>9:41</span>
          <span className="h-[0.95em] w-[1.9em] rounded-[0.3em] border-[0.12em] border-slate-900/70 p-[0.1em]">
            <span className="block h-full w-3/4 rounded-[0.15em] bg-slate-900" />
          </span>
        </div>
        <div className="absolute left-1/2 top-[0.55em] h-[1.35em] w-[4.8em] -translate-x-1/2 rounded-full bg-slate-900" />
        <div className="flex flex-1 flex-col px-[1em] pb-[1em] pt-[0.9em]">{children}</div>
      </div>
    </div>
  );
}

// Small card that floats in front of the device, for depth.
function Float({ className = '', children }) {
  return (
    <div
      className={`absolute rounded-[0.9em] border border-slate-900/[0.06] bg-white/95 px-[1em] py-[0.8em] shadow-[0_1.6em_3em_-1.2em_rgb(15_23_42/0.4)] ${className}`}
      style={{ transform: 'translateZ(5em)' }}
    >
      {children}
    </div>
  );
}

function Bars({ values, className = '', from = 'from-cyan-500', to = 'to-violet-500' }) {
  return (
    <div className={`flex items-end gap-[0.35em] ${className}`}>
      {values.map((v, i) => (
        <span key={i} className={`flex-1 rounded-t-[0.25em] bg-linear-to-t ${from} ${to}`} style={{ height: `${v}%` }} />
      ))}
    </div>
  );
}

const TONES = {
  green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-700 ring-amber-200',
  red: 'bg-rose-50 text-rose-700 ring-rose-200',
  cyan: 'bg-cyan-50 text-cyan-800 ring-cyan-200',
};

function Pill({ tone = 'cyan', children }) {
  return <span className={`inline-flex rounded-full px-[0.7em] py-[0.2em] text-[0.85em] font-medium ring-1 ${TONES[tone]}`}>{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

function Valuation() {
  return (
    <>
      <Browser url="propex.ai/valuation">
        <div className="grid h-full grid-cols-[1fr_1.35fr] gap-[1.2em] bg-slate-50 p-[1.4em]">
          <div className="flex flex-col gap-[0.65em]">
            <p className="text-[1.25em] font-semibold text-slate-900">Value a property</p>
            {[
              ['City', 'Lahore'],
              ['Area', '10 Marla'],
              ['Bedrooms', '4'],
              ['Property type', 'House'],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[0.7em] text-slate-500">{k}</p>
                <div className="mt-[0.25em] rounded-[0.5em] border border-slate-200 bg-white px-[0.7em] py-[0.45em] text-[0.85em] text-slate-800">{v}</div>
              </div>
            ))}
            <div className="mt-auto rounded-[0.6em] bg-linear-to-r from-cyan-600 to-violet-600 py-[0.6em] text-center text-[0.85em] font-semibold text-white">
              Estimate value
            </div>
          </div>
          <div className="flex flex-col rounded-[0.9em] bg-white p-[1.2em] shadow-[0_0.6em_1.6em_-0.8em_rgb(15_23_42/0.25)] ring-1 ring-slate-900/[0.05]">
            <p className="text-[0.75em] text-slate-500">Estimated market value</p>
            <p className="mt-[0.25em] font-display text-[2.3em] font-semibold leading-none text-slate-900">PKR 3.4 Cr</p>
            <p className="mt-[0.6em] text-[0.72em] text-slate-500">Likely range PKR 3.1 to 3.7 Cr</p>
            <div className="relative mt-[0.6em] h-[0.5em] rounded-full bg-slate-100">
              <div className="absolute inset-y-0 left-[28%] right-[22%] rounded-full bg-linear-to-r from-cyan-500 to-violet-500" />
            </div>
            <p className="mt-auto text-[0.72em] font-medium text-slate-700">Recent sales nearby</p>
            <Bars values={[52, 64, 48, 72, 60, 82, 68]} className="mt-[0.5em] h-[6.5em]" />
          </div>
        </div>
      </Browser>
      <Float className="-bottom-[2.2em] left-[40%]">
        <p className="text-[0.7em] text-slate-500">Model confidence</p>
        <p className="mt-[0.2em] flex items-center gap-[0.4em] text-[0.95em] font-semibold text-slate-900">
          <span className="h-[0.6em] w-[0.6em] rounded-full bg-emerald-500" />
          High
        </p>
      </Float>
    </>
  );
}

function LeafScan() {
  return (
    <>
      <Phone>
        <div className="flex items-center justify-between">
          <p className="text-[1.05em] font-semibold text-slate-900">Agriguard</p>
          <Pill tone="green">Scan</Pill>
        </div>
        <div className="relative mt-[0.8em] h-[12em] overflow-hidden rounded-[1em] bg-linear-to-b from-emerald-50 to-emerald-200">
          <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M8 72 C 30 42, 58 20, 94 6 C 82 30, 56 56, 8 72 Z" fill="#4f9a3c" />
            <path d="M8 72 C 40 46, 66 26, 94 6" stroke="#86c06c" strokeWidth="1.2" fill="none" />
            {[
              [44, 44, 3.2],
              [58, 34, 2.4],
              [34, 54, 2],
              [66, 30, 1.6],
            ].map(([x, y, r]) => (
              <g key={`${x}-${y}`}>
                <ellipse cx={x} cy={y} rx={r * 1.5} ry={r} fill="#8a5a2b" />
                <ellipse cx={x} cy={y} rx={r * 1.5 + 1} ry={r + 1} fill="none" stroke="#d6b25e" strokeWidth="0.7" />
              </g>
            ))}
          </svg>
          {['left-[0.6em] top-[0.6em] border-l-2 border-t-2', 'right-[0.6em] top-[0.6em] border-r-2 border-t-2', 'bottom-[0.6em] left-[0.6em] border-b-2 border-l-2', 'bottom-[0.6em] right-[0.6em] border-b-2 border-r-2'].map((c) => (
            <span key={c} className={`absolute h-[1.4em] w-[1.4em] rounded-[0.2em] border-white ${c}`} />
          ))}
        </div>
        <div className="mt-[0.8em] rounded-[0.9em] border border-amber-200 bg-amber-50 p-[0.8em]">
          <p className="text-[0.65em] text-amber-700">Detected</p>
          <p className="text-[1em] font-semibold text-slate-900">Brown spot</p>
          <div className="mt-[0.5em] h-[0.4em] rounded-full bg-amber-100">
            <div className="h-full w-[97%] rounded-full bg-amber-500" />
          </div>
          <p className="mt-[0.4em] text-[0.62em] text-slate-600">97% confidence, 1.4 s</p>
        </div>
        <div className="mt-auto rounded-full bg-slate-900 py-[0.65em] text-center text-[0.75em] font-semibold text-white">Scan another leaf</div>
      </Phone>
      <Float className="right-[-6em] top-[5em] w-[11em]">
        <p className="text-[0.68em] text-slate-500">Treatment tip</p>
        <p className="mt-[0.2em] text-[0.78em] leading-snug text-slate-800">Remove affected leaves and balance nitrogen.</p>
      </Float>
    </>
  );
}

function Audit() {
  const rows = [
    ['Design suite', '14 seats', '$420', '5 unused seats', 'amber'],
    ['Video meetings', '2 plans', '$300', 'Duplicate tool', 'red'],
    ['CRM', 'Pro plan', '$640', 'Smaller plan fits', 'amber'],
    ['Docs & wiki', '30 seats', '$240', 'Healthy', 'green'],
    ['Cloud storage', '2 TB', '$90', 'Healthy', 'green'],
  ];
  return (
    <Browser url="spendwise.app/audit">
      <div className="h-full bg-white p-[1.4em]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[0.72em] text-slate-500">Monthly software spend</p>
            <p className="font-display text-[2.1em] font-semibold leading-tight text-slate-900">$4,280</p>
          </div>
          <div className="rounded-[0.7em] bg-emerald-50 px-[0.9em] py-[0.55em] text-right ring-1 ring-emerald-200">
            <p className="text-[0.65em] text-emerald-700">Possible savings</p>
            <p className="text-[1.3em] font-semibold text-emerald-700">$1,140 / mo</p>
          </div>
        </div>
        <div className="mt-[1.1em] overflow-hidden rounded-[0.8em] border border-slate-100">
          <div className="grid grid-cols-[1.6fr_1fr_0.7fr_1.5fr] bg-slate-50 px-[1.1em] py-[0.55em] text-[0.68em] font-medium text-slate-500">
            <span>Tool</span>
            <span>Usage</span>
            <span>Cost</span>
            <span>Finding</span>
          </div>
          {rows.map(([name, use, cost, flag, tone]) => (
            <div key={name} className="grid grid-cols-[1.6fr_1fr_0.7fr_1.5fr] items-center border-t border-slate-100 px-[0.9em] py-[0.62em] text-[0.8em]">
              <span className="font-medium text-slate-800">{name}</span>
              <span className="text-slate-500">{use}</span>
              <span className="text-slate-800">{cost}</span>
              <span>
                <Pill tone={tone}>{flag}</Pill>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Browser>
  );
}

function Pos() {
  const items = [
    ['Screen repair', 'Rs 6,500', 'bg-cyan-400'],
    ['Battery', 'Rs 3,200', 'bg-emerald-400'],
    ['Charging port', 'Rs 1,800', 'bg-amber-400'],
    ['Back glass', 'Rs 2,500', 'bg-violet-400'],
    ['Tempered glass', 'Rs 600', 'bg-sky-400'],
    ['Phone cover', 'Rs 900', 'bg-rose-400'],
  ];
  return (
    <Window title="Repair POS">
      <div className="grid h-full grid-cols-[3.4em_1fr_16em] bg-slate-50">
        <div className="flex flex-col items-center gap-[0.7em] bg-slate-900 py-[1em]">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`h-[1.7em] w-[1.7em] rounded-[0.45em] ${i === 0 ? 'bg-cyan-500' : 'bg-white/15'}`} />
          ))}
        </div>
        <div className="p-[1em]">
          <div className="rounded-[0.6em] border border-slate-200 bg-white px-[0.8em] py-[0.5em] text-[0.75em] text-slate-400">Search parts or services</div>
          <div className="mt-[0.9em] grid grid-cols-3 gap-[0.7em]">
            {items.map(([name, price, dot]) => (
              <div key={name} className="rounded-[0.7em] border border-slate-200 bg-white p-[0.7em]">
                <span className={`block h-[1.6em] w-[1.6em] rounded-[0.4em] ${dot}`} />
                <p className="mt-[0.6em] text-[0.75em] font-medium text-slate-800">{name}</p>
                <p className="text-[0.68em] text-slate-500">{price}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col border-l border-slate-200 bg-white p-[1em]">
          <p className="text-[0.85em] font-semibold text-slate-900">Current bill</p>
          {[
            ['Screen repair', '1', 'Rs 6,500'],
            ['Battery', '1', 'Rs 3,200'],
            ['Phone cover', '1', 'Rs 900'],
          ].map(([n, q, p]) => (
            <div key={n} className="mt-[0.6em] flex justify-between text-[0.72em] text-slate-700">
              <span>
                {q} × {n}
              </span>
              <span>{p}</span>
            </div>
          ))}
          <div className="mt-auto border-t border-dashed border-slate-200 pt-[0.7em]">
            <div className="flex items-baseline justify-between">
              <span className="text-[0.75em] text-slate-500">Total</span>
              <span className="font-display text-[1.5em] font-semibold text-slate-900">Rs 10,600</span>
            </div>
            <div className="mt-[0.6em] rounded-[0.6em] bg-linear-to-r from-cyan-600 to-violet-600 py-[0.65em] text-center text-[0.8em] font-semibold text-white">
              Charge
            </div>
            <p className="mt-[0.6em] flex items-center gap-[0.4em] text-[0.62em] text-amber-700">
              <span className="h-[0.6em] w-[0.6em] rounded-full bg-amber-500" />
              Offline. Syncs when back online.
            </p>
          </div>
        </div>
      </div>
    </Window>
  );
}

function Sentiment() {
  return (
    <Phone>
      <p className="text-[1.05em] font-semibold text-slate-900">SentimentAI</p>
      <p className="mt-[0.7em] text-[0.65em] text-slate-500">Movie review</p>
      <div className="mt-[0.3em] rounded-[0.8em] border border-slate-200 bg-slate-50 p-[0.7em] text-[0.7em] leading-relaxed text-slate-700">
        The story drags in places, but the performances are wonderful and the ending stayed with me.
      </div>
      <div className="mt-[0.7em] rounded-full bg-linear-to-r from-cyan-600 to-violet-600 py-[0.6em] text-center text-[0.75em] font-semibold text-white">Analyze</div>
      <div className="mt-[0.9em] rounded-[0.9em] bg-emerald-50 p-[0.8em] ring-1 ring-emerald-200">
        <p className="text-[0.65em] text-emerald-700">Sentiment</p>
        <p className="font-display text-[1.6em] font-semibold leading-tight text-emerald-700">Positive</p>
        <div className="mt-[0.4em] h-[0.4em] rounded-full bg-emerald-100">
          <div className="h-full w-[91%] rounded-full bg-emerald-500" />
        </div>
      </div>
      <div className="mt-auto space-y-[0.4em] text-[0.65em]">
        {['Logistic Regression', 'Naive Bayes'].map((m) => (
          <div key={m} className="flex items-center justify-between rounded-[0.6em] bg-slate-50 px-[0.8em] py-[0.5em]">
            <span className="text-slate-600">{m}</span>
            <span className="font-semibold text-emerald-700">Positive</span>
          </div>
        ))}
      </div>
    </Phone>
  );
}

function Fitness() {
  const rings = [
    [40, 0.78, '#06b6d4'],
    [31, 0.62, '#7c3aed'],
    [22, 0.9, '#10b981'],
  ];
  return (
    <Phone>
      <div className="flex items-baseline justify-between">
        <p className="text-[1.05em] font-semibold text-slate-900">Today</p>
        <p className="text-[0.62em] text-slate-500">Tue, 4 Nov</p>
      </div>
      <div className="relative mx-auto mt-[0.6em] h-[10.5em] w-[10.5em]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          {rings.map(([r, p, c]) => (
            <g key={r}>
              <circle cx="50" cy="50" r={r} fill="none" stroke={c} strokeOpacity="0.15" strokeWidth="7" />
              <circle cx="50" cy="50" r={r} fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * r * p} 999`} />
            </g>
          ))}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-display text-[1.25em] font-semibold leading-none text-slate-900">8,432</p>
            <p className="text-[0.55em] text-slate-500">steps</p>
          </div>
        </div>
      </div>
      <div className="mt-[0.8em] grid grid-cols-3 gap-[0.4em] text-center">
        {[
          ['512', 'kcal'],
          ['46', 'min'],
          ['6.1', 'km'],
        ].map(([v, u]) => (
          <div key={u} className="rounded-[0.7em] bg-slate-50 py-[0.5em]">
            <p className="text-[0.85em] font-semibold text-slate-900">{v}</p>
            <p className="text-[0.55em] text-slate-500">{u}</p>
          </div>
        ))}
      </div>
      <p className="mt-[0.9em] text-[0.62em] font-medium text-slate-700">This week</p>
      <Bars values={[45, 70, 55, 90, 62, 80, 35]} className="mt-[0.4em] h-[4.5em]" from="from-cyan-500" to="to-emerald-400" />
      <div className="mt-[0.3em] flex justify-between px-[0.2em] text-[0.5em] text-slate-400">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
    </Phone>
  );
}

function Quote() {
  return (
    <Phone>
      <p className="text-[1.05em] font-semibold text-slate-900">Daily Quote</p>
      <div className="relative mt-[0.9em] flex flex-1 flex-col justify-center rounded-[1.2em] bg-linear-to-br from-cyan-500 via-sky-600 to-violet-600 p-[1.2em] text-white">
        <span className="font-display text-[3em] leading-none opacity-70">“</span>
        <p className="mt-[0.2em] text-[1em] font-medium leading-snug">Progress, not perfection, is what moves you forward.</p>
        <p className="mt-[0.8em] text-[0.6em] opacity-80">Tap for a new quote</p>
      </div>
      <div className="mt-[0.9em] flex gap-[0.5em]">
        <div className="flex-1 rounded-full bg-slate-900 py-[0.65em] text-center text-[0.72em] font-semibold text-white">New quote</div>
        <div className="grid h-[2.3em] w-[2.3em] place-items-center rounded-full border border-slate-200 text-slate-700">
          <svg viewBox="0 0 24 24" className="h-[1.1em] w-[1.1em]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
          </svg>
        </div>
      </div>
    </Phone>
  );
}

function Clinic() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const appts = [
    [0, 0, 2, 'Hamza R.', 'bg-cyan-50 border-cyan-500 text-cyan-900'],
    [1, 1, 1, 'Mariam S.', 'bg-violet-50 border-violet-500 text-violet-900'],
    [2, 0, 1, 'Bilal K.', 'bg-emerald-50 border-emerald-500 text-emerald-900'],
    [2, 3, 2, 'Zara A.', 'bg-cyan-50 border-cyan-500 text-cyan-900'],
    [3, 2, 1, 'Omar F.', 'bg-violet-50 border-violet-500 text-violet-900'],
    [4, 1, 2, 'Hira N.', 'bg-emerald-50 border-emerald-500 text-emerald-900'],
    [0, 4, 1, 'Ali M.', 'bg-violet-50 border-violet-500 text-violet-900'],
    [4, 4, 1, 'Sana T.', 'bg-cyan-50 border-cyan-500 text-cyan-900'],
  ];
  return (
    <Browser url="careslot.app/schedule">
      <div className="grid h-full grid-cols-[12em_1fr]">
        <div className="border-r border-slate-100 bg-slate-50 p-[1em]">
          <p className="text-[0.75em] font-semibold text-slate-900">Doctors</p>
          {[
            ['AM', 'Dr. Ayesha Malik', 'Dermatology'],
            ['UT', 'Dr. Usman Tariq', 'Cardiology'],
            ['SK', 'Dr. Sara Khan', 'Pediatrics'],
          ].map(([i, n, s], k) => (
            <div key={n} className={`mt-[0.7em] flex items-center gap-[0.6em] rounded-[0.6em] p-[0.5em] ${k === 0 ? 'bg-white shadow-sm ring-1 ring-slate-900/[0.05]' : ''}`}>
              <span className="grid h-[2em] w-[2em] place-items-center rounded-full bg-linear-to-br from-cyan-500 to-violet-500 text-[0.7em] font-semibold text-white">{i}</span>
              <div>
                <p className="text-[0.68em] font-medium text-slate-800">{n}</p>
                <p className="text-[0.58em] text-slate-500">{s}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col p-[1em]">
          <div className="flex items-center justify-between">
            <p className="text-[0.95em] font-semibold text-slate-900">Week of 3 Nov</p>
            <span className="rounded-full bg-slate-900 px-[0.9em] py-[0.35em] text-[0.68em] font-semibold text-white">Book slot</span>
          </div>
          <div className="mt-[0.7em] grid grid-cols-5 gap-[0.4em] text-[0.65em] font-medium text-slate-500">
            {days.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="relative mt-[0.4em] grid flex-1 grid-cols-5 grid-rows-6 gap-[0.4em]">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className="rounded-[0.35em] bg-slate-50" />
            ))}
            {appts.map(([col, row, span, name, cls]) => (
              <span
                key={`${col}-${row}`}
                className={`rounded-[0.35em] border-l-[0.25em] px-[0.4em] py-[0.25em] text-[0.6em] font-medium ${cls}`}
                style={{ gridColumn: col + 1, gridRow: `${row + 1} / span ${span}` }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  );
}

function Food() {
  const items = [
    ['Chicken Karahi', 'Half, with naan', 'Rs 1,450', 'from-orange-300 to-red-400'],
    ['Smash Burger', 'Double patty', 'Rs 990', 'from-amber-200 to-orange-400'],
    ['Mint Lemonade', 'Large', 'Rs 450', 'from-lime-200 to-emerald-400'],
  ];
  return (
    <Phone>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[1.05em] font-semibold text-slate-900">DineDash</p>
          <p className="text-[0.58em] text-slate-500">Deliver to Gulberg, Lahore</p>
        </div>
        <span className="h-[2em] w-[2em] rounded-full bg-linear-to-br from-orange-300 to-rose-400" />
      </div>
      <div className="mt-[0.7em] rounded-full bg-slate-100 px-[0.9em] py-[0.5em] text-[0.62em] text-slate-400">Search dishes</div>
      <div className="mt-[0.7em] flex gap-[0.35em] text-[0.6em]">
        {['Desi', 'Burgers', 'Pizza', 'Drinks'].map((c, i) => (
          <span key={c} className={`rounded-full px-[0.8em] py-[0.35em] ${i === 0 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
            {c}
          </span>
        ))}
      </div>
      <div className="mt-[0.7em] space-y-[0.55em]">
        {items.map(([n, d, p, g]) => (
          <div key={n} className="flex items-center gap-[0.6em] rounded-[0.8em] border border-slate-100 p-[0.5em]">
            <span className={`h-[2.6em] w-[2.6em] flex-none rounded-[0.6em] bg-linear-to-br ${g}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.7em] font-semibold text-slate-900">{n}</p>
              <p className="text-[0.55em] text-slate-500">{d}</p>
              <p className="text-[0.62em] font-medium text-slate-800">{p}</p>
            </div>
            <span className="grid h-[1.5em] w-[1.5em] place-items-center rounded-full bg-slate-900 text-[0.8em] text-white">+</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between rounded-[0.8em] bg-linear-to-r from-cyan-600 to-violet-600 px-[0.9em] py-[0.6em] text-white">
        <span className="text-[0.62em]">3 items, Rs 2,890</span>
        <span className="text-[0.68em] font-semibold">View cart</span>
      </div>
    </Phone>
  );
}

function Document() {
  return (
    <Browser url="invoicelens.app/review">
      <div className="grid h-full grid-cols-[1fr_1.05fr] gap-[1.2em] bg-slate-100 p-[1.2em]">
        <div className="relative rounded-[0.4em] bg-white p-[1.1em] shadow-[0_0.6em_1.4em_-0.7em_rgb(15_23_42/0.35)]">
          <p className="font-display text-[1.1em] font-semibold tracking-wide text-slate-800">INVOICE</p>
          <div className="relative mt-[0.7em] space-y-[0.35em]">
            <span className="absolute -inset-[0.3em] rounded-[0.3em] border-[0.12em] border-cyan-500 bg-cyan-500/5" />
            <span className="block h-[0.5em] w-[60%] rounded bg-slate-300" />
            <span className="block h-[0.4em] w-[45%] rounded bg-slate-200" />
          </div>
          <div className="mt-[1em] space-y-[0.45em]">
            {[90, 75, 82, 68, 88].map((w, i) => (
              <div key={i} className="flex justify-between">
                <span className="h-[0.4em] rounded bg-slate-200" style={{ width: `${w * 0.6}%` }} />
                <span className="h-[0.4em] w-[16%] rounded bg-slate-200" />
              </div>
            ))}
          </div>
          <div className="relative ml-auto mt-[1.2em] w-[45%]">
            <span className="absolute -inset-[0.35em] rounded-[0.3em] border-[0.12em] border-violet-500 bg-violet-500/5" />
            <div className="flex justify-between">
              <span className="h-[0.5em] w-[35%] rounded bg-slate-300" />
              <span className="h-[0.5em] w-[45%] rounded bg-slate-400" />
            </div>
          </div>
        </div>
        <div className="flex flex-col rounded-[0.8em] bg-white p-[1.1em] ring-1 ring-slate-900/[0.05]">
          <p className="text-[0.85em] font-semibold text-slate-900">Extracted fields</p>
          {[
            ['Vendor', 'Northwind Supplies'],
            ['Invoice no.', 'INV-20418'],
            ['Invoice date', '28 Oct 2026'],
            ['Due date', '27 Nov 2026'],
            ['Total', '$2,364.00'],
          ].map(([k, v]) => (
            <div key={k} className="mt-[0.55em] flex items-center justify-between border-b border-slate-100 pb-[0.45em] text-[0.7em]">
              <span className="text-slate-500">{k}</span>
              <span className="flex items-center gap-[0.4em] font-medium text-slate-900">
                {v}
                <span className="grid h-[1.2em] w-[1.2em] place-items-center rounded-full bg-emerald-500 text-[0.75em] text-white">✓</span>
              </span>
            </div>
          ))}
          <div className="mt-auto rounded-[0.6em] bg-slate-900 py-[0.6em] text-center text-[0.75em] font-semibold text-white">Send for approval</div>
        </div>
      </div>
    </Browser>
  );
}

function Chat() {
  return (
    <Browser url="help.yourstore.com">
      <div className="flex h-full flex-col bg-white">
        <div className="flex items-center gap-[0.7em] border-b border-slate-100 px-[1.2em] py-[0.8em]">
          <span className="h-[2.2em] w-[2.2em] rounded-full bg-linear-to-br from-cyan-500 to-violet-600" />
          <div>
            <p className="text-[0.8em] font-semibold text-slate-900">Support assistant</p>
            <p className="flex items-center gap-[0.35em] text-[0.62em] text-emerald-600">
              <span className="h-[0.55em] w-[0.55em] rounded-full bg-emerald-500" />
              Online
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-[0.7em] px-[1.2em] py-[1em] text-[0.75em]">
          <p className="ml-auto max-w-[70%] rounded-[1em] rounded-br-[0.3em] bg-slate-900 px-[0.9em] py-[0.6em] text-white">Can I change my delivery address after ordering?</p>
          <div className="max-w-[75%]">
            <p className="rounded-[1em] rounded-bl-[0.3em] bg-slate-100 px-[0.9em] py-[0.6em] text-slate-800">
              Yes, as long as the order hasn’t shipped. Open Orders, pick the order and choose Edit address.
            </p>
            <span className="mt-[0.4em] inline-flex rounded-full bg-cyan-50 px-[0.7em] py-[0.2em] text-[0.85em] text-cyan-800 ring-1 ring-cyan-200">Source: Shipping policy</span>
          </div>
          <p className="ml-auto max-w-[70%] rounded-[1em] rounded-br-[0.3em] bg-slate-900 px-[0.9em] py-[0.6em] text-white">And if it already shipped?</p>
          <div className="flex w-fit gap-[0.3em] rounded-[1em] bg-slate-100 px-[0.9em] py-[0.75em]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-[0.45em] w-[0.45em] rounded-full bg-slate-400" />
            ))}
          </div>
        </div>
        <div className="m-[1em] flex items-center gap-[0.6em] rounded-full border border-slate-200 py-[0.35em] pl-[1em] pr-[0.35em]">
          <span className="flex-1 text-[0.7em] text-slate-400">Type your question</span>
          <span className="h-[1.8em] w-[1.8em] rounded-full bg-linear-to-br from-cyan-600 to-violet-600" />
        </div>
      </div>
    </Browser>
  );
}

function Kpi() {
  const tiles = [
    ['Revenue', '$1.28M', '+8.4%', true],
    ['Gross margin', '41.2%', '+1.1 pts', true],
    ['Pipeline', '$3.9M', '+12%', true],
    ['Orders', '2,418', '−2.3%', false],
  ];
  return (
    <Browser url="pulse.analytics/sales">
      <div className="flex h-full flex-col gap-[0.9em] bg-slate-50 p-[1.2em]">
        <div className="grid grid-cols-4 gap-[0.7em]">
          {tiles.map(([k, v, d, up]) => (
            <div key={k} className="rounded-[0.7em] bg-white p-[0.8em] ring-1 ring-slate-900/[0.05]">
              <p className="text-[0.62em] text-slate-500">{k}</p>
              <p className="mt-[0.15em] font-display text-[1.3em] font-semibold text-slate-900">{v}</p>
              <p className={`text-[0.6em] font-medium ${up ? 'text-emerald-600' : 'text-rose-600'}`}>{d}</p>
            </div>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-[1.7fr_1fr] gap-[0.7em]">
          <div className="flex flex-col rounded-[0.7em] bg-white p-[0.9em] ring-1 ring-slate-900/[0.05]">
            <p className="text-[0.68em] font-medium text-slate-700">Revenue by month</p>
            <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="mt-[0.5em] w-full flex-1" aria-hidden="true">
              <defs>
                <linearGradient id="kpi-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#06b6d4" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[20, 40, 60].map((y) => (
                <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#e2e8f0" strokeWidth="0.6" />
              ))}
              <path d="M0 62 L25 55 L50 58 L75 44 L100 47 L125 34 L150 30 L175 22 L200 14 L200 80 L0 80 Z" fill="url(#kpi-fill)" />
              <path d="M0 62 L25 55 L50 58 L75 44 L100 47 L125 34 L150 30 L175 22 L200 14" fill="none" stroke="#0891b2" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M0 66 L25 63 L50 61 L75 57 L100 52 L125 49 L150 45 L175 41 L200 37" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
          <div className="flex flex-col rounded-[0.7em] bg-white p-[0.9em] ring-1 ring-slate-900/[0.05]">
            <p className="text-[0.68em] font-medium text-slate-700">By region</p>
            {[
              ['North', 82],
              ['Central', 64],
              ['South', 51],
              ['West', 37],
            ].map(([r, w]) => (
              <div key={r} className="mt-[0.6em]">
                <div className="flex justify-between text-[0.58em] text-slate-500">
                  <span>{r}</span>
                  <span>{w}%</span>
                </div>
                <div className="mt-[0.2em] h-[0.45em] rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-linear-to-r from-cyan-500 to-violet-500" style={{ width: `${w}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  );
}

function SapPlan() {
  const rows = [
    ['Marketing', '18.2M', '20.0M', '+9.9%'],
    ['Operations', '42.6M', '44.1M', '+3.5%'],
    ['IT', '12.4M', '15.8M', '+27.4%'],
    ['HR', '6.1M', '6.3M', '+3.3%'],
    ['Finance', '4.8M', '4.9M', '+2.1%'],
  ];
  return (
    <Browser url="analytics.yourcompany.com/budget-2027">
      <div className="flex h-full flex-col bg-white p-[1.2em]">
        <div className="flex items-center justify-between">
          <p className="text-[0.95em] font-semibold text-slate-900">Budget 2027 by cost center</p>
          <div className="flex gap-[0.35em] text-[0.62em]">
            <span className="rounded-full bg-slate-100 px-[0.8em] py-[0.3em] text-slate-600">Actual 2026</span>
            <span className="rounded-full bg-slate-900 px-[0.8em] py-[0.3em] text-white">Plan 2027</span>
          </div>
        </div>
        <div className="mt-[0.9em] grid flex-1 grid-cols-[1.8fr_1fr] gap-[1em]">
          <div className="overflow-hidden rounded-[0.6em] border border-slate-200 text-[0.7em]">
            <div className="grid grid-cols-[1.4fr_1fr_1fr_0.9fr] bg-slate-50 px-[0.8em] py-[0.5em] font-medium text-slate-500">
              <span>Cost center</span>
              <span>Actual</span>
              <span>Plan</span>
              <span>Change</span>
            </div>
            {rows.map(([c, a, p, v]) => (
              <div key={c} className="grid grid-cols-[1.4fr_1fr_1fr_0.9fr] items-center border-t border-slate-100 px-[0.8em] py-[0.48em] text-slate-800">
                <span className="font-medium">{c}</span>
                <span className="text-slate-500">{a}</span>
                <span className="mr-[0.6em] rounded-[0.3em] bg-cyan-50 px-[0.35em] py-[0.1em] ring-1 ring-cyan-200">{p}</span>
                <span className={v.startsWith('+2') ? 'font-medium text-amber-600' : 'text-emerald-600'}>{v}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col rounded-[0.6em] border border-slate-200 p-[0.8em]">
            <p className="text-[0.65em] font-medium text-slate-700">Actual vs plan</p>
            <div className="mt-[0.6em] flex flex-1 items-end gap-[0.5em]">
              {[
                [55, 60],
                [85, 88],
                [40, 52],
                [28, 30],
              ].map(([a, p], i) => (
                <div key={i} className="flex h-full flex-1 items-end gap-[0.15em]">
                  <span className="flex-1 rounded-t-[0.2em] bg-slate-300" style={{ height: `${a}%` }} />
                  <span className="flex-1 rounded-t-[0.2em] bg-linear-to-t from-cyan-500 to-violet-500" style={{ height: `${p}%` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Browser>
  );
}

function Storefront() {
  const products = [
    ['Everyday Tote', '$48', 'from-amber-100 to-orange-200', 'rounded-[0.4em]'],
    ['Linen Shirt', '$62', 'from-sky-100 to-cyan-200', 'rounded-full'],
    ['Desk Lamp', '$85', 'from-violet-100 to-fuchsia-200', 'rounded-t-full'],
  ];
  return (
    <>
      <Browser url="shoplift.store">
        <div className="flex h-full flex-col bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-[1.2em] py-[0.7em]">
            <p className="font-display text-[1em] font-semibold text-slate-900">ShopLift</p>
            <div className="flex gap-[1.2em] text-[0.65em] text-slate-500">
              <span>New</span>
              <span>Women</span>
              <span>Men</span>
              <span>Home</span>
            </div>
            <span className="rounded-full bg-slate-900 px-[0.8em] py-[0.3em] text-[0.62em] text-white">Cart (2)</span>
          </div>
          <div className="mx-[1.2em] mt-[0.9em] rounded-[0.8em] bg-linear-to-r from-cyan-50 to-violet-100 px-[1.2em] py-[1em]">
            <p className="font-display text-[1.3em] font-semibold text-slate-900">The new season is here</p>
            <p className="mt-[0.2em] text-[0.65em] text-slate-600">Free delivery on orders over $50</p>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-[0.9em] p-[1.2em]">
            {products.map(([n, p, g, shape]) => (
              <div key={n} className="flex flex-col">
                <div className={`grid flex-1 place-items-center rounded-[0.8em] bg-linear-to-br ${g}`}>
                  <span className={`h-[3.5em] w-[3.5em] bg-white/70 shadow-sm ${shape}`} />
                </div>
                <p className="mt-[0.4em] text-[0.68em] font-medium text-slate-800">{n}</p>
                <p className="text-[0.62em] text-slate-500">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </Browser>
      <Float className="-right-[3.5em] bottom-[2em] w-[14em]">
        <p className="text-[0.72em] font-semibold text-slate-900">Funnel this week</p>
        {[
          ['Visits', '12.4k', 100],
          ['Product views', '5.1k', 62],
          ['Added to cart', '1.3k', 34],
          ['Purchases', '410', 18],
        ].map(([k, v, w]) => (
          <div key={k} className="mt-[0.45em]">
            <div className="flex justify-between text-[0.58em] text-slate-500">
              <span>{k}</span>
              <span className="font-medium text-slate-800">{v}</span>
            </div>
            <div className="mt-[0.15em] h-[0.45em] rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-linear-to-r from-cyan-500 to-violet-500" style={{ width: `${w}%` }} />
            </div>
          </div>
        ))}
      </Float>
    </>
  );
}

function Fleet() {
  const vans = [
    ['Van 12', 'On time, ETA 14:20', 'green'],
    ['Van 07', 'Delayed 12 min', 'amber'],
    ['Bike 03', 'On time, ETA 14:05', 'green'],
    ['Van 15', 'Delivered', 'cyan'],
  ];
  return (
    <Browser url="routewatch.app/live">
      <div className="grid h-full grid-cols-[1fr_14em]">
        <div className="relative overflow-hidden bg-[#eef3f7]">
          <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <rect x="120" y="18" width="46" height="34" rx="4" fill="#dfeadf" />
            <rect x="18" y="96" width="40" height="30" rx="4" fill="#dfeadf" />
            {['M0 40 H200', 'M0 105 H200', 'M60 0 V150', 'M140 0 V150', 'M0 150 L90 0'].map((d) => (
              <path key={d} d={d} stroke="#ffffff" strokeWidth="7" fill="none" />
            ))}
            <path d="M20 128 L60 105 L60 40 L140 40 L140 18" stroke="#0891b2" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M180 130 L140 105 L100 105 L84 40" stroke="#7c3aed" strokeWidth="3" fill="none" strokeDasharray="5 4" strokeLinecap="round" />
            {[
              [60, 80, '#0891b2'],
              [118, 105, '#f59e0b'],
              [100, 40, '#10b981'],
            ].map(([x, y, c]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r="7" fill={c} fillOpacity="0.2" />
                <circle cx={x} cy={y} r="4" fill={c} stroke="#fff" strokeWidth="1.5" />
              </g>
            ))}
            <path d="M140 18 m-5 -9 a5 5 0 1 1 10 0 c0 4 -5 9 -5 9 s-5 -5 -5 -9z" fill="#0b1220" />
          </svg>
        </div>
        <div className="border-l border-slate-100 bg-white p-[1em]">
          <p className="text-[0.85em] font-semibold text-slate-900">Live fleet</p>
          <p className="text-[0.6em] text-slate-500">4 vehicles on the road</p>
          {vans.map(([n, s, tone]) => (
            <div key={n} className="mt-[0.7em] rounded-[0.6em] border border-slate-100 p-[0.6em]">
              <p className="text-[0.7em] font-medium text-slate-900">{n}</p>
              <div className="mt-[0.3em] text-[0.75em]">
                <Pill tone={tone}>{s}</Pill>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Browser>
  );
}

/* ------------------------------------------------------------------ */
/* Public component                                                    */
/* ------------------------------------------------------------------ */

const SCREENS = {
  valuation: { Screen: Valuation },
  leafscan: { Screen: LeafScan, phone: true },
  audit: { Screen: Audit },
  pos: { Screen: Pos },
  sentiment: { Screen: Sentiment, phone: true },
  fitness: { Screen: Fitness, phone: true },
  quote: { Screen: Quote, phone: true },
  clinic: { Screen: Clinic },
  food: { Screen: Food, phone: true },
  document: { Screen: Document },
  chat: { Screen: Chat },
  kpi: { Screen: Kpi },
  sapplan: { Screen: SapPlan },
  storefront: { Screen: Storefront },
  fleet: { Screen: Fleet },
};

// `flat` drops the resting 3D tilt (used in the case-study dialog).
export default function ProjectPreview({ project, flat = false, className = '' }) {
  const label = `Illustrated preview of the ${project.title} interface`;

  if (project.image) {
    return (
      <div className={`stage aspect-[16/10] ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.image} alt={`${project.title} screenshot`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
      </div>
    );
  }

  const entry = SCREENS[project.preview];
  if (!entry) return null;
  const { Screen, phone } = entry;

  return (
    <div role="img" aria-label={label} className={`stage aspect-[16/10] ${className}`}>
      <div className="stage-scale absolute inset-0 grid place-items-center">
        <div className={`device relative ${phone ? 'device-flip' : ''} ${flat ? 'device-flat' : ''}`}>
          <Screen />
        </div>
      </div>
    </div>
  );
}
