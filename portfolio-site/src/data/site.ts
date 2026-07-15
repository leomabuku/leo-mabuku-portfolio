export const profile = {
  name: 'Leo Mabuku',
  title: 'Software Developer, Computer Science Student & Entrepreneur',
  shortTitle: 'Software Developer · Computer Science Student · Entrepreneur',
  location: 'Kitwe, Copperbelt, Zambia',
  email: 'leokmabuku@gmail.com',
  phone: '+260770464736',
  github: 'https://github.com/leomabuku',
  linkedin: 'https://www.linkedin.com/in/leo-mabuku-7a2645330/',
  avatar: '/leo-mabuku-portrait.png',
  intro: 'I analyse real problems and turn them into practical software systems across web, Android and systems development.',
  availability: 'Open to graduate software roles, internships, freelance projects, remote work, local business systems, startup partnerships and technical collaborations.',
};

export const skillGroups = [
  { title: 'Programming languages', items: ['C', 'C++', 'Python', 'Java', 'Kotlin', 'JavaScript', 'HTML', 'CSS', 'SQL'] },
  { title: 'Application development', items: ['Android Studio', 'Jetpack Compose', 'XML layouts', 'Tkinter', 'Node.js', 'Express', 'Material Design'] },
  { title: 'Data, testing & delivery', items: ['Room / SQLite', 'PostgreSQL', 'Firebase', 'Git & GitHub', 'Pytest', 'Cloudflare Pages'] },
  { title: 'Technical practice', items: ['Problem decomposition', 'Debugging', 'Automated testing', 'Interpreter development', 'Systems programming', 'Technical documentation'] },
];

export const education = [
  {
    qualification: 'Bachelor of Science in Computer Science',
    institution: 'The Copperbelt University',
    location: 'Kitwe, Zambia',
    period: '2023–2026',
    detail: 'Fourth-year student. Entered through a special academic calendar beginning on 8 May 2023 before joining the mainstream calendar in January 2024.',
  },
  {
    qualification: 'Senior Secondary Certificate',
    institution: 'St. Raphael’s Secondary School',
    location: 'Livingstone, Zambia',
    period: '2019–2021',
    detail: 'Completed senior secondary education after earning the Junior Secondary Certificate at the same school in 2018.',
  },
];

export const experience = [
  {
    title: 'Founder · Network Service Operator',
    organisation: 'Starlink Internet Service',
    location: 'Kopa Street, Kitwe',
    period: 'Feb 2026–Present',
    summary: 'Launched and operate a Starlink-powered internet service covering a boarding house and approximately 30 metres beyond the property, currently serving 29 subscribers.',
    bullets: ['Configured Starlink Mini and ARRIS SURFboard Max W121 mesh equipment.', 'Manage subscriber onboarding, payments, subscription periods and connectivity support.', 'Turned the operation’s record-management needs into the SubTrack BH Android product.'],
  },
  {
    title: 'Founder · Sales & Operations',
    organisation: 'Leo M. Suppliers',
    location: 'Livingstone, Zambia',
    period: 'Feb 2022–Present',
    summary: 'Started as a field-based fleece blanket business, registered with PACRA in June 2022 and opened a shop at Plot 98, John Hunt Way on 14 September 2022.',
    bullets: ['Handled sales, procurement, stock decisions, customer relationships, online marketing and deliveries.', 'Helped move the business from field selling to formal retail operations.', 'Adapted the product model from clothing and bedding to furniture and learned furniture assembly.'],
  },
  {
    title: 'Independent Technical Support',
    organisation: 'Computer Repair & Software Assistance',
    location: 'Zambia',
    period: 'Since first year',
    summary: 'Provide paid diagnostics, troubleshooting, repair and technical guidance for computer hardware, software and student programming projects.',
    bullets: ['Diagnose operating-system, driver, storage, memory, Wi-Fi and performance issues.', 'Replace repairable components and perform soldering where appropriate.', 'Provide programming tutoring, debugging and project customisation without misrepresenting assessed work.'],
  },
];

export const qualities = [
  ['Problem analysis', 'I examine the wider system behind a problem instead of treating only the visible symptom.'],
  ['Fast learning', 'I learn unfamiliar technologies as projects demand them and apply the knowledge through implementation.'],
  ['Independent learning', 'My technical development is driven by research, experimentation, testing and troubleshooting.'],
  ['Entrepreneurship', 'I have built, registered, operated and adapted real business ventures.'],
  ['Adaptability', 'I adjust technical and business plans when operating conditions or requirements change.'],
  ['Customer awareness', 'Business experience keeps my software focused on real users, constraints and practical value.'],
];

export type Project = {
  slug: string;
  name: string;
  shortDescription: string;
  category: string[];
  type: string;
  status: string;
  year: string;
  featured: boolean;
  role: string;
  technologies: string[];
  repository: string | null;
  repositoryVisibility: 'public' | 'private';
  liveDemo: string | null;
  cover: string | null;
  coverAlt: string;
  problem: string;
  solution: string;
  contributions: string[];
  features: string[];
  challenges: { title: string; description: string }[];
  lessons: string[];
  plannedFeatures: string[];
  evidence: string;
};

export const projects: Project[] = [
  {
    slug: 'tongalang',
    name: 'TongaLang',
    shortDescription: 'An educational interpreted programming language using Tonga-based keywords and a desktop IDE.',
    category: ['Programming Language', 'Educational Software', 'Python'],
    type: 'Final-year Computer Science project',
    status: 'Active development',
    year: '2025–2026',
    featured: true,
    role: 'Developer & Researcher',
    technologies: ['Python', 'PLY', 'Tkinter', 'Pytest', 'AST', '.tg files'],
    repository: null,
    repositoryVisibility: 'private',
    liveDemo: null,
    cover: null,
    coverAlt: '',
    problem: 'Beginner programmers may need to learn programming concepts and interpret unfamiliar English syntax at the same time, adding linguistic and cognitive load.',
    solution: 'TongaLang explores introductory programming through Tonga-based keywords while preserving familiar computational concepts. It is an educational language, not a replacement for mainstream production languages.',
    contributions: ['Researched minimal languages and interpreter construction before implementation.', 'Mapped programming concepts into Tonga through linguistic research and consultation with native speakers.', 'Built a terminal interpreter, then separated the language engine from a Tkinter IDE-style interface.', 'Created automated tests and deliberately invalid programs to test failure behaviour.'],
    features: ['Custom lexer and parser', 'Abstract Syntax Tree and interpreter', 'Variables, arithmetic and Boolean logic', 'Conditions and multiple loop structures', 'Functions, scope and break statements', 'Input, output and explicit type conversion', 'Bilingual Tonga and English errors', 'Syntax highlighting and debug tools', '.tg file support', 'Pytest regression suites'],
    challenges: [
      { title: 'Useful bilingual errors', description: 'Lexical, syntax and runtime failures needed controlled feedback that preserved technical meaning without exposing raw Python exceptions.' },
      { title: 'Graphical program input', description: 'Moving from terminal input to Tkinter required execution state to pause and resume without freezing the interface event loop.' },
      { title: 'Growing without regressions', description: 'Each feature could affect tokens, grammar, AST nodes, runtime behaviour, highlighting and existing programs, so changes were mapped across every layer and regression-tested.' },
    ],
    lessons: ['Compiler and interpreter fundamentals', 'Grammar and AST design', 'Runtime environments and scope', 'GUI integration', 'Automated and adversarial testing', 'Educational language design'],
    plannedFeatures: ['Continued IDE polish', 'Expanded learning examples and documentation'],
    evidence: 'Private repository inspected locally: lexer, parser, AST, interpreter, bilingual-error modules and automated tests are present.',
  },
  {
    slug: 'subtrack-bh',
    name: 'SubTrack BH',
    shortDescription: 'A local-first Android workspace for operating a boarding-house internet subscription service.',
    category: ['Android', 'Business Tools', 'Networking'],
    type: 'Live-operation product',
    status: 'Active development · Live operation',
    year: '2026',
    featured: true,
    role: 'Founder & Lead Developer',
    technologies: ['Kotlin', 'Jetpack Compose', 'Room', 'Firebase', 'WorkManager', 'Ktor'],
    repository: null,
    repositoryVisibility: 'private',
    liveDemo: null,
    cover: '/images/projects/subtrack-bh/logo.png',
    coverAlt: 'SubTrack BH internet subscription manager logo',
    problem: 'Subscriber names, packages, payments, expiry dates, balances and reconnections become unreliable when managed through memory, messages or separate records.',
    solution: 'SubTrack BH centralises the administration of Leo’s active Starlink service, which currently serves 29 subscribers. Room is the local source of truth, with Firebase services supporting the project’s remote-service direction.',
    contributions: ['Modelled subscribers, rooms, plans, devices, payments, expenses, reminders and subscription windows.', 'Separated the admin and subscriber experiences into distinct Android applications.', 'Added accounting, reporting, backup, PDF and sync-oriented foundations.', 'Designed the product around the actual workflow of operating the service.'],
    features: ['Admin and subscriber Android apps', 'Local Room persistence', 'Subscriber, plan and device records', 'Payment and subscription-window management', 'Reminders, reports, backups and PDF utilities', 'Firebase authentication and remote-service foundations', 'WorkManager background operations', 'PIN security and failed-attempt lockout'],
    challenges: [
      { title: 'Consistent account state', description: 'Payments, package duration, balances, expiry and reconnection rules must agree across screens instead of relying on a manually edited status label.' },
      { title: 'Admin/subscriber boundaries', description: 'The subscriber app must expose only account-safe, read-oriented functions while financial writes and business controls remain in the admin app.' },
      { title: 'Offline-first financial records', description: 'Local operation is essential during connectivity problems, while future synchronisation must avoid duplicate or conflicting financial records.' },
    ],
    lessons: ['Local-first Android architecture', 'Business-rule modelling', 'Room persistence', 'App boundary and permission design', 'Operational product development'],
    plannedFeatures: ['Production Lenco payment integration', 'Provider webhook verification', 'Complete subscriber invoices and payment history', 'Expanded closing, reconciliation and asset-management interfaces'],
    evidence: 'Private workspace inspected locally. Provider payments remain placeholders and are not presented as working.',
  },
  {
    slug: 'cbu-find',
    name: 'CBU-FIND',
    shortDescription: 'A native Android lost-and-found experience for Copperbelt University students.',
    category: ['Android', 'Campus Utility', 'Firebase'],
    type: 'Campus product prototype',
    status: 'Active development',
    year: '2026',
    featured: true,
    role: 'Android Developer',
    technologies: ['Kotlin', 'Jetpack Compose', 'Material 3', 'Firebase', 'Cloudinary', 'Coil'],
    repository: 'https://github.com/leomabuku/CBU-FIND',
    repositoryVisibility: 'public',
    liveDemo: null,
    cover: '/images/projects/cbu-find/home-report.png',
    coverAlt: 'CBU-FIND Android home screen showing a lost-item report',
    problem: 'Lost-property information shared through chats, noticeboards and word of mouth is fragmented, difficult to search and easy to miss.',
    solution: 'CBU-FIND creates a photo-led central record where students can publish and search lost or found items using categories, campus locations and status filters.',
    contributions: ['Built the native Android interface with Jetpack Compose and Material 3.', 'Implemented authentication, student profiles and live Firestore-backed report feeds.', 'Added Cloudinary photo uploads, search, filters and location reference suggestions.', 'Documented Firebase, security and UX testing requirements.'],
    features: ['Email/password and Google authentication', 'Student profiles', 'Lost and found reports', 'Photo uploads', 'Search and category filters', 'Campus location labels and nearby suggestions', 'Ownership and returned-status tracking', 'Light and dark themes'],
    challenges: [{ title: 'Useful locations without a map', description: 'The app combines manual place search, custom campus labels and nearby reference suggestions without publishing a user’s live position.' }],
    lessons: ['Compose UI architecture', 'Firebase data flows', 'Cloud image uploads', 'Location-aware UX', 'Security-rule planning'],
    plannedFeatures: ['In-app claims and chat', 'Notifications', 'Administrator moderation'],
    evidence: 'Public repository and README verified on 15 July 2026.',
  },
  {
    slug: 'zamtrivia',
    name: 'ZamTrivia',
    shortDescription: 'A Zambia-focused Android quiz with timed play, category selection and local leaderboards.',
    category: ['Android', 'Educational Game', 'Kotlin'],
    type: 'Personal Android project',
    status: 'Completed prototype',
    year: '2026',
    featured: true,
    role: 'Android Developer',
    technologies: ['Kotlin', 'XML layouts', 'ViewBinding', 'ViewModel', 'LiveData', 'SharedPreferences'],
    repository: 'https://github.com/leomabuku/ZamTrivia1',
    repositoryVisibility: 'public',
    liveDemo: null,
    cover: '/images/projects/zamtrivia/cover.png',
    coverAlt: 'Dark ZamTrivia app artwork',
    problem: 'Many quiz applications centre generic international content rather than knowledge that feels locally relevant to Zambian players.',
    solution: 'ZamTrivia packages Zambia-focused questions across ten categories with random play, timed answers, score calculation and a device-local leaderboard.',
    contributions: ['Created category and random quiz modes.', 'Implemented timer, scoring, answer feedback, skipping and skipped-question review.', 'Stored leaderboard entries locally with SharedPreferences.', 'Structured packaged questions as JSON and separated UI state through ViewModels.'],
    features: ['Ten Zambia-focused categories', 'Random and category modes', 'Timed questions', 'Attempt and scoring rules', 'Skip and retry flow', 'Correct/incorrect feedback', 'Results screen', 'Local leaderboard'],
    challenges: [{ title: 'Quiz state across many paths', description: 'Timer expiry, incorrect attempts, skips and replaying skipped questions all needed to advance consistently without losing the final score.' }],
    lessons: ['Android fragments and lifecycle', 'ViewModel state', 'Local persistence', 'Timer-driven UX', 'Structured content modelling'],
    plannedFeatures: [],
    evidence: 'Public Kotlin source verified: ViewBinding, ViewModels, timer logic, category data, skip flow and SharedPreferences leaderboard are present.',
  },
  {
    slug: 'serc-mini-os',
    name: 'SERC Mini-OS',
    shortDescription: 'A C-based Smart Emergency Response Center simulator for core operating-system concepts.',
    category: ['Systems', 'C', 'Academic'],
    type: 'Operating-systems assignment',
    status: 'Completed academic project',
    year: '2026',
    featured: true,
    role: 'Systems Developer',
    technologies: ['C', 'Raylib', 'Win32', 'GCC', 'Make'],
    repository: 'https://github.com/leomabuku/SERC-Mini-OS-system',
    repositoryVisibility: 'public',
    liveDemo: null,
    cover: null,
    coverAlt: '',
    problem: 'Operating-system algorithms are difficult to understand when scheduling, allocation and resource state remain abstract.',
    solution: 'The simulator makes process management, CPU scheduling, memory allocation, IPC and deadlock safety visible through console and graphical interfaces.',
    contributions: ['Implemented process creation, suspension, resumption and termination.', 'Added FCFS, SJF, Priority and Round Robin scheduling with comparison metrics and persistent Gantt data.', 'Modelled contiguous allocation, paging, IPC and Banker’s Algorithm-style safety checks.', 'Built console, Raylib dashboard and regression-test targets.'],
    features: ['PCB process state', 'Four scheduling algorithms', 'Waiting and turnaround metrics', 'Gantt data and replay', 'First/Best/Worst Fit allocation', 'Paging', 'Message-passing IPC', 'Deadlock safety validation', 'File reports and logs', 'Regression tests'],
    challenges: [{ title: 'Compare without mutating live state', description: 'Scheduler comparison needed to compute multiple outcomes while preserving the active process table and saved Gantt result.' }],
    lessons: ['Scheduling algorithms', 'Memory-management models', 'IPC and resource safety', 'C modularisation', 'Algorithm visualisation'],
    plannedFeatures: [],
    evidence: 'Canonical public repository selected; the older private duplicate is excluded.',
  },
  {
    slug: 'lifeharmonytracker',
    name: 'LifeHarmonyTracker',
    shortDescription: 'A personal productivity prototype combining calendar, focus, finance and screen-time tools.',
    category: ['JavaScript', 'Productivity', 'Prototype'],
    type: 'Supporting personal project',
    status: 'Prototype',
    year: '2025',
    featured: false,
    role: 'Product Developer',
    technologies: ['JavaScript', 'React Native', 'Python backend'],
    repository: 'https://github.com/leomabuku/LifeHarmonyTracker',
    repositoryVisibility: 'public',
    liveDemo: null,
    cover: null,
    coverAlt: '',
    problem: 'Daily planning, focus, spending and screen-time information often live in disconnected tools.',
    solution: 'A prototype workspace exploring how those personal-management activities could share one interface.',
    contributions: ['Developed calendar, focus, finance, notification and screen-time modules.', 'Explored a React Native mobile interface and supporting backend structure.'],
    features: ['Dashboard', 'Calendar', 'Focus timer', 'Expense tracking', 'Notifications', 'Screen-time views'],
    challenges: [],
    lessons: ['Feature decomposition', 'Mobile navigation', 'Product scope management'],
    plannedFeatures: ['Consolidate duplicate mobile experiments', 'Define a stable release scope'],
    evidence: 'Public repository contains React Native screens, services and a Python backend folder.',
  },
  {
    slug: 'portfolio-website',
    name: 'Portfolio Website',
    shortDescription: 'This responsive, content-driven portfolio deployed through Cloudflare Pages.',
    category: ['Web', 'Astro', 'Personal Brand'],
    type: 'Live web project',
    status: 'Live',
    year: '2026',
    featured: false,
    role: 'Designer & Developer',
    technologies: ['Astro', 'TypeScript', 'CSS', 'GitHub Actions', 'Cloudflare Pages'],
    repository: 'https://github.com/leomabuku/leo-mabuku-portfolio',
    repositoryVisibility: 'public',
    liveDemo: 'https://leo-mabuku-portfolio.pages.dev',
    cover: '/leo-mabuku-portrait.png',
    coverAlt: 'Black-and-white portrait used in Leo Mabuku’s portfolio',
    problem: 'A repository list alone does not communicate technical decisions, entrepreneurial experience or professional direction.',
    solution: 'A structured portfolio that presents verified project evidence, case studies, experience and contact paths through a distinctive editorial identity.',
    contributions: ['Designed the content model and multi-page information architecture.', 'Implemented responsive pages, metadata, accessibility support and automated repository refresh.', 'Deployed through GitHub and Cloudflare Pages.'],
    features: ['Responsive multi-page site', 'Structured project case studies', 'SEO and structured data', 'Automated GitHub refresh', 'Reduced-motion support'],
    challenges: [],
    lessons: ['Portfolio storytelling', 'Astro content architecture', 'Responsive editorial design', 'Static deployment'],
    plannedFeatures: ['Custom domain', 'Final PDF resume', 'Additional verified project screenshots'],
    evidence: 'Public repository and live deployment.',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const whatsappUrl = `https://wa.me/${profile.phone.replace('+', '')}?text=${encodeURIComponent('Hello Leo, I found your portfolio and would like to discuss a software, employment or collaboration opportunity.')}`;
