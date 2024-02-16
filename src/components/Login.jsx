import React, { useState } from 'react';

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedin, setLoggedin] = useState(false);
  const [registerDisplay, setRegisterDisplay] = useState(false)

  function handleDisplay(isRegister) {
    setRegisterDisplay(isRegister); // Set to true for Register, false for Login
  }

  const handleSubmitReg = async (e) => {
    e.preventDefault();

    const credentials = { username, password };

    // send the credentials to the backend

    try {
        const response = await fetch('https://memory-mosiac-37193ea89723.herokuapp.com/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
    
        const data = await response.json();
        //Fortune added this line of code.
        console.log(response)
    
        if (response.ok) {
        //   setLoggedin= true;
          props.decision(data.success) 
          console.log('Login successful', data);
          // Handle successful login here (e.g., redirecting the user or storing the login token)
        } else {
          console.error('Login failed', data.message);
          // Handle login failure here (e.g., showing an error message)
        }
      } catch (error) {
        console.error('Error:', error);
      }

    // Reset form fields
    setUsername('');
    setPassword('');
  };
  const handleSubmitLog = async (e) => {
    e.preventDefault();

    const credentials = { username, password };

    // send the credentials to the backend

    try {
        const response = await fetch('https://memory-mosiac-37193ea89723.herokuapp.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
    
        const data = await response.json();
        //Fortune added this line of code.
        console.log(response)
    
        if (response.ok) {
        //   setLoggedin= true;
          props.decision(data.success, credentials.username) 
          console.log('Login successful', data);
          // Handle successful login here (e.g., redirecting the user or storing the login token)
        } else {
          console.error('Login failed', data.message);
          // Handle login failure here (e.g., showing an error message)
        }
      } catch (error) {
        console.error('Error:', error);
      }

    // Reset form fields
    setUsername('');
    setPassword('');
  };

  return (
    <div className='login'> 
      <button className='bttn bttn1' onClick={() => handleDisplay(false)}>Login</button>
      <button className='bttn' onClick={() => handleDisplay(true)}>Register</button><br></br>
      <form className='form' onSubmit={registerDisplay? handleSubmitReg: handleSubmitLog}>
        <div>
          <input
            placeholder='Username'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className='mt-3'
            placeholder='Password'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='btn btn-warning btn-lg mt-2' type="submit">{registerDisplay? "Register": "Login"}</button>
      </form>
    </div>
  );
}

export default Login;
