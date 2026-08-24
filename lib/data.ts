/* ── G-SCALE International Office - site content ────────────── */

export const SITE = {
  name: "G-SCALE International Office",
  shortName: "G-SCALE International",
  university: "Galgotias University",
  tagline: "Global Learning Through G-SCALE International",
  description:
    "The G-SCALE International Office at Galgotias University fosters global partnerships, student mobility, research collaboration, and international engagement, preparing students for a globally connected future.",
  address:
    "G-SCALE International Office, A - Block, 3rd Floor, Galgotias University, Greater Noida, UP - 201310, India",
  phone: "+91-120-4806806",
  phoneHref: "tel:+911204806806",
  email: "gscale_internationaloffice@galgotiasuniversity.edu.in",
  hours: [
    { days: "Monday - Friday", time: "9:00 AM - 5:00 PM IST" },
    { days: "Saturday", time: "9:00 AM - 1:00 PM IST" },
  ],
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "International Partnerships", href: "/partnerships" },
  { label: "Events & Visits", href: "/events" },
  { label: "Mobility Programmes", href: "/programmes" },
  { label: "About Us", href: "/about" },
];

export const STATS = [
  { value: 6, prefix: "#", suffix: "", label: "In India for International Students" },
  { value: 5, suffix: "-Star", label: "QS Rating" },
  { value: 100, suffix: "%", label: "University-Wide Implementation" },
  { value: 3, suffix: "+", label: "World-Class Innovation Hubs" },
] as const;

export const QS_STARS = [
  "Teaching",
  "Employability",
  "Innovation",
] as const;

export const PARTNER_MARQUEE = [
  "Nanyang Technological University",
  "University of Cambridge · Girton College",
  "Apple",
  "Infosys",
  "Wipro",
  "Tata Technologies",
  "L&T EduTech",
  "Drone Destination",
  "Villa College Maldives",
  "QS Quacquarelli Symonds",
  "Times Higher Education",
  "Hack The Box",
  "Ynov Campus",
] as const;

/* ── Home - overview ─────────────────────────────────────────── */

export const OVERVIEW = [
  "Galgotias University has rapidly positioned itself as one of India's most internationally engaged universities. Ranked 6th in India for international students and diversity, and awarded a QS 5-Star Rating for Teaching, Employability, Facilities, Academic Development, and Innovation, the university's global standing is the direct result of a deliberate, institution-wide strategy centred on quality, collaboration, and real-world impact.",
  "At the heart of this transformation is the Galgotias Student-Centered Active Learning Ecosystem - G-SCALE - India's first university-wide adoption of active learning across every programme. G-SCALE replaces conventional instruction with collaborative, hands-on, and industry-aligned learning, supported by world-class infrastructure including the Apple iOS Development Centre, Wipro Cybersecurity Centre of Excellence, and Tata Technologies Innovation Hub.",
  "Through sustained engagement with institutions such as Nanyang Technological University, Singapore, and active participation in global rankings forums including QS and Times Higher Education, Galgotias University is building a genuinely international academic community - one that prepares students not just for employment, but for global leadership.",
] as const;

export const EXPLORE_CARDS = [
  {
    icon: "plane" as const,
    title: "Mobility Programmes",
    text: "Inbound & outbound programmes connecting GU with the world's leading institutions.",
    href: "/programmes",
  },
  {
    icon: "handshake" as const,
    title: "International Partnerships",
    text: "G-SCALE, QS & THE engagement, industry tie-ups, and building institutional partnerships.",
    href: "/partnerships",
  },
  {
    icon: "calendar" as const,
    title: "Events & Visits",
    text: "Conferences, delegations, summits, and international visits coordinated by the International Office.",
    href: "/events",
  },
  {
    icon: "users" as const,
    title: "About Us",
    text: "Meet the International Office team, learn our roles, responsibilities, and how we can help you.",
    href: "/about",
  },
];

/* ── Programmes ─────────────────────────────────────────────── */

export type Programme = {
  slug: string;
  title: string;
  kind: "Inbound" | "Outbound";
  partner: string;
  dates?: string;
  blurb: string;
};

export const FEATURED_PROGRAMMES: Programme[] = [
  {
    slug: "winter-exchange",
    title: "Winter Short-Term Exchange Programme",
    kind: "Inbound",
    partner: "Galgotias University · Greater Noida",
    blurb:
      "Our flagship inbound initiative - thematic academic tracks, project-based learning, industry visits, and cultural immersion across India for students from partner institutions.",
  },
  {
    slug: "ios-programme",
    title: "iOS Student Developer Program",
    kind: "Inbound",
    partner: "Apple & Infosys · Greater Noida",
    blurb:
      "A two-week intensive residential programme where international students build real iOS applications, engage in design thinking workshops, and experience India's innovation ecosystem.",
  },
  {
    slug: "ntu",
    title: "NTU Global Short-Term Programmes",
    kind: "Outbound",
    partner: "Nanyang Technological University, Singapore",
    blurb:
      "ASEAN Summer @ NTU (Scholarship) and the GEM Trailblazer Programme - immersive academic and cultural experiences at one of Asia's most advanced universities.",
  },
  {
    slug: "cambridge",
    title: "Cambridge Global Summer Programme",
    kind: "Outbound",
    partner: "Girton College, Cambridge",
    dates: "12-25 July 2026",
    blurb:
      "Selected GU students live and study at the University of Cambridge, engaging with entrepreneurship, frugal AI, and public speaking in a world-class residential environment.",
  },
];

export const WINTER_EXCHANGE = {
  name: "Winter Short-Term Exchange Programme",
  tagline: "A Global Learning Experience at Galgotias University",
  meta: ["Inbound · Flagship Initiative", "Galgotias University, Greater Noida"],
  intro: [
    "The Winter Short-Term Exchange Programme is Galgotias University's flagship inbound initiative, bringing students from partner institutions together for an academic, cultural, and experiential learning journey in India. Each edition is built around thematic academic tracks - interactive workshops, project-based learning, and expert masterclasses that encourage critical thinking and interdisciplinary collaboration.",
    "Beyond academics, participants take part in cultural immersion, industry visits, and networking across India, gaining a rounded view of the country's innovation ecosystem and economy alongside lasting international friendships.",
  ],
  features: [
    "Thematic academic tracks",
    "Project-based learning",
    "Faculty-led workshops and masterclasses",
    "Industry and innovation visits",
    "Cross-cultural collaboration",
    "Cultural and heritage experiences",
  ],
  outcomes: [
    "Intercultural competence and global perspective",
    "Exposure to India's higher education and industry ecosystem",
    "Practical, project-based skills",
    "Expanded international academic networks",
  ],
};

export const IOS_PROGRAMME = {
  name: "iOS Student Developer Program",
  meta: ["Supported by Apple and Infosys", "Galgotias University, Greater Noida"],
  intro: [
    "The iOS Student Developer Program is Galgotias University's flagship inbound initiative - a two-week intensive, residential programme placing international students at the centre of India's dynamic technology and innovation ecosystem. Delivered at GU's iOS Development Centre, built in partnership with Apple and Infosys, the programme integrates product development, entrepreneurship, and deep cultural immersion into a single, outcome-driven experience.",
    "Unlike conventional exchange programmes, this initiative is built on a build-first learning model, in which students are challenged to develop functional, real-world technology solutions from day one. Every component of the programme contributes to a complete innovation journey - from problem identification through to a live demonstration before academic and industry panels.",
  ],
  structure: [
    {
      title: "App Development & Product Innovation",
      text: "Students develop functional iOS applications through hands-on prototyping, testing, and iteration within a live development environment.",
    },
    {
      title: "Entrepreneurship & Design Thinking",
      text: "Structured workshops guide students through globally recognised innovation frameworks, from empathy mapping through to ideation, prototyping, and solution validation.",
    },
    {
      title: "Mentored Build & Hackathon Environment",
      text: "The central build phase operates with the intensity of a professional hackathon, supported by continuous expert mentorship.",
    },
    {
      title: "Social Impact & Applied Context",
      text: "All projects are grounded in genuine societal challenges. Students develop solutions that are meaningful, scalable, and relevant to real communities.",
    },
    {
      title: "Pitching & Showcase",
      text: "The programme culminates in a formal demonstration event where student teams present their completed iOS solutions to panels from the academic community and the technology industry.",
    },
  ],
  highlights: [
    {
      title: "Industry & Innovation Exposure",
      points: [
        "Visits to leading Indian companies including Paytm and Parle Products",
        "Interaction with startups, innovation labs, and technology ecosystem stakeholders",
      ],
    },
    {
      title: "Cultural & Heritage Immersion",
      points: [
        "Visit to the Taj Mahal and Agra Fort",
        "Exploration of Dilli Haat for regional arts, crafts, and cultural traditions",
        "Engagement with India's extraordinary historical and cultural landscape",
      ],
    },
    {
      title: "City & Experiential Learning",
      points: [
        "Curated excursions across Delhi NCR",
        "Engagement with local markets, urban systems, and communities",
      ],
    },
    {
      title: "Culinary & Social Experience",
      points: [
        "Exposure to diverse Indian cuisines and food culture",
        "Informal networking through shared cultural and social settings",
      ],
    },
  ],
  cohort2025:
    "The inaugural 2025 cohort brought together students from Nanyang Technological University, Singapore, and Villa College, Maldives - a multicultural, interdisciplinary team working side by side for two weeks of app development, design thinking, industry visits, and cultural immersion.",
  details: [
    { label: "Duration", value: "2 Weeks - Intensive, Residential" },
    { label: "Location", value: "Greater Noida, India" },
    { label: "Academic Credits", value: "3 Credits (transferable)" },
    { label: "Programme Cycles", value: "Winter (November - January) · Spring (February - April)" },
    { label: "Language of Instruction", value: "English" },
  ],
  outcomes: [
    "A functional iOS application prototype addressing a real-world problem",
    "Design thinking and product development experience",
    "Documented global teamwork in a high-performance environment",
    "Pitching and communication skills for academic and industry audiences",
  ],
  photosSlug: "ios-programme",
};

export const NTU_PROGRAMMES = {
  name: "NTU Global Short-Term Programmes - Singapore",
  meta: ["Nanyang Technological University", "Singapore"],
  intro:
    "Galgotias University participates in selected NTU Global Short-Term Programmes at Nanyang Technological University, Singapore, nominating and supporting eligible students for immersive academic and cultural experiences that combine interdisciplinary learning, collaborative projects, and cross-cultural exchange.",
  tracks: [
    {
      title: "ASEAN Summer @ NTU (Scholarship)",
      duration: "4 Weeks · Scholarship",
      text: "A scholarship programme bringing together students from across ASEAN and partner universities for interdisciplinary learning and cross-cultural exchange in Singapore.",
    },
    {
      title: "GEM Trailblazer Programme",
      duration: "2 Weeks · NTU Singapore campus",
      text: "NTU's flagship short-term mobility initiative offering academic engagement, experiential learning, and cultural immersion, preparing participants for an increasingly interconnected future.",
    },
  ],
  selection: [
    "Departmental nomination based on academic performance and co-curricular standing",
    "Profile evaluation by the International Office",
    "Interview assessing communication, motivation, and global readiness",
    "Final nomination with merit-based financial support available",
  ],
  alumni: [
    {
      name: "Yashvardhan Raj",
      programme: "B.Sc. Microbiology (Hons.)",
      text: "Developed two project solutions during the 2025 programme: ReGrub (Singapore), a food redistribution system addressing migrant food insecurity, and SalvaAqua (Vietnam, Mekong Delta), a solar-powered water purification solution.",
      projects: [
        {
          name: "ReGrub (Singapore)",
          text: "A food redistribution system designed to address migrant food insecurity through sustainable resource utilisation.",
        },
        {
          name: "SalvaAqua (Vietnam, Mekong Delta)",
          text: "A solar-powered water purification solution targeting carcinogenic contamination in rural water sources.",
        },
      ],
    },
    {
      name: "Priyanshu Yadav",
      programme: "B.Tech",
      text: "Focused on entrepreneurial and analytical skills, working through the full cycle of idea development - from framing to pitching refined solutions before expert panels.",
      projects: [],
    },
  ] as Array<{
    name: string;
    programme: string;
    text: string;
    projects: Array<{ name: string; text: string }>;
  }>,
  current2026: {
    asean: [
      { name: "Jeetika Sharma", programme: "B.Tech Biotechnology" },
      { name: "Vishnu Jaiswal", programme: "BA LLB (Hons.)" },
    ],
    gem: [
      { name: "Jatin Garg", programme: "B.Tech CSE (Data Science)" },
      { name: "Karan Tandon", programme: "B.Tech Biotechnology" },
      { name: "Lavanya Singh", programme: "B.Tech (Electronics & Communication Engineering)" },
      { name: "Gagan Pathak", programme: "Bachelor of Journalism & Mass Communication" },
      { name: "Appoorva Suresh Khajuria", programme: "B.Tech (Electronics & Communication Engineering)" },
      { name: "Tushar Sharma", programme: "BBA in Aviation Management (Hons. with Research)" },
    ],
  },
  photosSlug: "ntu-global-programmes",
};

export const CAMBRIDGE_PROGRAMME = {
  meta: ["Girton College, University of Cambridge", "12-25 July 2026"],
  intro:
    "Galgotias University facilitated participation for selected students in the Cambridge Global Summer Programme - a two-week residential experience at Girton College, University of Cambridge, engaging with international peers and the intellectual culture of one of the world's leading universities.",
  modules: [
    {
      title: "Entrepreneurship & Venture Thinking",
      text: "Students develop structured, scalable ideas and move from problem identification to solution framing using disciplined innovation thinking.",
    },
    {
      title: "Frugal AI & Strategic Innovation",
      text: "Focus on deploying artificial intelligence in high-impact, resource-aware contexts. Students develop nuanced understanding of AI applied to large-scale problems.",
    },
    {
      title: "Public Speaking & Communication",
      text: "Structured training in pitching, presenting to international audiences, and articulating complex ideas with clarity and authority.",
    },
  ],
  details: [
    { label: "Dates", value: "12 - 25 July 2026" },
    { label: "Duration", value: "2 Weeks - Residential" },
    { label: "Location", value: "Girton College, University of Cambridge, United Kingdom" },
    { label: "Additional Experience", value: "London Immersion Visit" },
    { label: "Certification", value: "International Certification from the Cambridge Global Programme" },
  ],
  selection: [
    "Application submitted through the International Office",
    "Profile evaluation covering academic performance and co-curricular engagement",
    "Motivational interview assessing communication skills and readiness for an international academic environment",
    "Final nomination and enrolment processed by the International Office",
  ],
  photosSlug: "cambridge-global-summer",
};

export const CTF_CHALLENGE = {
  meta: ["Hack The Box platform", "English · French · Spanish"],
  intro:
    "Representing India on the international cybersecurity stage, Galgotias University participates in the Global Ynov Partners CTF (Capture The Flag) Challenge 2026 - one of the most prestigious inter-university cybersecurity competitions in the world. The competition is hosted on the Hack The Box platform and is multilingual, conducted in English, French, and Spanish.",
  domains: [
    "Web Exploitation",
    "Cryptography",
    "Forensics",
    "Reverse Engineering",
    "Binary Exploitation (Pwn)",
    "OSINT - Open-Source Intelligence",
  ],
  highlights: [
    "Live inter-university leaderboard with global standings",
    "Industry-level benchmarking challenges",
    "Certificates awarded by Hack The Box and Ynov Campus",
  ],
};

export const EDVENTURES = {
  name: "EDVentures 2026 - Hong Kong",
  meta: ["Champion · AWS Championship Prize", "Held in Hong Kong"],
  intro:
    "Project TACTO, developed by Galgotias University students, was named Champion at EDVentures 2026 - one of Asia's leading education innovation competitions, held in Hong Kong - winning among 19 finalist teams from 10 countries. The team also received the AWS Championship Prize, a USD 7,000 support package.",
  championText:
    "Project TACTO is an assistive EdTech platform making coding accessible to blind and visually impaired learners, using tactile, NFC-enabled coding blocks with Braille markers and audio feedback in place of screen-based interfaces.",
  quote:
    "Innovation grows when ideas are exposed to new perspectives... it inspired us to build with greater purpose and a truly global vision.",
  quoteBy: "Gaurang Pant, Founder & CEO, Project TACTO",
  prize: "AWS Championship Prize · USD 7,000 support package",
  finalistsNote:
    "GU's second entrant, Team Tekurious (Smart Learn), also competed among the finalists.",
  teams: [
    {
      name: "Project TACTO - Champion",
      text: "Assistive EdTech making coding accessible to blind and visually impaired learners through tactile coding blocks.",
    },
    {
      name: "Team Tekurious - Smart Learn",
      text: "GU's second entrant, competing among the EDVentures finalists.",
    },
  ],
  photosSlug: "edventures-2026",
};

export const PROGRAMMES_INTRO =
  "Galgotias University's international programmes are structured to provide students with meaningful global exposure through rigorously designed inbound and outbound opportunities. Each programme is aligned with the university's broader internationalisation strategy, building competencies that go beyond academic knowledge, including cross-cultural communication, innovation thinking, and global professional networks.";

/* ── Partnerships ───────────────────────────────────────────── */

export const PARTNERSHIPS_INTRO =
  "Galgotias University's international strategy is built on sustained engagement with the global higher education community. We participate in leading rankings forums, build institutional collaborations, and pursue industry partnerships that shape curriculum, student mobility, and research - and strengthen our standing as a globally relevant institution.";

export type QsTheEvent = {
  badge: string;
  title: string;
  lines: string[];
  text: string;
  keyPeople?: string[];
  peopleLabel?: string;
  linkLabel?: string;
  linkHref?: string;
  photosSlug?: string;
};

export const QS_THE_EVENTS: QsTheEvent[] = [
  {
    badge: "Past Event",
    title: "QS India Summit - Goa",
    lines: ["Presentation · Advancing Drone Innovation and STEM Esports"],
    text: 'Galgotias University presented "Advancing Drone Innovation and STEM Esports: The Galgotias-Drone Destination Model" at the QS India Summit, drawing strong interest from academic leaders across the country. The presentation centred on the Galgotias Centre for Drone Intelligence and Simulation (GCDIS), built in collaboration with Drone Destination Pvt. Ltd. Its Drone Soccer Arena - a STEM esports initiative - combines competitive learning with precision flying, teamwork, and real-time decision-making. The programme runs on four pillars: faculty enablement, student training, curriculum integration, and student community development.',
    keyPeople: [
      "Dr. Meenakshi Awasthi (Head, DEECE)",
      "Puneet Saini (Incharge, GCDIS)",
      "Vedant Acharya (Student, Tech Head GCDIS)",
      "Chirag Sharma (CEO, Drone Destination)",
    ],
    peopleLabel: "Team",
    photosSlug: "qs-india-summit",
  },
  {
    badge: "Past Event · April 2026",
    title: "QS China Summit 2026",
    lines: ["8-9 April 2026", "Futian Shangri-La Hotel, Shenzhen, China"],
    text: "Galgotias University took part in this flagship gathering of higher education leaders from China and the Asia-Pacific region, focused on rankings strategy, international mobility, and research innovation. Topics covered included skills and employability transformation, global university strategy, international student recruitment, and research and technology impact. Participation gave GU a platform to build partnerships across China and the Asia-Pacific and reinforce its credibility as a global academic partner.",
    linkLabel: "Official Event Website",
    linkHref: "https://www.qs.com/en-us/conference/china",
    photosSlug: "qs-china-summit",
  },
  {
    badge: "Past Event · April 2026",
    title: "THE Asia Universities Summit 2026",
    lines: ["22-24 April 2026", "Hong Kong University of Science and Technology"],
    text: "Galgotias University attended Asia's leading annual gathering for higher education leaders, which featured the live reveal of the THE Asia University Rankings 2026, the THE Awards Asia ceremony, and sessions on AI in education and university-industry collaboration.",
    linkLabel: "Official Event Website",
    linkHref: "https://www.timeshighered-events.com/asia-universities-summit-2026/home",
    photosSlug: "the-asia-summit",
  },
  {
    badge: "Past Event · June 2026",
    title: "Global Sustainable Development Congress 2026",
    lines: ["22-25 June 2026", "Jakarta, Indonesia"],
    text: "Galgotias University joined this global gathering focused on the UN Sustainable Development Goals, which featured the live reveal of the THE Impact Rankings 2026. Topics covered climate and energy transition, sustainable cities, education equality, circular economy, and ESG frameworks.",
    linkLabel: "Official Event Website",
    linkHref: "https://www.gsdcongress.com/2026",
    photosSlug: "gsdc-congress",
  },
  {
    badge: "Student Spotlight",
    title: "Global Startup and Development Congress - Jakarta 2026",
    lines: ["Jakarta, Indonesia"],
    text: 'Galgotias University students presented at GSDC Jakarta, showcasing early-stage ventures alongside entrepreneurs and institutional leaders from across the region. Gaurang Pant and Yashvardhan Raj were also invited as panellists for "Creating Inclusive Pathways: Practical Solutions for Expanding Access to Sustainability Careers," alongside representatives from City University of Hong Kong, University of Santo Tomas, and Schneider Electric. Presenting and speaking at the same event reflects Galgotias University\'s growing role in international entrepreneurship and sustainability conversations.',
    keyPeople: [
      "Pushkar Singh - CarbonSynq Earth",
      "Gaurang Pant - Project Tacto",
      "Yashvardhan Raj - ReGrub",
    ],
    peopleLabel: "Presenting",
    photosSlug: "gsdc-jakarta",
  },
];

export const GSCALE = {
  intro: [
    "G-SCALE is Galgotias University's university-wide shift to active learning, replacing lecture-driven instruction with a model built on collaboration, industry exposure, and technology, and benchmarked against leading global universities.",
    "The framework draws direct inspiration from institutions like Nanyang Technological University, Singapore, and reflects a simple premise: higher education should build critical thinking, problem-solving, and leadership - not just transmit knowledge.",
  ],
  pillars: [
    {
      title: "Active Learning",
      text: "Flipped classrooms, team-based learning, peer instruction, and collaborative project work replace passive note-taking as the primary mode of teaching.",
    },
    {
      title: "AI & Digital Pedagogy",
      text: "AI, learning analytics, and digital tools support personalised, adaptive learning pathways for every student.",
    },
    {
      title: "Real-World Problem Solving",
      text: "Students work on live industry challenges, research problems, and societal issues throughout their programmes.",
    },
    {
      title: "Industry & International Exposure",
      text: "G-SCALE underpins Galgotias University's outbound programmes, industry tie-ups, and international research collaborations.",
    },
  ],
  numbers: [
    { value: "100%", label: "University-Wide Implementation" },
    { value: "#6", label: "In India for International Students" },
    { value: "5★", label: "QS Star Rating" },
    { value: "3+", label: "World-Class Innovation Hubs" },
  ],
  footnote:
    "Supported by the Apple iOS Development Centre, Wipro Cybersecurity Centre of Excellence, and Tata Technologies Innovation Hub, G-SCALE underpins Galgotias University's international academic partnerships and is aligned with academic frameworks at institutions including NTU Singapore.",
};

export const BUILDING_PARTNERSHIPS = {
  intro:
    "Galgotias University is actively expanding its network of institutional collaborations - with universities, research institutions, and industry organisations worldwide. We welcome conversations with institutions interested in student and faculty exchange, joint research, dual-credential pathways, and collaborative programming.",
  areas: [
    "Student and faculty exchange programmes - semester-long and short-term mobility options",
    "Joint research projects, co-authored publications, and collaborative grant applications",
    "Dual degree and credit transfer pathways allowing students to earn qualifications from both institutions",
    "Collaborative conferences, seminars, and academic workshops",
    "Curriculum benchmarking and joint programme development",
  ],
};

export const INDUSTRY_TIEUPS_INTRO =
  "Galgotias University has built an extensive industry-academia network. Our partners don't just sponsor programmes - they help design curriculum, mentor students, and hire directly from campus.";

export const INDUSTRY_TIEUPS = [
  {
    name: "Apple & Infosys",
    thing: "iOS Development Centre",
    text: "The Apple iOS Development Centre, supported by Infosys, gives students hands-on training through the iOS Student Developer Program and a pipeline of student-led app projects.",
  },
  {
    name: "Wipro",
    thing: "Cybersecurity Centre of Excellence",
    text: "In partnership with Wipro, Galgotias University runs a dedicated Cybersecurity Centre of Excellence, training students in information security, ethical hacking, and digital defence.",
  },
  {
    name: "Tata Technologies",
    thing: "Innovation Hub",
    text: "The Tata Technologies Innovation Hub gives engineering and product design students access to industry-standard manufacturing tools and real project environments.",
  },
  {
    name: "L&T EduTech",
    thing: "Engineering & Technical Education",
    text: "Larsen & Toubro EduTech partners with Galgotias University on industry-aligned engineering curriculum, hands-on training modules, and real-world project work.",
  },
  {
    name: "Drone Destination Pvt. Ltd.",
    thing: "GCDIS - Drone Intelligence & Simulation",
    text: "The Galgotias Centre for Drone Intelligence and Simulation (GCDIS), built with Drone Destination, delivers UAV training across design, build, mission planning, and operations.",
  },
  {
    name: "Recruiter Network",
    thing: "Classroom to Career",
    text: "Galgotias University's placement network gives students direct pathways from classroom to career.",
  },
];

/* ── Events & Visits ────────────────────────────────────────── */

export const EVENTS_INTRO =
  "International conferences, delegations, summits, and visits coordinated by the GU International Office.";

export type GuEvent = {
  status: "past" | "upcoming";
  badge: string;
  title: string;
  where: string;
  when: string;
  category: "Summit" | "Programme" | "Competition" | "Delegation";
  text: string;
  linkLabel?: string;
  linkHref?: string;
  photosSlug?: string;
};

export const FEATURED_EVENTS: GuEvent[] = [
  {
    status: "past",
    badge: "Past Event",
    title: "QS India Summit - Goa",
    where: "Goa, India",
    when: "2025",
    category: "Summit",
    text: "Galgotias University presented its integrated drone innovation and STEM esports model at the QS India Summit - showcasing GCDIS, the Drone Soccer Arena, and a co-creation framework spanning industry, university, and students.",
    photosSlug: "qs-india-summit",
  },
  {
    status: "past",
    badge: "Past Event",
    title: "QS China Summit 2026",
    where: "Futian Shangri-La Hotel, Shenzhen, China",
    when: "8-9 April 2026",
    category: "Summit",
    text: "Galgotias University joined higher education leaders from China and the Asia-Pacific to discuss internationalisation, rankings strategy, and academic innovation - and to engage directly with potential partner institutions.",
    linkLabel: "Official Event Website",
    linkHref: "https://www.qs.com/en-us/conference/china",
    photosSlug: "qs-china-summit",
  },
  {
    status: "past",
    badge: "Past Event",
    title: "THE Asia Universities Summit 2026",
    where: "Hong Kong University of Science and Technology",
    when: "22-24 April 2026",
    category: "Summit",
    text: "Galgotias University attended Asia's leading annual gathering for higher education leaders, which featured the live reveal of the THE Asia University Rankings, the THE Awards Asia ceremony, and sessions on AI in education and university-industry partnerships.",
    linkLabel: "Official Event Website",
    linkHref: "https://www.timeshighered-events.com/asia-universities-summit-2026/home",
    photosSlug: "the-asia-summit",
  },
  {
    status: "past",
    badge: "Past Event",
    title: "Global Sustainable Development Congress 2026",
    where: "Jakarta, Indonesia",
    when: "22-25 June 2026",
    category: "Summit",
    text: "Galgotias University joined delegates from universities, governments, NGOs, and industry for the live reveal of the THE Impact Rankings 2026, recognising universities driving measurable real-world impact.",
    linkLabel: "Official Event Website",
    linkHref: "https://www.gsdcongress.com/2026",
    photosSlug: "gsdc-congress",
  },
  {
    status: "past",
    badge: "Competition",
    title: "GSDC Jakarta 2026",
    where: "Jakarta, Indonesia",
    when: "2026",
    category: "Competition",
    text: "Galgotias University students presented at the Global Startup and Development Congress in Jakarta: Pushkar Singh (CarbonSynq Earth), Gaurang Pant (Project Tacto), and Yashvardhan Raj (ReGrub). Gaurang and Yashvardhan were also invited as panellists on sustainability careers and workforce access.",
    photosSlug: "gsdc-jakarta",
  },
  {
    status: "past",
    badge: "Student Mobility",
    title: "Cambridge Global Summer Programme 2026",
    where: "Girton College, University of Cambridge, UK",
    when: "12-25 July 2026",
    category: "Programme",
    text: "Selected Galgotias University students took part in this two-week residential programme in entrepreneurship, AI-driven innovation, and public speaking, delivered by Cambridge-affiliated faculty.",
    photosSlug: "cambridge-global-summer",
  },
];

export const FEATURED_VISITS: GuEvent[] = [
  {
    status: "past",
    badge: "Visit 01",
    title: "iOS Student Developer Program 2025",
    where: "GU Campus, Greater Noida, India",
    when: "December 2025",
    category: "Delegation",
    text: "Galgotias University hosted an international student delegation from NTU Singapore and Villa College, Maldives for the inaugural iOS Student Developer Program - two weeks combining app development, design thinking workshops, industry visits to Paytm and Parle Products, and cultural excursions to the Taj Mahal, Agra Fort, and Dilli Haat.",
    photosSlug: "ios-programme",
  },
  {
    status: "past",
    badge: "Visit 02",
    title: "NTU Singapore - ASEAN Summer Program 2025",
    where: "Singapore & Vietnam (Mekong Delta)",
    when: "January - February 2025",
    category: "Delegation",
    text: "Galgotias University students joined NTU Singapore's 2025 ASEAN Summer Program, developing solutions for food insecurity and water purification across Singapore and Vietnam.",
    linkLabel: "View Photos & Project Documentation",
    linkHref:
      "https://drive.google.com/drive/folders/1Uvtad6z789pdQWuISvjKAePkpxdv3HhP?usp=sharing",
    photosSlug: "ntu-asean-summer",
  },
];

export const CONFERENCE_TYPES = [
  {
    icon: "mic" as const,
    title: "International Research Seminars",
    text: "Seminars featuring visiting scholars and researchers from partner institutions worldwide.",
  },
  {
    icon: "chalkboard" as const,
    title: "Academic Workshops",
    text: "Faculty-led workshops on internationalisation, active learning, research methodology, and curriculum development.",
  },
  {
    icon: "network" as const,
    title: "International Partner Summits",
    text: "Regular gatherings of Galgotias University's international partners to review and strengthen collaborative programmes.",
  },
];

export const CONFERENCES_TEXT = [
  "Galgotias University hosts and takes part in international conferences, seminars, and academic workshops throughout the year, bringing global scholars, industry leaders, and policymakers to campus.",
  "Upcoming conferences and seminars are added here as they're confirmed. To host or partner on an academic event at Galgotias University, contact the International Office.",
];

/* ── About ──────────────────────────────────────────────────── */

export const WHO_WE_ARE =
  "The International Office is Galgotias University's gateway to global engagement - connecting students, faculty, researchers, and institutional partners with opportunities beyond the campus. Through strategic alliances with universities and organisations worldwide, we advance internationalisation by building pathways for global learning, collaborative research, academic exchange, and cross-cultural engagement.";

export const OUR_MISSION =
  "Our mission is to strengthen Galgotias University's global presence while equipping every student with the international experience they need to learn, collaborate, and lead beyond borders.";

export const ROLES = [
  {
    icon: "planeTakeoff" as const,
    title: "Student Mobility - Outbound",
    text: "We believe international experience is central to a globally relevant education. The International Office enables students to take part in overseas study, research, and leadership opportunities through our network of partner institutions - managing selection, programme partnerships, logistics, visa and travel support, and post-programme documentation.",
  },
  {
    icon: "planeLanding" as const,
    title: "Student Mobility - Inbound",
    text: "Galgotias University welcomes students from around the world to an academically enriching, culturally diverse campus. The International Office works with partner institutions to facilitate exchanges, handling enquiries, arrival, academic integration, visa and FRRO compliance, accommodation, and cultural orientation.",
  },
  {
    icon: "handshake" as const,
    title: "Institutional Partnerships & MoUs",
    text: "International partnerships are central to building a globally connected university. The International Office identifies potential partners, negotiates and drafts agreements, and works to keep active collaborations delivering real value - spanning universities, research institutions, and industry organisations across Asia, Europe, North America, and the Middle East.",
  },
  {
    icon: "chart" as const,
    title: "Rankings & Global Positioning",
    text: "The International Office coordinates Galgotias University's participation in QS and THE rankings processes - from data submission to event participation - and supports faculty and departments in building the research output and international collaborations that underpin the university's global standing.",
  },
  {
    icon: "calendarCheck" as const,
    title: "Events & Delegations",
    text: "The office organises and facilitates international visits to campus, coordinates Galgotias University's participation in global higher education summits and forums, and hosts international delegations, academic visitors, and conference guests.",
  },
  {
    icon: "graduate" as const,
    title: "International Student Support",
    text: "The International Office supports every international student at Galgotias University - from visa and FRRO guidance to grievance resolution, pre-arrival and post-arrival information, and ongoing support throughout their time on campus.",
  },
];

/* ── Contact ────────────────────────────────────────────────── */

export const ENQUIRY_TYPES = [
  "Inbound Programme - Winter Short-Term Exchange Programme",
  "Inbound Programme - iOS Student Developer Program",
  "Outbound Programme - NTU Global Programs",
  "Outbound Programme - Cambridge Global Summer Programme",
  "Institutional Partnership / MoU",
  "Industry Tie-Up",
  "International Student Support",
  "QS / THE Rankings Enquiry",
  "General Enquiry",
];

export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.2948785698!2d77.49568577499145!3d28.467512575757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cea1751baecf1%3A0x5e12069d73b1af5e!2sGalgotias%20University!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

export const FOOTER_LINKS = [
  ...NAV,
  { label: "Contact Us", href: "/contact" },
];

/* ── Homepage - audience routing ────────────────────────────── */

export const AUDIENCE_ROUTES = [
  {
    title: "International students",
    text: "Winter Short-Term Exchange and the iOS Student Developer Program.",
    href: "/programmes#inbound",
    cta: "Inbound programmes",
  },
  {
    title: "Current GU students",
    text: "EDVentures, NTU Singapore, Cambridge, and the Ynov CTF Challenge.",
    href: "/programmes#outbound",
    cta: "Outbound programmes",
  },
  {
    title: "Partner institutions",
    text: "Exchange, joint research, dual credentials, collaborative programming.",
    href: "/partnerships#partnerships",
    cta: "Institutional partnerships",
  },
  {
    title: "Delegations & industry",
    text: "Visits, summits, tie-ups, and events with the International Office.",
    href: "/events",
    cta: "Events & visits",
  },
];

/* ── Homepage - journey strip ──────────────────────────────── */
/* Every stop is an event or programme documented in the
   International Office write-up. */

export const JOURNEY = [
  { city: "Greater Noida", country: "India", lat: 28.47, lng: 77.5, note: "GU Campus - origin" },
  { city: "Goa", country: "India", lat: 15.3, lng: 74.12, note: "QS India Summit" },
  { city: "Shenzhen", country: "China", lat: 22.54, lng: 114.06, note: "QS China Summit 2026" },
  { city: "Hong Kong", country: "Hong Kong SAR", lat: 22.32, lng: 114.17, note: "THE Asia Universities Summit · EDVentures 2026" },
  { city: "Jakarta", country: "Indonesia", lat: -6.21, lng: 106.85, note: "GSD Congress · GSDC Jakarta 2026" },
  { city: "Cambridge", country: "United Kingdom", lat: 52.2, lng: 0.12, note: "Cambridge Global Summer Programme 2026" },
  { city: "Singapore", country: "Singapore", lat: 1.35, lng: 103.82, note: "NTU Global Short-Term Programmes" },
] as const;

/* ── Globe ──────────────────────────────────────────────────────
   Greater Noida is the hub; every other stop is a real route the
   office has run. Hong Kong is folded into Shenzhen on the globe
   because at this scale their markers collide.                    */

export const GLOBE_ORIGIN = {
  name: "Greater Noida",
  country: "India",
  lat: 28.47,
  lng: 77.5,
};

export const GLOBE_ROUTES = [
  { name: "Singapore", country: "Singapore", lat: 1.35, lng: 103.82 },
  { name: "Cambridge", country: "United Kingdom", lat: 52.2, lng: 0.12 },
  { name: "Hong Kong", country: "Hong Kong SAR", lat: 22.32, lng: 114.17 },
  { name: "Jakarta", country: "Indonesia", lat: -6.21, lng: 106.85 },
  { name: "Shenzhen", country: "China", lat: 22.54, lng: 114.06 },
  { name: "Goa", country: "India", lat: 15.3, lng: 74.12 },
] as const;

/* ── Homepage - student story ───────────────────────────────── */

export const STUDENT_STORY = {
  eyebrow: "Student story · Hong Kong",
  quote:
    "Innovation grows when ideas are exposed to new perspectives... it inspired us to build with greater purpose and a truly global vision.",
  name: "Gaurang Pant",
  role: "Founder & CEO, Project TACTO · B.Tech, Galgotias University",
  outcome:
    "Project TACTO - an assistive coding platform for blind and visually impaired learners - was named Champion among 19 finalist teams from 10 countries at EDVentures 2026, winning the AWS Championship Prize of USD 7,000.",
  href: "/programmes#edventures",
  cta: "Read the EDVentures story",
};
