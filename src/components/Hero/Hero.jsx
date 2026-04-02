import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background image with overlay */}
      <div className="hero__bg">
        <img src="/hero-bg.png" alt="" className="hero__bg-img" />
        <div className="hero__overlay" />
      </div>

      {/* Decorative grid */}
      <div className="hero__grid-pattern" aria-hidden="true" />

      <div className="hero__content container">
        <div className="hero__badge animate-fade-in-up">
          <span className="hero__badge-dot" />
          PREMIUM FITNESS EXPERIENCE
        </div>

        <h1 className="hero__title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          IRON<span className="hero__title-accent"> CORE</span>
          <br />
          FITNESS
        </h1>

        <p className="hero__subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Unleash your potential in a state-of-the-art training environment.
          Expert coaching, elite equipment, and a community that pushes you
          beyond your limits.
        </p>

        <div className="hero__actions animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a href="#signup" className="btn btn-primary hero__cta">
            Start Your Journey
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-outline">
            Contact Us
          </a>
        </div>

        {/* Stats strip */}
        <div className="hero__stats animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
          <div className="hero__stat">
            <span className="hero__stat-value">500+</span>
            <span className="hero__stat-label">Active Members</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">15+</span>
            <span className="hero__stat-label">Expert Trainers</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value">24/7</span>
            <span className="hero__stat-label">Gym Access</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator" aria-hidden="true">
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
