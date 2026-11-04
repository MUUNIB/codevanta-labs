export const siteConfig = {
  name: 'CodeVanta Labs',
  email: 'thecodevantalabs@gmail.com',
  phone: '+92 335 6029696',
  whatsapp: 'https://wa.me/923356029696',
  socials: {
    instagram: 'https://instagram.com/codevantalabs',
    facebook: 'https://facebook.com/codevantalabs',
  },
};

export const services = [
  {
    id: 'software',
    icon: 'code',
    title: 'Custom Software & Full-Stack Web Development',
    summary: 'Web platforms, customer portals and internal tools built to grow with you. We design the architecture, write the code and run it in the cloud.',
    deliverables: [
      'SaaS products and customer portals',
      'APIs, integrations and admin dashboards',
      'Cloud architecture on AWS and GCP',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    id: 'mobile',
    icon: 'phone',
    title: 'Mobile Application Engineering',
    summary: 'Apps for iOS and Android that feel native, from one shared codebase or fully native builds, taken all the way to the app stores.',
    deliverables: [
      'Cross-platform apps in Flutter or React Native',
      'Native iOS and Android builds',
      'Store release, analytics and crash monitoring',
    ],
    stack: ['iOS', 'Android', 'Flutter', 'React Native'],
  },
  {
    id: 'ai',
    icon: 'cpu',
    title: 'Artificial Intelligence & Machine Learning',
    summary: 'Models and assistants trained on your data that predict, classify, read documents and automate repetitive work.',
    deliverables: [
      'Custom ML models for forecasting and scoring',
      'NLP, chat assistants and document processing',
      'Generative AI and workflow automation',
    ],
    stack: ['Python', 'PyTorch', 'NLP', 'LLMs'],
  },
  {
    id: 'data',
    icon: 'chart',
    title: 'Enterprise Data Analytics & BI',
    summary: 'Turn ERP, CRM and product data into real-time dashboards your teams open every morning, built over scalable data pipelines.',
    deliverables: [
      'Interactive dashboards and KPI reporting',
      'SAP Analytics Cloud and SAP Datasphere',
      'Data pipelines and cloud data warehouses',
      'Power BI and custom analytics models',
    ],
    stack: ['SAP Analytics', 'SAP Datasphere', 'BigQuery', 'SQL', 'Power BI'],
  },
  {
    id: 'growth',
    icon: 'growth',
    title: 'Performance Digital Marketing & Brand Scale',
    summary: 'Search, paid media, and social growth campaigns measured against revenue, run by engineers who can also optimize your site.',
    deliverables: [
      'Social media management and content strategy',
      'Ad campaigns on Google, Meta and LinkedIn',
      'Technical SEO and brand growth scaling',
      'Conversion tracking and funnel optimization',
    ],
    stack: ['Social Media', 'SEO', 'Google Ads', 'Meta Ads', 'Analytics'],
  },
];

export const stack = [
  { name: 'Python', use: 'ML, data and automation' },
  { name: 'SQL', use: 'Warehouses and analytics' },
  { name: 'PyTorch', use: 'Deep learning models' },
  { name: 'Next.js', use: 'App Router web platforms' },
  { name: 'React', use: 'Interactive interfaces' },
  { name: 'Node.js', use: 'Fast API backends' },
  { name: 'TypeScript', use: 'Type-safe enterprise code' },
  { name: 'PostgreSQL', use: 'Relational data storage' },
  { name: 'Flutter', use: 'Cross-platform mobile apps' },
  { name: 'SAP Analytics', use: 'Analytics Cloud and Datasphere' },
  { name: 'BigQuery', use: 'Cloud data warehousing' },
  { name: 'Power BI', use: 'Enterprise dashboards & reporting' },
];

export const steps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We map your goals, users and constraints, then agree on scope, budget and how success will be measured.',
  },
  {
    number: '02',
    title: 'Architecture & 3D Prototyping',
    description: 'System design, data models and clickable or 3D prototypes, so you can see and test the product before it is built.',
  },
  {
    number: '03',
    title: 'Agile Engineering',
    description: 'Short sprints with working demos, code reviews and automated tests. You see real progress at the end of every sprint.',
  },
  {
    number: '04',
    title: 'Deployment & Scaling',
    description: 'CI/CD, monitoring and cloud setup for launch, then performance tuning and new features as usage grows.',
  },
];