import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = () => {
  const [credentials, setCredentials] = useState({username: '', password: ''})
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        setCredentials({username: '', password: ''});
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username: </label>
        <input type='text' 
          name='username' 
          id='username' 
          onChange={handleChange}
          value={credentials.username}
          placeholder='username'
          />

        <label htmlFor='password'>Password: </label>
        <input type='password' 
          name='password' 
          id='password' 
          onChange={handleChange} 
          value={credentials.password}
          />

        <button type='submit'>Log In</button>
      </form>
      
    </>
  );
};

export default Login;
