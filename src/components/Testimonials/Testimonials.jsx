import './Testimonials.css';

const STATS = [
  { id: 1, label: 'Active Members', value: '500+' },
  { id: 2, label: 'Expert Trainers', value: '15+' },
  { id: 3, label: 'Average Rating', value: '4.9/5' },
  { id: 4, label: 'Years Experience', value: '10+' },
];

const REVIEWS = [
  {
    id: 1,
    name: 'Rahul Sharma',
    avatar: 'RS',
    text: '"Lost 8kg in 3 months! The trainers here are amazing and extremely supportive. Best gym in the city hands down."',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya Mehta',
    avatar: 'PM',
    text: '"The equipment is world-class and the community vibe is unmatched. I finally look forward to working out every day!"',
    rating: 5,
  },
  {
    id: 3,
    name: 'Vikram Singh',
    avatar: 'VS',
    text: '"The 24/7 access is a game-changer for my schedule. Clean facilities and the personal diet guidance was exactly what I needed."',
    rating: 5,
  },
];

const StarRating = ({ count }) => {
  return (
    <div className="testimonials__stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--color-accent)" className="testimonials__star">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
};

export default function Testimonials() {
  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        
        {/* Section Header */}
        <div className="testimonials__header">
          <span className="section-label">Social Proof</span>
          <h2 className="section-title">
            Why People <span className="testimonials__title-accent">Trust</span> Iron Core
          </h2>
        </div>

        {/* Stats Bar */}
        <div className="testimonials__stats">
          {STATS.map(stat => (
            <div key={stat.id} className="testimonials__stat-item">
              <h3 className="testimonials__stat-value">{stat.value}</h3>
              <p className="testimonials__stat-label">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="testimonials__grid">
          {REVIEWS.map(review => (
            <div key={review.id} className="testimonials__card">
              <StarRating count={review.rating} />
              <p className="testimonials__text">{review.text}</p>
              
              <div className="testimonials__author">
                <div className="testimonials__avatar">{review.avatar}</div>
                <div className="testimonials__author-info">
                  <h4 className="testimonials__name">{review.name}</h4>
                  <span className="testimonials__verified">Verified Member</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
