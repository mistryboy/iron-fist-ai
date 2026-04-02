import { useState, useCallback } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import './SignupForm.css';

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateName(name) {
  return name.trim().length >= 2;
}

export default function SignupForm({ onLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState('');

  const validate = useCallback(() => {
    const newErrors = {};
    if (!validateName(formData.name)) {
      newErrors.name = 'Name must be at least 2 characters.';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerMessage('');
    setSuccess(false);

    try {
      await addDoc(collection(db, 'users'), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        createdAt: serverTimestamp(),
      });

      // Keep track of the user locally for the Membership Purchase workflow
      if (onLogin) onLogin(formData.email.trim());

      setSuccess(true);
      setServerMessage('Account created successfully 💪');
      setFormData({ name: '', email: '' });
    } catch (err) {
      console.error('Firebase Error:', err);
      setServerMessage('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setLoading(false);
    setSuccess(false);
    setServerMessage('');
    setErrors({});
  };

  return (
    <section className="signup section" id="signup">
      <div className="container">
        <div className="signup__wrapper">
          {/* Left — info */}
          <div className="signup__info">
            <span className="section-label">Join the Movement</span>
            <h2 className="section-title">
              Start Your <span className="signup__title-accent">Transformation</span>
            </h2>
            <p className="section-subtitle">
              Sign up today and get access to world-class training facilities,
              personalized coaching, and a community that pushes you forward.
            </p>

            <ul className="signup__perks">
              <li className="signup__perk">
                <span className="signup__perk-icon">✦</span>
                Free first-week trial for new members
              </li>
              <li className="signup__perk">
                <span className="signup__perk-icon">✦</span>
                Personalized onboarding session
              </li>
              <li className="signup__perk">
                <span className="signup__perk-icon">✦</span>
                Access to all gym areas & classes
              </li>
              <li className="signup__perk">
                <span className="signup__perk-icon">✦</span>
                No long-term contract required
              </li>
            </ul>
          </div>

          {/* Right — form */}
          <div className="signup__form-container">
            {success ? (
              <div className="signup__success">
                <div className="signup__success-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="signup__success-title">You&apos;re In!</h3>
                <p className="signup__success-msg">{serverMessage}</p>
                <button className="btn btn-outline" onClick={resetForm}>
                  Sign Up Another
                </button>
              </div>
            ) : (
              <form className="signup__form" onSubmit={handleSubmit} noValidate>
                <h3 className="signup__form-title">Create Your Account</h3>

                {/* Name */}
                <div className="signup__field">
                  <label htmlFor="signup-name" className="signup__label">
                    Full Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    name="name"
                    className={`input-field${errors.name ? ' error' : ''}`}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <span className="signup__error">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="signup__field">
                  <label htmlFor="signup-email" className="signup__label">
                    Email Address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    name="email"
                    className={`input-field${errors.email ? ' error' : ''}`}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="signup__error">{errors.email}</span>
                  )}
                </div>

                {/* Server error */}
                {!success && serverMessage && (
                  <div className="signup__server-error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {serverMessage}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary signup__submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="signup__spinner" />
                      Signing Up...
                    </>
                  ) : (
                    'Join Iron Core'
                  )}
                </button>

                <p className="signup__disclaimer">
                  By signing up you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
