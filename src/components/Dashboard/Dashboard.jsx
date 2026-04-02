import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './Dashboard.css';

export default function Dashboard({ email, onLogout }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          setUserData(querySnapshot.docs[0].data());
        }
      } catch (err) {
        console.error('Error fetching user data from Firestore:', err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now';
    // Handle Firestore Timestamp
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Recently';
  };

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="dashboard section" id="dashboard">
        <div className="container">
          <div className="dashboard__loading">
             <div className="dashboard__spinner"></div>
             <p>Loading your profile...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard section" id="dashboard">
      <div className="container">
        
        <div className="dashboard__header">
          <div>
            <span className="section-label">Your Account</span>
            <h2 className="section-title">
              Welcome back, <span className="dashboard__title-accent">{userData?.name?.split(' ')[0] || 'Member'}</span>!
            </h2>
          </div>
          
          <button className="btn btn-outline dashboard__logout-btn" onClick={onLogout}>
            Sign Out
          </button>
        </div>

        <div className="dashboard__card">
          <h3 className="dashboard__card-title">Profile Details</h3>
          
          <div className="dashboard__details-grid">
            <div className="dashboard__detail-item">
              <span className="dashboard__detail-label">Name</span>
              <span className="dashboard__detail-value">{userData?.name || '---'}</span>
            </div>
            
            <div className="dashboard__detail-item">
              <span className="dashboard__detail-label">Email</span>
              <span className="dashboard__detail-value">{userData?.email || email}</span>
            </div>

            <div className="dashboard__detail-item">
              <span className="dashboard__detail-label">Member Since</span>
              <span className="dashboard__detail-value">{formatDate(userData?.createdAt)}</span>
            </div>
          </div>

          <div className="dashboard__divider"></div>

          <div className="dashboard__membership-area">
            <div>
              <span className="dashboard__detail-label">Membership Status</span>
              {userData?.membershipPlan ? (
                <div className="dashboard__badge dashboard__badge--active">
                  <span className="dashboard__badge-dot"></span>
                  Active Plan: {userData.membershipPlan.toUpperCase()}
                </div>
              ) : (
                <div className="dashboard__badge dashboard__badge--inactive">
                  No active plan
                </div>
              )}
            </div>
            
            {!userData?.membershipPlan && (
              <button className="btn btn-primary" onClick={scrollToPricing}>
                View Pricing
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
