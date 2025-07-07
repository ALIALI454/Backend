// Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import suzaLogo from '../assets/suza-logo.jpeg'; // Hakikisha path iko sawa
import './Logo.css'; // Hakikisha hii ipo hapa!

const Logo = () => {
  return (
    <div className="logo-container"> {/* Container kuu ya logo na jina la mfumo */}
      <Link to="/" className="logo-link"> {/* Link kwa ajili ya logo na jina */}
        <img src={suzaLogo} alt="SUZA Logo" className="logo-image" /> {/* Picha ya logo */}
        <h1 className="logo-title">SUZA PROMOTION GUIDELINE SYSTEM</h1> {/* Jina la mfumo sasa litakaa chini ya logo kwa kutumia CSS */}
      </Link>
    </div>
  );
};

export default Logo;