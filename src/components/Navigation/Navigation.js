import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from '../../context/UserContext';

const Navigation = () => {
  const { setIsLoggedIn, setUser, isLoggedIn } = useContext(UserContext);

  const resetContext = () => {
    setIsLoggedIn(false);
    setUser({});
  }

  return (
    <nav style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '50px'}}>
    {isLoggedIn ? (
       <Link to="/login" onClick={resetContext} className='f4 link dim black underline pa3 pointer'>SIGN OUT</Link>
    ) : (
      <div style={{display: 'flex'}}>
        <Link to="/login" className='f4 link dim black underline pa3 pointer mr3'>SIGN IN</Link>
        <Link to="/register" className='f4 link dim black underline pa3 pointer'>REGISTER</Link>
      </div>
    )}
    </nav>
  )
}
 
export default Navigation;