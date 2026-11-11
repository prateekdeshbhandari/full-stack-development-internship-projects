const features = [
  {
    icon: "↗",
    title: "A shared place for good ideas",
    description:
      "Keep project notes, decisions, and documents together so everyone can find the latest version.",
  },
  {
    icon: "◉",
    title: "See who's working with you",
    description:
      "Bring teammates into the same workspace and make progress visible without another status meeting.",
  },
  {
    icon: "⌁",
    title: "Keep conversations in context",
    description:
      "Connect feedback to the work itself and spend less time searching across scattered messages.",
  },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M5 7.5h8.5a4.5 4.5 0 0 1 0 9H11M19 16.5h-8.5a4.5 4.5 0 0 1 0-9H13"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </svg>
    </span>
  );
}

function WorkspacePreview() {
  return (
    <div
      className="preview-wrap"
      id="preview"
      role="region"
      aria-label="Workspace preview"
    >
      <div className="preview-glow" />
      <div className="workspace-preview">
        <div className="preview-top">
          <div className="preview-workspace">
            <span className="workspace-icon">g</span>
            <span>Gather / Product team</span>
          </div>
          <span className="window-dots" aria-hidden="true">
            ···
          </span>
        </div>
        <div className="preview-body">
          <aside className="preview-sidebar" aria-label="Workspace navigation">
            <p className="sidebar-label">Workspace</p>
            <div className="sidebar-item">Overview</div>
            <div className="sidebar-item active">Product direction</div>
            <div className="sidebar-item">Sprint planning</div>
            <div className="sidebar-item">Research notes</div>
            <p className="sidebar-label" style={{ marginTop: 22 }}>
              Shared with you
            </p>
            <div className="sidebar-item">Launch checklist</div>
          </aside>
          <article className="doc-content">
            <div className="doc-meta">UPDATED JUST NOW · 3 PEOPLE HERE</div>
            <h2>Product direction</h2>
            <p className="doc-subtitle">A little more focus, a lot more flow.</p>
            <p className="doc-heading">What we are building</p>
            <div className="doc-line" />
            <div className="doc-line medium" />
            <div className="doc-line short" />
            <div className="doc-highlight">
              Make it easy for every teammate to pick up where the last person left
              off.
            </div>
            <p className="doc-heading">Next up</p>
            <div className="doc-line medium" />
            <div className="doc-line short" />
          </article>
        </div>
      </div>
      <div className="collaborator-card one">
        <div className="avatar-wrap">
          <span className="avatar lilac">AM</span>
          <span className="live-dot" />
        </div>
        <div>
          <div className="collaborator-name">Alex Morgan</div>
          <div className="collaborator-action">is editing this doc</div>
        </div>
      </div>
      <div className="collaborator-card two">
        <div style={{ display: "flex", paddingLeft: 2 }}>
          <span className="avatar coral" style={{ marginLeft: -2 }}>
            JR
          </span>
          <span className="avatar sage" style={{ marginLeft: -8 }}>
            SK
          </span>
        </div>
        <div>
          <div className="collaborator-name">Your team, together</div>
          <div className="collaborator-action">3 people collaborating</div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Gather home">
          <BrandMark />
          <span>gather</span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#features">Why Gather</a>
          <a href="#preview">How it works</a>
          <a className="nav-cta" href="#preview">
            Explore the workspace
          </a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            GOOD WORK, IN GOOD COMPANY
          </div>
          <h1 id="hero-title">
            Make space
            <br />
            for <span>great work.</span>
          </h1>
          <p className="hero-copy">
            Bring your team&apos;s ideas, documents, and conversations into one
            thoughtful workspace. Less chasing things down. More making things
            happen.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href="#preview">
              Take a look around <span aria-hidden="true">&nbsp;↗</span>
            </a>
            <a className="text-link" href="#features">
              Get to know Gather <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="hero-note">A calmer home for the work you do together.</p>
        </div>
        <WorkspacePreview />
      </section>

      <section className="section" id="features" aria-labelledby="features-title">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              BUILT FOR THE WAY TEAMS WORK
            </div>
            <h2 id="features-title">Everything in its right place.</h2>
          </div>
          <p>
            A shared workspace that helps your team stay in sync and do their
            best work, without adding more noise.
          </p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className="feature-icon" aria-hidden="true">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <a className="brand" href="#" aria-label="Gather home">
          <BrandMark />
          <span>gather</span>
        </a>
        <span>A thoughtful space for work that matters.</span>
      </footer>
    </main>
  );
}
