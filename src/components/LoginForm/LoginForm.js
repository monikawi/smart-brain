import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../context/UserContext';

const LoginForm = ({ formType }) => {
  const { setIsLoggedIn, setUser } = useContext(UserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();

  
  const onSubmit = async () => {
    // add form validations
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${formType}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    });

    const userInfo = await response.json();

    if (userInfo.id) {
      setIsLoggedIn(true);
      setUser(userInfo);
      history.push("/");
    } 
  }

  return (
    <article className="geoBg br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 ttu">{formType}</legend>
            {formType === 'register' && (
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input onChange={(e) => setName(e.target.value)} className="pa2 input-reset ba bg-black white w-100" type="text" name="name"  id="name" />
              </div>
            )}
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} className="pa2 input-reset ba bg-black white w-100" type="email" name="email-address"  id="email-address" />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} className="b pa2 input-reset ba bg-black white w-100" type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className="">
            <input onClick={onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Submit" />
          </div>
          {formType === 'login' && (
            <div className="lh-copy mt3">
              <p onClick={() => history.push('/register')} href="#0" className="f6 link dim black db pointer">Register</p>
            </div>
          )}
        </div>
      </main>
    </article>
  )
}
 
export default LoginForm;