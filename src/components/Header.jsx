import React from 'react';
import Logo from './Logo';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#121113ff',
      color: 'white',
      padding: '10px 0',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Logo />
      </div>
    </header>
  );
};

export default Header;