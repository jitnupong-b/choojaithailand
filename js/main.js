import { site, profile, assets, expertise, work, approach, teaching, research, about, contact } from "./content.js";

// --- tiny DOM helper -------------------------------------------------------
const h = (tag, attrs = {}, ...kids) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") el.className = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const kid of kids.flat()) {
    if (kid == null || kid === false || kid === "") continue;
    el.append(kid.nodeType ? kid : document.createTextNode(kid));
  }
  return el;
};
const filled = (v) => typeof v === "string" && v.trim() !== "";
const isHttp = (u) => filled(u) && /^(https?:\/\/|\/|\.\/|[\w-]+\/|[\w-]+\.html)/.test(u);
const isExternal = (u) => /^https?:\/\//.test(u);
const link = (cls, href, label, arrow = isExternal(href) ? "↗" : "→") =>
  h("a", { class: cls, href, ...(isExternal(href) ? { rel: "noopener noreferrer" } : {}) },
    label, arrow && h("span", { class: "arrow", "aria-hidden": "true" }, ` ${arrow}`));

const email = filled(contact.emailUser) && filled(contact.emailDomain)
  ? `${contact.emailUser}@${contact.emailDomain}` : null;
const profileLinks = contact.links.filter((l) => filled(l.label) && isHttp(l.url));
const publications = research.publications;
const projects = work.projects.filter((p) => p.state === "published");
const [featured] = projects;

// Which sections exist drives nav, footer and render order.
const has = {
  work: projects.length > 0,
  expertise: expertise.items.length > 0,
  approach: approach.steps.length > 0,
  teaching: teaching.topics.length > 0,
  research: publications.length > 0,
  about: about.paragraphs.length > 0,
  contact: !!email || profileLinks.length > 0,
};

const navItems = [
  ["work", "Work"], ["teaching", "Teaching"],
  ["research", "Research"], ["about", "About"], ["contact", "Contact"],
].filter(([id]) => has[id]);

// --- shared pieces ---------------------------------------------------------
const sectionHeading = (id, text, intro, cls = "") =>
  h("div", { class: `section-heading ${cls}` },
    h("h2", { id: `${id}-title` }, text),
    filled(intro) && h("p", { class: "lead" }, intro));

const section = (id, cls, ...kids) =>
  h("section", { id, class: `section ${cls}`.trim(), "aria-labelledby": `${id}-title` },
    h("div", { class: "wrap" }, ...kids));

const tagList = (tags) => h("ul", { class: "tags" }, tags.map((t) => h("li", {}, t)));

// --- header ----------------------------------------------------------------
function buildHeader() {
  const panel = h("nav", { id: "site-nav", class: "nav", "aria-label": "Primary" },
    h("ul", {}, navItems.map(([id, label]) =>
      h("li", {}, h("a", { href: `#${id}`, class: id === "contact" ? "nav-contact" : "" }, label)))));
  const btn = h("button", {
    class: "menu-btn", type: "button", "aria-expanded": "false", "aria-controls": "site-nav",
  }, h("span", { class: "menu-icon", "aria-hidden": "true" }), h("span", {}, "Menu"));

  const close = (refocus) => {
    btn.setAttribute("aria-expanded", "false");
    panel.classList.remove("open");
    if (refocus) btn.focus();
  };
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    panel.classList.toggle("open", !open);
  });
  panel.addEventListener("click", (e) => { if (e.target.closest("a")) close(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") close(true);
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) close(false);
  });

  return h("header", { class: "site-header ws-menubar" },
    h("div", { class: "ws-wrap header-inner" },
      h("a", { class: "brand", href: "#top" }, `${profile.initials} Workstation`), btn, panel));
}

// Window: title bar (decorative marks are non-interactive) + body.
const win = (id, title, sub, cls, ...kids) =>
  h("section", { id, class: `ws-window ${cls}`.trim(), "aria-labelledby": `${id}-bar` },
    h("div", { class: "ws-titlebar" },
      h("span", { class: "ws-marks", "aria-hidden": "true" }),
      h("span", { id: `${id}-bar`, class: "ws-title" }, title),
      filled(sub) && h("span", { class: "ws-sub" }, sub)),
    h("div", { class: "ws-body" }, ...kids));

const icon = (kind) =>
  h("span", { class: `ws-icon ws-icon-${kind}`, "aria-hidden": "true" });

// --- hero ------------------------------------------------------------------
function buildHero() {
  const affiliation = [profile.position, profile.department, profile.university].filter(filled);
  const portrait = filled(assets.portrait)
    ? h("img", {
        src: assets.portrait, alt: assets.portraitAlt,
        width: assets.portraitSize.width, height: assets.portraitSize.height,
        fetchpriority: "high", decoding: "async",
      })
    : h("div", { class: "portrait-placeholder", role: "img", "aria-label": "Portrait placeholder" },
        h("span", { "aria-hidden": "true" }, profile.initials));

  const cv = filled(assets.cv);
  return h("div", { id: "top", class: "ws-wrap ws-hero" },
    win("profile", "PROFILE.TXT", "Personal academic workspace", "",
      h("div", { class: "ws-profile" },
        h("div", { class: "ws-profile-text" },
          h("h1", { class: "ws-name" },
            h("span", {}, profile.firstName), " ", h("span", {}, profile.lastName)),
          h("p", { class: "ws-role" }, profile.eyebrow),
          h("p", { class: "ws-statement" }, profile.statement),
          h("p", { class: "ws-intro" }, profile.intro),
          h("div", { class: "ws-actions" },
            has.work && h("a", { class: "ws-btn ws-btn-primary", href: "#work" }, "Explore My Work", h("span", { "aria-hidden": "true" }, " →")),
            cv && link("ws-btn", assets.cv, "Read My CV", "↗"))),
        h("figure", { class: "ws-portrait" },
          h("div", { class: "ws-portrait-frame" }, portrait),
          h("figcaption", {},
            h("strong", {}, profile.name),
            affiliation.map((l) => h("span", {}, l)))))));
}

// --- workspace directory -----------------------------------------------------
function buildDirectory() {
  const items = [
    ["work", "Selected Projects", "folder"],
    ["teaching", "Teaching Notes", "doc"],
    ["research", "Research Index", "doc"],
    ["about", "About & CV", "doc"],
  ].filter(([id]) => has[id]);
  return h("nav", { class: "ws-wrap ws-directory", "aria-labelledby": "ws-dir-title" },
    h("h2", { id: "ws-dir-title", class: "ws-dir-title" }, "WORKSPACE"),
    h("ul", {}, items.map(([id, label, kind]) =>
      h("li", {}, h("a", { href: `#${id}` }, icon(kind), h("span", {}, label))))));
}

// --- expertise -------------------------------------------------------------
const buildExpertise = () =>
  section("expertise", "",
    sectionHeading("expertise", expertise.heading, expertise.intro),
    h("ol", { class: "expertise-grid" }, expertise.items.map((it, i) =>
      h("li", { class: "expertise-item" },
        h("span", { class: "num", "aria-hidden": "true" }, String(i + 1).padStart(2, "0")),
        h("h3", {}, it.title),
        h("p", {}, it.description),
        tagList(it.tags)))));

// --- selected work: featured project record ---------------------------------
function projectFigure(p) {
  if (filled(p.image)) {
    return h("figure", { class: "ws-figure" },
      h("img", { src: p.image, alt: p.imageAlt || "", decoding: "async", width: 1200, height: 800 }),
      filled(p.caption) && h("figcaption", {}, h("strong", {}, "Figure 01. "), p.caption));
  }
  return h("div", { class: "ws-figure-empty" },
    h("p", { class: "ws-meta-line" }, "Figure 01"),
    h("p", {}, "No authorized diagram or sample has been published for this project yet."));
}

function projectMeta(p) {
  const rows = [
    ["Role", p.meta?.role], ["Focus", p.category], ["Organization", p.meta?.organization],
    ["Technologies", p.meta?.technologies], ["Deliverables", p.meta?.deliverables],
    ["Year", p.meta?.year], ["Status", p.meta?.status],
  ].filter(([, v]) => filled(v));
  return h("dl", { class: "ws-meta" }, rows.map(([k, v]) =>
    h("div", {}, h("dt", {}, k), h("dd", {}, v))));
}

function buildWork() {
  const actions = [
    isHttp(featured.caseStudyUrl) && link("ws-btn ws-btn-primary", featured.caseStudyUrl, ["Read Case Study", h("span", { class: "visually-hidden" }, `: ${featured.title}`)], "→"),
    isHttp(featured.projectUrl) && link("ws-btn", featured.projectUrl, ["View Project", h("span", { class: "visually-hidden" }, `: ${featured.title}`)]),
  ].filter(Boolean);
  return h("div", { class: "ws-wrap" },
    win("work", "SELECTED WORK", "Featured project", "",
      h("article", { class: "ws-project" },
        h("div", { class: "ws-project-visual" }, projectFigure(featured)),
        h("div", { class: "ws-project-body" },
          h("p", { class: "ws-meta-line" }, "Project record 001"),
          h("h2", {}, featured.title),
          h("p", {}, featured.description),
          projectMeta(featured),
          actions.length > 0 && h("div", { class: "ws-actions" }, actions)))));
}

// --- approach --------------------------------------------------------------
const buildApproach = () =>
  h("section", { id: "approach", class: "section tinted", "aria-labelledby": "approach-title" },
    h("div", { class: "wrap" },
      sectionHeading("approach", approach.heading, approach.intro),
      h("ol", { class: "steps" }, approach.steps.map((s, i) =>
        h("li", { class: "step" },
          h("span", { class: "step-num", "aria-hidden": "true" }, String(i + 1).padStart(2, "0")),
          h("h3", {}, s.title),
          h("p", {}, s.description))))));

// --- teaching --------------------------------------------------------------
function buildTeaching() {
  const r = teaching.featuredResource;
  const resource = r && filled(r.title) && isHttp(r.url)
    ? h("div", { class: "resource" },
        h("p", { class: "label" }, "Featured resource"),
        h("h3", {}, link("text-link", r.url, r.title)),
        filled(r.description) && h("p", {}, r.description))
    : null;
  return section("teaching", "",
    h("div", { class: "split" },
      h("div", { class: "split-intro" },
        sectionHeading("teaching", teaching.heading, teaching.intro),
        isHttp(teaching.resourcesUrl) && link("text-link", teaching.resourcesUrl, "Explore Teaching & Resources"),
        resource),
      h("ul", { class: "topic-list" }, teaching.topics.map((t) =>
        h("li", {}, h("h3", {}, t.title), h("p", {}, t.description))))));
}

// --- research --------------------------------------------------------------
const buildResearch = () =>
  section("research", "",
    sectionHeading("research", research.heading, research.intro),
    h("ol", { class: "pub-list" }, publications.map((p) =>
      h("li", { class: "pub" },
        h("span", { class: "pub-year" }, filled(String(p.year ?? "")) ? String(p.year) : ""),
        h("div", { class: "pub-body" },
          h("h3", {}, p.title),
          filled(p.authors) && h("p", { class: "pub-authors" }, p.authors),
          filled(p.venue) && h("p", { class: "pub-venue" }, p.venue),
          (isHttp(p.url) || isHttp(p.abstractUrl)) && h("p", { class: "pub-links" },
            isHttp(p.url) && link("text-link", p.url, "Publication"),
            isHttp(p.abstractUrl) && link("text-link", p.abstractUrl, "Abstract")))))));

// --- about -----------------------------------------------------------------
function buildAbout() {
  const position = [profile.position, profile.department, profile.university].filter(filled);
  const field = (label, ...content) => h("div", { class: "field" }, h("dt", {}, label), h("dd", {}, ...content));
  return section("about", "",
    h("div", { class: "about-grid" },
      h("div", {},
        h("h2", { id: "about-title" }, about.heading),
        about.paragraphs.map((t) => h("p", { class: "prose" }, t)),
        h("div", { class: "actions" },
          isHttp(about.aboutUrl) && link("text-link", about.aboutUrl, "More About Me"),
          filled(assets.cv) && link("text-link", assets.cv, "Curriculum Vitae", "↗"))),
      h("dl", { class: "profile-fields" },
        field("Current Position", position.map((l) => h("span", { class: "block" }, l))),
        filled(about.education) && field("Education", h("span", { class: "block" }, about.education), filled(about.institution) && h("span", { class: "block" }, about.institution)),
        about.background.length > 0 && field("Background", tagList(about.background)))));
}

// --- contact ---------------------------------------------------------------
const buildContact = () =>
  h("section", { id: "contact", class: "section contact", "aria-labelledby": "contact-title" },
    h("div", { class: "wrap contact-inner" },
      h("h2", { id: "contact-title" }, contact.heading),
      h("p", { class: "lead" }, contact.description),
      email && h("div", { class: "actions" },
        h("a", { class: "btn", href: `mailto:${email}` }, "Get in Touch", h("span", { class: "arrow", "aria-hidden": "true" }, " →"))),
      email && h("p", { class: "contact-email" }, email),
      profileLinks.length > 0 && h("ul", { class: "profile-links", "aria-label": "Profile links" },
        profileLinks.map((l) => h("li", {}, link("", l.url, l.label))))));

// --- footer ----------------------------------------------------------------
function buildFooter() {
  const ids = ["work", "teaching", "research", "about", "contact"].filter((id) => has[id]);
  const labels = Object.fromEntries(navItems);
  return h("footer", { class: "site-footer" },
    h("div", { class: "wrap footer-inner" },
      h("div", {},
        h("p", { class: "footer-name" }, profile.name),
        h("p", { class: "footer-tagline" }, profile.tagline)),
      h("nav", { "aria-label": "Footer" },
        h("ul", {}, ids.map((id) => h("li", {}, h("a", { href: `#${id}` }, labels[id]))))),
      filled(site.lastUpdated) && h("p", { class: "footer-updated" }, `Last updated: ${site.lastUpdated}`)));
}

// --- head metadata from configured assets only ------------------------------
function applyHead() {
  const meta = (prop, content) => document.head.append(h("meta", { property: prop, content }));
  if (isExternal(site.url ?? "")) {
    document.head.append(h("link", { rel: "canonical", href: site.url }));
    meta("og:url", site.url);
    if (filled(assets.ogImage)) meta("og:image", new URL(assets.ogImage, site.url).href);
  }
}

// --- dev-only content audit ---------------------------------------------------
function auditContent() {
  if (!["localhost", "127.0.0.1"].includes(location.hostname)) return;
  const missing = [];
  if (!filled(profile.position)) missing.push("profile.position");
  if (!filled(profile.department)) missing.push("profile.department");
  if (!filled(assets.portrait)) missing.push("assets.portrait");
  if (!filled(assets.cv)) missing.push("assets.cv (Download CV hidden)");
  if (!email) missing.push("contact email (LAUNCH BLOCKER if no profile links either)");
  if (!has.research) missing.push("research.publications (section hidden)");
  if (!filled(site.lastUpdated)) missing.push("site.lastUpdated");
  if (!filled(site.url)) missing.push("site.url (canonical / Open Graph)");
  work.projects.forEach((p) => {
    if (p.state !== "published") missing.push(`project "${p.id}" is draft (hidden)`);
    else Object.entries(p.meta).forEach(([k, v]) => { if (!filled(v)) missing.push(`project "${p.id}" meta.${k}`); });
    if (!filled(p.image)) missing.push(`project "${p.id}" image`);
  });
  console.info("[content] Missing or unverified items:\n - " + missing.join("\n - "));
}

// --- mount -------------------------------------------------------------------
document.getElementById("site-header").replaceWith(buildHeader());
const main = document.getElementById("main");
main.replaceChildren(
  buildHero(),
  buildDirectory(),
  has.work && buildWork(),
  // Remaining sections keep the previous styling until the workstation direction is approved.
  h("div", { class: "legacy" },
    has.expertise && buildExpertise(),
    has.approach && buildApproach(),
    has.teaching && buildTeaching(),
    has.research && buildResearch(),
    has.about && buildAbout(),
    has.contact && buildContact()),
);
document.getElementById("site-footer").replaceWith(buildFooter());
applyHead();
auditContent();

// Mark the nav link of the section currently in view (aria-current).
const navLinks = [...document.querySelectorAll("#site-nav a")];
const targets = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean).sort((x, y) => x.compareDocumentPosition(y) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
let ticking = false;
const markActive = () => {
  ticking = false;
  const line = window.innerHeight * 0.35;
  const current = targets.filter((t) => t.getBoundingClientRect().top <= line).pop();
  navLinks.forEach((a) => {
    const on = !!current && a.getAttribute("href") === `#${current.id}`;
    a.classList.toggle("active", on);
    on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current");
  });
};
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(markActive); } }, { passive: true });
markActive();
