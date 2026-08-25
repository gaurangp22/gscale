/**
 * Photography register.
 *
 * Every image the site shows is named here rather than inline, so replacing
 * placeholder stock with the office's own approved documentary photographs
 * is a one-file edit: swap `src` for a local `/photos/...` path and update
 * `credit`. Nothing in the pages needs to change.
 *
 * `alt` describes what the picture shows. `caption` is the editorial line
 * printed beneath it, and is written to be true of the stand-in as well as
 * of whatever replaces it — no image here claims to depict a specific
 * G-SCALE program, because none of them do yet.
 */

const STOCK_DIR = "/photos/stock/";

/** Stock stand-ins are stored locally so page rendering never depends on
    Unsplash or the Next.js remote-image proxy being reachable at runtime. */
function stock(file: string) {
  return `${STOCK_DIR}${file}`;
}

export type Photograph = {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  /** Focal bias for the crop when the frame is tighter than the source. */
  position?: string;
};

export const PHOTOS = {
  graduation: {
    src: stock("graduation.jpg"),
    alt: "Graduating students throwing their caps against an evening skyline",
    caption: "Where an international education is meant to arrive",
    credit: "Stock photograph",
  },
  seminarRoom: {
    src: stock("seminar-room.jpg"),
    alt: "A seminar room with students seated in front of a lit projector screen",
    caption: "Academic sessions delivered with partner institutions",
    credit: "Stock photograph",
  },
  studyGroup: {
    src: stock("study-group.jpg"),
    alt: "Three students working together over notes in a library",
    caption: "Collaborative work across cohorts and disciplines",
    credit: "Stock photograph",
  },
  cohort: {
    src: stock("cohort.jpg"),
    alt: "A group of students from different backgrounds seated together outdoors",
    caption: "Cohorts drawn from more than one institution",
    credit: "Stock photograph",
  },
  campus: {
    src: stock("campus.jpg"),
    alt: "A university building set behind open lawn",
    caption: "Host campuses across the partner network",
    credit: "Stock photograph",
  },
  library: {
    src: stock("library.jpg"),
    alt: "Long aisles of library shelving receding into the distance",
    caption: "Research collections opened up by academic collaboration",
    credit: "Stock photograph",
  },
  studentsWalking: {
    src: stock("students-walking.jpg"),
    alt: "A student carrying books past classmates working at a table",
    caption: "Everyday academic life on an exchange program",
    credit: "Stock photograph",
  },
  workshop: {
    src: stock("workshop.jpg"),
    alt: "A workshop group standing at a wall covered in sticky notes",
    caption: "Innovation workshops run as part of short-term programs",
    credit: "Stock photograph",
  },
  developers: {
    src: stock("developers.jpg"),
    alt: "Students working at laptops in a computing lab",
    caption: "Applied technical work inside hosted programs",
    credit: "Stock photograph",
  },
  meetingRoom: {
    src: stock("meeting-room.jpg"),
    alt: "Colleagues seated around a long table in a meeting",
    caption: "Institutional meetings that begin a collaboration",
    credit: "Stock photograph",
  },
  planning: {
    src: stock("planning.jpg"),
    alt: "Several people taking notes around a table during a working session",
    caption: "Program design, agreed before anything is published",
    credit: "Stock photograph",
  },
  whiteboard: {
    src: stock("whiteboard.jpg"),
    alt: "A hand drawing a diagram on a whiteboard",
    caption: "Curriculum and program structures worked out in the open",
    credit: "Stock photograph",
  },
  congress: {
    src: stock("congress.jpg"),
    alt: "A speaker on a lit stage in front of a large seated audience",
    caption: "International forums and congresses",
    credit: "Stock photograph",
  },
  conference: {
    src: stock("conference.jpg"),
    alt: "An audience seated in a wide conference hall facing presentation screens",
    caption: "Sector conversations G-SCALE participates in",
    credit: "Stock photograph",
  },
  roundtable: {
    src: stock("roundtable.jpg"),
    alt: "A seminar audience seated around tables facing a presenter",
    caption: "Hosted workshops and partner meetings",
    credit: "Stock photograph",
  },
  studentsLaptops: {
    src: stock("students-laptops.jpg"),
    alt: "Three students smiling while working at laptops together",
    caption: "Inbound participants working alongside Galgotias students",
    credit: "Stock photograph",
  },
  classroom: {
    src: stock("classroom.jpg"),
    alt: "An empty classroom with rows of desks facing a blackboard",
    caption: "The teaching spaces a program is built around",
    credit: "Stock photograph",
  },
  officeDesk: {
    src: stock("office-desk.jpg"),
    alt: "A member of staff standing at a desk with a laptop in a bright office",
    caption: "The G-SCALE International Office, A Block",
    credit: "Stock photograph",
  },
  archive: {
    src: stock("archive.jpg"),
    alt: "A curved wall of library shelving seen from above",
    caption: "A record kept of every completed program",
    credit: "Stock photograph",
  },
  teaching: {
    src: stock("teaching.jpg"),
    alt: "A teacher working with students seated at desks",
    caption: "Active, student-centered teaching",
    credit: "Stock photograph",
  },
} as const satisfies Record<string, Photograph>;

export type PhotoKey = keyof typeof PHOTOS;
