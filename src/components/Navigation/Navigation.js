import React from 'react';
import Logo from '../Logo/Logo';
 
const Navigation = ({onRouteChange, isLoggedIn}) => {
  if (isLoggedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'space-between', marginBottom: '100px'}}>
        <Logo />
        <p onClick={() => onRouteChange('login')} className='f4 link dim black underline pa3 pointer'>SIGN OUT</p>
      </nav>
    )
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'space-between', marginBottom: '100px'}}>
        <Logo />
        <div style={{display: 'flex'}}>
          <p onClick={() => onRouteChange('login')} className='f4 link dim black underline pa3 pointer mr3'>SIGN IN</p>
          <p onClick={() => onRouteChange('register')} className='f4 link dim black underline pa3 pointer'>REGISTER</p>
        </div>
      </nav>
    )
  }
}
 
export default Navigation;