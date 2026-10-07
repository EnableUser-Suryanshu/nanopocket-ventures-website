/**
 * Approved website copy from the client brief (Feedback on Website V2, sections 8b/8c, 9b/9c, 14a).
 * Struck-through text in the brief has been excluded. Everything here is editable in the CMS.
 */
import { lexical } from './lexical'

export const LINKS = {
  investorLogin: 'https://app.ekwty.in/',
  investWithUs: 'https://nanopocketventures.decilehub.com/pacts?pid=6N0RoX8y',
  linkedin: 'https://www.linkedin.com/company/nanopocket-ventures/',
  rachnaLinkedin: 'https://www.linkedin.com/in/rachna-rangarajan-cfa-b508034/',
  maps: 'https://www.google.com/maps/place/WeWork/@19.2545524,72.9815177,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7bbc24ceb170f:0x9d553b6744f41109!8m2!3d19.2545524!4d72.9815177!16s%2Fg%2F11g4d1hqkh',
}

export const CATCHPHRASE_3 =
  'Small Bets. Superior Solutions. Accelerated Customer Adoption. Impact at Scale.'

const pitchCta = {
  label: 'Pitch To Us',
  href: '#pitch-to-us',
  newTab: false,
  variant: 'solid' as const,
}

export const SECTORS = [
  {
    name: 'Space Tech',
    category: 'Frontier technology',
    summary:
      'From launch and infrastructure to satellites, data and downstream applications — a value chain opening up to private, commercially driven Indian companies.',
    tags: ['Launch', 'Satellites', 'Space data', 'Downstream applications'],
    art: 'orbitRings',
    notes: [
      {
        label: 'Global opportunity',
        body: '$630B → $1.8T by 2035, driven by rapid commercialisation, falling costs & wider access to space technologies across the full value chain—from launch and infrastructure to satellites, data and downstream applications',
      },
      {
        label: 'India’s right to win',
        body: 'Frugal engineering + deep technical talent + indigenous space-grade materials & advanced manufacturing capabilities, combined with ~440 startups, growing capital and only ~2% of the global space economy, create conditions for Indian entrepreneurs to build globally competitive SpaceTech companies',
      },
      {
        label: 'Why now',
        body: 'Sector liberalisation in 2020 + Indian Space Policy 2023 + IN-SPACe + access to ISRO’s technology & infrastructure ecosystem are accelerating the shift from a predominantly government-led sector towards a private, commercially driven ecosystem',
      },
    ],
  },
  {
    name: 'Digital Transactions Fraud',
    category: 'Financial infrastructure',
    summary:
      'India’s digital payment scale is unmatched — and so is the cost of fraud to retail customers. The response infrastructure is evolving from reporting to prevention and restoration.',
    tags: ['UPI', 'Fraud prevention', 'Intervention', 'Recovery'],
    art: 'glassSeed',
    notes: [
      {
        label: 'Massive Scale',
        body: '2,366 Crore UPI transactions + ₹29.9 Lakh Crore value in July 2026 alone → ~76 Crore transactions/day + ~₹1 Lakh Crore/day → heading towards 100 Crore transactions/day + ~₹1.3 Lakh Crore/day',
      },
      {
        label: 'Rapidly Worsening Problem',
        body: '₹551 Crore reported fraud in 2021 → ₹22,495 Crore in 2025 → ~41x increase → ₹55,050 Crore cumulative fraud + 65.9 Lakh complaints (2021–25) → industry estimates of annual losses potentially approaching ₹1 Lakh Crore',
      },
      {
        label: 'Who Bears the Pain',
        body: 'Retail customers → financial loss + time + effort + mental distress of reporting, pursuing + recovering their money',
      },
      {
        label: 'Rapidly Evolving Intervention Infrastructure',
        body: '1930 / NCRP → CFCFRMS → Suspect Registry + MuleHunter.AI + IDPIC + Banks/FIs coordination + Money Restoration Module → fraud-response infrastructure evolving from reporting → intervention → prevention → restoration → ₹11,158 Crore saved + ₹25,698 Crore transactions declined (by June 2026)',
      },
      {
        label: 'Why Now',
        body: 'Massive digital transaction scale + escalating fraud + rapidly evolving intervention infrastructure + significant recovery gap → ₹56,087 Crore reported + ₹9,079 Crore lien-marked + ₹206 Crore refunded (FY23/24–FY25/26) → large opportunity to curb ₹ Crore losses to retail customers',
      },
    ],
  },
  { name: 'Manufacturing Tech', category: 'Industrial', art: 'pills', tags: [], notes: [] },
  {
    name: 'Wealth / Property Management',
    category: 'Financial services',
    art: 'coins',
    tags: [],
    notes: [],
  },
  { name: 'Cyber Security', category: 'Security', art: 'darkRings', tags: [], notes: [] },
  { name: 'Mobility Tech', category: 'Transport', art: 'ribbon', tags: [], notes: [] },
  {
    name: 'Surveillance Tech / Defence Tech',
    category: 'Security',
    art: 'monolith',
    tags: [],
    notes: [],
  },
  { name: 'Robotics', category: 'Automation', art: 'lattice', tags: [], notes: [] },
  {
    name: 'Clean Tech / Climate Tech',
    category: 'Sustainability',
    art: 'spheres',
    tags: [],
    notes: [],
  },
] as const

export const homeLayout = [
  {
    blockType: 'hero',
    blockName: 'Hero — tagline & photo wall',
    lineOne: 'Where Small Bets',
    highlight: 'Discover',
    lineTwo: 'India’s Big Tech.',
    subline: 'Backing breakthrough technologies from India to the world.',
    scrollLabel: 'Scroll down',
    inlineArt: 'glassSeed',
    visual: 'showcase',
    tiles: [
      { label: 'NanoPocket', meta: 'Brand', art: 'logo3d' },
      { label: 'Non-obvious insight', meta: 'Criteria', art: 'glassSeed' },
      { label: 'Scalable market', meta: 'Criteria', art: 'darkSpheres' },
      { label: 'Space Tech', meta: 'Sector', art: 'orbitRings' },
      { label: 'Mobility Tech', meta: 'Sector', art: 'ribbon' },
      { label: 'Technical clarity', meta: 'Criteria', art: 'darkRings' },
      { label: 'Post product-market fit', meta: 'Criteria', art: 'coins' },
      { label: 'India to the World', meta: 'Ambition', art: 'bannerGlobe' },
      { label: 'First mover', meta: 'Criteria', art: 'monolith' },
      { label: 'Small bets', meta: 'Brand', art: 'logoWhite' },
      { label: 'Small bets, big outcomes', meta: 'Brand', art: 'pills' },
      { label: 'Founder resilience', meta: 'Criteria', art: 'darkLogo' },
      { label: 'Robotics', meta: 'Sector', art: 'lattice' },
      { label: 'Clean Tech', meta: 'Sector', art: 'spheres' },
      { label: 'Global ambition', meta: 'Ambition', art: 'bannerGlobe' },
    ],
    origin: { label: 'Mumbai', lat: 19.076, lng: 72.8777 },
    destinations: [
      { label: 'San Francisco', lat: 37.7749, lng: -122.4194 },
      { label: 'London', lat: 51.5074, lng: -0.1278 },
      { label: 'Singapore', lat: 1.3521, lng: 103.8198 },
      { label: 'Tokyo', lat: 35.6762, lng: 139.6503 },
    ],
    anchorId: 'home',
    theme: 'white',
  },
  {
    blockType: 'statement',
    blockName: 'Statement — catchphrase card over moving tiles',
    lines: [
      { before: 'Small Bets.', inline: 'caption', after: 'Superior Solutions.' },
      { before: 'Accelerated', inline: 'arrow', after: 'Customer Adoption.' },
      { before: 'Impact', inline: 'button', after: 'at Scale.' },
    ],
    caption: 'India to the World',
    button: { label: 'Pitch To Us', href: '#pitch-to-us', newTab: false },
    tiles: [
      { label: 'NanoPocket', meta: 'Brand', art: 'logo3d' },
      { label: 'Non-obvious insight', meta: 'Criteria', art: 'glassSeed' },
      { label: 'Scalable market', meta: 'Criteria', art: 'darkSpheres' },
      { label: 'Space Tech', meta: 'Sector', art: 'orbitRings' },
      { label: 'Mobility Tech', meta: 'Sector', art: 'ribbon' },
      { label: 'Technical clarity', meta: 'Criteria', art: 'darkRings' },
      { label: 'Post product-market fit', meta: 'Criteria', art: 'coins' },
      { label: 'India to the World', meta: 'Ambition', art: 'bannerGlobe' },
      { label: 'First mover', meta: 'Criteria', art: 'monolith' },
      { label: 'Small bets', meta: 'Brand', art: 'logoWhite' },
      { label: 'Small bets, big outcomes', meta: 'Brand', art: 'pills' },
      { label: 'Founder resilience', meta: 'Criteria', art: 'darkLogo' },
      { label: 'Robotics', meta: 'Sector', art: 'lattice' },
      { label: 'Clean Tech', meta: 'Sector', art: 'spheres' },
      { label: 'Global ambition', meta: 'Ambition', art: 'bannerGlobe' },
    ],
    anchorId: 'statement',
    theme: 'white',
  },
  {
    blockType: 'about',
    blockName: 'Who We Are',
    eyebrow: 'About the fund',
    title: 'Who We Are',
    paragraphs: [
      {
        text: 'NanoPocket Ventures Fund is a Mumbai based SEBI Registered Cat 1 AIF – Angel Fund (IN/AIF1/26-27/2126) that focuses on investing in innovative Indian Start-ups offering superior products or solutions with a national or global adoption potential, at an early stage, preferably post product-market fit.',
      },
      {
        text: 'We are founder-first in our approach. We believe customer adoption is the key and AI/Tech/DeepTech/any other innovation is only the means to get there!',
      },
    ],
    facts: [
      { label: 'Structure', value: 'SEBI Registered Cat-I AIF (Angel Fund)' },
      { label: 'Registration', value: 'IN/AIF1/26-27/2126' },
      { label: 'Investment Manager', value: 'NanoPocket Ventures LLP' },
      { label: 'Based in', value: 'Mumbai, India' },
    ],
    art: 'darkLogo',
    imageCaption: 'Early Conviction. Deep Systems. Global Ambition.',
    anchorId: 'who-we-are',
    theme: 'white',
  },
  {
    blockType: 'criteria',
    blockName: 'What We Are Looking For',
    eyebrow: 'Investment criteria',
    title: 'What We Are Looking For',
    tagline: 'Signals before consensus.',
    ctas: [pitchCta],
    cardLabel: 'We look for',
    items: [
      {
        title: 'Non-obvious insight',
        description: 'Building something that users did not know they need.',
        art: 'glassSeed',
      },
      {
        title: 'Technical clarity',
        description: 'A clear technical edge, not only a market story.',
        art: 'darkRings',
      },
      {
        title: 'Preferably, post product-market fit',
        description:
          'Evidence that users already love your offering, rely on it and are willing to pay for it.',
        art: 'coins',
      },
      {
        title: 'Scalable market',
        description: 'Room for India-origin offering to travel nationally and/or globally.',
        art: 'darkSpheres',
      },
      {
        title: 'First mover with competitive advantage',
        description: 'Have unique features that are hard or will take time to copy.',
        art: 'monolith',
      },
      {
        title: 'Founder resilience',
        description:
          'Team at the helm have stamina & resilience to build through hard cycles keeping good head on their shoulders intact.',
        art: 'darkLogo',
      },
    ],
    anchorId: 'what-we-look-for',
    theme: 'light',
  },
  {
    blockType: 'thesis',
    blockName: 'Where Are We Investing',
    eyebrow: 'Investment thesis',
    title: 'Where Are We Investing',
    tagline:
      'Superior Capabilities. Superior Solutions. Accelerated Customer Adoption. First Mover. Impact at Scale.',
    pillars: [],
    facts: [
      { label: 'First Cheque Size', value: '₹1.5 Crores', note: 'c. $150K' },
      { label: 'Stage Focus', value: 'Post PMF', note: 'Preferably, post Product-Market Fit' },
    ],
    intro:
      'We are sector-agnostic and plan to make investments across high conviction themes, with a preliminary focus on the following sectors:',
    listTitle: 'Sectors',
    sectors: SECTORS.map((s) => ({
      name: s.name,
      category: s.category,
      summary: 'summary' in s ? s.summary : undefined,
      tags: s.tags.map((text) => ({ text })),
      notes: s.notes.map((n) => ({ ...n })),
      art: s.art,
    })),
    other: {
      title: 'Other high conviction themes',
      textBefore: 'For sectors not specifically covered above, please refer to',
      link: { label: 'What We Are Looking For', href: '#what-we-look-for', newTab: false },
      textAfter: 'section of this website to gauge if we will be interested.',
    },
    openLabel: 'Read the thesis',
    closeLabel: 'Close',
    pendingLabel: 'Detailed note coming soon',
    ctas: [pitchCta],
    anchorId: 'where-we-invest',
    theme: 'white',
  },
  {
    blockType: 'portfolio',
    blockName: 'Portfolio Highlights',
    eyebrow: 'Portfolio',
    title: 'Portfolio Highlights',
    highlights: [
      { value: 'Diversified', label: 'Portfolio' },
      { value: '10–12', label: 'Investments' },
      { value: 'High Conviction', label: 'Themes' },
    ],
    pillars: [
      {
        title: 'Concentrated conviction',
        body: 'We prefer fewer positions where founder quality, technical edge, and market timing can compound together.',
      },
      {
        title: 'Disciplined entry',
        body: 'Entry points stay measured so early conviction does not depend on consensus pricing.',
      },
      {
        title: 'Reserve depth',
        body: 'Follow-on capacity is reserved for companies that keep earning deeper ownership over time.',
      },
    ],
    showKeyNumbers: false,
    emptyValue: '—',
    numberGroups: [
      {
        title: 'Key Numbers — Fund',
        items: [
          { label: 'AUM ($Mn)' },
          { label: 'Start-ups Invested' },
          { label: 'Capital Raised ($Mn)' },
          { label: 'Follow-on Rounds | Debt | Non-Dilutive Grants' },
          { label: 'Got Acquired ($Mn)' },
        ],
      },
      {
        title: 'Key Numbers — Portfolio',
        items: [
          { label: 'Global Best-In-Class Solutions' },
          { label: 'Patents Filed' },
          { label: 'Talent' },
          { label: 'Returning Talent' },
          { label: 'Women Talent' },
        ],
      },
    ],
    showCompanies: true,
    companiesTitle: 'Work With Our Portfolio',
    emptyNote: 'Select investments will be disclosed after internal approval.',
    visitLabel: 'Visit',
    ctas: [pitchCta],
    anchorId: 'portfolio',
    theme: 'light',
  },
  {
    blockType: 'team',
    blockName: 'Team Responsible',
    eyebrow: 'People',
    title: 'Team Responsible',
    tagline: 'Founder First Focussed',
    marquee: [
      { text: 'Founder First' },
      { text: 'Early Conviction' },
      { text: 'Deep Systems' },
      { text: 'Global Ambition' },
    ],
    linkedinLabel: 'LinkedIn',
    anchorId: 'team',
    theme: 'white',
  },
  {
    blockType: 'posts',
    blockName: 'Our Insights',
    source: 'insights',
    eyebrow: 'Insights',
    title: 'Our Insights',
    limit: 6,
    readLabel: 'Read',
    emptyTitle: 'Our first insights are on their way.',
    emptyBody:
      'Notes on the technologies, founders and markets we study will be published here. Follow us on LinkedIn for updates in the meantime.',
    emptyLink: { label: 'Follow on LinkedIn', href: LINKS.linkedin, newTab: true },
    anchorId: 'insights',
    theme: 'white',
  },
  {
    blockType: 'posts',
    blockName: 'Us In News',
    source: 'press',
    eyebrow: 'Press',
    title: 'Us In News',
    limit: 6,
    readLabel: 'Read article',
    emptyTitle: 'News and announcements will appear here.',
    emptyBody:
      'Coverage of NanoPocket Ventures and our portfolio will be listed here as it is published.',
    emptyLink: { label: 'Follow on LinkedIn', href: LINKS.linkedin, newTab: true },
    anchorId: 'news',
    theme: 'light',
  },
  {
    blockType: 'pitch',
    blockName: 'Pitch To Us (questions: Settings → Pitch Form)',
    eyebrow: 'Founders',
    title: 'Pitch To Us',
    tagline: 'Send one clear signal.',
    intro:
      'Introduce your Startup with the essentials: spend a few minutes letting us know who you really are, what you are building, why now, early proof, and the vision behind it.',
    note: 'We will get in touch with those who meet our Investment Thesis as laid out in What We Are Looking For & Where Are We Investing sections of this website.',
    noteLinks: [
      { label: 'What We Are Looking For', href: '#what-we-look-for', newTab: false },
      { label: 'Where Are We Investing', href: '#where-we-invest', newTab: false },
    ],
    anchorId: 'pitch-to-us',
    theme: 'dark',
  },
  {
    blockType: 'contact',
    blockName: 'Reach Us (form fields: Settings → Enquiry Forms)',
    eyebrow: 'Contact',
    title: 'Reach Us',
    tagline: 'The right path.',
    intro: 'Investors, partners and press can send a concise note here.',
    accessTitle: 'Quick access',
    accessLinks: [
      {
        label: 'Invest With Us',
        href: LINKS.investWithUs,
        newTab: true,
        description: 'Participate in the fund',
      },
      {
        label: 'Investor Login',
        href: LINKS.investorLogin,
        newTab: true,
        description: 'Existing investor portal',
      },
      { label: 'LinkedIn', href: LINKS.linkedin, newTab: true, description: 'News & updates' },
    ],
    anchorId: 'reach-us',
    theme: 'white',
  },
]

export const siteSettings = {
  siteName: 'NanoPocket Ventures',
  metaTitle: 'NanoPocket Ventures | India DeepTech and AI Venture Fund',
  metaDescription:
    'NanoPocket Ventures Fund is a Mumbai based SEBI Registered Cat 1 AIF – Angel Fund investing early in innovative Indian start-ups with national or global adoption potential.',
  investorLoginUrl: LINKS.investorLogin,
  investWithUsUrl: LINKS.investWithUs,
  linkedinUrl: LINKS.linkedin,
}

export const header = {
  buttons: [
    { label: 'Investor Login', href: LINKS.investorLogin, newTab: true, showOnMobile: false },
    { label: 'Invest With Us', href: LINKS.investWithUs, newTab: true, showOnMobile: false },
    { label: 'Pitch To Us', href: '#pitch-to-us', newTab: false, showOnMobile: true },
  ],
  navItems: [
    { label: 'Home', href: '#home' },
    { label: 'Who We Are', href: '#who-we-are' },
    { label: 'What We Are Looking For', href: '#what-we-look-for' },
    { label: 'Where Are We Investing', href: '#where-we-invest' },
    { label: 'Portfolio Highlights', href: '#portfolio' },
    { label: 'Team Responsible', href: '#team' },
    { label: 'Our Insights', href: '#insights' },
    { label: 'Us In News', href: '#news' },
    { label: 'Pitch To Us', href: '#pitch-to-us' },
    { label: 'Reach Us', href: '#reach-us' },
  ],
  menuEyebrow: 'Navigate',
  menuAccessTitle: 'Access',
  menuNote: CATCHPHRASE_3,
}

export const footer = {
  tagline:
    'Investing early in NewGen Indian Start-ups & Founders that have the potential to become Big Tech',
  showButtons: true,
  localTime: { show: true, label: 'Mumbai, India', suffix: 'IST' },
  fund: {
    heading: 'Investor Relations',
    subheading: 'Fund Information',
    items: [
      { label: 'Fund Name', value: 'NanoPocket Ventures Fund' },
      {
        label: 'Fund Details',
        value: 'SEBI Registered Cat-1 AIF (Angel Fund): IN/AIF1/26-27/2126',
      },
      { label: 'Investment Manager', value: 'NanoPocket Ventures LLP' },
      { label: 'Investment Manager Details', value: 'LLPIN: ACQ-7342' },
    ],
  },
  navigate: {
    heading: 'Navigate',
    links: [
      { label: 'Who We Are', href: '#who-we-are' },
      { label: 'What We Are Looking For', href: '#what-we-look-for' },
      { label: 'Where Are We Investing', href: '#where-we-invest' },
      { label: 'Team Responsible', href: '#team' },
      { label: 'Portfolio Highlights', href: '#portfolio' },
      { label: 'Our Insights', href: '#insights' },
      { label: 'Us In News', href: '#news' },
    ],
  },
  access: {
    heading: 'Access',
    links: [
      { label: 'Pitch To Us', href: '#pitch-to-us' },
      { label: 'Invest With Us', href: LINKS.investWithUs, newTab: true },
      { label: 'Investor Login', href: LINKS.investorLogin, newTab: true },
      { label: 'Investor Queries', href: '#enquiry-investor' },
      { label: 'Partner With Us', href: '#enquiry-partner' },
      { label: 'Media Enquiries', href: '#enquiry-media' },
    ],
  },
  address: {
    heading: 'Registered Address',
    lines:
      'WeWork Zenia, Hiranandani Circle,\nHiranandani Business Park, Hiranandani Estate,\nThane 400607, Maharashtra, India',
    mapLabel: 'View on Google Maps',
    mapUrl: LINKS.maps,
    linkedinLabel: 'Follow on LinkedIn',
  },
  copyright: '© 2026 NanoPocket Ventures. All Rights Reserved.',
  centerText: CATCHPHRASE_3,
  legalLinks: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
  disclaimer:
    'NanoPocket Ventures Fund is registered with SEBI as a Category I Alternative Investment Fund (Angel Fund). Investments in AIFs carry risk, including the possible loss of capital. Nothing on this website is an offer, solicitation or investment advice. Please read the fund documents carefully before investing.',
  showWordmark: true,
}

export const pitchForm = {
  founder: {
    enabled: true,
    title: 'Who is applying',
    question: 'Are you a Founder or Co-founder?',
    yes: 'Yes',
    no: 'No',
    noMessage:
      'Thank you for your interest. This application is meant for founders and co-founders. For any other query, please write to us through the Reach Us section.',
    noLink: { label: 'Go to Reach Us', href: '#reach-us', newTab: false },
  },
  thesis: {
    enabled: true,
    title: 'Our thesis',
    question:
      'Have you gone through the following sections on our website - What We Are Looking For & Where Are We Investing?',
    yes: 'Yes',
    no: 'No',
    noMessage:
      'Thank you for your interest. May we request you to go through the following sections - What We Are Looking For & Where Are We Investing – first and come back here to complete your application?',
    links: [
      { label: 'What We Are Looking For', href: '#what-we-look-for', newTab: false },
      { label: 'Where Are We Investing', href: '#where-we-invest', newTab: false },
    ],
  },
  dpiit: {
    title: 'DPIIT recognition',
    question: 'Is your Startup registered with DPIIT (erstwhile DIPP)?',
    yes: 'Yes. I will share the DPIIT registration number or certificate link when we interact next',
    no: 'No',
    applied:
      'Applied for registration. I will share the DPIIT registration number or certificate link once we are registered.',
    planned:
      'Plan to register it in the near future. I will share the DPIIT registration number or certificate link once we are registered.',
    noMessage:
      'Thank you for your interest. However, NanoPocket Ventures can only invest in DPIIT recognised Startups. If you have applied and awaiting registration OR plan to get your Startup registered with DPIIT soon, please choose Option 3 or Option 4 to proceed further.',
  },
  startup: {
    title: 'Startup & founders',
    startupName: { label: 'Startup’s name', required: true },
    website: { label: 'Startup’s website', placeholder: 'https://', required: false },
    founderNames: { label: 'Founder & Co-founder’s name', required: true },
    email: { label: 'Founder or Co-founder’s e-mail', required: true },
    phone: { label: 'Founder or Co-founder’s contact number', required: false },
  },
  focus: {
    title: 'Sector & stage',
    sector: {
      label: 'Sector / Themes operating in (Select One)',
      required: true,
      options: [
        'Space Tech',
        'Digital Transactions Fraud',
        'Manufacturing Tech',
        'Wealth / Property Management',
        'Cyber Security',
        'Mobility Tech',
        'Surveillance Tech / Defence Tech',
        'Robotics',
        'Clean Tech/ Climate Tech',
        'Other high-conviction sector/theme',
      ].map((value) => ({ value })),
    },
    stage: {
      label: 'Growth Stage of your Startup (Select One)',
      required: true,
      options: [
        'Idea/POC/Prototype (Pre MVP)',
        'Post MVP but Pre-Product-Market Fit',
        'Post Product-Market Fit but Pre-Revenue',
        'Early Revenue',
        'Early Post Revenue',
      ].map((value) => ({ value })),
    },
  },
  story: {
    title: 'Vision & edge',
    vision: { label: 'What is your vision for the business?', required: true },
    superiority: {
      label: 'How is your product/solution/service superior to the existing alternatives?',
      required: true,
    },
  },
  proof: {
    title: 'Early proof',
    traction: {
      label:
        'Have you found users of your product/solution/service? If yes, what does the traction look like?',
      required: true,
    },
    willingnessToPay: {
      label: 'Why are these users paying or willing to pay for your product/solution/service?',
      required: false,
    },
  },
  market: {
    title: 'Market & moat',
    market: {
      label: 'How big is your target market and what is its growth potential?',
      required: true,
    },
    defensibility: {
      label:
        'When the product/solution/service gets traction, will the product/solution/service have unique features that are hard to copy? If yes, what are they?',
      required: false,
    },
  },
  plan: {
    title: 'Building to scale',
    buildPlan: {
      label:
        'How do you plan to get the team, knowledge and capital to build & scale this product/solution/service?',
      required: true,
    },
  },
  deck: {
    title: 'Deck & consent',
    label: 'Pitch Deck',
    help: 'Maximum 25MB. Your deck stays private.',
    maxSizeMB: 25,
    required: true,
    browseLabel: 'Choose a file',
    dropLabel: 'or drag and drop it here',
    replaceLabel: 'Replace file',
    formatsNote: 'PDF, PPT, PPTX or Keynote',
    consentHeading: 'Consent and submission',
    consentLabel:
      'I consent to NanoPocket Ventures storing this submission and reviewing it with relevant team members and advisors.',
  },
  successTitle: 'Signal received.',
  successBody:
    'Thank you for introducing your Startup. We will get in touch with those who meet our Investment Thesis.',
}

const consent = 'I agree to NanoPocket Ventures storing these details to respond to my enquiry.'

export const enquiryForms = {
  tabsLabel: 'Choose an enquiry type',
  forms: [
    {
      key: 'investor',
      tabLabel: 'Investor Queries',
      intro: 'Questions about the fund from prospective or existing investors.',
      fields: [
        { name: 'name', label: 'Full name', type: 'text', required: true, width: 'half' },
        { name: 'email', label: 'E-mail', type: 'email', required: true, width: 'half' },
        { name: 'phone', label: 'Phone', type: 'tel', required: false, width: 'half' },
        {
          name: 'organisation',
          label: 'Organisation',
          type: 'text',
          required: false,
          width: 'half',
        },
        {
          name: 'message',
          label: 'How can we help?',
          type: 'textarea',
          required: true,
          width: 'full',
        },
      ],
      consentLabel: consent,
      submitLabel: 'Send query',
      successMessage: 'Thank you — we will be in touch.',
    },
    {
      key: 'partner',
      tabLabel: 'Partner With Us',
      intro: 'Co-investors, ecosystem builders and corporates who want to work together.',
      fields: [
        { name: 'name', label: 'Full name', type: 'text', required: true, width: 'half' },
        { name: 'email', label: 'E-mail', type: 'email', required: true, width: 'half' },
        {
          name: 'organisation',
          label: 'Organisation',
          type: 'text',
          required: true,
          width: 'half',
        },
        {
          name: 'partnership',
          label: 'Type of partnership',
          type: 'select',
          required: true,
          width: 'half',
          options: [
            'Co-investment',
            'Accelerator / Incubator',
            'Corporate',
            'Ecosystem / Community',
            'Service provider',
            'Other',
          ].map((value) => ({ value })),
        },
        {
          name: 'message',
          label: 'Tell us about the opportunity',
          type: 'textarea',
          required: true,
          width: 'full',
        },
      ],
      consentLabel: consent,
      submitLabel: 'Send proposal',
      successMessage: 'Thank you — we will be in touch.',
    },
    {
      key: 'media',
      tabLabel: 'Media Enquiries',
      intro: 'Journalists and editors looking for comment, data or interviews.',
      fields: [
        { name: 'name', label: 'Full name', type: 'text', required: true, width: 'half' },
        { name: 'email', label: 'E-mail', type: 'email', required: true, width: 'half' },
        {
          name: 'outlet',
          label: 'Publication / outlet',
          type: 'text',
          required: true,
          width: 'half',
        },
        { name: 'deadline', label: 'Deadline', type: 'text', required: false, width: 'half' },
        { name: 'message', label: 'Your request', type: 'textarea', required: true, width: 'full' },
      ],
      consentLabel: consent,
      submitLabel: 'Send request',
      successMessage: 'Thank you — we will be in touch.',
    },
  ],
}

export const legalPages = [
  {
    title: 'Privacy',
    slug: 'privacy',
    content: lexical([
      { p: 'Last updated: October 2026. This page is being finalised with our legal counsel.' },
      { h2: 'What we collect' },
      {
        p: 'We only collect the information you choose to send through the forms on this website — such as your name, e-mail address, phone number, startup details and pitch deck.',
      },
      { h2: 'How we use it' },
      {
        p: 'Submissions are used solely to evaluate and respond to your application or enquiry. They are reviewed by the NanoPocket Ventures team and, where relevant, its advisors.',
      },
      { h2: 'How it is stored' },
      {
        p: 'Submissions and pitch decks are stored privately and are accessible only to authorised members of the team. Pitch decks are never publicly available.',
      },
      { h2: 'Your choices' },
      {
        p: 'You may ask us to update or delete your information at any time by writing to us through the Reach Us section.',
      },
    ]),
  },
  {
    title: 'Terms',
    slug: 'terms',
    content: lexical([
      { p: 'Last updated: October 2026. This page is being finalised with our legal counsel.' },
      { h2: 'Information only' },
      {
        p: 'The content of this website is for general information. It does not constitute an offer, solicitation or recommendation to buy or sell any security or to participate in any fund.',
      },
      { h2: 'Regulatory status' },
      {
        p: 'NanoPocket Ventures Fund is a SEBI Registered Category I Alternative Investment Fund (Angel Fund), registration number IN/AIF1/26-27/2126. The Investment Manager is NanoPocket Ventures LLP (LLPIN: ACQ-7342).',
      },
      { h2: 'Intellectual property' },
      {
        p: 'The NanoPocket Ventures name, logo and website content may not be reproduced without permission.',
      },
    ]),
  },
]
