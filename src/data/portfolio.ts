export const profile = {
  name: 'Areeba Arshad',
  title: 'Frontend Engineer',
  tagline: 'React.js · Next.js · TypeScript',
  location: 'Lahore, Pakistan',
  email: 'areebaars1@gmail.com',
  github: 'https://github.com/areeba75',
  linkedin: 'https://www.linkedin.com/in/areeba-arshad-2b14b2315/',
  resumeUrl: '/Areeba_Arshad_Frontend-Developer(React).pdf',
  linkedinTitle: 'Frontend Engineer • React Developer • UI Enthusiast',
  linkedinFollowers: '500+',
  linkedinConnections: '500+',
  availableFor: 'Open to work',
  summary:
    'Frontend Engineer with 2+ years of experience building scalable, responsive, and high-performance web applications using React.js, Next.js, and TypeScript. Skilled in developing reusable component systems, integrating REST APIs, optimizing frontend performance, and translating product and UI/UX requirements into production-ready interfaces.',
  highlights: [
    'Reusable component systems & design systems',
    'REST APIs · TanStack Query · performance tuning',
    'RBAC, protected routing & secure access patterns',
    'SSR, ISR, lazy loading & code splitting',
    'Accessibility, responsive design & cross-browser QA',
  ],
}

export type ExperienceItem = {
  role: string
  company: string
  location: string
  employment: string
  period: string
  highlights: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Frontend Developer',
    company: 'Scraperrs',
    location: 'Lahore, Pakistan',
    employment: 'On-site · Full-time',
    period: 'Nov 2025 — Present',
    highlights: [
      'Built scalable apps with React, Next.js, TypeScript, Vue.js, and Nuxt.js',
      'Reusable UI components for consistency and faster delivery across projects',
      'Translated product requirements and UI/UX into responsive production interfaces',
      'Integrated REST APIs with TanStack Query for robust data handling',
      'Implemented RBAC and protected routing for secure access management',
      'Optimized performance via lazy loading, memoization, and code splitting',
    ],
  },
  {
    role: 'MERN Stack Developer',
    company: 'World-Wide Admission Hub (WWAH)',
    location: 'Lahore, Pakistan',
    employment: 'On-site · Full-time',
    period: 'Nov 2024 — Oct 2025',
    highlights: [
      'Built scalable features for an AI-powered admission platform using React.js, Next.js, and TypeScript',
      'Developed dashboards, auth flows, protected routes, and profile management systems',
      'Integrated REST APIs with caching and synchronization via React Query',
      'Improved application performance using SSR, ISR, lazy loading, and frontend optimization',
      'Delivered modular UI systems with component-based architecture',
      'Owned features end-to-end from development to deployment in an Agile environment',
    ],
  },
  {
    role: 'Frontend React Developer',
    company: 'North Rays Technologies',
    location: 'Lahore, Pakistan',
    employment: 'On-site · Full-time',
    period: 'Aug 2024 — Oct 2024',
    highlights: [
      'Built and maintained responsive business websites using React.js and TypeScript',
      'Developed reusable UI components with modern, performance-focused frontend architecture',
      'Collaborated on-site with teams to deliver polished client-facing web experiences',
      'Integrated REST APIs and ensured cross-browser compatibility across devices',
    ],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'AppsGenii Technologies',
    location: 'Lahore, Pakistan',
    employment: 'On-site · Internship',
    period: 'May 2024 — Jul 2024',
    highlights: [
      'Developed reusable UI components with React, JavaScript, and Tailwind CSS',
      'Built responsive, mobile-first interfaces following modern UI/UX practices',
      'Integrated frontend applications with backend APIs and improved user experience',
      'Contributed to component-based architecture and code maintainability',
    ],
  },
]

export const skillGroups = [
  {
    label: 'Frontend',
    skills: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3',
      'Vue.js',
      'Nuxt.js',
    ],
  },
  {
    label: 'State & Data',
    skills: [
      'Redux Toolkit',
      'Zustand',
      'Context API',
      'React Query',
      'TanStack Query',
    ],
  },
  {
    label: 'Styling & UI',
    skills: [
      'Tailwind CSS',
      'Material UI',
      'Bootstrap',
      'Sass',
      'PrimeReact',
    ],
  },
  {
    label: 'Backend & APIs',
    skills: [
      'REST APIs',
      'GraphQL',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Socket.IO',
    ],
  },
  {
    label: 'Concepts',
    skills: [
      'Responsive Design',
      'Accessibility',
      'Performance Optimization',
      'SEO',
      'RBAC',
      'SSR / ISR / SSG',
    ],
  },
  {
    label: 'Tools',
    skills: [
      'Git',
      'GitHub',
      'Vercel',
      'Netlify',
      'Postman',
      'Figma',
      'ESLint',
      'Prettier',
    ],
  },
]

export type Project = {
  title: string
  stack: string[]
  description: string
  gradient: string
  image?: string
  href?: string
  secondaryHref?: string
}

export const projects: Project[] = [
  {
    title: 'World Wide Admission Hub',
    stack: ['Next.js', 'TypeScript', 'React Query'],
    description:
      'AI-powered admission platform helping students apply to universities across multiple countries with eligibility checking, dashboards, authentication, and AI-assisted consultation features.',
    gradient: 'from-sky-500/20 to-cyan-500/10',
    image: '/wwah.png',
    href: 'https://wwah.ai/',
  },
  {
    title: 'Carflix',
    stack: ['Next.js', 'TypeScript'],
    description:
      'Vehicle marketplace platform with advanced search, filtering, responsive UI, and optimized frontend performance for browsing and discovering vehicles.',
    gradient: 'from-rose-500/20 to-orange-500/10',
    image: '/carflix.png',
    href: 'https://carflix.scraperrs.com/',
  },
  {
    title: 'Red Sea Mall',
    stack: ['Next.js', 'TypeScript', 'React'],
    description:
      'E-commerce mall platform with modern storefront experience, responsive layouts, and performance-focused frontend for online retail.',
    gradient: 'from-red-500/20 to-amber-500/10',
    image: '/redsea.png',
    href: 'https://redseamall.com/',
  },
  {
    title: 'Pucture Platform / Halagaty',
    stack: ['React.js', 'TypeScript', 'Next.js'],
    description:
      'Scalable frontend modules, reusable UI components, localization features, and responsive interfaces for digital platform experiences.',
    gradient: 'from-emerald-500/20 to-teal-500/10',
    image: '/jaldi.png',
    href: 'http://pucture-frontend.scraperrs.com/',
  },
  {
    title: 'Stylz',
    stack: ['React.js', 'TypeScript', 'REST APIs'],
    description:
      'Responsive frontend interfaces, API integrations, dashboard systems, and modern UI implementation for a SaaS-based styling platform.',
    gradient: 'from-violet-500/20 to-fuchsia-500/10',
    image: '/stylz.png',
    href: 'https://dev.stylz.me/',
  },
  {
    title: 'Pulsse',
    stack: ['React.js', 'TypeScript'],
    description:
      'Built and optimized frontend dashboards, authentication flows, and dynamic UI components for a production SaaS product with role-based access.',
    gradient: 'from-indigo-500/20 to-purple-500/10',
    image: '/pulse.png',
    href: 'https://pulsse.io/',
    secondaryHref: 'https://saas.pulsse.io/auth/login',
  },
  {
    title: 'Miguel Camarena Art Gallery',
    stack: ['React.js', 'TypeScript', 'E-commerce'],
    description:
      'Art gallery e-commerce website for original paintings and canvas prints — product catalog, collections, services, and a responsive shopping experience.',
    gradient: 'from-amber-500/20 to-orange-500/10',
    image: '/miguelcamerana.png',
    href: 'https://miguelcamarena.com/',
  },
  {
    title: 'Pakpreneurship',
    stack: ['Next.js', 'React.js', 'TypeScript'],
    description:
      'Startup platform for young entrepreneurs to launch ideas with mentorship, incubation programs, funding guidance, and step-by-step support from ideation to growth.',
    gradient: 'from-lime-500/20 to-green-500/10',
    image: '/pakpreneurship.png',
    href: 'https://pak-preneurships.vercel.app/',
  },
  {
    title: 'Halagaty',
    stack: ['React.js', 'Next.js', 'TypeScript'],
    description:
      'Fresh groceries and daily deals platform with responsive storefront UI, product discovery, and a modern retail-focused shopping experience.',
    gradient: 'from-green-500/20 to-emerald-500/10',
    image: '/halagaty.png',
    href: 'https://dev.halagaty.com/',
  },
]

export const education = {
  school: 'Superior University',
  degree: 'Bachelor of Science in Information Technology',
  location: 'Lahore, Pakistan',
  period: '2020 — 2024',
}

export const achievements = [
  {
    title: 'Hackathon Participant — Devsinc Devathon',
    description:
      'Competitive hackathon focused on innovative product development and collaborative problem-solving.',
    period: 'Aug 2024',
  },
  {
    title: '10Pearls SheTech Hackathon Participant',
    description:
      'Participated in SheTech hackathon focused on building innovative solutions and collaborative product development.',
    period: '2024',
  },
]

export const coreSkills = [
  { name: 'React.js', level: 95 },
  { name: 'Next.js', level: 92 },
  { name: 'TypeScript', level: 90 },
  { name: 'JavaScript', level: 93 },
  { name: 'Tailwind CSS', level: 88 },
  { name: 'Node.js', level: 78 },
]

export const testimonials = [
  {
    quote:
      'Areeba delivers production-ready interfaces with exceptional attention to performance, accessibility, and clean architecture.',
    author: 'Product Team',
    role: 'World-Wide Admission Hub',
  },
  {
    quote:
      'Reliable, fast, and detail-oriented — she consistently ships polished frontend features across complex SaaS dashboards.',
    author: 'Engineering Lead',
    role: 'Scraperrs',
  },
  {
    quote:
      'Strong React skills and great collaboration. She translates designs into responsive, maintainable UI systems effortlessly.',
    author: 'Design & Dev Team',
    role: 'North Rays Technologies',
  },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const roleCycle = [
  'Frontend Engineer',
  'React Developer',
  'UI Enthusiast',
] as const
