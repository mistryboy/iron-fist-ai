import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Testimonials from './components/Testimonials/Testimonials';
import Pricing from './components/Pricing/Pricing';
import SignupForm from './components/SignupForm/SignupForm';
import Dashboard from './components/Dashboard/Dashboard';
import Chatbot from './components/Chatbot/Chatbot';
import Footer from './components/Footer/Footer';

export default function App() {
  const [sessionEmail, setSessionEmail] = useState(localStorage.getItem('currentUserEmail'));

  const handleLogin = (email) => {
    localStorage.setItem('currentUserEmail', email);
    setSessionEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUserEmail');
    setSessionEmail(null);
  };

  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Hero />
        <About />
        <Testimonials />
        <Pricing />
        <Contact />
        
        {sessionEmail ? (
          <Dashboard email={sessionEmail} onLogout={handleLogout} />
        ) : (
          <SignupForm onLogin={handleLogin} />
        )}
        
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
