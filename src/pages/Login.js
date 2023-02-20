import React, { useState } from "react";
import axios from 'axios';
import '../styles/Login.css';
import Button from '@mui/material/Button';
import { Navigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log(username,password)
    const data={username, password};
    axios.post('https://prat051.pythonanywhere.com/attendance/login/', data)
    .then(response => {
        console.log('login successful: ', response.data);
        window.location.assign('/')
        //works
    })
    .catch(error => {
        console.error('there was a problem with login: ', error);
    });
  }

  return (
    <div className="Login__Container">

      <img src = {require("../images/logo-white.png")} className = "Login__Image" alt = "wellAttendLogo"></img>


      <form onSubmit={handleLogin} className = "LoginForm__Container">
     
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className = "LoginForm__Input"
          placeholder="username"
        />
    

      
      
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className = "LoginForm__Input"
          placeholder="password"
        />
      
      
       <Button variant="contained" style = {{width:'20%',backgroundColor:'#29b0db',padding:'13px'}} type = "submit">Login</Button>
      </form>

      <a href = "#" className="Login__MeetDev">Meet the Developers</a>

    </div>
    
  );
}
 