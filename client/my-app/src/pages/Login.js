import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const {setAuthUser} = useContext(AuthContext);
  const [loginInvalid, setLoginInvalid] = useState("");

  const login = () => {
    const data = { username, password }
    axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, data).then((res) => {
      console.log(res)
      if (res.data.error){
         setLoginInvalid(res.data.error);
      } else {
        console.log('hello')
        localStorage.setItem( 'accessToken', res.data.accessToken )
      setAuthUser({
        username : res.data.username,
        id : res.data.id,
        status: true
      });
      setLoginInvalid(false);
      navigate('/');
    }
    })
    .catch((err) => {
      console.log('error')
      console.log(err.response?.data?.error || 'Login failed');
      setLoginInvalid(true);
    });
  }
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
      {loginInvalid ? <span>Invalid Login : {loginInvalid}</span> : <span></span>}
    </div>
  )
}
