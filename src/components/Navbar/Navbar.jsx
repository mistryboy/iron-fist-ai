import { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Join', href: '#signup' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">
        {/* Logo */}
        <a href="#hero" className="navbar__logo" aria-label="Iron Core Fitness Home">
          <span className="navbar__logo-icon">⚡</span>
          <span className="navbar__logo-text">
            IRON<span className="navbar__logo-accent">CORE</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="navbar__link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <a href="#signup" className="btn btn-primary navbar__cta">
            Get Started
          </a>

          {/* Mobile Toggle */}
          <button
            className={`navbar__burger${mobileOpen ? ' navbar__burger--open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div className={`navbar__mobile${mobileOpen ? ' navbar__mobile--open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="navbar__mobile-backdrop" onClick={() => setMobileOpen(false)} />
        <nav className="navbar__mobile-nav">
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__mobile-link"
              onClick={handleNavClick}
              style={{ '--index': index }}
            >
              <span className="navbar__mobile-link-num">0{index + 1}</span>
              {link.label}
            </a>
          ))}
          <div className="navbar__mobile-footer">
            <a
              href="#signup"
              className="btn btn-primary navbar__mobile-cta"
              onClick={handleNavClick}
            >
              Join the Movement
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
