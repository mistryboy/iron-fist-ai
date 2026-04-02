import { useEffect, useState } from 'react';
import './PaymentModal.css';

export default function PaymentModal({ isOpen, onClose, plan, onSuccess }) {
  const [status, setStatus] = useState('processing'); // 'processing' | 'success'

  useEffect(() => {
    if (isOpen) {
      setStatus('processing');
      
      // Simulate 2-second mock payment delay
      const paymentTimer = setTimeout(() => {
        setStatus('success');
        
        // Notify parent 1.5 seconds after showing the success screen
        setTimeout(() => {
          onSuccess(plan.name);
        }, 1500);
      }, 2000);

      return () => clearTimeout(paymentTimer);
    }
  }, [isOpen, plan, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="payment-modal__overlay">
      <div className="payment-modal__content animate-scale-in">
        
        {status === 'processing' ? (
          <>
            <div className="payment-modal__spinner"></div>
            <h3 className="payment-modal__title">Processing Payment...</h3>
            <p className="payment-modal__subtitle">
              Securing your {plan?.name} membership upgrade. Please do not close this window.
            </p>
          </>
        ) : (
          <>
            <div className="payment-modal__success-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="payment-modal__title">Payment Successful 💪</h3>
            <p className="payment-modal__subtitle">
              Your account has been successfully linked to the {plan?.name}. Welcome to the Iron Core family!
            </p>
          </>
        )}

      </div>
    </div>
  );
}
