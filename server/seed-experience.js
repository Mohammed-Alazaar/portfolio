require('dotenv').config()
const mongoose = require('mongoose')
const Experience = require('./models/Experience')

const experiences = [
  {
    id: 'snowlex',
    company: 'snowLEX',
    role: 'Growth & Marketing Manager',
    period: 'Mar 2026 – Present',
    current: true,
    location: 'Helsinki, Finland · Remote',
    eyebrow: 'AI Legal Tech · Finland',
    headline: 'Building a complete marketing function from zero at a pre-launch AI legal startup.',
    description:
      'First marketing hire at a pre-launch AI legal tech startup in Finland. Built the complete marketing function from scratch — GTM strategy, brand identity, HubSpot CRM, SEO, and distribution channels.',
    about:
      'snowLEX is an AI-powered legal research platform targeting Finnish legal professionals and academic institutions. The product competes directly against established players like Harvey AI, LexisNexis, and Thomson Reuters in the legal tech space.',
    story:
      'Joining snowLEX as the <em>first marketing hire</em> meant building everything from the ground up — brand, strategy, infrastructure, and channels. No CRM, no brand guidelines, no analytics. I implemented HubSpot (EU1) as the CRM backbone, designed the full visual identity, and developed a structured GTM strategy targeting <em>Finnish legal professionals and students</em>. Competitive research against Harvey AI and LexisNexis shaped our positioning and keyword strategy. Within weeks, the platform was submitted to 18 AI and startup directories, the onboarding sequence was live, and the first LinkedIn campaigns were running.',
    tags: ['HubSpot CRM', 'GTM Strategy', 'Brand Identity', 'SEO', 'LinkedIn Ads', 'Email Automation', 'Figma', 'GA4'],
    responsibilities: [
      'Own the entire marketing function — strategy, execution, and reporting',
      'Built HubSpot EU1 CRM from scratch including lifecycle workflows and segmentation',
      'Designed visual identity system: logo, typography, colors, and brand guidelines',
      'Developed 5-step onboarding email sequence targeting 24-hour user activation',
      'Conducted competitive analysis against Harvey AI, LexisNexis, and Thomson Reuters',
      'Led keyword research and built SEO content strategy for Finnish legal market',
      'Submitted platform to 18 AI directories and startup listing sites',
      'Running LinkedIn organic and paid campaigns for B2B lead generation',
    ],
    contributions: [
      {
        icon: 'rocket',
        title: 'Go-To-Market Strategy',
        desc: 'Full GTM covering SEO, social, content, partnerships, email, and paid acquisition for the Finnish legal market',
      },
      {
        icon: 'brand',
        title: 'Brand Identity System',
        desc: 'Complete visual system — logo, typography, color palette, tone of voice, and all marketing asset templates',
      },
      {
        icon: 'mail',
        title: 'HubSpot Automation',
        desc: 'CRM setup with lifecycle workflows, lead scoring, and a 5-step onboarding sequence built for 24-hour activation',
      },
      {
        icon: 'search',
        title: 'SEO & Distribution',
        desc: 'Keyword strategy targeting Finnish legal professionals, submitted to 18 AI and startup directories for early traction',
      },
    ],
    outcomes: [
      'Built the entire marketing function from zero in under 30 days',
      'Implemented HubSpot EU1 CRM with full lifecycle automation',
      'Designed complete brand identity system used across all channels',
      'Submitted to 18 AI and startup directories for early organic distribution',
      '5-step onboarding sequence designed to activate users within 24 hours of sign-up',
    ],
    brand: {
      name: 'snowLEX',
      initials: 'SL',
      tagline: 'AI Legal Research · Built for Professionals',
      url: '',
    },
  },
  {
    id: 'draglab',
    company: 'DragLab',
    role: 'Full-Stack Developer & Marketing Technologist',
    period: '2024 – Present',
    current: true,
    location: 'Remote',
    eyebrow: 'B2B · Full-Stack · Marketing',
    headline: 'Architecting a multilingual production platform for a global lab equipment brand.',
    description:
      'Built and own a production-level multilingual platform (EN/DE/FR/ES/TR) serving lab equipment buyers across Europe, MENA, and North Africa — from architecture to go-to-market.',
    about:
      'DragLab is a laboratory equipment supplier targeting distributors, procurement managers, and research institutions across Europe, MENA, and North Africa. The business needed a scalable multilingual digital presence to compete in a highly technical B2B market.',
    story:
      'DragLab needed to go from a fragmented web presence to a <em>production-grade multilingual platform</em>. I built the full-stack system from scratch — custom admin dashboard, dynamic product architecture with technical specs, and a structured <em>SEO foundation</em> that targets distributors and procurement teams across 5 languages. Every layer — from CSP security headers to newsletter export tools and GA4 event tracking — was built to serve real operational needs. I also run the B2B marketing campaigns and lead generation, making this a <em>full-stack ownership role</em> across both engineering and growth.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'EJS', 'Cloudinary', 'GA4', 'GTM', 'Technical SEO', 'HubSpot'],
    responsibilities: [
      'Architected and built the entire platform from scratch using Node.js, Express, and MongoDB',
      'Developed a fully custom admin dashboard for managing products, models, industries, and multilingual content',
      'Implemented multilingual SEO (hreflang, JSON-LD, canonical) across 5 languages',
      'Integrated Cloudinary for media management and optimised asset delivery',
      'Built security layer: CSP headers, HSTS, reCAPTCHA, input sanitisation',
      'Set up GA4 + GTM with custom event tracking and conversion funnels',
      'Running B2B campaigns targeting procurement managers and lab distributors across Europe and MENA',
      'Manage ongoing SEO and content strategy to grow organic visibility',
    ],
    contributions: [
      {
        icon: 'grid',
        title: 'Custom Admin Dashboard',
        desc: 'Full CRUD for products, models, industries, articles, downloads, and multilingual content — no external CMS',
      },
      {
        icon: 'globe',
        title: 'Multilingual SEO Architecture',
        desc: 'hreflang, canonical tags, OG tags, and JSON-LD schema implemented across EN/DE/FR/ES/TR',
      },
      {
        icon: 'shield',
        title: 'Enterprise Security',
        desc: 'CSP, HSTS, reCAPTCHA integration, input sanitisation, and Cloudinary for secure media handling',
      },
      {
        icon: 'chart',
        title: 'Analytics & Growth Stack',
        desc: 'GA4 + GTM with custom event tracking, conversion funnels, and B2B campaign management',
      },
    ],
    outcomes: [
      'Unified 5-language platform serving Europe, MENA, and North Africa from a single codebase',
      'Full admin dashboard enabling non-technical staff to manage all content independently',
      'SEO architecture driving organic visibility across multilingual markets',
      'GA4 + GTM stack providing full-funnel visibility from landing to lead',
      'Production system handling B2B traffic with enterprise-grade security',
    ],
    brand: {
      name: 'DragLab',
      initials: 'DL',
      tagline: 'Precision Equipment · Global Reach',
      url: 'https://www.drag-lab.de/',
    },
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')
  await Experience.deleteMany({})
  console.log('Cleared existing experiences')
  await Experience.insertMany(experiences)
  console.log(`Seeded ${experiences.length} experiences`)
  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch((err) => { console.error(err); process.exit(1) })
