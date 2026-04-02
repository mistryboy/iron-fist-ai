import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import PaymentModal from './PaymentModal';
import './Pricing.css';

const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'BASIC PLAN',
    price: '₹999',
    period: '/month',
    features: [
      'Gym access during regular hours',
      'Cardio equipment',
      'Locker room access',
      'Free Wi-Fi',
    ],
    highlight: false,
  },
  {
    id: 'pro',
    name: 'PRO PLAN',
    price: '₹1999',
    period: '/month',
    features: [
      'Everything in Basic',
      '24/7 Access (Keycard)',
      'Personal trainer (2 sessions/week)',
      'Diet & nutrition guidance',
    ],
    highlight: true, // Pro is the featured plan
  },
  {
    id: 'elite',
    name: 'ELITE PLAN',
    price: '₹2999',
    period: '/month',
    features: [
      'Everything in Pro',
      'Daily personal training',
      'Custom workout & diet plan',
      'Free protein shakes & supplements',
    ],
    highlight: false,
  },
];

const CheckIcon = () => (
  <svg className="pricing__check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Pricing() {
  const [activePlan, setActivePlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Check if they already have an active plan stored in Firebase based on their email
  useEffect(() => {
    const checkExistingPlan = async () => {
      const userEmail = localStorage.getItem('currentUserEmail');
      if (!userEmail) return;

      try {
        const q = query(collection(db, 'users'), where('email', '==', userEmail));
        const snapshots = await getDocs(q);
        if (!snapshots.empty) {
          const userData = snapshots.docs[0].data();
          if (userData.membershipPlan) {
            setActivePlan(userData.membershipPlan);
          }
        }
      } catch (err) {
        console.error("Failed to fetch active membership:", err);
      }
    };

    checkExistingPlan();
  }, []);

  const handleBuyClick = (plan) => {
    const userEmail = localStorage.getItem('currentUserEmail');
    if (!userEmail) {
      alert("Please create an account first to purchase a membership.");
      document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = async (planName) => {
    const userEmail = localStorage.getItem('currentUserEmail');
    
    try {
      const q = query(collection(db, 'users'), where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, {
          membershipPlan: planName
        });
        
        setActivePlan(planName);
      } else {
        console.error("User document not found for email:", userEmail);
      }
    } catch (error) {
      console.error("Failed to link membership to account:", error);
      alert("Payment succeeded locally, but failed to link to cloud database.");
    } finally {
      setIsModalOpen(false);
      setSelectedPlan(null);
    }
  };

  return (
    <section className="pricing section" id="pricing">
      <div className="container">
        
        {/* Header */}
        <div className="pricing__header">
          <span className="section-label">Membership Plans</span>
          <h2 className="section-title">
            {activePlan ? (
              <>Your Plan: <span className="pricing__title-accent">{activePlan}</span></>
            ) : (
              <>Choose Your <span className="pricing__title-accent">Plan</span></>
            )}
          </h2>
          <p className="section-subtitle">
            Flexible memberships designed for any fitness level. Cancel or upgrade anytime, no hidden fees.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing__grid">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`pricing__card ${plan.highlight ? 'pricing__card--highlight' : ''}`}
            >
              {plan.highlight && <div className="pricing__badge">Most Popular</div>}
              
              <div className="pricing__card-top">
                <h3 className="pricing__name">{plan.name}</h3>
                <div className="pricing__price-wrapper">
                  <span className="pricing__price">{plan.price}</span>
                  <span className="pricing__period">{plan.period}</span>
                </div>
              </div>

              <ul className="pricing__features">
                {plan.features.map((feature, i) => (
                  <li key={i} className="pricing__feature">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pricing__cta">
                {activePlan === plan.name ? (
                  <button className="btn btn-outline pricing__btn" disabled style={{ borderColor: 'var(--color-text-muted)', color: 'var(--color-text-muted)', opacity: 0.6 }}>
                    Active Plan
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuyClick(plan)}
                    className={`btn pricing__btn ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Global Transparent Payment Process Modal */}
        <PaymentModal 
          isOpen={isModalOpen}
          plan={selectedPlan}
          onSuccess={handlePaymentSuccess}
          onClose={() => setIsModalOpen(false)}
        />

      </div>
    </section>
  );
}
