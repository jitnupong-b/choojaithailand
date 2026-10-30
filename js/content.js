// Single source of truth for all site content. Edit here; no markup changes needed.
// Empty values (null, "", []) are hidden gracefully in the public view.
// Items marked TODO(verify) need owner confirmation before launch.
// On localhost, missing content is listed in the browser console.

export const site = {
  // TODO(verify): set the final public URL to enable canonical + Open Graph URL.
  url: null,
  // Content update date shown in the footer, e.g. "October 2026". Set manually.
  lastUpdated: null,
};

export const profile = {
  name: "Boonchoo Jitnupong, Ph.D.",
  initials: "BJ",
  firstName: "Boonchoo",
  lastName: "Jitnupong, Ph.D.",
  eyebrow: "Lecturer · Researcher · Digital Practitioner",
  statement: "Connecting learning, digital capability, and practical solutions.",
  university: "Kasetsart University",
  position: "Full-Time Lecturer, Web and Mobile Application Developer",
  department: "Department of Computer Science, Faculty of Science, Kasetsart University",
  tagline: "Learning · Digital Capability · Practical Solutions",
  intro:
    "I am an information technology lecturer working across digital competency development, data analytics, and application development. I connect academic thinking with practical approaches to support learners and organizations.",
};

export const assets = {
  // TODO(verify): add a portrait, e.g. "images/portrait.jpg" (approx. 4:5, 800×1000+).
  portrait: null,
  portraitAlt: "Portrait of Boonchoo Jitnupong",
  portraitSize: { width: 800, height: 1000 },
  // TODO(verify): add a CV file, e.g. "files/boonchoo-jitnupong-cv.pdf".
  cv: null,
  // TODO: add a social preview image (1200×630), e.g. "images/og.jpg"; needs site.url.
  ogImage: null,
};

export const expertise = {
  heading: "Areas of Expertise",
  intro:
    "Bringing together people, data, and technology to address learning and organizational challenges.",
  items: [
    {
      title: "Digital Competency & Workforce Development",
      description:
        "Designing competency frameworks, assessment tools, and development approaches aligned with organizational contexts and job roles.",
      tags: ["Competency Frameworks", "Assessment", "Gap Analysis", "Development Planning"],
    },
    {
      title: "Digital Solutions & Data Analytics",
      description:
        "Developing application prototypes, databases, and analytical tools to support workflows and informed decision-making.",
      tags: ["Web Applications", "Database Design", "Analytics", "Dashboards"],
    },
    {
      title: "Teaching & Learning Design",
      description:
        "Designing practical learning experiences in programming, digital technology, and human–computer interaction.",
      tags: ["Programming", "Data Structures", "HCI", "Project-Based Learning"],
    },
  ],
};

export const work = {
  heading: "Selected Work",
  intro:
    "A selection of projects in digital capability development, application development, and applied technology.",
  // Only set when a real page exists.
  allProjectsUrl: null,
  // First published project is featured; the rest fill the supporting grid.
  // state: "published" | "draft". Drafts are never rendered.
  // Metadata (role, organization, deliverables, year, status, technologies) is shown
  // only when non-empty. Do not fill it with unverified values.
  projects: [
    {
      id: "digital-competency-framework",
      state: "published",
      category: "Digital Competency & Workforce Development",
      title: "Designing a Digital Competency Framework",
      description:
        "Connecting organizational needs and job roles with target competencies, assessment approaches, and workforce development planning.",
      // TODO(verify): supply an authorized framework diagram or assessment sample.
      image: null,
      imageAlt: "",
      // Accurate description of the figure, shown as "Figure 01." Set together with image.
      caption: null,
      // TODO(verify): all of these.
      meta: { role: null, organization: null, deliverables: null, year: null, status: null },
      caseStudyUrl: null,
      projectUrl: null,
    },
    {
      id: "application-dashboard",
      state: "draft", // TODO: describe the problem, users, and solution, then publish.
      category: "Digital Solutions & Analytics",
      title: "[Selected Application or Dashboard Project]",
      description: "[Describe the problem, intended users, and solution.]",
      // Legacy candidates to review (these may be separate projects): Angular web
      // applications, MySQL-backed CRUD systems, reporting/dashboard applications.
      image: null,
      imageAlt: "",
      meta: { role: null, technologies: null, year: null, status: null },
      caseStudyUrl: null,
      projectUrl: null,
    },
    {
      id: "odpc6-dengue-manager",
      state: "published", // TODO(verify): confirm details before publication.
      category: "Mobile Application · Public Health",
      title: "ODPC6: Dengue Manager",
      description:
        "An Android application using location-based information to support dengue prevention and control activities.",
      image: null,
      imageAlt: "",
      meta: { role: null, technologies: "Native Android, Java", year: null, status: null },
      caseStudyUrl: null,
      projectUrl: null,
    },
  ],
};

// TODO(owner review): proposed positioning copy.
export const approach = {
  heading: "From Context to Practical Solutions",
  intro:
    "I combine contextual understanding, structured design, practical development, and continuous improvement.",
  steps: [
    { title: "Understand", description: "Explore the context, users, goals, and constraints." },
    {
      title: "Design",
      description: "Define appropriate frameworks, processes, tools, and evaluation criteria.",
    },
    {
      title: "Develop & Test",
      description: "Build prototypes or tools and test them within the agreed scope.",
    },
    {
      title: "Evaluate & Refine",
      description: "Use evidence and feedback to improve relevance and usability.",
    },
  ],
};

export const teaching = {
  heading: "Learning Through Practice",
  intro:
    "I emphasize clear explanations, hands-on activities, and meaningful projects that help students connect technical concepts with practical applications.",
  topics: [
    {
      title: "Programming & Data Structures",
      description:
        "Object-oriented programming, problem-solving, and foundational data structures.",
    },
    {
      title: "HCI & Interaction Design",
      description:
        "Understanding users, developing interface prototypes, and evaluating usability.",
    },
    {
      title: "Web & Mobile Development",
      description: "Practical application development using web and mobile technologies.",
    },
  ],
  // Legacy course list (NOT confirmed as currently taught; do not publish as such):
  // Principles of OOP; Data Structures; HCI; Web Application Development with Angular;
  // Android Mobile Application Development with Kotlin.
  resourcesUrl: null,
  // Provide { title, description, url } to show a featured resource. Do not publish
  // student work without permission.
  featuredResource: null,
};

export const research = {
  heading: "Research & Publications",
  // TODO(verify): current research interests.
  intro: "",
  // { year, title, authors, venue, url, abstractUrl } – no invented entries.
  // An empty array hides the section and its nav item.
  publications: [],
  // TODO(verify): official title – legacy text, not to be silently rewritten.
  // Kept separate from papers; reserved for the About/CV page.
  thesis: {
    title:
      "The Development of User Interface Design Guideline: Bridge the Organization Culture Gaps",
    verified: false,
  },
};

export const about = {
  heading: "About Me",
  paragraphs: [
    "I work at the intersection of information technology education, digital capability development, and applied digital solutions.",
    "My work spans teaching, competency assessment, data analysis, and application prototyping. I am interested in translating academic concepts into tools and approaches that respond to real learning and organizational needs.",
  ],
  education: "Ph.D. in Computer Science and Information Systems",
  institution: "National Institute of Development Administration",
  background: ["Teaching", "Application Development", "HCI", "Digital Competency", "Data Analytics"],
  // Full history page, only when it exists.
  aboutUrl: null,
  // Reserved for a detailed About/CV page (graduation years unverified; do not publish):
  // Industry: Developer, True Digital Entertainment (legacy year 2015) – C# back-end
  // services, collaboration with front-end designers, web application deployment.
  // Education: Ph.D. and M.Sc. in Computer Science and Information Systems (NIDA);
  // B.Sc. Computer Science, Kasetsart University, Sriracha Campus.
};

export const contact = {
  heading: "Contact & Academic Collaboration",
  description:
    "For academic collaboration and conversations about digital competency development, data analytics, application development, and teaching.",
  // TODO(verify): taken from the legacy site; confirm it is the professional address.
  // Stored split to avoid plain-text scraping; set both to null to hide.
  emailUser: "boonchoo.ji",
  emailDomain: "gmail.com",
  // Legacy-site profile links. TODO(verify) each is current; add University Profile / Scholar.
  links: [
    { label: "LinkedIn", url: "https://linkedin.com/in/boonchoo" },
    { label: "GitHub", url: "https://github.com/jitnupong-b" },
    { label: "Blog", url: "https://choojaithailand.blogspot.com" },
  ],
};
