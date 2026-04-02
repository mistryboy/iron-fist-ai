import './About.css';

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="about__inner">
          <div className="about__content">
            <span className="section-label">Our Story</span>
            <h2 className="section-title">
              Built on <span className="about__title-accent">Strength</span> and Grit
            </h2>
            <p className="section-subtitle">
              Founded in 2018, IRON CORE started as a small underground powerlifting club. Today, we are the premier destination for elite athletes and fitness enthusiasts who refuse to settle for mediocrity.
            </p>
            
            <div className="about__stats">
              <div className="about__stat">
                <span className="about__stat-value">6+</span>
                <span className="about__stat-label">Years Experience</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-value">12k+</span>
                <span className="about__stat-label">Members Globally</span>
              </div>
              <div className="about__stat">
                <span className="about__stat-value">50+</span>
                <span className="about__stat-label">Expert Coaches</span>
              </div>
            </div>

            <button className="btn btn-primary about__cta">Learn Our Philosophy</button>
          </div>

          <div className="about__visual">
            <div className="about__image-container">
              <div className="about__image-frame">
                <img src="/hero-bg.png" alt="Training at Iron Core" className="about__image" />
                <div className="about__image-overlay"></div>
                <div className="about__image-tag">
                  <span className="about__image-tag-icon">⚡</span>
                  <span className="about__image-tag-text">EST. 2018</span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="about__decoration about__decoration--1"></div>
              <div className="about__decoration about__decoration--2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
