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
    icon: 'mobile',
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
    icon: 'ai',
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

// Project categories, used by the filter chips in components/Projects.jsx.
export const projectGroups = [
  { id: 'software', label: 'Software & SaaS' },
  { id: 'mobile', label: 'Mobile apps' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'data', label: 'Data & BI' },
  { id: 'growth', label: 'Growth' },
];

/*
  Projects shown in components/Projects.jsx, in display order. The first 7 show before "Show all".

  kind     'product' | 'client' | 'concept'. Concepts get a "Concept" badge and a note in the
           case study saying they are sample builds, not delivered client work. Change a concept to
           'client' or 'product' once you have shipped something like it.
  groups   Category ids from projectGroups. A project can sit in more than one.
  preview  Which illustrated interface to draw (see components/ProjectPreview.jsx).
  image    Optional. A real screenshot in /public, e.g. '/projects/agriguard.png'. Replaces the illustration.
  video    Optional. A demo video in /public, e.g. '/projects/agriguard.mp4'. Plays in the case study.
*/
export const projects = [
  {
    id: 'propex',
    title: 'Propex AI',
    kind: 'product',
    flagship: true,
    groups: ['ai', 'software'],
    category: 'Real estate valuation',
    summary:
      'An AI valuation platform that prices property with an XGBoost regression model trained on nationwide market data, served to a React web app.',
    built: [
      'XGBoost regression model trained on nationwide market data',
      'FastAPI service that returns valuations to the web app',
      'React interface for entering a property and reading its estimate',
      'PostgreSQL database for property and market records',
    ],
    stack: ['Python', 'FastAPI', 'XGBoost', 'React', 'PostgreSQL'],
    // TODO: this URL is the CodeVanta Labs site itself. Replace it with Propex AI's own address.
    liveUrl: 'https://codevanta-labs.vercel.app',
    preview: 'valuation',
  },
  {
    id: 'repair-pos',
    title: 'Mobile Repair POS',
    kind: 'client',
    client: 'Amir Mobiles & Repairing Lab',
    groups: ['software'],
    category: 'Point of sale',
    summary:
      'An offline-first point-of-sale and inventory system for Amir Mobiles & Repairing Lab. Billing, stock and sales reports keep working when the internet drops.',
    facts: [
      { label: 'Platform', value: 'Windows' },
      { label: 'Works offline', value: 'Yes' },
    ],
    built: [
      'Fast checkout for real-time billing at a busy counter',
      'Inventory tracking for parts, accessories and devices',
      'Business analytics on daily sales',
      'Offline-first storage in SQLite, with cloud sync and sign-in through PocketBase',
    ],
    stack: ['Flutter', 'Dart', 'SQLite', 'PocketBase'],
    liveUrl: null,
    preview: 'pos',
  },
  {
    id: 'agriguard',
    title: 'Agriguard',
    kind: 'product',
    groups: ['ai', 'mobile'],
    category: 'Computer vision',
    summary:
      'Rice leaf disease detection. A Flutter app sends a leaf photo to an EfficientNet-B0 model and gets a diagnosis back in under two seconds.',
    facts: [
      { label: 'Validation accuracy', value: '98%' },
      { label: 'Inference time', value: 'Under 2\u00a0s' },
    ],
    built: [
      'EfficientNet-B0 classifier trained in PyTorch, 98% validation accuracy',
      'Flask inference API that answers in under two seconds',
      'Flutter mobile app for capturing leaves and reading results',
      'Supabase backend for app data',
    ],
    stack: ['Python', 'PyTorch', 'Flask', 'Flutter', 'Supabase'],
    liveUrl: null,
    preview: 'leafscan',
  },
  {
    id: 'spendwise',
    title: 'SpendWise AI',
    kind: 'product',
    groups: ['software', 'ai'],
    category: 'Expense audit SaaS',
    summary: 'A SaaS audit tool that reviews a company\'s software subscriptions and recommends where to cut costs.',
    built: [
      'AI review of software subscriptions powered by the Anthropic API',
      'Recommendations on where to cut software spend',
      'Next.js and TypeScript web app',
      'PocketBase backend for stored data',
    ],
    stack: ['Next.js', 'TypeScript', 'Anthropic API', 'PocketBase'],
    liveUrl: 'https://spendwise-ai-mu.vercel.app',
    preview: 'audit',
  },
  {
    id: 'sentimentai',
    title: 'SentimentAI',
    kind: 'product',
    groups: ['ai', 'mobile'],
    category: 'Natural language processing',
    summary:
      'A movie review sentiment analyzer trained on 50,000 IMDB reviews. Type a review in the app and it is labelled positive or negative in real time.',
    facts: [
      { label: 'Logistic Regression', value: '90%' },
      { label: 'Naive Bayes', value: '86%' },
    ],
    built: [
      'Text preprocessing and TF-IDF features on the balanced IMDB 50K dataset (25K positive, 25K negative)',
      'Logistic Regression and Multinomial Naive Bayes classifiers',
      'Flask API for real-time predictions',
      'Flutter app for entering reviews and reading results',
    ],
    stack: ['Python', 'scikit-learn', 'Flask', 'Flutter'],
    liveUrl: null,
    preview: 'sentiment',
  },
  {
    id: 'pulse',
    title: 'Pulse Analytics',
    kind: 'concept',
    groups: ['data'],
    category: 'BI dashboard',
    summary:
      'One sales and finance dashboard fed by ERP and CRM data. Revenue, margins and pipeline in one place, refreshed every morning.',
    built: [
      'Pipelines that load ERP and CRM data into a cloud warehouse',
      'Shared definitions for revenue, margin and pipeline',
      'Interactive dashboard with drill-down by region and product',
      'Scheduled refresh and email snapshots for managers',
    ],
    stack: ['Power BI', 'SQL', 'BigQuery'],
    liveUrl: null,
    preview: 'kpi',
  },
  {
    id: 'shoplift',
    title: 'ShopLift',
    kind: 'concept',
    groups: ['growth', 'software'],
    category: 'E-commerce growth',
    summary:
      'A fast storefront paired with a measured growth funnel: technical SEO, Google and Meta ad campaigns, and conversion tracking on every step.',
    built: [
      'Storefront tuned for page speed and search',
      'Google and Meta ad campaigns with clear budgets and targets',
      'Conversion tracking from first visit to purchase',
      'Monthly funnel report with the next experiments to run',
    ],
    stack: ['Next.js', 'GA4', 'Google Ads', 'Meta Ads', 'SEO'],
    liveUrl: null,
    preview: 'storefront',
  },
  {
    id: 'careslot',
    title: 'CareSlot',
    kind: 'concept',
    groups: ['software'],
    category: 'Healthcare SaaS',
    summary:
      'Online booking and a patient portal for clinics. Patients pick a doctor and a free slot, get reminders, and see their visit history.',
    built: [
      'Live doctor schedules with slot booking',
      'SMS and email reminders before each visit',
      'Patient portal with visit history and documents',
      'Front-desk dashboard for managing the day',
    ],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Twilio'],
    liveUrl: null,
    preview: 'clinic',
  },
  {
    id: 'invoicelens',
    title: 'InvoiceLens',
    kind: 'concept',
    groups: ['ai'],
    category: 'Document AI',
    summary:
      'Reads invoices and receipts, pulls out the vendor, dates, line items and totals, and sends them to accounting for approval.',
    built: [
      'OCR and a language model that read scanned and digital invoices',
      'Field extraction for vendor, dates, line items and totals',
      'Review screen where staff confirm or correct each field',
      'Export to the accounting system after approval',
    ],
    stack: ['Python', 'OCR', 'LLMs', 'FastAPI'],
    liveUrl: null,
    preview: 'document',
  },
  {
    id: 'copilot',
    title: 'HelpDesk Copilot',
    kind: 'concept',
    groups: ['ai', 'software'],
    category: 'AI assistant',
    summary:
      'A support assistant that answers customer questions from your own help articles and policies, cites its sources, and hands off to a person when unsure.',
    built: [
      'Search over your help center, policies and past tickets',
      'Answers that link the source they came from',
      'Hand-off to a human agent with the full conversation',
      'Chat widget for your website',
    ],
    stack: ['Python', 'LLMs', 'Vector search', 'Next.js'],
    liveUrl: null,
    preview: 'chat',
  },
  {
    id: 'planbridge',
    title: 'PlanBridge',
    kind: 'concept',
    groups: ['data'],
    category: 'SAP planning & analytics',
    summary:
      'Budget planning and variance reporting in SAP Analytics Cloud, built on governed data models in SAP Datasphere.',
    built: [
      'Data models in SAP Datasphere over actuals from the ERP',
      'Planning stories for budget entry by cost center',
      'Actual versus plan variance reports',
      'Role-based access for department heads and finance',
    ],
    stack: ['SAP Datasphere', 'SAP Analytics Cloud', 'SQL'],
    liveUrl: null,
    preview: 'sapplan',
  },
  {
    id: 'dinedash',
    title: 'DineDash',
    kind: 'concept',
    groups: ['mobile'],
    category: 'Food ordering',
    summary:
      'A restaurant ordering app with menu browsing, cart and checkout, and live order status from the kitchen to the door.',
    built: [
      'Menu with categories, add-ons and search',
      'Cart, checkout and saved addresses',
      'Live order status and rider location',
      'Kitchen screen for incoming orders',
    ],
    stack: ['Flutter', 'Firebase', 'Google Maps'],
    liveUrl: null,
    preview: 'food',
  },
  {
    id: 'routewatch',
    title: 'RouteWatch',
    kind: 'concept',
    groups: ['software'],
    category: 'Logistics',
    summary:
      'Live fleet tracking for delivery teams. Vehicles on a map, progress on every route, and delays flagged as they happen.',
    built: [
      'Live vehicle positions on a map',
      'Route progress and arrival estimates',
      'Delay alerts for dispatchers',
      'Daily delivery reports',
    ],
    stack: ['React', 'Node.js', 'WebSockets', 'Maps API'],
    liveUrl: null,
    preview: 'fleet',
  },
  {
    id: 'fitness',
    title: 'Fitness Tracker',
    kind: 'product',
    groups: ['mobile'],
    category: 'Health & fitness',
    // TODO: confirm the features and stack against the app; written from the project title only.
    summary: 'A mobile fitness tracker for logging workouts and following progress over time.',
    built: ['Workout and activity logging', 'Daily totals and weekly progress', 'Cross-platform Flutter app'],
    stack: ['Flutter', 'Dart'],
    liveUrl: null,
    preview: 'fitness',
  },
  {
    id: 'quotes',
    title: 'Random Quote Generator',
    kind: 'product',
    groups: ['mobile'],
    category: 'Content app',
    summary: 'A Flutter app that fetches a fresh quote from an online API on every tap and lets people share it.',
    built: [
      'Quotes fetched over HTTP and parsed from JSON',
      'One tap for a new random quote',
      'Native share sheet through share_plus',
    ],
    stack: ['Flutter', 'Dart', 'REST API'],
    liveUrl: null,
    preview: 'quote',
  },
];
