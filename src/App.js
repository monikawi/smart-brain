import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Redirect
} from "react-router-dom";
import Particles from 'react-particles-js';
import particlesOptions from './utils/particlesConfig';
import { UserContext } from './context/UserContext';
import { Navigation, LoginForm, Entries, FaceRecognition} from './components';
import './App.css';


const App = () => {  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});


  return (
    <div className="wrapper">
      <Particles className='particles' params={particlesOptions} />
      <UserContext.Provider value={{isLoggedIn, setIsLoggedIn, user, setUser}}>
        <Router>
          <div>
            <Navigation />
            <Switch>
              <Route exact path="/">
                {!isLoggedIn ? 
                  <Redirect to="/login" /> 
                : 
                  <>
                    <Entries />
                    <FaceRecognition />
                  </>
                }
              </Route>
              <Route exact path="/login">
                <LoginForm formType="login" />
              </Route>
              <Route exact path="/register">
                <LoginForm formType="register" />
              </Route>
            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
