import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/Login.css';
import Button from '@mui/material/Button';
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css"
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {login,reset} from '../redux/authReducers/authSlice';
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {user,isError,isSuccess,isLoading} = useSelector(state=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    
    if(isSuccess || user)
    {
      window.location.assign('/');
    }

  },[user,isError,isSuccess,isLoading])

  function handleLogin(e) {
    e.preventDefault();
    console.log(username,password)
    const data={username, password};
    
    try {
      dispatch(login(data));
      dispatch(reset())
    } catch (error) {
      
    }
  }

  return (
    <div className="Login__Container">

      <img src = {require("../images/logo-white.png")} className = "Login__Image" alt = "wellAttendLogo"></img>

      {isLoading && <Dots/>}
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

      <a onClick={()=>navigate('/validateEmail')} className="Login__MeetDev">Forgot Password?</a>

      <span>Designed for IOE, Pulchowk Campus</span>

    </div>
    
  );
}
 