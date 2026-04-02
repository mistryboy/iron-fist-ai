import './Contact.css';

const CONTACT_INFO = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: 'Email',
    value: 'info@ironcorefit.com',
    href: 'mailto:info@ironcorefit.com',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Address',
    value: '1234 Iron Way, Fitness District, NY 10001',
    href: 'https://maps.google.com',
  },
];

export default function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="container">
        <div className="contact__header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">
            Ready to <span className="contact__title-accent">Transform</span>?
          </h2>
          <p className="section-subtitle">
            Visit us, call us, or drop an email. Our team is ready to help you
            start your fitness journey.
          </p>
        </div>

        <div className="contact__grid">
          {/* Info Cards */}
          <div className="contact__info">
            {CONTACT_INFO.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="contact__card"
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                <div className="contact__card-icon">{item.icon}</div>
                <div className="contact__card-body">
                  <span className="contact__card-label">{item.label}</span>
                  <span className="contact__card-value">{item.value}</span>
                </div>
                <svg className="contact__card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="contact__map">
            <div className="contact__map-inner">
              <div className="contact__map-pin">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="contact__map-label">Iron Core Fitness</span>
              <span className="contact__map-address">1234 Iron Way, Fitness District</span>
              <div className="contact__map-grid" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
