require('dotenv').config()
const mongoose = require('mongoose')
const Project = require('./models/Project')

const projects = [
  {
    id: 'draglab',
    title: 'DragLab — Multilingual Laboratory Equipment Platform',
    subtitle: 'Full-Stack Developer & Marketing Technologist',
    eyebrow: 'Web · Full-Stack · SEO',
    description:
      'A production-level multilingual platform (EN/DE/FR/ES/TR) with a fully custom admin dashboard for managing products, models, industries, articles, downloads, and multilingual content.',
    url: 'https://drag-lab.de/',
    year: '2024 – Present',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'Cloudinary', 'GA4', 'GTM', 'SEO'],
    challenge: {
      heading: 'The Challenge',
      body: 'Lab equipment buyers across Europe and MENA needed a trustworthy, multilingual digital presence. Existing scattered content lacked structure, SEO architecture, and a way for non-technical staff to manage it.',
      bullets: [
        'No unified multilingual platform for 5 languages',
        'Missing SEO architecture (hreflang, JSON-LD, canonical)',
        'No admin system for product/model management',
        'Zero analytics or conversion tracking in place',
      ],
    },
    features: [
      { icon: 'grid', title: 'Custom Admin Dashboard', desc: 'CRUD for products, models, industries, articles, downloads, and multilingual content' },
      { icon: 'globe', title: 'Multilingual SEO', desc: 'hreflang, canonical tags, OG tags, and JSON-LD schema across 5 languages' },
      { icon: 'shield', title: 'Enterprise Security', desc: 'CSP, HSTS headers, reCAPTCHA integration, Cloudinary media handling' },
      { icon: 'chart', title: 'Analytics Stack', desc: 'GA4 + GTM with custom event tracking, conversion tracking, and performance dashboards' },
    ],
    story: 'DragLab needed to go from a fragmented web presence to a <em>production-grade multilingual platform</em>. I built the full-stack system from scratch — custom admin dashboard, dynamic product architecture with technical specs, and a structured <em>SEO foundation</em> that targets distributors and procurement teams across Europe, MENA, and North Africa. Every layer — from security headers to newsletter export tools — was built to serve real operational needs.',
    journey: [
      { phase: 'Architecture · Planning', title: 'System Design', desc: 'Designed the multilingual content model, routing structure, and admin permission layers before writing a single line.', done: true },
      { phase: 'Full-Stack Development', title: 'Platform Build', desc: 'Built Node.js/Express backend, EJS templating, MongoDB schemas, and all CRUD admin panels.', done: true },
      { phase: 'SEO · Analytics', title: 'Technical SEO & Tracking', desc: 'Implemented hreflang, JSON-LD, GA4 events, GTM triggers, and GSC integration.', done: true },
      { phase: 'Ongoing · Marketing', title: 'Growth & Iteration', desc: 'Running B2B campaigns, lead generation, and continuously improving the platform based on analytics data.', done: false },
    ],
    outcomes: [
      'Unified 5-language platform serving Europe, MENA, and North Africa markets',
      'Full admin dashboard enabling non-technical staff to manage all content',
      'SEO architecture driving organic visibility across multilingual markets',
      'GA4 + GTM stack providing full-funnel conversion visibility',
    ],
    brand: { name: 'DragLab', initials: 'DL', tagline: 'Precision Equipment · Global Reach' },
  },
  {
    id: 'techparadise',
    title: 'TechParadise — 3D E-Commerce Platform',
    subtitle: 'Full-Stack Developer · Graduation Project',
    eyebrow: 'E-Commerce · 3D · Full-Stack',
    description: 'A complete e-commerce system featuring 3D product visualization with 360-degree interaction, Stripe payments, multi-role auth, and a comprehensive admin dashboard.',
    url: '',
    year: '2024',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Three.js', 'Express.js'],
    challenge: {
      heading: 'The Challenge',
      body: 'Traditional e-commerce lacks the tactile feel of physical shopping. The goal was to bridge that gap with immersive 3D product visualization while building a fully functional, production-ready store.',
      bullets: [
        'Standard product images don\'t convey depth or detail',
        'Needed full checkout flow with real payment processing',
        'Multi-role system for customers, admins, and managers',
        'Complete order lifecycle management',
      ],
    },
    features: [
      { icon: 'cube', title: '3D Product Viewer', desc: '360-degree interactive product visualization with Three.js' },
      { icon: 'cart', title: 'Full Checkout Flow', desc: 'Stripe integration, dynamic cart, wishlist, and order management' },
      { icon: 'users', title: 'Multi-Role Auth', desc: 'Separate dashboards and permissions for customers and admins' },
      { icon: 'grid', title: 'Admin Dashboard', desc: 'Full product and order management with analytics overview' },
    ],
    story: 'Built as a graduation project, TechParadise pushed beyond a standard e-commerce template. The <em>3D visualization system</em> lets shoppers interact with products in a way flat images never could. Under the hood, a robust <em>multi-role auth system</em> and Stripe-powered checkout make it production-ready. Every feature — from wishlist to order tracking — was built end-to-end.',
    journey: [
      { phase: 'Research · Planning', title: 'Feature Scoping', desc: 'Defined the full feature set, data models, and 3D rendering approach.', done: true },
      { phase: 'Frontend · 3D', title: 'UI & 3D Integration', desc: 'Built React UI, integrated Three.js for 3D viewer, designed responsive layout.', done: true },
      { phase: 'Backend · Payments', title: 'API & Stripe', desc: 'Built REST API, auth system, Stripe checkout flow, and order management.', done: true },
      { phase: 'Testing · Submission', title: 'QA & Launch', desc: 'Tested all flows, fixed edge cases, and submitted as graduation project.', done: true },
    ],
    outcomes: [
      'Delivered a fully functional 3D e-commerce platform as graduation project',
      'Integrated Stripe with complete checkout, refund, and order lifecycle',
      'Built multi-role auth with separate admin and customer dashboards',
      '3D viewer reduced product ambiguity and improved engagement',
    ],
    brand: { name: 'TechParadise', initials: 'TP', tagline: 'Shop in Three Dimensions' },
  },
  {
    id: 'snowlex',
    title: 'snowLEX — AI Legal Tech Go-To-Market',
    subtitle: 'Growth & Marketing Manager',
    eyebrow: 'Marketing · GTM · Brand',
    description: 'First marketing hire at a pre-launch AI legal tech startup in Finland. Built the complete marketing function from scratch — GTM strategy, brand identity, HubSpot CRM, SEO, and distribution channels.',
    url: '',
    year: 'Mar 2026 – Present',
    tags: ['HubSpot', 'SEO', 'LinkedIn Ads', 'GTM Strategy', 'Brand Identity', 'Email Marketing'],
    challenge: {
      heading: 'The Challenge',
      body: 'A pre-launch AI legal tech startup needed a complete marketing function built from zero — no brand, no CRM, no channels, no strategy. Competing against Harvey AI, LexisNexis, and Thomson Reuters.',
      bullets: [
        'No marketing infrastructure existed — built from scratch',
        'Competing against well-funded legal research incumbents',
        'Target audience: Finnish legal professionals and academic institutions',
        'Need for user activation within 24 hours of sign-up',
      ],
    },
    features: [
      { icon: 'rocket', title: 'Go-To-Market Strategy', desc: 'Full GTM covering SEO, social, content, partnerships, email, and paid acquisition' },
      { icon: 'brand', title: 'Brand Identity', desc: 'Visual system, typography, tone of voice, and cross-channel marketing assets' },
      { icon: 'mail', title: 'HubSpot Automation', desc: 'CRM setup, lifecycle workflows, and 5-step onboarding sequence for activation' },
      { icon: 'search', title: 'SEO & Distribution', desc: 'Keyword research, competitive positioning, submitted to 18 AI and startup directories' },
    ],
    story: 'Joining snowLEX as the <em>first marketing hire</em> meant building everything from the ground up — brand, strategy, infrastructure, and channels. I implemented HubSpot (EU1) as the CRM backbone, designed the full visual identity, and developed a structured GTM strategy to reach <em>Finnish legal professionals and students</em>. Competitive research against Harvey AI and LexisNexis shaped our positioning and keyword strategy.',
    journey: [
      { phase: 'Audit · Research', title: 'Competitive Landscape', desc: 'Researched Harvey AI, LexisNexis, Thomson Reuters. Defined positioning and keyword gaps.', done: true },
      { phase: 'Brand · Identity', title: 'Brand System', desc: 'Designed visual identity, typography, tone of voice, and marketing asset templates.', done: true },
      { phase: 'CRM · Automation', title: 'HubSpot Implementation', desc: 'Set up HubSpot EU1, email templates, lifecycle workflows, and onboarding sequences.', done: true },
      { phase: 'Distribution · Growth', title: 'Channel Activation', desc: 'Submitting to directories, building LinkedIn presence, cold outreach A/B frameworks.', done: false },
    ],
    outcomes: [
      'Built the entire marketing function from zero at a pre-launch AI legal tech startup',
      'Implemented HubSpot with 5-step onboarding targeting activation within 24 hours',
      'Designed complete brand identity system used across all channels',
      'Submitted platform to 18 AI and startup directories for early distribution',
    ],
    brand: { name: 'snowLEX', initials: 'SL', tagline: 'AI Legal Research · Built for Professionals' },
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  await Project.deleteMany({})
  console.log('Cleared existing projects')

  await Project.insertMany(projects)
  console.log(`Seeded ${projects.length} projects`)

  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch((err) => { console.error(err); process.exit(1) })
