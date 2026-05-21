import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.css";

const navItems = [
  ["Education", "#education"],
  ["Experience", "#experience"],
  ["Leadership", "#leadership"],
  ["Skills", "#skills"],
  ["Contact", "#contact"]
];

const shots = [
  { label: "RAG", color: "#fef08a", end: [90, 88], control: [245, 40] },
  { label: "LLM", color: "#ffffff", end: [290, 45], control: [340, 34] },
  { label: "OCR", color: "#38bdf8", end: [552, 78], control: [510, 30] },
  { label: "A2A", color: "#ef4444", end: [640, 215], control: [690, 132] },
  { label: "SQL", color: "#facc15", end: [594, 374], control: [670, 338] },
  { label: "LangGraph", color: "#ffffff", end: [360, 430], control: [430, 502] },
  { label: "FastAPI", color: "#22c55e", end: [150, 382], control: [160, 470] },
  { label: "Tea", color: "#c084fc", end: [70, 240], control: [22, 275] },
  { label: "AI", color: "#fb7185", end: [370, 60], control: [390, 8] }
];

const education = [
  ["GITAM University", "Bachelor of Technology in Computer Science Engineering", "Visakhapatnam, AP", "Oct 2021 - Aug 2025"],
  ["Narayana Junior College", "Mathematics, Physics, Chemistry", "Anantapuram, AP", "Aug 2019 - May 2021"],
  ["C.V.R Memorial High School", "Board of Secondary Education", "Anantapuram, AP", "June 2019"]
];

const experience = [
  {
    role: "Systems Engineer - Digital",
    company: "Tata Consultancy Services",
    place: "Current",
    date: "Present",
    lines: [
      "Working in AI and intelligent automation-focused engineering environments involving enterprise AI workflows and intelligent processing systems.",
      "Contributing to cloud-based automation solutions that support scalable, reliable, and business-focused digital operations.",
      "Applying AI engineering concepts to build, improve, and support automation workflows across enterprise use cases.",
      "Collaborating in structured engineering settings where clean implementation, documentation, and dependable delivery matter."
    ]
  },
  {
    role: "Java Developer Intern",
    company: "IIC Technologies",
    place: "Hyderabad",
    date: "May 2024 - August 2024",
    lines: [
      "Acquired proficiency in Core and Advanced Java programming through practical coding and debugging work.",
      "Learned Spring Boot development patterns while building and understanding backend application workflows.",
      "Tested APIs through Swagger and Postman to strengthen development, debugging, and validation skills.",
      "Gained hands-on exposure to backend development practices, API testing, and structured software delivery."
    ]
  }
];

const skillGroups = [
  ["AI & GenAI", ["GenAI", "RAG", "VectorDB", "LangChain", "LangGraph"]],
  ["Backend", ["Java", "Spring Boot", "FastAPI", "SQL"]],
  ["APIs & Tools", ["Postman", "REST APIs", "Database Queries"]]
];

function pathFor([x1, y1], [cx, cy], [x2, y2]) {
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

function pointOnQuadratic(start, control, end, t) {
  const x = (1 - t) ** 2 * start[0] + 2 * (1 - t) * t * control[0] + t ** 2 * end[0];
  const y = (1 - t) ** 2 * start[1] + 2 * (1 - t) * t * control[1] + t ** 2 * end[1];
  return [x, y];
}

function CricketStadium() {
  const [active, setActive] = useState(0);
  const start = [455, 250];
  const shot = shots[active];
  const ballPoints = useMemo(() => {
    return [0, 0.18, 0.38, 0.62, 0.82, 1].map((t) => pointOnQuadratic(start, shot.control, shot.end, t));
  }, [shot]);
  const d = pathFor(start, shot.control, shot.end);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % shots.length);
    }, 1400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="stadium-card" aria-label="Animated cricket stadium with Amith batting">
      <div className="stadium-bowl">
        <div className="stand stand-left" />
        <div className="stand stand-right" />
        <div className="field">
          <div className="pitch" />
          <div className="batter" />
          <div className="crease-label">Amith at crease</div>
          <svg className="shot-layer" viewBox="0 0 720 500" preserveAspectRatio="none">
            <AnimatePresence mode="wait">
              <motion.g key={shot.label}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke={shot.color}
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 0.45, 1], opacity: [0, 0.95, 0.42] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <motion.path
                  d={d}
                  fill="none"
                  stroke={shot.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 0.34, 0.8], opacity: [0, 0.18, 0] }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <motion.circle
                  r="8"
                  fill="#d71920"
                  stroke="#fff7f7"
                  strokeWidth="3"
                  initial={{ cx: start[0], cy: start[1], opacity: 0, scale: 0.7 }}
                  animate={{
                    cx: ballPoints.map(([x]) => x),
                    cy: ballPoints.map(([, y]) => y),
                    opacity: [0, 1, 1, 1, 0],
                    scale: [0.7, 1, 1.1, 1, 0.9]
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <motion.g
                  initial={{ opacity: 0, x: start[0] + 14, y: start[1] - 34, scale: 0.86 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    x: ballPoints.map(([x]) => x + 16),
                    y: ballPoints.map(([, y]) => y - 34),
                    scale: [0.86, 1, 1, 0.92]
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <rect
                    x="0"
                    y="0"
                    width={68 + shot.label.length * 9}
                    height="36"
                    rx="18"
                    fill="rgba(75, 24, 49, 0.86)"
                    stroke="rgba(255, 255, 255, 0.72)"
                  />
                  <text
                    x={(68 + shot.label.length * 9) / 2}
                    y="23"
                    textAnchor="middle"
                    fill="#fff8f8"
                    fontSize="14"
                    fontWeight="900"
                  >
                    6 - {shot.label}
                  </text>
                </motion.g>
              </motion.g>
            </AnimatePresence>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Background() {
  const emojis = Array.from({ length: 36 }, (_, index) => ["☕", "🏏", "🏍️"][index % 3]);
  return (
    <>
      <div className="signal-grid" />
      <div className="emoji-wall" aria-hidden="true">
        {emojis.map((emoji, index) => (
          <span key={`${emoji}-${index}`}>{emoji}</span>
        ))}
      </div>
    </>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="K Amith Raj home">
        <span className="brand-mark">AR</span>
        <span>K Amith Raj</span>
      </a>
      <button className="nav-toggle" type="button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span />
        <span />
      </button>
      <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Education() {
  return (
    <section className="education-section" id="education">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Education</p>
          <h2>Academic foundation.</h2>
        </div>
      </div>
      <div className="education-timeline">
        {education.map(([school, degree, place, date]) => (
          <article className="education-item" key={school}>
            <div>
              <h3>{school}</h3>
              <p>{degree}</p>
            </div>
            <div className="education-meta">
              <span>{place}</span>
              <time>{date}</time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="section-shell" id="experience">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Experience</p>
          <h2>Professional work.</h2>
        </div>
        <p className="section-note">AI engineering, automation, Java development, APIs, and enterprise systems.</p>
      </div>
      <div className="experience-layout">
        {experience.map((item) => (
          <article className="experience-card" key={item.role}>
            <div className="experience-head">
              <div>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
              </div>
              <div className="experience-meta">
                <span>{item.place}</span>
                <time>{item.date}</time>
              </div>
            </div>
            <ul className="experience-lines">
              {item.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="section-shell" id="leadership">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Extracurricular Activities</p>
          <h2>Hospitality Captain.</h2>
        </div>
        <p className="section-note">Head of Hospitality for GITAM University Annual Fest - SHORE25.</p>
      </div>
      <div className="experience-layout">
        <article className="experience-card">
          <div className="experience-head">
            <div>
              <h3>Head of Hospitality</h3>
              <p>GITAM University Annual Fest - SHORE25</p>
            </div>
            <div className="experience-meta">
              <span>Visakhapatnam</span>
              <time>Nov 2024 - Jan 2025</time>
            </div>
          </div>
          <ul className="experience-lines">
            <li>Led the hospitality team for SHORE25, coordinating guest care across logistics, accommodations, food and beverages, transport, and on-ground support.</li>
            <li>Planned welcoming and escort flows for guests and participants so arrivals, movement, and communication stayed smooth during the fest.</li>
            <li>Managed coordination between hospitality, transport, and logistics teams to keep stalls, venues, and guest requirements organized.</li>
            <li>Focused on creating a warm, well-run experience where guests felt guided, respected, and taken care of throughout the event.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section-shell skills-section" id="skills">
      <div className="section-heading compact">
        <p className="eyebrow">Skills / Tech Stack</p>
        <h2>Tools I work with.</h2>
      </div>
      <div className="skills-grid">
        {skillGroups.map(([label, skills]) => (
          <article className="skill-group" key={label}>
            <span className="skill-label">{label}</span>
            <div className="stack-board">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <>
      <Background />
      <Header />
      <main id="home">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">K Amith Raj</p>
            <h1>Just a guy who loves Tea.</h1>
            <p className="hero-text">
              I like building useful things, learning how systems work, and taking responsibility when a team needs someone calm in the middle of the action.
            </p>
          </div>
          <CricketStadium />
        </section>
        <Education />
        <ExperienceSection />
        <Leadership />
        <Skills />
        <section className="contact-section" id="contact">
          <div>
            <p className="eyebrow">Reach Out</p>
            <h2>Talk to Amith about tech, cricket, tea, or the next good idea!</h2>
          </div>
          <a className="button primary" href="mailto:karanamamith564@gmail.com">karanamamith564@gmail.com</a>
        </section>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
