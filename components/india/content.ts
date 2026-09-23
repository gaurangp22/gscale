/* ─────────────────────────────────────────────────────────────────────────
   Learn in India — programme copy.

   Sourced from the December 2026 poster (four programmes) and the L&T
   three-programme brochure. Nothing here goes beyond those two documents;
   the fee, credit and itinerary caveats travel with the numbers.
   ───────────────────────────────────────────────────────────────────────── */

export const EDITION = {
  dates: "7–20 December 2026",
  place: "Greater Noida, India",
  length: "10–12 days",
  credits: "3",
  email: "gscale_internationaloffice@galgotiasuniversity.edu.in",
} as const;

export type ProgrammeId = "A" | "B" | "C" | "D";

export type Programme = {
  id: ProgrammeId;
  title: string;
  titleLines: string[];
  kicker: string;
  fee: string;
  withLT: boolean;
  /** Card ground and its lighter companion. */
  hue: string;
  glow: string;
  forStudents?: string;
  inside: string[];
  doing: string[];
  themes: string[];
  tools?: string[];
  leaveWith?: string;
  sdgs: number[];
};

export const PROGRAMMES: Programme[] = [
  {
    id: "A",
    title: "Digital Futures",
    titleLines: ["Digital", "Futures"],
    kicker: "Innovation, design & entrepreneurship: building technology for good",
    fee: "USD 1,000",
    withLT: false,
    hue: "#2e3a5c",
    glow: "#c9d2e6",
    forStudents: "Across academic disciplines.",
    inside: ["iOS Developer programme", "Excursions", "Cultural Night"],
    doing: [
      "Build and validate a digital MVP with faculty and iOS student mentors",
      "Meet entrepreneurs and step inside industry and innovation ecosystems",
      "Pitch before faculty, industry experts and participating peers",
    ],
    themes: ["Future of learning", "Digital health & wellbeing", "Smart & sustainable campus", "AI for social good", "Connected communities", "Entrepreneurship for impact"],
    tools: ["Design Thinking", "Entrepreneurship and systems thinking", "AI and rapid development tools"],
    leaveWith: "A tested prototype and a compelling pitch.",
    sdgs: [4, 8, 9, 17],
  },
  {
    id: "B",
    title: "Digital Product Engineering & AI",
    titleLines: ["Digital Product", "Engineering & AI"],
    kicker: "From problem statement to live product demo",
    fee: "USD 1,200",
    withLT: true,
    hue: "#6a3f73",
    glow: "#e2cfe3",
    forStudents: "Computer science, IT, design, business and any discipline with a product idea.",
    inside: ["L&T-powered learning", "Hackathon", "Excursions", "Cultural Night"],
    doing: [
      "Build full-stack products with AI coding agents, Python and Streamlit or FastAPI",
      "Test, apply responsible-AI checks and pitch to a client-style jury",
      "Work in a squad with a product owner, builder, designer and storyteller",
    ],
    themes: ["AI-enabled learner support", "Smart campus services", "Sustainable operations", "International onboarding"],
    tools: ["AI coding agents", "Python", "Streamlit & FastAPI", "Responsible-AI checks"],
    leaveWith: "A working product, a client-style pitch and a responsible-AI review.",
    sdgs: [4, 8, 9, 17],
  },
  {
    id: "C",
    title: "E-Mobility Futures",
    titleLines: ["E-Mobility", "Futures"],
    kicker: "Innovation, engineering & entrepreneurship for sustainable mobility",
    fee: "USD 1,200",
    withLT: true,
    hue: "#3f6b55",
    glow: "#cfe0d2",
    forStudents: "Core engineering, computer science, commerce, finance, management and sciences.",
    inside: ["L&T-powered learning", "Hackathon", "Excursions", "Cultural Night"],
    doing: [
      "Explore EV batteries, powertrains, charging and business models",
      "Model with MATLAB or Python and build a financial case and rollout plan",
      "Defend the technical, financial and sustainability case to a jury",
    ],
    themes: ["Solar-integrated charging", "Battery health & safety", "Vehicle-to-grid", "Electric last-mile fleets"],
    tools: ["MATLAB", "Python", "Battery modelling", "Financial modelling"],
    leaveWith: "A validated mobility concept with a technical, financial and sustainability case.",
    sdgs: [4, 7, 8, 9, 11],
  },
  {
    id: "D",
    title: "Smart City Engineering",
    titleLines: ["Smart City", "Engineering"],
    kicker: "AI prototyping, spatial mapping & project execution for cities",
    fee: "USD 1,200",
    withLT: true,
    hue: "#b5533c",
    glow: "#f1d0c3",
    forStudents: "Civil engineering, AI and computing, spatial mapping, environment and project management.",
    inside: ["L&T-powered learning", "Hackathon", "Excursions", "Cultural Night"],
    doing: [
      "Assess field photographs with AI Vision apps and map priority locations",
      "Plan delivery with a WBS, CPM schedule and Gantt charts",
      "Turn the plan into an executive pitch with an SDG feasibility case",
    ],
    themes: ["Pedestrian walkability", "Urban flooding & drainage", "Smart solid waste", "Net-zero campus"],
    tools: ["Python & Streamlit", "Vision API", "Spatial mapping", "ProjectLibre", "Gantt & CPM"],
    leaveWith: "An AI Vision prototype, a priority map and a buildable execution plan.",
    sdgs: [3, 9, 11, 13],
  },
];

export const PHASES = [
  {
    n: "01",
    title: "Arrive & orient",
    body: "Welcome, team formation, Indian culture, and New Delhi.",
  },
  {
    n: "02",
    title: "Learn with industry",
    body: "L&T classroom sessions and days inside their facilities in the three L&T programmes; the iOS Developer programme in Digital Futures.",
  },
  {
    n: "03",
    title: "Build & challenge",
    body: "Studio work with faculty and industry mentors, the hackathon and the Innovation Challenge.",
  },
  {
    n: "04",
    title: "Share & graduate",
    body: "Grand Challenge Finals, heritage and Village Connect experiences, Cultural Night and graduation.",
  },
] as const;

export const COUNTRIES =
  "Afghanistan|Albania|Algeria|Andorra|Angola|Antigua and Barbuda|Argentina|Armenia|Australia|Austria|Azerbaijan|Bahamas|Bahrain|Bangladesh|Barbados|Belarus|Belgium|Belize|Benin|Bhutan|Bolivia|Bosnia and Herzegovina|Botswana|Brazil|Brunei|Bulgaria|Burkina Faso|Burundi|Cabo Verde|Cambodia|Cameroon|Canada|Central African Republic|Chad|Chile|China|Colombia|Comoros|Congo|Costa Rica|Côte d’Ivoire|Croatia|Cuba|Cyprus|Czechia|Democratic Republic of the Congo|Denmark|Djibouti|Dominica|Dominican Republic|Ecuador|Egypt|El Salvador|Equatorial Guinea|Eritrea|Estonia|Eswatini|Ethiopia|Fiji|Finland|France|Gabon|Gambia|Georgia|Germany|Ghana|Greece|Grenada|Guatemala|Guinea|Guinea-Bissau|Guyana|Haiti|Honduras|Hungary|Iceland|India|Indonesia|Iran|Iraq|Ireland|Israel|Italy|Jamaica|Japan|Jordan|Kazakhstan|Kenya|Kiribati|Kuwait|Kyrgyzstan|Laos|Latvia|Lebanon|Lesotho|Liberia|Libya|Liechtenstein|Lithuania|Luxembourg|Madagascar|Malawi|Malaysia|Maldives|Mali|Malta|Marshall Islands|Mauritania|Mauritius|Mexico|Micronesia|Moldova|Monaco|Mongolia|Montenegro|Morocco|Mozambique|Myanmar|Namibia|Nauru|Nepal|Netherlands|New Zealand|Nicaragua|Niger|Nigeria|North Macedonia|Norway|Oman|Pakistan|Palau|Palestine|Panama|Papua New Guinea|Paraguay|Peru|Philippines|Poland|Portugal|Qatar|Romania|Russia|Rwanda|Saint Kitts and Nevis|Saint Lucia|Saint Vincent and the Grenadines|Samoa|San Marino|São Tomé and Príncipe|Saudi Arabia|Senegal|Serbia|Seychelles|Sierra Leone|Singapore|Slovakia|Slovenia|Solomon Islands|Somalia|South Africa|South Korea|South Sudan|Spain|Sri Lanka|Sudan|Suriname|Sweden|Switzerland|Syria|Taiwan|Tajikistan|Tanzania|Thailand|Timor-Leste|Togo|Tonga|Trinidad and Tobago|Tunisia|Türkiye|Turkmenistan|Tuvalu|Uganda|Ukraine|United Arab Emirates|United Kingdom|United States|Uruguay|Uzbekistan|Vanuatu|Vatican City|Venezuela|Vietnam|Yemen|Zambia|Zimbabwe".split(
    "|",
  );

/** Fired by a programme card; the form listens and preselects. */
export const CHOOSE_EVENT = "lii:choose-programme";
