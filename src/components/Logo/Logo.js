import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

 
const Logo = () => {
  return (  
    <Tilt className="Tilt" options={{ max : 50 }} style={{ height: 130, width: 120, cursor: 'pointer' }} >
      <div className="Tilt-inner">
        <img style={{paddingTop: '1rem'}} src={brain} alt='logo' />
      </div>
    </Tilt>
  );
}
 
export default Logo;