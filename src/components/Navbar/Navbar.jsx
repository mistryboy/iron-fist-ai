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
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
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
        <a href="#signup" className="btn btn-primary navbar__cta">
          Get Started
        </a>

        {/* Mobile Toggle */}
        <button
          className={`navbar__burger${mobileOpen ? ' navbar__burger--open' : ''}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Overlay */}
      <div className={`navbar__mobile${mobileOpen ? ' navbar__mobile--open' : ''}`}>
        <nav className="navbar__mobile-nav">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__mobile-link"
              onClick={handleNavClick}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#signup"
            className="btn btn-primary navbar__mobile-cta"
            onClick={handleNavClick}
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
}
