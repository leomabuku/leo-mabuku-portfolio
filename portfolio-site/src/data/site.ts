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
  { title: 'Technical practice', items: ['Problem decomposition', 'Debugging', 'Automated testing', 'Interpreter development', 'Systems programming', 'Networking fundamentals', 'Hardware diagnostics & repair', 'Component replacement & soldering', 'Technical documentation'] },
];

export const certifications = [
  { name: 'Prompt Engineering for Everyone', issuer: 'IBM Skills Network / Cognitive Class', period: 'Oct 2025' },
  { name: 'Data Analytics Traineeship', issuer: 'MedTourEasy', period: 'Sep 2025' },
  { name: 'Marketing & Sales · Money Skills · Entrepreneurial Skills', issuer: 'Absa Skills', period: 'Business courses' },
];

export const education = [
  {
    qualification: 'Bachelor of Science in Computer Science',
    institution: 'The Copperbelt University',
    location: 'Kitwe, Zambia',
    period: '2023–Present',
    detail: 'Fourth-year student with expected programme completion in September 2026. Entered through a special academic calendar beginning on 8 May 2023 before joining the mainstream calendar in January 2024.',
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
    period: 'Feb 2022–Apr 2026',
    summary: 'Started as a field-based fleece blanket business, registered with PACRA in June 2022 and opened a shop at Plot 98, John Hunt Way on 14 September 2022. Operations closed in April 2026.',
    bullets: ['Handled sales, procurement, stock decisions, customer relationships, online marketing and deliveries.', 'Helped move the business from field selling to formal retail operations.', 'Adapted the product model from clothing and bedding to furniture and learned furniture assembly.'],
  },
  {
    title: 'Independent Software Development & Technical Tutoring',
    organisation: 'Self-employed',
    location: 'Zambia',
    period: '2024–Present',
    summary: 'Provide paid programming guidance, debugging, setup and feature customisation while helping learners understand project structure and code.',
    bullets: ['Explain programming concepts and software structure.', 'Troubleshoot build, configuration and implementation problems.', 'Support project customisation without misrepresenting assessed work.'],
  },
  {
    title: 'Data Analytics Trainee',
    organisation: 'MedTourEasy',
    location: 'Remote',
    period: 'Sep 2025',
    summary: 'Completed a four-week training programme and live analytics project.',
    bullets: ['Applied structured analysis to a practical project.', 'Worked with professional confidentiality expectations and guided training modules.'],
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
  repositoryLabel?: string;
  additionalRepositories?: { label: string; url: string }[];
  repositoryVisibility: 'public' | 'private';
  liveDemo: string | null;
  cover: string | null;
  coverAlt: string;
  updatedOn?: string;
  updateSummary?: string;
  media?: {
    type: 'image' | 'video';
    src: string;
    alt: string;
    caption: string;
    poster?: string;
    layout?: 'wide' | 'portrait';
  }[];
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
    technologies: ['Python', 'PLY', 'Tkinter', 'Pytest', 'PyInstaller', '.tg files'],
    repository: 'https://github.com/leomabuku/PROJECT',
    repositoryVisibility: 'public',
    liveDemo: null,
    cover: '/images/projects/tongalang/source-editor.png',
    coverAlt: 'TongaLang educational IDE showing a Tonga-language source program',
    updatedOn: '2026-08-09',
    updateSummary: 'Added live beginner diagnostics, guarded Apply Fix actions and one shared Problems/Program Input dock, then documented the workflow with current screenshots and a captioned 52-second walkthrough.',
    media: [
      {
        type: 'video',
        src: '/images/projects/tongalang/tongalang-demo.mp4',
        poster: '/images/projects/tongalang/source-editor.png',
        alt: 'Captioned walkthrough of TongaLang beginner diagnostics, program input, settings and project guide',
        caption: 'A silent, captioned walkthrough from semantic editing and Apply Fix through bala() input, scrolling and the structured About guide.',
        layout: 'wide',
      },
      {
        type: 'image',
        src: '/images/projects/tongalang/beginner-diagnostics.png',
        alt: 'TongaLang Problems dock explaining an unnecessary semicolon and offering a guarded Apply Fix action',
        caption: 'Problems translates a precise source error into bilingual guidance and offers an edit only when the correction is deterministic.',
      },
      {
        type: 'image',
        src: '/images/projects/tongalang/program-input.png',
        alt: 'TongaLang Output view with the shared Program Input dock waiting for a bala value',
        caption: 'bala() keeps Output visible, opens one focused input surface and records the submitted value in the program transcript.',
      },
      {
        type: 'image',
        src: '/images/projects/tongalang/settings-guidance.png',
        alt: 'Scrollable TongaLang Settings showing grouped execution controls and semantic syntax colours',
        caption: 'Scrollable, collapsible settings expose safety limits, language tools and accessible colours without clipping at smaller window sizes.',
      },
      {
        type: 'image',
        src: '/images/projects/tongalang/about-guide.png',
        alt: 'Structured TongaLang About screen with author, academic and project information',
        caption: 'The project guide explains the author, academic context, purpose, architecture, quick start, features and current safety scope.',
      },
      {
        type: 'image',
        src: '/images/projects/tongalang/ast-explorer.png',
        alt: 'TongaLang graphical abstract syntax tree with source-linked nodes',
        caption: 'The AST explorer connects executable structure back to the learner\'s source code.',
      },
      {
        type: 'image',
        src: '/images/projects/tongalang/test-lab.png',
        alt: 'TongaLang Test Lab showing all checks passing',
        caption: 'The Test Lab turns regression results, weakness probes and coverage into visible evidence.',
      },
    ],
    problem: 'Beginner programmers may need to learn programming concepts and interpret unfamiliar English syntax at the same time, adding linguistic and cognitive load.',
    solution: 'TongaLang combines Tonga-derived vocabulary with a small interpreted language and a guided desktop workspace. Learners see concepts in context, receive a plain-language recovery step when code is wrong, and stay in control of every suggested edit. It remains an educational language rather than a replacement for mainstream production tools.',
    contributions: ['Researched minimal languages and interpreter construction, then mapped core programming concepts into Tonga-derived vocabulary through linguistic research and native-speaker consultation.', 'Built the lexer, parser, abstract syntax tree, interpreter, runtime environment and native functions before separating the language engine from its Tkinter IDE.', 'Designed a pure diagnostics model with stable codes, exact source spans, bilingual explanations and guarded edits that never execute or silently rewrite learner code.', 'Added debounced live analysis and a collapsible Problems workflow with precise highlighting, Go to Code, Copy Details and undoable Apply Fix actions.', 'Reworked graphical input around one thread-safe shared dock so bala() pauses only the interpreter, keeps the interface responsive and echoes submitted values into Output.', 'Expanded navigation, semantic syntax colours, scrolling, safety settings, project guidance, automated contracts and privacy-reviewed publication evidence.'],
    features: ['Custom lexer, parser, AST and interpreter', 'Variables, arithmetic, Boolean logic, conditions, loops, functions and scope', 'Side-effect-free lexical, syntax and semantic diagnostics', 'Bilingual error codes, exact source highlighting and guarded Apply Fix actions', 'Shared Problems/Program Input dock across Editor and Output', 'Responsive bala() pause and resume with a visible input transcript', 'Semantic colours for eight reserved-word groups in dark and light themes', 'Back and Forward history plus a collapsible navigation menu', 'Scrollable grouped Settings and structured About guide', 'AST explorer, internal console and execution safety limits', '17 packaged .tg example programs', '179 automated regression, adversarial and GUI integration tests'],
    challenges: [
      { title: 'Helpful fixes without unsafe guessing', description: 'The IDE needed broad recovery advice while editing only deterministic mistakes. Suggested edits therefore carry the expected original text, reject stale source and leave ambiguous choices to the learner.' },
      { title: 'Input without freezing the IDE', description: 'bala() must pause execution, not navigation or scrolling. A worker-thread input provider and single-use queue handoff keep Tkinter responsive and prevent repeated submissions.' },
      { title: 'One dock across changing views', description: 'Problems and Program Input share state, expansion and sash size while Editor and Output change underneath them. Runtime failures, successful runs, pending input and manual inspection each require a distinct transition.' },
      { title: 'Growing without regressions', description: 'Diagnostics, tokens, grammar, runtime behaviour, highlighting and existing programs affect one another, so changes are protected by error-contract, adversarial and GUI integration tests.' },
    ],
    lessons: ['Compiler and interpreter fundamentals', 'Grammar and AST design', 'Beginner-centred diagnostic writing', 'Guarded source-edit design', 'Thread-safe GUI execution', 'Stateful Tkinter workspace architecture', 'Automated and adversarial testing', 'Accessible educational language design'],
    plannedFeatures: ['Add progressive beginner lessons, expected output and resettable examples', 'Add keyword and native-function autocomplete with short contextual help', 'Add a variable inspector and simple step-through execution', 'Persist settings, dock sizes, recent files and safe session recovery', 'Arrange a Tonga educator review and formal Narrator or NVDA accessibility testing', 'Add CI, version consistency checks and packaged Windows release artifacts'],
    evidence: 'Public repository verified on 9 August 2026 at merged commit 93ba1f4: 17 runnable TongaLang examples and 179 passing automated tests. Publication media was checked at 1600×900; the silent H.264 demo is 1280×720, 30 fps, 52.03 seconds and 4.15 MB.',
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
    repository: 'https://github.com/leomabuku/SubTrackBH',
    repositoryVisibility: 'public',
    liveDemo: null,
    cover: '/images/projects/subtrack-bh/logo.png',
    coverAlt: 'SubTrack BH internet subscription manager logo',
    problem: 'Subscriber names, packages, payments, expiry dates, balances and reconnections become unreliable when managed through memory, messages or separate records.',
    solution: 'SubTrack BH centralises the administration of Leo’s active Starlink service, which currently serves 29 subscribers. Room is the local source of truth, with Firebase services supporting the project’s remote-service direction.',
    contributions: ['Modelled subscribers, rooms, plans, devices, payments, expenses, reminders and subscription windows.', 'Separated administration, subscriber, core, backend and Firebase concerns across project modules.', 'Added accounting, reconciliation, reporting, backup, PDF and synchronisation foundations.', 'Designed the product around the actual workflow of operating the service.'],
    features: ['Separate admin and subscriber Android apps', 'Room as the admin app\'s local source of truth', 'Subscriber, room, plan and device records', 'Payments, balances and subscription windows', 'Accounting, reports, backups and PDF utilities', 'Firebase authentication, Firestore, Storage and messaging', 'WorkManager background operations', 'Salted PIN security and failed-attempt lockout'],
    challenges: [
      { title: 'Consistent account state', description: 'Payments, package duration, balances, expiry and reconnection rules must agree across screens instead of relying on a manually edited status label.' },
      { title: 'Admin/subscriber boundaries', description: 'The subscriber app must expose only account-safe, read-oriented functions while financial writes and business controls remain in the admin app.' },
      { title: 'Offline-first financial records', description: 'Local operation is essential during connectivity problems, while future synchronisation must avoid duplicate or conflicting financial records.' },
    ],
    lessons: ['Local-first Android architecture', 'Business-rule modelling', 'Room persistence', 'App boundary and permission design', 'Operational product development'],
    plannedFeatures: ['Production Lenco payment integration', 'Provider webhook verification', 'Complete subscriber invoices and payment history', 'Expanded closing, reconciliation and asset-management interfaces'],
    evidence: 'Public repository audited on 3 August 2026 at commit 19edd62. The admin, subscriber, core, backend and Firebase modules are present; payment-provider integrations remain placeholders.',
  },
  {
    slug: 'cbu-find',
    name: 'CBU-FIND',
    shortDescription: 'A cross-platform lost-and-found service for Copperbelt University students on Android and the web.',
    category: ['Android & Web', 'Campus Utility', 'Firebase'],
    type: 'Cross-platform campus product',
    status: 'Active development',
    year: '2026',
    featured: true,
    role: 'Product Developer',
    technologies: ['Kotlin', 'Jetpack Compose', 'Next.js', 'TypeScript', 'Firebase', 'Cloudinary'],
    repository: 'https://github.com/leomabuku/CBU-FIND',
    repositoryLabel: 'Android source',
    additionalRepositories: [{ label: 'Web client source', url: 'https://github.com/leomabuku/CBU-FIND-WEB' }],
    repositoryVisibility: 'public',
    liveDemo: 'https://cbu-find-web.leokmabuku.workers.dev',
    cover: '/images/projects/cbu-find/home-redesign.jpg',
    coverAlt: 'Redesigned CBU Find Android home screen with report actions, search and a recent lost-item report',
    updatedOn: '2026-08-03',
    updateSummary: 'Refreshed the Android product evidence to show the branded dashboard, clearer lost-or-found reporting flow and private report conversations now present in the current build.',
    media: [
      {
        type: 'image',
        src: '/images/projects/cbu-find/create-report.jpg',
        alt: 'CBU Find create-report form for a lost or found item',
        caption: 'The guided report flow captures category, location, photos, identifying details and a safe contact path.',
        layout: 'portrait',
      },
      {
        type: 'image',
        src: '/images/projects/cbu-find/private-chat.jpg',
        alt: 'CBU Find private conversation screen for a reported item',
        caption: 'Private, item-linked messaging helps students coordinate a return without publishing the conversation.',
        layout: 'portrait',
      },
    ],
    problem: 'Lost-property information shared through chats, noticeboards and word of mouth is fragmented, difficult to search and easy to miss.',
    solution: 'CBU-FIND creates a shared Firebase-backed record where students can publish, search and discuss lost or found items from a native Android app or a responsive web client.',
    contributions: ['Built the native Android interface with Jetpack Compose and Material 3.', 'Implemented authentication, student profiles, report feeds and private Firestore-backed conversations.', 'Added Cloudinary uploads for report images and chat attachments.', 'Built a separate TypeScript web client and deployed it to Cloudflare Workers against the same Firebase data contract.'],
    features: ['Email/password, Google and phone authentication', 'Android and responsive web clients', 'Shared live Firestore reports', 'Up to three compressed report images', 'Search, category and status filters', 'Private real-time inbox and chat', 'Photo, video, PDF and text chat attachments', 'Profiles, personal history and returned-item workflow', 'Light and dark themes'],
    challenges: [{ title: 'Useful locations without a map', description: 'The app combines manual place search, custom campus labels and nearby reference suggestions without publishing a user’s live position.' }],
    lessons: ['Cross-platform data contracts', 'Compose UI architecture', 'Firebase real-time data flows', 'Cloud image uploads', 'Cloudflare Workers deployment', 'Security-rule planning'],
    plannedFeatures: ['Formal ownership-claim verification', 'Push notifications', 'Administrator moderation and user blocking'],
    evidence: 'Android commit 8ea1c96 and web commit c789d72 were audited on 3 August 2026. Both public clients share Firebase data, and the web client is live on Cloudflare Workers.',
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
    technologies: ['Kotlin', 'XML layouts', 'ViewBinding', 'ViewModel', 'LiveData', 'Gson', 'SharedPreferences'],
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
    evidence: 'Public source audited on 3 August 2026 at commit 7509611: ten question categories, timed play, skipped-question review, packaged JSON content and a SharedPreferences leaderboard are implemented.',
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
    evidence: 'Canonical public repository audited on 3 August 2026 at commit 40e9a7a. Console, Raylib and legacy Win32 implementations are present; the empty duplicate repository remains excluded.',
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
    technologies: ['JavaScript', 'React Native', 'Flask', 'SQLAlchemy', 'JWT', 'PostgreSQL'],
    repository: 'https://github.com/leomabuku/LifeHarmonyTracker',
    repositoryVisibility: 'public',
    liveDemo: null,
    cover: null,
    coverAlt: '',
    problem: 'Daily planning, focus, spending and screen-time information often live in disconnected tools.',
    solution: 'A prototype workspace exploring how those personal-management activities could share one interface.',
    contributions: ['Developed calendar, focus, finance, notification and screen-time modules.', 'Created a Flask API with authentication, persistence and device-synchronisation foundations.', 'Modelled events, expenses, focus sessions, app usage, notifications and device state.'],
    features: ['React Native dashboard and navigation', 'Calendar and event workflows', 'Focus timer and session records', 'Expense tracking', 'Notifications and screen-time views', 'Flask API and SQLAlchemy models', 'JWT and OAuth-oriented authentication', 'Offline synchronisation and conflict fields'],
    challenges: [],
    lessons: ['Feature decomposition', 'Mobile navigation', 'API and data modelling', 'Offline-sync design', 'Product scope management'],
    plannedFeatures: ['Add automated test coverage', 'Define and validate a stable release scope'],
    evidence: 'Public repository audited on 3 August 2026 at commit c51a71d: 40 JavaScript files, ten Python files, React Native screens and a Flask/SQLAlchemy backend are present.',
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
    contributions: ['Designed the content model and multi-page information architecture.', 'Implemented responsive pages, metadata, accessibility support and automated repository refresh.', 'Added Google ownership verification and submitted the generated sitemap for discovery.', 'Deployed through GitHub and Cloudflare Pages.'],
    features: ['Responsive multi-page site', 'Structured project case studies', 'SEO, sitemap and structured data', 'Google Search Console verification', 'Automated GitHub refresh', 'Reduced-motion support'],
    challenges: [],
    lessons: ['Portfolio storytelling', 'Astro content architecture', 'Responsive editorial design', 'Static deployment'],
    plannedFeatures: ['Custom domain', 'Additional verified project screenshots'],
    evidence: 'Public Astro repository and Cloudflare Pages deployment verified on 3 August 2026. The site includes seven project case studies, a generated sitemap and Google Search Console verification.',
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const whatsappUrl = `https://wa.me/${profile.phone.replace('+', '')}?text=${encodeURIComponent('Hello Leo, I found your portfolio and would like to discuss a software, employment or collaboration opportunity.')}`;
