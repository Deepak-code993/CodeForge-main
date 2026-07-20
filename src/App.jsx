import { useEffect, useRef, useState } from 'react';
import ProjectSection from '../ProjectSection.jsx';

const heroSlides = [
  new URL('../img (1).png', import.meta.url).href,
  new URL('../img (2).png', import.meta.url).href,
  new URL('../img (3).png', import.meta.url).href,
  new URL('../img (4).png', import.meta.url).href,
  new URL('../img (5).png', import.meta.url).href
];

const inkwellLogo = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 520">
  <defs>
    <radialGradient id="glow" cx="50%" cy="54%" r="42%">
      <stop offset="0%" stop-color="#1f4b93" stop-opacity=".55"/>
      <stop offset="54%" stop-color="#10214a" stop-opacity=".36"/>
      <stop offset="100%" stop-color="#071126" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="feather" x1="356" y1="58" x2="530" y2="324" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#fff3d2"/>
      <stop offset="58%" stop-color="#d9b875"/>
      <stop offset="100%" stop-color="#fff8e6"/>
    </linearGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#020612" flood-opacity=".55"/>
    </filter>
  </defs>
  <rect width="960" height="520" fill="#071126"/>
  <ellipse cx="482" cy="270" rx="270" ry="205" fill="none" stroke="#18264a" stroke-width="3" stroke-dasharray="6 9" opacity=".62"/>
  <ellipse cx="482" cy="310" rx="200" ry="42" fill="url(#glow)"/>
  <g filter="url(#softShadow)" transform="rotate(-22 480 230)">
    <path d="M435 74 C520 92 600 162 637 260 C585 238 512 226 461 247 C421 218 401 153 435 74Z" fill="url(#feather)"/>
    <path d="M461 247 C505 260 578 288 635 335 C590 314 525 289 465 281Z" fill="#fff9e8"/>
    <path d="M635 335 L700 394 L688 404 L626 343Z" fill="#fff8e8"/>
    <path d="M694 398 C717 399 727 411 734 431 C711 422 695 421 681 405Z" fill="#f8f4e8"/>
    <path d="M466 93 C506 144 534 204 548 256" fill="none" stroke="#f8e8bf" stroke-width="5" opacity=".65"/>
  </g>
  <circle cx="482" cy="330" r="12" fill="#6db2ff"/>
  <text x="480" y="434" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="72" letter-spacing="12" fill="#fff8e8">Inkwell</text>
  <text x="480" y="480" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" letter-spacing="13" fill="#6e7da8">YOUR PERSONAL DIARY</text>
</svg>
`)}`;

const teachCarouselSettings = {
  speed: '18s',
  wheelBoostSpeed: '7s',
  cardWidth: '200px',
  cardHeight: '192px'
};

const teachItems = [
  {
    id: 'html',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    label: 'HTML',
    tag: 'Markup',
    accent: '#e44d26',
    soft: '#fff0eb',
    glow: 'rgba(228, 77, 38, 0.28)',
    description: 'Learn modern HTML structure, semantic markup, and page layout fundamentals.',
    concepts: ['Semantic tags', 'Forms', 'Tables', 'Media tags', 'Accessibility', 'SEO basics']
  },
  {
    id: 'css',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    label: 'CSS',
    tag: 'Design',
    accent: '#1572b6',
    soft: '#eaf5ff',
    glow: 'rgba(21, 114, 182, 0.26)',
    description: 'Master responsive design, animations, and styling for polished interfaces.',
    concepts: ['Selectors', 'Flexbox', 'Grid', 'Responsive UI', 'Transitions', 'Animations']
  },
  {
    id: 'javascript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    label: 'JavaScript',
    tag: 'Logic',
    accent: '#d6a800',
    soft: '#fff8d9',
    glow: 'rgba(214, 168, 0, 0.28)',
    description: 'Build dynamic behavior, interactivity, and client-side application logic.',
    concepts: ['Variables', 'Functions', 'Arrays', 'DOM events', 'Async API calls', 'Error handling']
  },
  {
    id: 'python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    label: 'Python',
    tag: 'Data Science / MySQL',
    accent: '#3776ab',
    soft: '#edf6ff',
    glow: 'rgba(55, 118, 171, 0.26)',
    description: 'Explore Python for data science, automation, and backend integration.',
    concepts: ['Loops', 'Functions', 'OOP basics', 'File handling', 'APIs', 'Data analysis']
  },
  {
    id: 'mysql',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    label: 'MySQL',
    tag: 'Database',
    accent: '#00618a',
    soft: '#e8f7fb',
    glow: 'rgba(0, 97, 138, 0.26)',
    description: 'Work with relational data, queries, and real-world database workflows.',
    concepts: ['Tables', 'SELECT queries', 'Joins', 'CRUD', 'Indexes', 'Relationships']
  },
  {
    id: 'react',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    label: 'React',
    tag: 'Frontend',
    accent: '#149eca',
    soft: '#eafaff',
    glow: 'rgba(20, 158, 202, 0.28)',
    description: 'Create component-driven web apps with modern UI patterns and hooks.',
    concepts: ['Components', 'Props', 'State', 'Hooks', 'Forms', 'API data']
  },
  {
    id: 'data-science',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    label: 'Data Science',
    tag: 'Analytics',
    accent: '#654ff0',
    soft: '#f1efff',
    glow: 'rgba(101, 79, 240, 0.28)',
    description: 'Analyze data, visualize insights, and apply machine learning ideas.',
    concepts: ['Pandas', 'NumPy', 'Charts', 'Cleaning data', 'EDA', 'ML basics']
  }
];

const projects = [
  {
    id: 'inkwell',
    label: 'Ink',
    title: 'InkWell',
    tag: 'Lifestyle',
    body: 'A personal diary app for capturing thoughts, routines, and daily reflections.',
    image: inkwellLogo,
    accent: '#1d4ed8',
    soft: '#eaf2ff',
    glow: 'rgba(29, 78, 216, 0.28)'
  },
  {
    id: 'healthcare',
    label: 'Care',
    title: 'Healthcare',
    tag: 'Patient System',
    body: 'Patient records and appointment booking, built end to end.',
    accent: '#0f9f8f',
    soft: '#e9fbf8',
    glow: 'rgba(15, 159, 143, 0.25)'
  },
  {
    id: 'ai-assistant',
    label: 'AI',
    title: 'AI Assistant',
    tag: 'Most Built',
    body: 'A chat-driven assistant project - our most-built capstone.',
    accent: '#654ff0',
    soft: '#f1efff',
    glow: 'rgba(101, 79, 240, 0.3)'
  },
  {
    id: 'hotel-ordering',
    label: 'Hotel',
    title: 'Hotel Ordering',
    tag: 'Ordering App',
    body: 'Full hotel ordering system with room selection and billing.',
    accent: '#e85d75',
    soft: '#fff0f3',
    glow: 'rgba(232, 93, 117, 0.26)'
  },
  {
    id: 'stock-tracker',
    label: 'Chart',
    title: 'Stock Tracker',
    tag: 'Live Charts',
    body: 'Live data, charts and alerts using Python and an API.',
    accent: '#149eca',
    soft: '#eafaff',
    glow: 'rgba(20, 158, 202, 0.28)'
  },
  {
    id: 'food-delivery',
    label: 'Food',
    title: 'Food Delivery',
    tag: 'Delivery App',
    body: 'A modern food delivery app with menus and order tracking.',
    accent: '#f97316',
    soft: '#fff4e5',
    glow: 'rgba(249, 115, 22, 0.24)'
  }
];

const enrollmentProjects = [
  ['1', 'Health Disease Predictor', 'Python, Machine Learning', 'AI / Healthcare'],
  ['2', 'QR Code Generator', 'Python, Flask', 'Web Utility'],
  ['3', 'E-Commerce Platform', 'React, Node.js', 'Full Stack'],
  ['4', 'Blog CMS System', 'Django, SQL', 'Content Management'],
  ['5', 'Student Portal', 'React, Firebase', 'Education'],
  ['6', 'Expense Tracker', 'Vue, MongoDB', 'Finance'],
  ['7', 'Weather Dashboard', 'JavaScript, API', 'Dashboard'],
  ['8', 'Chat Application', 'Socket.io, Node.js', 'Realtime App'],
  ['9', 'Library Management', 'PHP, MySQL', 'Management System'],
  ['10', 'Job Portal', 'React, Express', 'Career Platform'],
  ['11', 'Restaurant Booking', 'Flask, SQL', 'Booking System'],
  ['12', 'Inventory System', 'Django, Charts', 'Business Tool'],
  ['13', 'Online Quiz App', 'React, Firebase', 'Education'],
  ['14', 'Social Media Dashboard', 'Next.js, API', 'Dashboard'],
  ['15', 'Task Manager (Kanban)', 'React, DnD', 'Productivity'],
  ['16', 'Notes & Reminder App', 'Flutter, Dart', 'Mobile App'],
  ['17', 'Hotel Booking System', 'Flask, MySQL', 'Booking System'],
  ['18', 'Food Delivery Clone', 'React, Maps API', 'Delivery App'],
  ['19', 'Fitness Tracker App', 'React Native', 'Health App'],
  ['20', 'AI Chatbot Interface', 'Python, OpenAI', 'AI Application']
].map(([id, name, tech, category]) => ({ id, name, tech, category }));

const enrollmentAddons = [
  {
    id: 'ds',
    name: 'Data Science Bootcamp',
    desc: 'Python - Pandas - ML - Visualization',
    oldPrice: 'Rs. 2,499',
    newPrice: 'Rs. 199'
  },
  {
    id: 'da',
    name: 'Data Analyst Course',
    desc: 'Excel - SQL - Power BI - Tableau',
    oldPrice: 'Rs. 2,499',
    newPrice: 'Rs. 199'
  }
];

function App() {
  const [selectedPill, setSelectedPill] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [route, setRoute] = useState(() => window.location.pathname);
  const trackRef = useRef(null);
  const firstSetRefs = useRef([]);

  // derive selected item from key like "0-html" or "1-data-science"
  const selectedItem = selectedPill
    ? teachItems.find((it) => it.id === selectedPill.split('-').slice(1).join('-'))
    : null;

  const clearSelection = () => setSelectedPill(null);

  // panel closing state (requested by clicking same pill or external triggers)
  const [panelClosing, setPanelClosing] = useState(false);

  // toggle when clicking same pill: if same key, request closing animation; otherwise open new
  const togglePill = (key) => {
    setPanelClosing(false);
    setSelectedPill((prev) => {
      if (prev === key) {
        // request close animation, parent will clear after timeout
        setPanelClosing(true);
        return prev; // keep selected until animation completes
      }
      return key;
    });
  };

  // when a close is requested, clear selection after the animation duration
  useEffect(() => {
    if (!panelClosing) return;
    const t = setTimeout(() => {
      setPanelClosing(false);
      setSelectedPill(null);
    }, 320);
    return () => clearTimeout(t);
  }, [panelClosing]);

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const goHome = () => {
    window.history.pushState({}, '', '/');
    setRoute('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToEnrollment = () => {
    window.history.pushState({}, '', '/codeforge_enrollment_v2');
    setRoute('/codeforge_enrollment_v2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // close the panel when clicking anywhere outside the panel or pills
  // request the closing animation rather than instantly clearing selection
  useEffect(() => {
    const onPointerDown = (e) => {
      const target = e.target;
      if (!target) return;
      // if clicking inside the detail panel or on a pill, do nothing
      if (
        target.closest
        && (
          target.closest('.teach-detail-panel')
          || target.closest('.pill')
          || target.closest('.teach-carousel__hit')
        )
      ) return;
      // if a panel is open, request the closing animation
      if (selectedPill) {
        setPanelClosing(true);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [selectedPill]);

  if (route === '/codeforge_enrollment_v2' || route === '/codeforge_enrollment_v2.html') {
    return <EnrollmentPage onBack={goHome} />;
  }

  return (
    <>
      <Header
        onEnroll={scrollToPricing}
        onHome={goHome}
        scrolled={navScrolled}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((current) => !current)}
      />

      <main>
        <Hero onEnroll={scrollToPricing} />

        <TeachCarousel
          selectedPill={selectedPill}
          setSelectedPill={togglePill}
          trackRef={trackRef}
          firstSetRefs={firstSetRefs}
        />

        <TeachDetailsPanel selectedItem={selectedItem} clearSelection={clearSelection} externalClosing={panelClosing} />

        <ProjectSection />
        <Certificate />

        <Pricing />
      </main>

      <Footer />
    </>
  );
}

function FloatingBackground() {
  return (
    <ul className="floating-bg" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, index) => <li key={index}></li>)}
    </ul>
  );
}

function Header({ onEnroll, onHome, scrolled, darkMode, onToggleTheme }) {
  return (
    <header
      className="nav"
      style={{
        boxShadow: scrolled
          ? '0 4px 24px rgba(45,55,72,0.12)'
          : '0 2px 16px rgba(45,55,72,0.07)'
      }}
    >
      <div className="nav__inner">
        <a className="nav__brand" href="#" onClick={(event) => { event.preventDefault(); onHome?.(); }}>
          <span className="nav__logo">&lt;/&gt;</span>
          <span className="nav__name">Code<span>Forge</span></span>
        </a>

        <div className="nav__search">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Search courses, projects..." aria-label="Search" />
        </div>

        <nav className="nav__links" aria-label="Primary navigation">
          <a href="#teach">We Teach</a>
          <a href="#projects">Projects</a>
          <a href="#certificate">Certificate</a>
        </nav>

        <button className="nav__cta" onClick={onEnroll}>Enroll Now</button>
        <button
          type="button"
          className="nav__theme"
          onClick={onToggleTheme}
          aria-pressed={darkMode}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span className="nav__theme-icon" aria-hidden="true">{darkMode ? 'L' : 'D'}</span>
          <span>{darkMode ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
}

function Hero({ onEnroll }) {
  const heroHighlights = [
    'Learn industry-relevant technologies',
    'Work on 100+ practice and project ideas',
    'Hands-on learning experience',
    'Beginner-friendly training',
    'Portfolio building guidance',
    'CodeForge certificate of completion'
  ];

  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__copy">
          <div className="hero__badge">
            <span className="badge__dot"></span>
            <span>Internship Program</span>
            <span className="badge__sep">|</span>
            <span>Real World Experience</span>
          </div>

          <h1>
            <span className="hero__hello">Welcome to CodeForge</span>
            Start Your Coding Journey
            <strong>with Practical Learning</strong>
          </h1>

          <p className="hero__sub">
            Join our 1-month internship program built for college students who want
            hands-on experience in programming and web development. Learn modern
            technologies, build beginner-friendly real-world projects, and grow your
            confidence with a CodeForge certificate.
          </p>

          <ul className="hero__feature-list" aria-label="CodeForge internship benefits">
            {heroHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div className="hero__actions">
            <button className="btn btn--primary btn-wave" onClick={onEnroll}>
              Enroll Now
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <p className="hero__alert" aria-label="Alert: price for first 50 students is rupees 1,599 instead of rupees 2,000">
            <span className="hero__alert-dot" aria-hidden="true"></span>
            <span className="hero__alert-copy">Alert for first 50 students: <del>Rs. 2,000</del> <strong>Rs. 1,599</strong></span>
            <span className="hero__party-boom" aria-hidden="true">
              <span></span>
            </span>
          </p>
        </div>

        <div className="hero__visual hero-slider" aria-label="CodeForge internship images">
          <div className="hero-slider__frame">
            {heroSlides.map((slide, index) => (
              <figure
                className="hero-slider__slide"
                style={{ '--slide-index': index }}
                key={slide}
              >
                <img src={slide} alt={`CodeForge internship preview ${index + 1}`} />
              </figure>
            ))}
          </div>
          <div className="hero-slider__dots" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <span style={{ '--slide-index': index }} key={`dot-${slide}`}></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeachCarousel({ selectedPill, setSelectedPill, trackRef, firstSetRefs }) {
  const renderedItems = teachItems;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = (event, key) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setSelectedPill(key);
  };

  useTeachWheel(trackRef, setActiveIndex, renderedItems.length);
  const visibleItems = [-2, -1, 0, 1, 2].map((offset) => {
    const itemIndex = (activeIndex + offset + renderedItems.length) % renderedItems.length;
    const item = renderedItems[itemIndex];

    return {
      item,
      offset,
      key: `0-${item.id}`
    };
  });

  return (
    <section id="teach" className="teach">
      <h2 className="section-title">We Will Teach</h2>
      <p className="section-sub">Pick a track. Every track ends in a real project, not just a quiz.</p>
      <div
        className="teach-carousel"
        aria-label="Subjects we teach"
        style={{
          '--teach-scroll-duration': teachCarouselSettings.speed,
          '--teach-wheel-duration': teachCarouselSettings.wheelBoostSpeed,
          '--pill-width': teachCarouselSettings.cardWidth,
          '--pill-height': teachCarouselSettings.cardHeight
        }}
      >
        <div ref={trackRef} className={`teach-carousel__track ${selectedPill ? 'is-paused' : ''}`}>
          {renderedItems.map((item, index) => {
            const key = `0-${item.id}`;
            const selected = selectedPill === key;
            const offset = getLoopOffset(index, activeIndex, renderedItems.length);
            const positionClass = offset === 0
              ? 'is-active'
              : offset === -1
                ? 'is-prev'
                : offset === 1
                  ? 'is-next'
                  : offset === -2
                    ? 'is-prev-outer'
                    : offset === 2
                      ? 'is-next-outer'
                  : offset < -1
                    ? 'is-before-hidden'
                    : 'is-after-hidden';
            const isVisible = Math.abs(offset) <= 2;

            return (
              <div
                key={key}
                ref={(node) => {
                  firstSetRefs.current[index] = node;
                }}
                className={`pill ${positionClass} ${selected ? 'is-selected' : ''}`}
                role={isVisible ? 'button' : 'presentation'}
                tabIndex={isVisible ? 0 : -1}
                aria-hidden={!isVisible}
                aria-label={isVisible ? `Open ${item.label}` : undefined}
                onClick={() => {
                  if (isVisible) setSelectedPill(key);
                }}
                onKeyDown={(event) => {
                  if (isVisible) handleKeyDown(event, key);
                }}
                style={{
                  '--card-index': index,
                  '--card-count': renderedItems.length,
                  '--card-offset': offset,
                  '--pill-accent': item.accent,
                  '--pill-soft': item.soft,
                  '--pill-glow': item.glow
                }}
              >
                <span className="pill__shine" aria-hidden="true"></span>
                <span className="pill__icon">
                  <img src={item.icon} alt="" aria-hidden="true" />
                </span>
                <span className="pill__content">
                  <span className="pill__label">{item.label}</span>
                  {item.tag && <span className="pill__tag">{item.tag}</span>}
                </span>
              </div>
            );
          })}
          <div className="teach-carousel__hits" aria-hidden="false">
            {visibleItems.map(({ item, offset, key }) => (
              <button
                key={`hit-${key}-${offset}`}
                type="button"
                className={`teach-carousel__hit teach-carousel__hit--${
                  offset === 0
                    ? 'center'
                    : offset === -1
                      ? 'left'
                      : offset === 1
                        ? 'right'
                        : offset === -2
                          ? 'left-outer'
                          : 'right-outer'
                }`}
                aria-label={`Open ${item.label}`}
                onClick={() => setSelectedPill(key)}
                onKeyDown={(event) => handleKeyDown(event, key)}
              ></button>
            ))}
          </div>
        </div>
      </div>
      {!selectedPill && <ConceptCard item={renderedItems[activeIndex]} />}
    </section>
  );
}

function ConceptCard({ item }) {
  return (
    <div className="concept-stage" aria-live="polite">
      <article
        key={item.id}
        className="concept-card"
        style={{
          '--pill-accent': item.accent,
          '--pill-soft': item.soft,
          '--pill-glow': item.glow
        }}
      >
        <span className="concept-card__plane concept-card__plane--back" aria-hidden="true"></span>
        <span className="concept-card__plane concept-card__plane--mid" aria-hidden="true"></span>
        <div className="concept-card__face">
          <div className="concept-card__head">
            <span className="concept-card__icon">
              <img src={item.icon} alt="" aria-hidden="true" />
            </span>
            <div>
              <span className="concept-card__tag">{item.tag}</span>
              <h3>{item.label}</h3>
            </div>
          </div>
          <p className="concept-card__summary">{item.description}</p>
          <div className="concept-card__chips">
            {item.concepts.map((concept) => (
              <span key={concept}>{concept}</span>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

function getLoopOffset(index, activeIndex, total) {
  const half = Math.floor(total / 2);
  let offset = index - activeIndex;

  if (offset > half) offset -= total;
  if (offset < -half) offset += total;

  return offset;
}

// Wheel scrolling over the strip advances the carousel; otherwise it stays static.
function useTeachWheel(trackRef, setActiveIndex, totalItems) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el || totalItems < 2) return;

    let wheelRemainder = 0;
    let wheelLock = false;

    const onWheel = (e) => {
      e.preventDefault();

      const primaryDelta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const modeMultiplier = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      wheelRemainder += primaryDelta * modeMultiplier;

      if (wheelLock || Math.abs(wheelRemainder) < 80) return;

      const direction = wheelRemainder > 0 ? 1 : -1;
      wheelRemainder = 0;
      wheelLock = true;

      setActiveIndex((current) => (current + direction + totalItems) % totalItems);

      window.setTimeout(() => {
        wheelLock = false;
      }, 260);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [trackRef, setActiveIndex, totalItems]);
}

function TeachDetailsPanel({ selectedItem, clearSelection, externalClosing }) {
  const [isClosing, setIsClosing] = useState(false);
  if (!selectedItem) return null;

  const handleClose = () => {
    // play closing animation then call clearSelection
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      clearSelection();
    }, 320);
  };

  return (
    <aside
      key={selectedItem.id}
      className={`teach-detail-panel ${(isClosing || externalClosing) ? 'closing' : ''}`}
      aria-live="polite"
      style={{
        '--pill-accent': selectedItem.accent,
        '--pill-soft': selectedItem.soft,
        '--pill-glow': selectedItem.glow,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 'auto',
        width: 'clamp(320px, 33.333vw, 460px)',
        height: '100vh',
        zIndex: 99999,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)'
      }}
    >
      <div className="teach-detail-panel__header">
        <div className="teach-detail-panel__pill">
          <span className="pill__icon">
            <img src={selectedItem.icon} alt="" aria-hidden="true" />
          </span>
        </div>
        <div>
          <p className="teach-detail-panel__label">{selectedItem.label}</p>
          {selectedItem.tag && <p className="teach-detail-panel__tag">{selectedItem.tag}</p>}
        </div>
      </div>
      <p className="teach-detail-panel__description">{selectedItem.description}</p>
      <button type="button" className="teach-detail-panel__close" onClick={handleClose}>
        Close
      </button>
    </aside>
  );
}

function Projects() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const activeProject = projects[activeIndex];

  useTeachWheel(trackRef, setActiveIndex, projects.length);

  const handleKeyDown = (event, index) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setActiveIndex(index);
  };

  return (
    <section id="projects" className="projects">
      <h2 className="section-title">We Provide Projects</h2>
      <p className="section-sub">Our projects are real-world based - 100+ and counting, from simple to high level.</p>
      <div className="project-showcase">
        <div className="project-showcase__rail">
          <div className="project-carousel" aria-label="Project slider">
            <div ref={trackRef} className="teach-carousel__track project-carousel__track">
              {projects.map((project, index) => {
                const offset = getLoopOffset(index, activeIndex, projects.length);
                const positionClass = offset === 0
                  ? 'is-active'
                  : offset === -1
                    ? 'is-prev'
                    : offset === 1
                      ? 'is-next'
                      : offset === -2
                        ? 'project-pill--left-2'
                        : offset === 2
                          ? 'project-pill--right-2'
                          : offset === -3
                            ? 'project-pill--left-3'
                            : offset === 3
                              ? 'project-pill--right-3'
                              : offset < -3
                                ? 'is-before-hidden'
                                : 'is-after-hidden';
                const isVisible = Math.abs(offset) <= 3;

                return (
                  <article
                    key={project.id}
                    className={`pill project-pill ${positionClass} ${offset === 0 ? 'is-selected' : ''}`}
                    role="button"
                    tabIndex={isVisible ? 0 : -1}
                    aria-pressed={offset === 0}
                    aria-hidden={!isVisible}
                    style={{
                      '--pill-accent': project.accent,
                      '--pill-soft': project.soft,
                      '--pill-glow': project.glow
                    }}
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                  >
                    <span className="pill__shine" aria-hidden="true"></span>
                    <span className="project-pill__image" aria-hidden="true">
                      {project.image ? <img src={project.image} alt="" /> : <span>{project.label}</span>}
                    </span>
                    <span className="pill__content">
                      <span className="pill__label">{project.title}</span>
                      <span className="pill__tag">{project.tag}</span>
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="project-screen"
          style={{
            '--pill-accent': activeProject.accent,
            '--pill-soft': activeProject.soft,
            '--pill-glow': activeProject.glow
          }}
        >
          <div className="project-screen__chrome" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="project-screen__stage">
            <div className="project-screen__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
                <path d="M8 5v14l11-7z"></path>
              </svg>
            </div>
            <div>
              <p className="project-screen__eyebrow">{activeProject.tag}</p>
              <h3>{activeProject.title}</h3>
              <p>{activeProject.body}</p>
            </div>
            <div className="project-screen__progress" aria-hidden="true">
              <span></span>
            </div>
          </div>
          <div className="project-screen__caption">
            Touch a project card to change this big preview screen.
          </div>
        </div>
      </div>
    </section>
  );
}

function Certificate() {
  return (
    <section id="certificate" className="certificate">
      <h2 className="section-title">Certificate</h2>
      <p className="section-sub">A certificate that names the project you actually built - not just the course.</p>
      <div className="cert">
        <div className="cert__corner cert__corner--tl"></div>
        <div className="cert__corner cert__corner--tr"></div>
        <div className="cert__corner cert__corner--bl"></div>
        <div className="cert__corner cert__corner--br"></div>
        <p className="cert__eyebrow">CodeForge / Certificate of Completion</p>
        <p className="cert__line">This certifies that</p>
        <p className="cert__name">Student Name</p>
        <p className="cert__line">has successfully built</p>
        <p className="cert__project">Hotel Ordering System - Python + FastAPI Track</p>
        <div className="cert__footer">
          <div className="cert__sig">
            <span className="cert__sigline"></span>
            <span>Program Director</span>
          </div>
          <div className="cert__seal">CF</div>
          <div className="cert__sig cert__sig--right">
            <span className="cert__sigline"></span>
            <span>Date Issued</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const pricingCourses = [
    {
      id: 'php-mysql',
      name: 'PHP and MySQL',
      price: '1700',
      features: ['Backend project training', 'Database design with MySQL', 'Guided project completion']
    },
    {
      id: 'python-data-science',
      name: 'PYTHON+DATA SCIENCE',
      price: '1700',
      features: ['Python programming basics', 'Data analysis workflow', 'Project with data science concepts']
    },
    {
      id: 'python-flask',
      name: 'PYTHON(Flask)',
      price: '1700',
      features: ['Flask web application basics', 'API and backend routing', 'Project-ready web app structure']
    }
  ];
  const [pricingPopup, setPricingPopup] = useState(null);

  const showPricingInfo = (course, type) => {
    setPricingPopup({
      course: course.name,
      type,
      message: type === 'internship'
        ? 'By choosing this option you get 30 days internship along with certificate and project.'
        : 'By choosing this option you will get project only.'
    });
  };

  return (
    <section id="pricing" className="pricing">
      <h2 className="section-title">Pricing</h2>
      <p className="section-sub">Choose a course package based on the outcome you want.</p>
      <div className="plan-grid">
        {pricingCourses.map((course, index) => (
          <div className={`plan ${index === 1 ? 'plan--featured' : ''}`} key={course.id}>
            {index === 1 && <p className="plan__ribbon">Popular</p>}
            <p className="plan__name">{course.name}</p>
            <p className="plan__price"><span>Rs.</span>{course.price}</p>
            <ul className="plan__list">
              {course.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="plan__actions">
              <button className="btn btn--primary btn--full" onClick={() => showPricingInfo(course, 'internship')}>
                Choose {course.name} Internship
              </button>
              <button className="btn btn--ghost btn--full" onClick={() => showPricingInfo(course, 'project')}>
                Choose {course.name} Project Only
              </button>
            </div>
          </div>
        ))}
      </div>
      {pricingPopup && (
        <div className="pricing-popup" role="presentation" onClick={() => setPricingPopup(null)}>
          <div
            className="pricing-popup__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-popup-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="pricing-popup__close"
              aria-label="Close pricing information"
              onClick={() => setPricingPopup(null)}
            >
              x
            </button>
            <p className="pricing-popup__eyebrow">
              {pricingPopup.type === 'internship' ? 'Internship Option' : 'Project Only Option'}
            </p>
            <h3 id="pricing-popup-title">{pricingPopup.course}</h3>
            <p>{pricingPopup.message}</p>
            <button type="button" className="btn btn--primary btn--full" onClick={() => setPricingPopup(null)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function EnrollmentPage({ onBack }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    phone2: '',
    course: ''
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showMoreProjects, setShowMoreProjects] = useState(false);

  const selectedProjectName = enrollmentProjects.find((project) => project.id === selectedProject)?.name || 'your project';
  const visibleProjects = showMoreProjects ? enrollmentProjects : enrollmentProjects.slice(0, 5);
  const courseLabels = {
    bca: 'BCA - Bachelor of Computer Applications',
    bsc: 'BSc - Bachelor of Science',
    other: 'Other'
  };
  const canSubmit = Boolean(form.name.trim() && form.email.trim() && form.phone.trim() && form.course && selectedProject && confirmed);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const toggleAddon = (id) => {
    setSelectedAddons((current) => (
      current.includes(id) ? current.filter((addonId) => addonId !== id) : [...current, id]
    ));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    const message = `Hello CodeForge, I want to enroll. Name: ${form.name.trim()}, Course: ${courseLabels[form.course]}, Project: ${selectedProjectName}.`;
    window.location.href = `https://wa.me/918618447092?text=${encodeURIComponent(message)}`;
  };

  return (
    <main className="enrollment-page">
      <form className="enrollment" onSubmit={handleSubmit}>
        <button type="button" className="enrollment__back" onClick={onBack}>
          Back to CodeForge
        </button>

        <div className="enrollment__badge"><span></span>Internship Program | Real World Experience</div>
        <h1>Start Your Enrollment<br /><span>with CodeForge</span></h1>
        <p className="enrollment__sub">
          Fill in your details below to join the 1-month internship program built for college students who want real hands-on coding experience.
        </p>

        <p className="enrollment__label">Personal Details</p>
        <label className="enrollment__field">
          <span>Full name</span>
          <input name="name" type="text" placeholder="Priya Sharma" value={form.name} onChange={updateField} />
        </label>
        <label className="enrollment__field">
          <span>Email address</span>
          <input name="email" type="email" placeholder="priya@email.com" value={form.email} onChange={updateField} />
        </label>
        <div className="enrollment__two">
          <label className="enrollment__field">
            <span>Phone number</span>
            <input name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={updateField} />
          </label>
          <label className="enrollment__field">
            <span>Secondary phone <small>(optional)</small></span>
            <input name="phone2" type="tel" placeholder="+91 98765 43211" value={form.phone2} onChange={updateField} />
          </label>
        </div>

        <p className="enrollment__label">Course</p>
        <label className="enrollment__field">
          <span>Select your degree course</span>
          <select name="course" value={form.course} onChange={updateField}>
            <option value="">Choose a course</option>
            <option value="bca">BCA - Bachelor of Computer Applications</option>
            <option value="bsc">BSc - Bachelor of Science</option>
            <option value="other">Other</option>
          </select>
        </label>

        <p className="enrollment__label">Select a Project</p>
        <div className="enrollment__projects">
          {visibleProjects.map((project) => (
            <button
              type="button"
              key={project.id}
              className={`enrollment__project ${selectedProject === project.id ? 'is-selected' : ''}`}
              onClick={() => setSelectedProject(project.id)}
            >
              <span className="enrollment__project-category">{project.category}</span>
              <strong>{project.name}</strong>
              <span className="enrollment__project-tech">Tech used: {project.tech}</span>
            </button>
          ))}
          {!showMoreProjects && (
            <button
              type="button"
              className="enrollment__project enrollment__project-more"
              onClick={() => setShowMoreProjects(true)}
            >
              <span className="enrollment__project-category">More Options</span>
              <strong>View more projects</strong>
              <span className="enrollment__project-tech">Explore 15 additional project choices</span>
            </button>
          )}
        </div>

        <p className="enrollment__label">Add-on Courses</p>
        <div className="enrollment__addons">
          {enrollmentAddons.map((addon) => {
            const active = selectedAddons.includes(addon.id);
            return (
              <button
                type="button"
                key={addon.id}
                className={`enrollment__addon ${active ? 'is-selected' : ''}`}
                onClick={() => toggleAddon(addon.id)}
              >
                <span className="enrollment__check" aria-hidden="true"></span>
                <span className="enrollment__addon-copy">
                  <strong>{addon.name}</strong>
                  <small>{addon.desc}</small>
                </span>
                <span className="enrollment__price">
                  <del>{addon.oldPrice}</del>
                  <strong>{addon.newPrice}</strong>
                </span>
              </button>
            );
          })}
        </div>

        <label className={`enrollment__confirm ${confirmed ? 'is-selected' : ''}`}>
          <input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} />
          <span className="enrollment__check" aria-hidden="true"></span>
          <span>
            I confirm all details are correct - <strong>{form.name.trim() || 'your name'}</strong>, <strong>{form.email.trim() || 'your email'}</strong>, course: <strong>{courseLabels[form.course] || 'your course'}</strong>, project: <strong>{selectedProjectName}</strong>.
          </span>
        </label>

        <p className="enrollment__alert"><span></span>Alert - price for first 50 students is <del>Rs. 2,000</del> <strong>Rs. 1,599</strong></p>

        <button className="enrollment__submit" type="submit" disabled={!canSubmit}>
          Enroll Now <span>-&gt;</span>
        </button>

        {submitted && (
          <div className="enrollment__success" role="status">
            <h2>You are enrolled!</h2>
            <p>Check your email for next steps. Welcome to CodeForge.</p>
          </div>
        )}
      </form>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__brand">&lt;/&gt; CodeForge</div>
      <p>Built by students. Verified by the work they shipped.</p>
    </footer>
  );
}

export default App;
