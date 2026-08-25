/* ─────────────────────────────────────────────────────────────────────────
   Site copy.

   RECORDS — programs, events, partners, dates. Claims about what actually
   happened, sourced from the office's own write-ups. Nothing may be added
   here that has not been confirmed, and nothing embellished.

   EXPLANATION — everything else: how the office works, what a program
   contains, what makes an approach answerable.

   Two standing rules, learned the hard way:

   1. One idea, one home. "We only publish confirmed activity" belongs in
      OFFICE_COMMITMENTS and nowhere else. Remit belongs in the first FAQ.
      Inquiry format belongs on the contact page. Repeating a point across
      five sections does not reinforce it, it dilutes it.

   2. Not claimed here: any ranking position, accreditation grade, partner
      count, or signed memorandum. The office has no active institutional
      MoUs, so the partnerships page is written forward-looking.
   ───────────────────────────────────────────────────────────────────────── */

export const SITE = {
  name: "G-SCALE International",
  officeName: "G-SCALE International Office",
  university: "Galgotias University",
  tagline: "Building Opportunities. Transforming Futures.",
  descriptor: "International learning and partnerships at Galgotias University.",
  address:
    "A Block, 3rd Floor, Galgotias University, Greater Noida, Uttar Pradesh 201310, India",
  phone: "+91-120-4806806",
  phoneHref: "tel:+911204806806",
  email: "gscale_internationaloffice@galgotiasuniversity.edu.in",
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Mobility Programs", href: "/programs" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Innovation", href: "/innovation" },
  { label: "Events & Delegations", href: "/events" },
] as const;

/* ═══ Records ═════════════════════════════════════════════════════════════ */

export const GLOBE_ORIGIN = {
  name: "Greater Noida",
  country: "India",
  lat: 28.47,
  lng: 77.5,
} as const;

/* Each corridor below corresponds to documented activity: Cambridge and
   Singapore to outbound programs, Hong Kong to the THE summit and
   EDVentures, Jakarta to the congresses, Shenzhen to the QS China Summit,
   Goa to the QS India Summit. */
export const GLOBE_ROUTES = [
  { name: "Singapore", country: "Singapore", lat: 1.35, lng: 103.82 },
  { name: "Cambridge", country: "United Kingdom", lat: 52.2, lng: 0.12 },
  { name: "Hong Kong", country: "Hong Kong SAR", lat: 22.32, lng: 114.17 },
  { name: "Jakarta", country: "Indonesia", lat: -6.21, lng: 106.85 },
  { name: "Shenzhen", country: "China", lat: 22.54, lng: 114.06 },
  { name: "Goa", country: "India", lat: 15.3, lng: 74.12 },
] as const;

export const PREVIOUS_PROGRAMS = [
  {
    year: "2026",
    direction: "Outbound",
    title: "Cambridge Global Summer Program",
    institution: "Girton College, University of Cambridge",
    location: "Cambridge, United Kingdom",
    focus: "Entrepreneurship, frugal AI and public speaking",
    summary:
      "A two-week residential program at Girton College covering venture thinking, frugal AI and strategic innovation, and public speaking, plus a London immersion visit and a Cambridge Global Program certificate at the end.",
  },
  {
    year: "2025",
    direction: "Inbound",
    title: "iOS Student Developer Program",
    institution: "Galgotias University, with Apple and Infosys",
    location: "Greater Noida, India",
    focus: "App development, design thinking and cultural exchange",
    summary:
      "The inaugural cohort brought students from Nanyang Technological University and Villa College, Maldives to the iOS Development Center for a build-first fortnight, ending in a pitch before academic and industry panels.",
  },
  {
    year: "2025",
    direction: "Outbound",
    title: "ASEAN Summer Program",
    institution: "Nanyang Technological University",
    location: "Singapore and Vietnam",
    focus: "Food security, water purification and collaborative learning",
    summary:
      "Galgotias students worked inside an ASEAN cohort on food redistribution in Singapore and solar-powered water purification in the Mekong Delta. Two countries, two working prototypes.",
  },
] as const;

export const COLLABORATION_OUTCOMES = [
  {
    category: "Innovation",
    title: "EDVentures 2026, Hong Kong",
    text: "Project TACTO, built by Galgotias students, was named Champion at EDVentures 2026 in Hong Kong and took the AWS Championship Prize.",
  },
  {
    category: "Mobility",
    title: "iOS Student Developer Program 2025",
    text: "An inbound fortnight where app development, design thinking, industry visits and cultural program ran as one syllabus rather than four separate strands.",
  },
  {
    category: "Academic exchange",
    title: "NTU ASEAN Summer Program 2025",
    text: "Galgotias students assessed alongside peers from across the region, working on live regional problems rather than case studies.",
  },
] as const;

/* The award is the single strongest piece of evidence the office has, so it
   gets its own treatment rather than a line in a list. */
export const FLAGSHIP = {
  eyebrow: "EDVentures 2026 · Hong Kong",
  title: "Project TACTO was named Champion.",
  text: "An assistive EdTech platform built by Galgotias students, TACTO makes coding reachable for blind and visually impaired learners: tactile, NFC-enabled coding blocks carrying Braille markers and audio feedback in place of a screen. It won among nineteen finalist teams from ten countries at one of Asia's leading education innovation competitions, and took the AWS Championship Prize. A second Galgotias entrant, Team Tekurious, also reached the finals.",
  quote:
    "Innovation grows when ideas are exposed to new perspectives. It inspired us to build with greater purpose and a truly global vision.",
  attribution: "Gaurang Pant, Founder and CEO, Project TACTO",
} as const;

export const EVENT_RECORDS = [
  {
    type: "Presented",
    title: "QS India Summit",
    city: "Goa",
    date: "2025",
    location: "Goa, India",
    purpose:
      "Present the Galgotias-Drone Destination model for drone innovation and STEM esports to academic leaders from across India.",
    role: "Galgotias University presented the work of the Galgotias Center for Drone Intelligence and Simulation.",
    participants: "Academic leaders and institutional representatives from Indian universities.",
    outcome:
      "The Drone Soccer Arena, competitive flying built around teamwork and real-time decision-making, drew sustained interest from other institutions.",
    next: "The model runs on four pillars: faculty enablement, student training, curriculum integration and student community development.",
    related: "Industry partnership with Drone Destination Pvt. Ltd.",
  },
  {
    type: "Participated",
    title: "QS China Summit 2026",
    city: "Shenzhen",
    date: "8-9 April 2026",
    location: "Futian Shangri-La, Shenzhen",
    purpose:
      "Build partnerships across China and the Asia-Pacific and engage with regional thinking on internationalization.",
    role: "Galgotias University joined the summit as an institutional participant.",
    participants: "Higher education leaders from China and the Asia-Pacific region.",
    outcome:
      "Sessions covered skills and employability transformation, global university strategy, international student recruitment, and research and technology impact.",
    next: "Confirmed follow-up activity will be added once agreed with the institutions concerned.",
    related: "Institutional collaboration development",
  },
  {
    type: "Participated",
    title: "THE Asia Universities Summit 2026",
    city: "Hong Kong",
    date: "22-24 April 2026",
    location: "Hong Kong University of Science and Technology",
    purpose:
      "Engage with international conversations on academic innovation and university-industry collaboration.",
    role: "Galgotias University attended through its institutional delegation.",
    participants: "Higher education leaders and institutional representatives from across Asia.",
    outcome:
      "The program included the live reveal of the THE Asia University Rankings, the THE Awards Asia ceremony, and sessions on AI in education.",
    next: "Relationship-building activity was recorded for institutional follow-up.",
    related: "International partnerships",
  },
  {
    type: "Participated",
    title: "Global Sustainable Development Congress 2026",
    city: "Jakarta",
    date: "22-25 June 2026",
    location: "Jakarta, Indonesia",
    purpose:
      "Contribute to international conversations on sustainability, education and institutional impact.",
    role: "Galgotias University joined delegates from universities, governments, civil society and industry.",
    participants: "Universities, public institutions, industry and civil-society organizations.",
    outcome:
      "Sessions covered climate and energy transition, sustainable cities, education equality, the circular economy and ESG frameworks, alongside the live reveal of the THE Impact Rankings.",
    next: "Further outcomes will be added after institutional confirmation.",
    related: "Innovation and entrepreneurship",
  },
  {
    type: "Presented",
    title: "Global Startup and Development Congress 2026",
    city: "Jakarta",
    date: "June 2026",
    location: "Jakarta, Indonesia",
    purpose:
      "Put early-stage student ventures in front of an international audience of entrepreneurs and institutional leaders.",
    role: "Galgotias students presented three ventures: CarbonSynq Earth, Project TACTO and ReGrub.",
    participants:
      "Entrepreneurs, investors and institutional leaders from across the region.",
    outcome:
      "Two Galgotias students were also invited to the panel Creating Inclusive Pathways: Practical Solutions for Expanding Access to Sustainability Careers, alongside City University of Hong Kong, University of Santo Tomas and Schneider Electric.",
    next: "Presenting and speaking at the same congress is the pattern the office is trying to repeat elsewhere.",
    related: "Student entrepreneurship",
  },
  {
    type: "Hosted",
    title: "iOS Student Developer Program 2025",
    city: "Greater Noida",
    date: "December 2025",
    location: "Galgotias University, Greater Noida",
    purpose:
      "Host an inbound fortnight placing international students inside India's technology and innovation ecosystem.",
    role: "G-SCALE coordinated the program with the iOS Development Center and participating institutions.",
    participants:
      "An international student delegation from Nanyang Technological University, Singapore and Villa College, Maldives.",
    outcome:
      "App development and design thinking ran alongside industry visits to Paytm and Parle Products and cultural excursions to the Taj Mahal, Agra Fort and Dilli Haat.",
    next: "Future editions run on Winter and Spring cycles; dates are added once participation is arranged.",
    related: "Inbound short-term mobility",
  },
] as const;

/* ── The program catalog ─────────────────────────────────────────────
   What actually runs, in both directions, with the detail a prospective
   participant needs before deciding to apply. */

export const INBOUND_PROGRAMS = [
  {
    title: "iOS Student Developer Program",
    partner: "Supported by Apple and Infosys",
    length: "Two weeks, intensive residential",
    summary:
      "A build-first fortnight at the iOS Development Center. Participants ship a working iOS application addressing a real problem, then defend it in a final pitch before academic and industry panels.",
    detail: [
      "App development and product innovation",
      "Entrepreneurship and design-thinking workshops",
      "A mentored build and hackathon environment",
      "Industry visits, including Paytm and Parle Products",
      "Cultural program: Taj Mahal, Agra Fort, Dilli Haat",
    ],
    facts: [
      { term: "Credits", detail: "3 transferable academic credits" },
      { term: "Cycles", detail: "Winter (Nov-Jan) and Spring (Feb-Apr)" },
      { term: "Language", detail: "Taught in English" },
      { term: "Location", detail: "Greater Noida, India" },
    ],
  },
  {
    title: "Winter Short-Term Exchange Program",
    partner: "Open to nominated participants from partner institutions",
    length: "Short-term, thematic",
    summary:
      "Built around thematic academic tracks rather than a single subject: interactive workshops, project-based learning and expert masterclasses, with cultural immersion and industry visits running alongside.",
    detail: [
      "Thematic academic tracks and faculty-led masterclasses",
      "Project-based learning in interdisciplinary teams",
      "Industry and innovation visits across the region",
      "Cultural and heritage program",
    ],
    facts: [
      { term: "Outcome", detail: "Intercultural competence and a global perspective" },
      { term: "Exposure", detail: "India's higher education and industry ecosystem" },
      { term: "Skills", detail: "Practical, project-based work with a deliverable" },
      { term: "Network", detail: "Working relationships with an international cohort" },
    ],
  },
] as const;

export const OUTBOUND_PROGRAMS = [
  {
    title: "NTU Global Short-Term Programs",
    partner: "Nanyang Technological University, Singapore",
    length: "ASEAN Summer @ NTU, four weeks · GEM Trailblazer, two weeks",
    summary:
      "Galgotias nominates and supports eligible students for selected NTU short-term programs, combining interdisciplinary learning, collaborative project work and cross-cultural exchange.",
    detail: [
      "ASEAN Summer @ NTU: a scholarship program drawing students from across ASEAN and partner universities",
      "GEM Trailblazer: NTU's flagship short-term mobility initiative, academic and experiential",
      "Merit-based financial support is available on nomination",
    ],
    facts: [
      { term: "2025 work", detail: "ReGrub, a food-redistribution system for migrant workers in Singapore" },
      { term: "2025 work", detail: "SalvaAqua, solar-powered water purification in the Mekong Delta" },
    ],
  },
  {
    title: "Cambridge Global Summer Program",
    partner: "Girton College, University of Cambridge",
    length: "Two weeks, residential",
    summary:
      "A residential program in the collegiate setting, taught by Cambridge-affiliated faculty, where participants pitch and defend their work in front of people who have never met them.",
    detail: [
      "Entrepreneurship and venture thinking",
      "Frugal AI and strategic innovation",
      "Public speaking and communication",
      "A London immersion visit",
    ],
    facts: [
      { term: "2026 dates", detail: "12-25 July 2026" },
      { term: "Award", detail: "International Certification from the Cambridge Global Program" },
    ],
  },
  {
    title: "Global Ynov Partners CTF Challenge",
    partner: "Hosted on the Hack The Box platform",
    length: "Competition, remote",
    summary:
      "An inter-university capture-the-flag cybersecurity competition run in English, French and Spanish, with a live global leaderboard and industry-level benchmarking.",
    detail: [
      "Web exploitation, cryptography and forensics",
      "Reverse engineering and binary exploitation",
      "Open-source intelligence (OSINT)",
    ],
    facts: [
      { term: "Certification", detail: "Awarded by Hack The Box and Ynov Campus" },
      { term: "Format", detail: "Live inter-university leaderboard with global standings" },
    ],
  },
] as const;

/* The real nomination route, as the office runs it. */
export const PARTICIPATION_STEPS = [
  {
    title: "Departmental nomination",
    text: "Your school puts you forward on academic performance and co-curricular standing. This is where most applications are decided, and it happens before the office sees your name.",
    note: "Talk to your department early. They cannot nominate someone they have not heard from.",
  },
  {
    title: "Profile evaluation",
    text: "The International Office reviews nominated profiles against the requirements the host institution has set for that program.",
    note: "Requirements differ by host. Read the call rather than assuming last year's rules.",
  },
  {
    title: "Interview",
    text: "A conversation assessing communication, motivation and readiness to represent the University somewhere it is not already known.",
    note: "You will be asked why this program rather than any program.",
  },
  {
    title: "Final nomination",
    text: "Confirmed nominations go forward to the host institution. Merit-based financial support is available on some programs and is confirmed at this stage.",
    note: "You are told the outcome either way, including when it is no.",
  },
] as const;

/* ── Industry and innovation network ─────────────────────────────────────
   Named partners with facilities on campus. This is the concrete answer to
   "what does an international program here actually give me access to". */

export const INDUSTRY_PARTNERS = [
  {
    partner: "Apple and Infosys",
    facility: "iOS Development Center",
    text: "Hands-on iOS training and a pipeline of student-led application projects. It is the center the inbound developer program is built around.",
  },
  {
    partner: "Wipro",
    facility: "Cybersecurity Center of Excellence",
    text: "Information security, ethical hacking and digital defense, taught in a dedicated center rather than as a module bolted onto a degree.",
  },
  {
    partner: "Tata Technologies",
    facility: "Innovation Hub",
    text: "Industry-standard manufacturing tools and real project environments for engineering and product design students.",
  },
  {
    partner: "L&T EduTech",
    facility: "Engineering and technical education",
    text: "Industry-aligned engineering curriculum, hands-on training modules and project work set by people who build things for a living.",
  },
  {
    partner: "Drone Destination",
    facility: "Galgotias Center for Drone Intelligence and Simulation",
    text: "UAV training across design, build, mission planning and operations, plus the Drone Soccer Arena, a STEM esports program in competitive precision flying.",
  },
] as const;

/* ── The G-SCALE framework itself ────────────────────────────────────────
   The site is named after it and never explained it. */

export const GSCALE_FRAMEWORK = {
  expansion: "Galgotias Student-Centered Active Learning Ecosystem",
  summary:
    "A university-wide move away from lecture-driven instruction toward collaboration, industry exposure and technology, benchmarked against leading global universities and drawing directly on the model at Nanyang Technological University, Singapore.",
  premise:
    "The premise is unfashionably simple: higher education should build critical thinking, problem-solving and leadership, not transmit knowledge and test whether it stuck.",
  pillars: [
    {
      title: "Active learning",
      text: "Flipped classrooms, team-based learning, peer instruction and collaborative project work replace passive note-taking as the main mode of teaching.",
    },
    {
      title: "AI and digital pedagogy",
      text: "AI, learning analytics and digital tools support adaptive learning pathways rather than a single pace for an entire cohort.",
    },
    {
      title: "Real-world problem solving",
      text: "Live industry challenges, research problems and societal issues run through programs instead of appearing once as a capstone.",
    },
    {
      title: "Industry and international exposure",
      text: "Outbound programs, industry tie-ups and international research collaboration: the pillar that cannot be built inside the campus boundary, because it depends on institutions the University does not control.",
    },
  ],
} as const;

export const INQUIRY_CATEGORIES = [
  "Outbound mobility program",
  "Inbound short-term program",
  "Institutional collaboration",
  "Academic event or forum",
  "Visiting delegation",
  "General G-SCALE inquiry",
] as const;

/* ═══ Explanation ═════════════════════════════════════════════════════════ */

export const PRIORITIES = [
  {
    title: "Quality education",
    text: "Active, authentic, technology-enabled teaching: the kind where students build something and then have to defend it, rather than sit through it.",
    detail:
      "International programs are held to that same standard. If a week abroad would not survive comparison with a good week on campus, it does not run.",
  },
  {
    title: "Purposeful learning experiences",
    text: "Learning attached to a real institution, industry, community or culture outside the classroom, with a stated reason for being there.",
    detail:
      "Travel is the cheapest part of a mobility program. The expensive part is designing what happens once everybody has landed.",
  },
  {
    title: "Innovation and entrepreneurship",
    text: "Students treated as genuine partners in innovation, encouraged to own an idea, carry it past a submission deadline and find out what it is worth elsewhere.",
    detail:
      "In 2026 that meant a Galgotias team winning EDVentures in Hong Kong against nineteen finalists from ten countries.",
  },
] as const;

/* Written from the office's own remit, with one correction: the University
   does not in practice run end-to-end visa, accommodation or welfare
   support out of this office. It operates as first point of contact and
   routes to the team that owns each process. */
export const OFFICE_ROLES = [
  {
    title: "Outbound student mobility",
    text: "Finding and running the overseas study, research and competition opportunities open to Galgotias students: program partnerships, selection and nomination, and the pre-departure and post-program documentation that turns a place into a real one.",
  },
  {
    title: "Inbound short-term programs",
    text: "Hosting nominated participants from partner institutions: academic integration with the schools teaching them, the industry and cultural components, and first-line guidance on arrival matters before handing over to the University teams that own them.",
  },
  {
    title: "Institutional partnerships",
    text: "Identifying partners, negotiating agreements, and keeping active collaborations producing something. The office is currently expanding this network rather than resting on it.",
  },
  {
    title: "Global positioning and forums",
    text: "Coordinating the University's participation in QS and Times Higher Education forums, briefing the people who attend, and supporting departments building the international collaboration that participation depends on.",
  },
  {
    title: "Events and delegations",
    text: "Organizing visits to campus, coordinating Galgotias participation in summits abroad, and hosting international delegations, academic visitors and conference guests.",
  },
  {
    title: "Innovation and enterprise routes",
    text: "Connecting student and faculty ventures to international competitions, incubators and audiences, the route that took Project TACTO to Hong Kong and three ventures to Jakarta.",
  },
] as const;

export const READINESS = [
  {
    title: "Talk to your school before anything else",
    text: "Nomination starts in your department, not in this office. They weigh academic performance and co-curricular standing, and they cannot put forward someone who has never raised it with them.",
  },
  {
    title: "Check where you stand academically",
    text: "Every host sets its own bar and it is checked. If yours is borderline, say so in the application rather than hoping the question does not come up.",
  },
  {
    title: "Have a passport that is genuinely valid",
    text: "Six months beyond your intended return is the common requirement. Renewals take longer than most students expect, and no host will hold a place while you wait.",
  },
  {
    title: "Work out who is paying",
    text: "Merit-based financial support exists on some nominations and is confirmed at the final stage, not before. Have the honest conversation at home while you still have the option of withdrawing.",
  },
] as const;

export const COST_NOTES = [
  {
    label: "Program fee",
    text: "Charged by the host institution. Sometimes teaching only, sometimes teaching plus accommodation and meals; the call states which.",
  },
  {
    label: "Travel",
    text: "Flights and local transport, arranged by you. Booking early matters more than it sounds when several people are heading to the same place.",
  },
  {
    label: "Visa and insurance",
    text: "Application fees, appointments and mandatory health or travel cover. Requirements vary by country and change without much notice.",
  },
  {
    label: "Living costs",
    text: "Food, local travel, and anything the fee does not include. Cities differ enormously; ask what a week actually costs before assuming.",
  },
] as const;

export const COLLABORATION_AREAS = [
  {
    title: "Student and faculty mobility",
    text: "Short-term and semester-length places in both directions, with the academic alignment settled before anyone books a flight.",
    outcome: "International academic experience",
  },
  {
    title: "Joint research and academic exchange",
    text: "Co-supervised work, joint publications, visiting faculty and seminar series: the slower kind of collaboration that outlasts the people who started it.",
    outcome: "Shared knowledge and research activity",
  },
  {
    title: "Curriculum and program development",
    text: "Benchmarking against your programs, co-designed academic activity, and credit pathways a registrar will actually accept.",
    outcome: "Relevant and globally informed learning",
  },
  {
    title: "Innovation and entrepreneurship",
    text: "International competitions, incubator access and introductions that give a student venture an audience beyond the campus that produced it.",
    outcome: "Ideas tested in wider contexts",
  },
  {
    title: "Industry-supported learning",
    text: "Applied projects with a real client and access to the specialist centers already on campus: iOS, cybersecurity, manufacturing, UAV systems.",
    outcome: "Learning connected with practice",
  },
  {
    title: "Events and delegations",
    text: "Forums, workshops and institutional visits: usually where a collaboration starts, occasionally where one gets repaired.",
    outcome: "Relationships developed through activity",
  },
] as const;

export const COLLABORATION_PROCESS = [
  {
    title: "Define the purpose",
    text: "One honest conversation about what each side actually needs. If neither of us can name the academic reason in a sentence, we stop here, which is a good outcome and not a failed one.",
  },
  {
    title: "Design the activity",
    text: "Who takes part, what they do, who teaches, how it is assessed, what it costs and who pays. Settled before anything is signed.",
  },
  {
    title: "Deliver",
    text: "Run with the schools and University teams whose work it touches, with one named contact on each side who can answer a question the same week.",
  },
  {
    title: "Review",
    text: "What worked, what did not, and whether it runs again. The second edition is the real test of the first.",
  },
] as const;

export const PARTNER_SIGNALS = {
  strong: [
    "A named academic on your side who wants this, not only an international office",
    "A specific discipline or problem, rather than areas of mutual interest",
    "An indication of when: a term, a semester, an academic year",
    "A sense of scale, because two students and twenty are different projects",
    "Some idea of what should exist at the end of it",
  ],
  weak: [
    "A template memorandum with our name substituted into it",
    "A proposal that depends entirely on funding neither side has secured",
    "An agreement with no activity attached to it",
    "A request to sign first and design the collaboration later",
  ],
} as const;

export const EVENT_RATIONALE = [
  {
    title: "To be in the room where the sector argues",
    text: "Priorities in higher education are set in rooms like these months before they surface in a policy document. A university that only reads the proceedings is permanently a year behind them.",
  },
  {
    title: "To meet partners as people",
    text: "Almost every collaboration on this site began as a conversation at an event rather than an email to a general inbox. Ten minutes in person outruns six weeks of correspondence.",
  },
  {
    title: "To put student work in front of strangers",
    text: "Three Galgotias ventures pitched in Jakarta; one won its category in Hong Kong. An audience with no reason to be encouraging gives worse feedback, and therefore better.",
  },
  {
    title: "To bring something back",
    text: "Every delegation is expected to return with something that reaches students who did not travel: a contact, a reading, a program idea. Attendance on its own does not count.",
  },
] as const;

export const EVENT_PROPOSAL = [
  {
    title: "Say what it is for",
    text: "The academic question, problem or relationship the event exists to move. A theme is not a purpose.",
  },
  {
    title: "Name who should be in the room",
    text: "Disciplines, institutions, roles. Whether students are participants or audience changes the entire design.",
  },
  {
    title: "Give a window, not a date",
    text: "A month or a term is enough to start. Fixed dates arrive once both academic calendars have been checked against each other.",
  },
  {
    title: "Say what should exist afterwards",
    text: "A paper, a cohort, a pilot, a signed pathway, a return visit. Events without an afterwards rarely get a second edition.",
  },
] as const;

export const PRACTICE = [
  {
    title: "A term that does not look like the last one",
    text: "You join a cohort drawn from several institutions, taught by people who have never seen your transcript and assessed against expectations nobody has spelled out. It is uncomfortable for roughly a week. That week is most of the value.",
  },
  {
    title: "Faculty who bring the outside in",
    text: "Staff come back from a collaboration with a reading list, a contact, a way of running a seminar they had not seen before. Most of the benefit lands on students who never left Greater Noida.",
  },
  {
    title: "Work tested somewhere it is not already believed in",
    text: "A venture that convinces a room on campus is not yet convincing. In Hong Kong and Jakarta, Galgotias student ventures were read by panels with no reason to be kind, and one of them won.",
  },
  {
    title: "Relationships that outlast the agreement",
    text: "The signing photograph is the least interesting part of any partnership. What counts is the second cohort, the joint paper, the return visit, the things that only happen when the first round went well.",
  },
] as const;

export const OFFICE_COMMITMENTS = [
  {
    title: "Publish only what is confirmed",
    text: "No program, partnership or outcome appears on this website while it is still a proposal. An empty section is more useful than a hopeful one, and it costs the office nothing to admit that nothing is open this month.",
  },
  {
    title: "Be the first point of contact, not a dead end",
    text: "International inquiries rarely arrive neatly sorted. Where a question belongs to another University team, the office names that team rather than forwarding your message quietly and hoping.",
  },
  {
    title: "Design around participants, not agreements",
    text: "The test of a collaboration is what students and faculty actually did because of it. A count of signed memoranda is an administrative statistic, not an achievement, which is why this site does not carry one.",
  },
  {
    title: "Keep the record checkable",
    text: "Completed programs, forums and delegations stay up with their purpose, participants and outcome, including the ones whose follow-up is still pending. Work that can be checked is worth more than work taken on trust.",
  },
] as const;

/* The office roster. A slug resolves to a portrait in
   `public/team/<slug>.<ext>` when that file exists; a bio is a short paragraph
   written for this page, added as each member signs it off. Members without
   one carry a single-line focus instead. Groups set the display order on the
   about page, while people within a group remain on the same visual level. */
export const TEAM = [
  {
    slug: "mellissa-tawin",
    name: "Mellissa Callendre Tawin",
    role: "Associate Director, G-SCALE",
    group: "Leadership",
    bio: "Mellissa has spent more than twenty-three years in higher education management, most recently as Deputy Director for strategic partnerships and internationalisation at InsPIRE, Nanyang Technological University. There she built university-wide frameworks for faculty awards and academic integrity, ran the Nanyang Education Awards, and led the communications that carried both. She holds a Master of Education in management from James Cook University. At G-SCALE she owns the office's institutional relationships: usually the first voice a partner university hears, and the one who keeps what was promised and what was delivered the same thing.",
  },
  {
    slug: "yeong-jin-yuan",
    name: "Yeong Jin Yuan (JY)",
    role: "Associate Director, G-SCALE",
    group: "Leadership",
    bio: "JY arrives from Nanyang Technological University, where he spent over a decade in academic development, latterly as Assistant Director for teaching and learning strategies at the university's teaching centre. His work has sat at the junction of faculty engagement, institutional quality and the design of the spaces learning happens in, much of it built alongside collaborators in other countries. At G-SCALE he leads program design and the academic alignment behind each partnership, so that what a visiting institution is taught here holds up against what it teaches at home.",
  },
  {
    slug: "yash-vardhan-raj",
    name: "Yash Vardhan Raj",
    role: "Global Engagement Officer, G-SCALE",
    group: "The office",
    focus:
      "Runs outbound mobility end to end: nomination, host liaison and pre-departure.",
  },
  {
    slug: "kavya-singh",
    name: "Kavya Singh",
    role: "Marketing Communications and Outreach Executive, G-SCALE",
    group: "The office",
    focus:
      "Responsible for how the office speaks, publishes and reaches the people it serves.",
  },
  {
    slug: "gaurang-pant",
    name: "Gaurang Pant",
    role: "Student Intern, G-SCALE",
    group: "Student team",
    focus: "Founder of Project TACTO, EDVentures 2026 Champion.",
  },
  {
    slug: "karan-tandon",
    name: "Karan Tandon",
    role: "Student Intern, G-SCALE",
    group: "Student team",
    focus: "B.Tech Biotechnology; GEM Trailblazer participant.",
  },
  {
    slug: "gagan-pathak",
    name: "Gagan Pathak",
    role: "Student Intern, G-SCALE",
    group: "Student team",
    focus: "Journalism and Mass Communication; GEM Trailblazer participant.",
  },
] as const;

export const TEAM_GROUPS = ["Leadership", "The office", "Student team"] as const;

export const AUDIENCES = [
  {
    label: "For students",
    title: "You want an academic experience outside this campus",
    points: [
      "Outbound programs with NTU Singapore, Cambridge and international competitions",
      "Nomination through your department, then profile review and interview",
      "Merit-based financial support on some programs, confirmed at final nomination",
      "A record of what previous cohorts actually built and where",
    ],
    action: "See mobility programs",
    href: "/programs",
  },
  {
    label: "For partner institutions",
    title: "You want to send participants to Galgotias University",
    points: [
      "The iOS Student Developer Program, built around Apple and Infosys facilities",
      "The Winter Short-Term Exchange Program, thematic and project-based",
      "Nomination-based entry: these are not routes into a Galgotias degree",
      "Learning outcomes agreed with your academics before the cohort arrives",
    ],
    action: "See inbound programs",
    href: "/programs#inbound",
  },
  {
    label: "For universities and organizations",
    title: "You want to build something with us",
    points: [
      "Mobility, joint research, curriculum development and innovation collaboration",
      "Access to specialist centers in iOS development, cybersecurity, manufacturing and UAV systems",
      "Academic forums, workshops and institutional visits",
      "A first conversation that ends in a decision rather than another meeting",
    ],
    action: "Explore partnership",
    href: "/partnerships",
  },
] as const;

export const RESPONSE_PROCESS = [
  {
    title: "It is read by a person",
    text: "Inquiries are read in the office, not sorted by a system. If yours belongs to another University team, you are told which one rather than left waiting.",
  },
  {
    title: "It is matched to a program or a colleague",
    text: "Specific inquiries reach whoever can answer them. General ones take longer, because somebody first has to work out what was being asked.",
  },
  {
    title: "You get an answer, including no",
    text: "A clear no is more useful than a polite silence, and you will get one where the answer is no. Where it is not yet, we will say what would change it.",
  },
  {
    title: "Student inquiries route through your school",
    text: "If you are asking about an outbound place, expect to be pointed back to your department: nomination genuinely starts there, and the office cannot shortcut it.",
  },
] as const;

export const FAQS = [
  {
    question: "Does G-SCALE handle admissions, visas or accommodation?",
    answer:
      "Not as the office that owns those processes. Degree admissions, visa issuance and FRRO registration, accommodation and student welfare each sit with a specialist University team, and those inquiries belong with them; sending them here adds a step rather than removing one.",
  },
  {
    question: "How are participants selected for outbound programs?",
    answer:
      "Departmental nomination first, on academic performance and co-curricular standing. The International Office then evaluates nominated profiles against the host institution's requirements, followed by an interview covering communication, motivation and readiness. Final nominations go forward to the host, and merit-based financial support is confirmed at that point. There is no separate route and no informal waiting list.",
  },
  {
    question: "Why are there no open programs listed right now?",
    answer:
      "Because none are confirmed. A call goes up once the host, the dates, the eligibility and the application route are all settled. The program catalog on the mobility page shows what runs in a normal year (NTU Singapore, Cambridge, the CTF challenge, the inbound developer program), which is the best guide to what will open again.",
  },
  {
    question: "What does a program cost?",
    answer:
      "It depends entirely on the program, and every confirmed call carries its own figures. Plan for up to five things: the program fee, travel, visa and insurance, living costs, and whatever the host charges for accommodation. Merit-based support exists on some nominations and is confirmed at final nomination, not before and never automatically.",
  },
  {
    question: "Can I propose a program or a partner institution myself?",
    answer:
      "Yes. Faculty do this more often than students, but both are welcome. Send the academic reason, the institution, roughly when, and what would exist at the end. If a colleague at that institution is already interested, say so; it moves considerably faster than a cold approach in either direction.",
  },
  {
    question: "Do we need a memorandum of understanding to start?",
    answer:
      "Not to start a conversation, and often not to run a first activity. Plenty of collaborations begin with a single workshop or visit and formalise later, once both sides know the relationship is worth the paperwork. Signing first and designing afterwards is the pattern that most reliably produces nothing.",
  },
  {
    question: "Are international students taught in English?",
    answer:
      "Yes on the inbound programs this office runs. The iOS Student Developer Program is taught in English and carries three transferable academic credits; the Winter Short-Term Exchange Program runs thematic tracks in English with faculty-led masterclasses.",
  },
  {
    question: "How quickly does the office reply?",
    answer:
      "Inquiries are answered in the order they arrive, and a specific question is always faster than a general one. A message naming a program, an institution and a rough date can usually be closed in a single reply instead of three.",
  },
] as const;

export const GLOSSARY = [
  {
    term: "Outbound",
    definition:
      "A program taking Galgotias students to another institution: a summer at NTU, a fortnight at Cambridge, an international competition.",
  },
  {
    term: "Inbound",
    definition:
      "A short-term program hosted at Greater Noida for participants nominated by a partner institution. It is not a route into a Galgotias degree.",
  },
  {
    term: "Mobility",
    definition:
      "Any movement of students or staff between institutions for academic purposes, from a one-week workshop to a full semester.",
  },
  {
    term: "Nomination",
    definition:
      "A home institution formally putting a participant forward. Most short-term programs take nominated participants rather than direct applications.",
  },
  {
    term: "Delegation",
    definition:
      "A group visiting another institution on the University's behalf, normally to open, develop or review one specific relationship.",
  },
  {
    term: "Memorandum of understanding",
    definition:
      "A written statement that two institutions intend to work together. Useful. Not, on its own, an activity.",
  },
  {
    term: "Credit pathway",
    definition:
      "An agreed route by which work completed elsewhere counts toward a Galgotias program. Agreed in advance, never assumed afterwards.",
  },
  {
    term: "G-SCALE",
    definition:
      "The Galgotias Student-Centered Active Learning Ecosystem, the University's teaching framework and the reason this office is named as it is.",
  },
] as const;

/* ═══ Innovation and entrepreneurship ═════════════════════════════════════
   The third institutional pillar, and the one this office routes abroad.
   Everything named below is drawn from the write-ups: the EDVentures
   result, the Jakarta ventures, the NTU project work, the on-campus
   centers. No funding figures beyond the one the award itself carried. */

export const VENTURE_INTRO = {
  eyebrow: "From ideas to impact",
  title: "Students are treated as partners in innovation, not an audience for it.",
  lede:
    "Innovation at Galgotias is not a club, a module or a wing of the building. It is the expectation that a student who has an idea will be given somewhere to build it, someone to argue with about it, and eventually a room full of strangers to defend it in.",
  body: "The International Office owns the last part of that sentence. Ideas developed on campus are useful; ideas that have survived an audience with no reason to be kind are worth something. So the office puts student ventures in front of international competitions, congresses, incubators and industry panels, and brings back what those rooms said.",
} as const;

export const VENTURE_STAGES = [
  {
    stage: "Build",
    title: "Somewhere to make the thing",
    text: "The specialist centers on campus each run with a named industry partner inside them, so a venture starts with access to real equipment rather than a slide deck about it. The partnerships page lists what sits in each.",
  },
  {
    stage: "Test",
    title: "Someone to argue with",
    text: "Incubation, mentorship and the Galgotias Innovation Fund exist to make an idea survive contact with people who will ask what it costs, who it is for, and why it does not already exist. Most ideas change shape here. That is the point of the stage.",
  },
  {
    stage: "Travel",
    title: "A room that owes you nothing",
    text: "This is the office's part. Competitions, congresses and partner institutions abroad, where nobody knows the founder and the work has to speak. The feedback is harder and the failure rate is higher, which is exactly why it is worth the airfare.",
  },
  {
    stage: "Return",
    title: "Something that reaches the campus",
    text: "A venture that travels is expected to come back with more than photographs: a contact, a redesign, a partnership, a cohort that now knows what a real pitch sounds like. Attendance on its own does not count.",
  },
] as const;

export const VENTURES = [
  {
    name: "Project TACTO",
    lead: "Gaurang Pant",
    status: "EDVentures 2026 Champion",
    accent: "crimson",
    text: "Coding without a screen. A blind or visually impaired learner arranges NFC-tagged blocks by hand, Braille markers and audio feedback standing in for the display. It began as coursework and left as a product.",
    result: "Champion at EDVentures 2026, Hong Kong, with the AWS Championship Prize. The field it won is described further down this page.",
  },
  {
    name: "ReGrub",
    lead: "Yash Vardhan Raj",
    status: "NTU ASEAN Summer Program, Singapore",
    accent: "azure",
    text: "A food-redistribution system built for migrant worker communities in Singapore, developed inside an international cohort rather than a home-campus team, which meant defending the design to people with direct knowledge of the problem.",
    result: "Presented at the Global Startup and Development Congress in Jakarta.",
  },
  {
    name: "SalvaAqua",
    lead: "Yash Vardhan Raj",
    status: "NTU ASEAN Summer Program, Vietnam",
    accent: "azure",
    text: "A solar-powered water purification solution developed for the Mekong Delta, with fieldwork done on site. The second of two working prototypes produced across a single four-week program in two countries.",
    result: "Delivered as part of the 2025 ASEAN Summer cohort.",
  },
  {
    name: "CarbonSynq Earth",
    lead: "Pushkar Singh",
    status: "GSDC Jakarta 2026",
    accent: "amber",
    text: "A climate venture taken to the Global Startup and Development Congress, presented alongside entrepreneurs and institutional leaders from across the region.",
    result: "One of three Galgotias ventures presenting at the congress.",
  },
  {
    name: "Team Tekurious",
    lead: "Smart Learn",
    status: "EDVentures 2026 Finalist",
    accent: "crimson",
    text: "The University's second entrant at EDVentures, reaching the final alongside Project TACTO: two teams from one institution in a field drawn from ten countries.",
    result: "Finalist, EDVentures 2026, Hong Kong.",
  },
] as const;

export const VENTURE_PLATFORMS = [
  {
    title: "EDVentures",
    place: "Hong Kong",
    text: "One of Asia's leading education innovation competitions. Nineteen finalist teams, ten countries, and a judging panel with no institutional loyalty to anybody in the room.",
  },
  {
    title: "Global Startup and Development Congress",
    place: "Jakarta",
    text: "Three Galgotias ventures presented; two students were also invited to the panel Creating Inclusive Pathways: Practical Solutions for Expanding Access to Sustainability Careers, alongside City University of Hong Kong, University of Santo Tomas and Schneider Electric.",
  },
  {
    title: "Global Ynov Partners CTF Challenge",
    place: "Remote, three languages",
    text: "An inter-university capture-the-flag competition on the Hack The Box platform: web exploitation, cryptography, forensics, reverse engineering and OSINT, benchmarked against a live global leaderboard.",
  },
  {
    title: "Cambridge Global Summer Program",
    place: "Girton College, Cambridge",
    text: "Two residential weeks on venture thinking, frugal AI and strategic innovation, closing with participants pitching to an audience that had never met them.",
  },
] as const;

export const VENTURE_ROUTES = [
  {
    label: "If you have an idea and nothing else",
    text: "Start on campus. Use the centers, find a mentor, and get something working that a stranger could pick up. The office cannot take a concept abroad; it can take a prototype.",
    action: "See what runs on campus",
    href: "/partnerships#industry",
  },
  {
    label: "If you have something built",
    text: "Tell us what it does, who it is for, and what would change if a hundred people used it. If there is a competition or congress where that question gets answered, we will find it.",
    action: "Write to the office",
    href: "/contact",
  },
  {
    label: "If you are an institution or investor",
    text: "The ventures on this page came through mobility programs and partnerships, not a pitch pipeline. Building either is the fastest way to meet the next ones.",
    action: "Explore partnership",
    href: "/partnerships",
  },
] as const;
