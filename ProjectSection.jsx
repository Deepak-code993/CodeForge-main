import { useEffect, useRef, useState } from 'react';
import campusBooksLogo from './src/assets/campusbooks_4k_wallpaper.png';
import farmerFriendLogo from './src/assets/FarmerFriend_Logo_4K.png';
import inkwellLogo from './src/assets/inkwell_4k_wallpaper.png';
import vitalisLogo from './src/assets/vitalis_4k_wallpaper.png';

const projects = [
  {
    id: 'inkwell',
    label: 'Ink',
    title: 'InkWell',
    tag: 'Lifestyle',
    body: 'A personal diary experience for private notes, memories, and daily reflections.',
    image: inkwellLogo,
    youtubeId: '_oqEXXlasT8',
    accent: '#b99b62',
    soft: '#f6f0e4',
    glow: 'rgba(185, 155, 98, 0.28)'
  },
  {
    id: 'campusbooks',
    label: 'Books',
    title: 'CampusBooks',
    tag: 'Educational',
    body: 'A campus study material marketplace for selling, borrowing, and sharing books.',
    image: campusBooksLogo,
    youtubeId: 'KzLGPgg2Dlc',
    accent: '#2f8f3b',
    soft: '#e9f7e8',
    glow: 'rgba(47, 143, 59, 0.28)'
  },
  {
    id: 'farmerfriend',
    label: 'Farm',
    title: 'FarmerFriend',
    tag: 'Agricultural',
    body: 'An agriculture support app for farmers to grow, connect, and make informed decisions.',
    image: farmerFriendLogo,
    imageFit: 'fill',
    youtubeId: 'DDB-iU6F8Fo',
    accent: '#d99a2b',
    soft: '#eef7e8',
    glow: 'rgba(217, 154, 43, 0.28)'
  },
  {
    id: 'vitalis',
    label: 'Health',
    title: 'Vitalis',
    tag: 'Health',
    body: 'A personal health companion for tracking wellness, medication, hydration, and mood.',
    image: vitalisLogo,
    imageFit: 'fill',
    youtubeId: 'qm0kvLszzDo',
    accent: '#14c8b8',
    soft: '#e7fbf8',
    glow: 'rgba(20, 200, 184, 0.28)'
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
    body: 'Restaurant menus, cart, order tracking, and admin order management.',
    accent: '#ef6c00',
    soft: '#fff2e6',
    glow: 'rgba(239, 108, 0, 0.25)'
  },
  {
    id: 'portfolio-builder',
    label: 'Web',
    title: 'Portfolio Builder',
    tag: 'Frontend',
    body: 'A personal portfolio generator with projects, skills, and contact sections.',
    accent: '#2563eb',
    soft: '#edf4ff',
    glow: 'rgba(37, 99, 235, 0.24)'
  },
  {
    id: 'library',
    label: '100+',
    title: '100+ More',
    tag: 'Project Library',
    body: 'Browse the full project library after you enroll.',
    accent: '#2d3748',
    soft: '#f4f1ec',
    glow: 'rgba(45, 55, 72, 0.18)'
  }
];

function getLoopOffset(index, activeIndex, total) {
  const half = Math.floor(total / 2);
  let offset = index - activeIndex;

  if (offset > half) offset -= total;
  if (offset < -half) offset += total;

  return offset;
}

function useProjectWheel(trackRef, setActiveIndex, totalItems) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el || totalItems < 2) return;

    let wheelRemainder = 0;
    let wheelLock = false;

    const onWheel = (event) => {
      event.preventDefault();

      const primaryDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      const modeMultiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
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
    return () => el.removeEventListener('wheel', onWheel);
  }, [trackRef, setActiveIndex, totalItems]);
}

export default function ProjectSection() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const activeProject = projects[activeIndex];

  useProjectWheel(trackRef, setActiveIndex, projects.length);

  const handleKeyDown = (event, index) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    setActiveIndex(index);
  };

  return (
    <section id="projects" className="cf-project-section">
      <ProjectSectionStyles />

      <h2 className="cf-project-section__title">We Provide Projects</h2>
      <p className="cf-project-section__sub">
        Our projects are real-world based - 100+ and counting, from simple to high level.
      </p>

      <div className="cf-project-showcase">
        <div className="cf-project-showcase__rail">
          <div className="cf-project-carousel" aria-label="Project slider">
            <div ref={trackRef} className="cf-project-carousel__track">
              {projects.map((project, index) => {
                const offset = getLoopOffset(index, activeIndex, projects.length);
                const positionClass = offset === 0
                  ? 'is-active'
                  : offset === -1
                    ? 'is-prev'
                    : offset === 1
                      ? 'is-next'
                      : offset === -2
                        ? 'cf-project-pill--left-2'
                        : offset === 2
                          ? 'cf-project-pill--right-2'
                          : offset === -3
                            ? 'cf-project-pill--left-3'
                            : offset === 3
                              ? 'cf-project-pill--right-3'
                              : offset < -3
                                ? 'is-before-hidden'
                                : 'is-after-hidden';
                const isVisible = Math.abs(offset) <= 3;

                return (
                  <article
                    key={project.id}
                    className={`cf-project-pill ${positionClass} ${offset === 0 ? 'is-selected' : ''}`}
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
                    <span className="cf-project-pill__shine" aria-hidden="true"></span>
                    <span className="cf-project-pill__image" aria-hidden="true">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt=""
                          style={{ '--project-image-fit': project.imageFit || 'cover' }}
                        />
                      ) : <span>{project.label}</span>}
                    </span>
                    <span className="cf-project-pill__content">
                      <span className="cf-project-pill__label">{project.title}</span>
                      <span className="cf-project-pill__tag">{project.tag}</span>
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="cf-project-screen"
          style={{
            '--pill-accent': activeProject.accent,
            '--pill-soft': activeProject.soft,
            '--pill-glow': activeProject.glow
          }}
        >
          <div className="cf-project-screen__chrome" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`cf-project-screen__stage ${activeProject.youtubeId ? 'cf-project-screen__stage--video' : ''}`}>
            {activeProject.youtubeId ? (
              <iframe
                key={activeProject.youtubeId}
                className="cf-project-screen__video"
                title={`${activeProject.title} project preview video`}
                src={`https://www.youtube.com/embed/${activeProject.youtubeId}?autoplay=1&mute=1&playsinline=1&loop=1&playlist=${activeProject.youtubeId}&rel=0&modestbranding=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                <div className="cf-project-screen__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                </div>
                <div>
                  <p className="cf-project-screen__eyebrow">{activeProject.tag}</p>
                  <h3>{activeProject.title}</h3>
                  <p>{activeProject.body}</p>
                </div>
                <div className="cf-project-screen__progress" aria-hidden="true">
                  <span></span>
                </div>
              </>
            )}
          </div>
          <div className="cf-project-screen__caption">
            Touch a project card to change this big preview screen.
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectSectionStyles() {
  return (
    <style>{`
.cf-project-section {
  --bg: #FAFAF8;
  --bg-alt: #F4F1EC;
  --surface: #FFFFFF;
  --border: #E8E0D4;
  --heading: #2D3748;
  --body-text: #4A5568;
  --muted: #718096;
  --orange: #F5A623;
  --orange-light: #FEF3DC;
  --orange-glow: rgba(245, 166, 35, 0.18);
  --white: #FFFFFF;
  --font-display: "Sora", sans-serif;
  --font-body: "Manrope", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --radius-lg: 18px;
  --maxw: 1180px;
  --shadow-sm: 0 2px 8px rgba(45, 55, 72, 0.08);
  --shadow-md: 0 8px 28px rgba(45, 55, 72, 0.12);

  width: min(var(--maxw), calc(100% - 32px));
  margin: 0 auto;
  padding: clamp(52px, 7vw, 92px) 0;
  border-top: 1px solid var(--border);
  color: var(--body-text);
  font-family: var(--font-body);
}

.cf-project-section *,
.cf-project-section *::before,
.cf-project-section *::after {
  box-sizing: border-box;
}

.cf-project-section__title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 4vw, 2.9rem);
  font-weight: 800;
  color: var(--heading);
  letter-spacing: -0.015em;
}

.cf-project-section__sub {
  max-width: 600px;
  margin: 12px 0 0;
  color: var(--body-text);
  font-size: 1.05rem;
  line-height: 1.7;
}

.cf-project-showcase {
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(20px, 3vw, 34px);
  margin-top: 36px;
}

.cf-project-showcase__rail {
  min-width: 0;
  border-radius: var(--radius-lg);
}

.cf-project-carousel {
  position: relative;
  min-height: 360px;
  overflow: hidden;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(244, 241, 236, 0.72)),
    var(--surface);
  box-shadow: var(--shadow-sm);
  perspective: 900px;
  perspective-origin: 50% 50%;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent);
}

.cf-project-carousel__track {
  position: relative;
  z-index: 1;
  height: 360px;
  transform-style: preserve-3d;
  cursor: grab;
  touch-action: pan-y;
}

.cf-project-carousel__track:active {
  cursor: grabbing;
}

.cf-project-pill {
  --pill-accent: var(--orange);
  --pill-soft: var(--orange-light);
  --pill-glow: var(--orange-glow);
  position: absolute;
  top: 50%;
  left: 50%;
  isolation: isolate;
  width: clamp(168px, 18vw, 230px);
  min-height: 214px;
  padding: 16px;
  border: 1.5px solid color-mix(in srgb, var(--pill-accent) 32%, white);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.94), color-mix(in srgb, var(--pill-soft) 76%, white)),
    var(--surface);
  box-shadow: 0 10px 30px rgba(45, 55, 72, 0.08), 0 12px 36px var(--pill-glow);
  cursor: pointer;
  display: grid;
  place-items: center;
  align-content: stretch;
  gap: 12px;
  text-align: center;
  overflow: hidden;
  transform-origin: center;
  transform-style: preserve-3d;
  opacity: 0;
  pointer-events: none;
  filter: blur(1px);
  transform: translate3d(-50%, -50%, -170px) rotateY(0deg) scale(0.64);
  will-change: transform, opacity, filter;
  transition: transform 0.36s cubic-bezier(.2,.9,.2,1),
    opacity 0.28s ease,
    filter 0.28s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.cf-project-pill.is-active,
.cf-project-pill.is-prev,
.cf-project-pill.is-next {
  opacity: 1;
  pointer-events: auto;
  filter: blur(0);
}

.cf-project-pill.is-active {
  z-index: 5;
  transform: translate3d(-50%, -50%, 72px) rotateY(0deg) scale(1.08);
}

.cf-project-pill.is-prev {
  z-index: 3;
  opacity: 0.78;
  transform: translate3d(calc(-50% - clamp(170px, 19vw, 238px)), -50%, -48px) rotateY(18deg) scale(0.88);
}

.cf-project-pill.is-next {
  z-index: 3;
  opacity: 0.78;
  transform: translate3d(calc(-50% + clamp(170px, 19vw, 238px)), -50%, -48px) rotateY(-18deg) scale(0.88);
}

.cf-project-pill.cf-project-pill--left-2,
.cf-project-pill.cf-project-pill--right-2,
.cf-project-pill.cf-project-pill--left-3,
.cf-project-pill.cf-project-pill--right-3 {
  opacity: 0.58;
  pointer-events: auto;
  filter: blur(0);
}

.cf-project-pill.cf-project-pill--left-2 {
  transform: translate3d(calc(-50% - clamp(310px, 34vw, 430px)), -50%, -115px) rotateY(28deg) scale(0.72);
}

.cf-project-pill.cf-project-pill--right-2 {
  transform: translate3d(calc(-50% + clamp(310px, 34vw, 430px)), -50%, -115px) rotateY(-28deg) scale(0.72);
}

.cf-project-pill.cf-project-pill--left-3 {
  opacity: 0.34;
  transform: translate3d(calc(-50% - clamp(430px, 47vw, 610px)), -50%, -170px) rotateY(34deg) scale(0.58);
}

.cf-project-pill.cf-project-pill--right-3 {
  opacity: 0.34;
  transform: translate3d(calc(-50% + clamp(430px, 47vw, 610px)), -50%, -170px) rotateY(-34deg) scale(0.58);
}

.cf-project-pill.is-before-hidden {
  transform: translate3d(calc(-50% - clamp(580px, 62vw, 760px)), -50%, -190px) rotateY(38deg) scale(0.48);
}

.cf-project-pill.is-after-hidden {
  transform: translate3d(calc(-50% + clamp(580px, 62vw, 760px)), -50%, -190px) rotateY(-38deg) scale(0.48);
}

.cf-project-pill::before {
  content: "";
  position: absolute;
  inset: 10px;
  border-radius: calc(var(--radius-lg) - 6px);
  border: 1px solid rgba(255, 255, 255, 0.72);
  pointer-events: none;
  z-index: -1;
}

.cf-project-pill__shine {
  position: absolute;
  top: -55%;
  left: -80%;
  width: 70%;
  height: 210%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65), transparent);
  transform: rotate(24deg);
  animation: cf-project-pill-shine 3.8s ease-in-out infinite;
  pointer-events: none;
}

.cf-project-pill:hover,
.cf-project-pill:focus-visible,
.cf-project-pill.is-selected {
  border-color: var(--pill-accent);
  box-shadow: 0 20px 50px rgba(45, 55, 72, 0.16), 0 18px 48px var(--pill-glow);
  outline: none;
}

@keyframes cf-project-pill-shine {
  0%,
  42% {
    left: -80%;
  }

  72%,
  100% {
    left: 120%;
  }
}

.cf-project-pill__image {
  width: 100%;
  min-height: 118px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--pill-accent) 22%, white), rgba(255, 255, 255, 0.94));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--pill-accent) 22%, white);
}

.cf-project-pill__image img {
  width: 100%;
  height: 100%;
  object-fit: var(--project-image-fit, cover);
  object-position: center;
}

.cf-project-pill__image span {
  color: var(--pill-accent);
  font-family: var(--font-mono);
  font-size: clamp(1.2rem, 2.4vw, 1.65rem);
  font-weight: 900;
}

.cf-project-pill__content {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 5px;
  justify-items: center;
}

.cf-project-pill__label {
  color: var(--heading);
  font-family: var(--font-mono);
  font-weight: 800;
  font-size: 1rem;
}

.cf-project-pill__tag {
  max-width: 150px;
  padding: 4px 10px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--pill-accent) 12%, white);
  color: var(--pill-accent);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 800;
  line-height: 1.3;
}

.cf-project-screen {
  --pill-accent: var(--orange);
  --pill-soft: var(--orange-light);
  --pill-glow: var(--orange-glow);
  min-height: clamp(420px, 67vh, 650px);
  border: 1.5px solid color-mix(in srgb, var(--pill-accent) 24%, white);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(circle at 78% 18%, var(--pill-glow), transparent 34%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.96), color-mix(in srgb, var(--pill-soft) 66%, white));
  box-shadow: var(--shadow-md), 0 18px 46px var(--pill-glow);
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.cf-project-screen__chrome {
  display: flex;
  gap: 8px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(45, 55, 72, 0.1);
  background: rgba(255, 255, 255, 0.55);
}

.cf-project-screen__chrome span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--pill-accent);
  opacity: 0.42;
}

.cf-project-screen__stage {
  position: relative;
  display: grid;
  align-content: end;
  min-height: 0;
  padding: clamp(28px, 5vw, 54px);
  color: var(--heading);
}

.cf-project-screen__stage::before {
  content: "";
  position: absolute;
  inset: clamp(18px, 3vw, 30px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.76);
  background:
    linear-gradient(120deg, transparent 0 46%, rgba(255, 255, 255, 0.52) 47% 52%, transparent 53% 100%),
    repeating-linear-gradient(90deg, rgba(45, 55, 72, 0.06) 0 1px, transparent 1px 42px),
    repeating-linear-gradient(0deg, rgba(45, 55, 72, 0.05) 0 1px, transparent 1px 42px);
  pointer-events: none;
}

.cf-project-screen__stage--video {
  align-content: stretch;
  padding: 0;
  background: #050711;
}

.cf-project-screen__stage--video::before {
  display: none;
}

.cf-project-screen__video {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-height: 360px;
  border: 0;
  display: block;
  background: #050711;
}

.cf-project-screen__play {
  position: relative;
  z-index: 1;
  width: 78px;
  height: 78px;
  margin-bottom: clamp(40px, 8vw, 84px);
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--pill-accent);
  color: var(--white);
  box-shadow: 0 18px 42px var(--pill-glow);
}

.cf-project-screen__stage > div:not(.cf-project-screen__play):not(.cf-project-screen__progress) {
  position: relative;
  z-index: 1;
  max-width: 560px;
}

.cf-project-screen__eyebrow {
  margin: 0 0 10px;
  color: var(--pill-accent);
  font-family: var(--font-mono);
  font-size: 0.82rem;
  font-weight: 900;
  text-transform: uppercase;
}

.cf-project-screen h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.5vw, 4rem);
  line-height: 1.08;
  color: var(--heading);
}

.cf-project-screen p {
  margin-top: 14px;
  max-width: 520px;
  color: var(--body-text);
  font-size: clamp(0.98rem, 1.5vw, 1.12rem);
}

.cf-project-screen__progress {
  position: relative;
  z-index: 1;
  height: 7px;
  margin-top: 28px;
  border-radius: 999px;
  background: rgba(45, 55, 72, 0.12);
  overflow: hidden;
}

.cf-project-screen__progress span {
  display: block;
  width: 42%;
  height: 100%;
  border-radius: inherit;
  background: var(--pill-accent);
  animation: cf-project-screen-progress 2.6s ease-in-out infinite;
}

@keyframes cf-project-screen-progress {
  0%,
  100% {
    transform: translateX(-18%);
  }

  50% {
    transform: translateX(150%);
  }
}

.cf-project-screen__caption {
  padding: 14px 18px;
  border-top: 1px solid rgba(45, 55, 72, 0.1);
  color: var(--muted);
  background: rgba(255, 255, 255, 0.62);
  font-size: 0.85rem;
  font-weight: 700;
}

@media (max-width: 860px) {
  .cf-project-carousel {
    min-height: 330px;
  }

  .cf-project-carousel__track {
    height: 330px;
  }

  .cf-project-pill.is-prev {
    transform: translate3d(calc(-50% - 180px), -50%, -58px) rotateY(20deg) scale(0.76);
  }

  .cf-project-pill.is-next {
    transform: translate3d(calc(-50% + 180px), -50%, -58px) rotateY(-20deg) scale(0.76);
  }

  .cf-project-pill.cf-project-pill--left-2 {
    transform: translate3d(calc(-50% - 300px), -50%, -130px) rotateY(30deg) scale(0.58);
  }

  .cf-project-pill.cf-project-pill--right-2 {
    transform: translate3d(calc(-50% + 300px), -50%, -130px) rotateY(-30deg) scale(0.58);
  }

  .cf-project-pill.cf-project-pill--left-3,
  .cf-project-pill.cf-project-pill--right-3 {
    opacity: 0;
    pointer-events: none;
  }
}

@media (max-width: 640px) {
  .cf-project-showcase {
    gap: 18px;
  }

  .cf-project-carousel,
  .cf-project-screen {
    min-height: 310px;
  }

  .cf-project-pill {
    width: min(210px, calc(100% - 34px));
    min-height: 206px;
  }

  .cf-project-pill.is-prev {
    transform: translate3d(calc(-50% - 148px), -50%, -70px) rotateY(22deg) scale(0.7);
  }

  .cf-project-pill.is-next {
    transform: translate3d(calc(-50% + 148px), -50%, -70px) rotateY(-22deg) scale(0.7);
  }

  .cf-project-pill.cf-project-pill--left-2,
  .cf-project-pill.cf-project-pill--right-2,
  .cf-project-pill.cf-project-pill--left-3,
  .cf-project-pill.cf-project-pill--right-3 {
    opacity: 0;
    pointer-events: none;
  }

  .cf-project-screen__play {
    width: 62px;
    height: 62px;
    margin-bottom: 40px;
  }

  .cf-project-screen__stage {
    padding: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cf-project-section *,
  .cf-project-section *::before,
  .cf-project-section *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`}</style>
  );
}
