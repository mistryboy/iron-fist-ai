import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <a href="#hero" className="footer__logo">
              <span className="footer__logo-icon">⚡</span>
              IRON<span className="footer__logo-accent">CORE</span>
            </a>
            <p className="footer__desc">
              Premium fitness facility dedicated to helping you achieve your
              peak performance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h5 className="footer__col-title">Quick Links</h5>
            <nav className="footer__links">
              <a href="#hero" className="footer__link">Home</a>
              <a href="#contact" className="footer__link">Contact</a>
              <a href="#signup" className="footer__link">Join Now</a>
            </nav>
          </div>

          {/* Hours */}
          <div className="footer__col">
            <h5 className="footer__col-title">Hours</h5>
            <div className="footer__hours">
              <span>Mon - Fri: 5 AM – 11 PM</span>
              <span>Sat - Sun: 7 AM – 9 PM</span>
              <span className="footer__hours-note">Open 24/7 for members</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span className="footer__copy">
            &copy; {year} Iron Core Fitness. All rights reserved.
          </span>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">Privacy</a>
            <a href="#" className="footer__legal-link">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
