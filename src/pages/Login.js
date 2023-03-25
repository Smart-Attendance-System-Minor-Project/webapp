import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/Login.css';
import Button from '@mui/material/Button';
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css"

import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {login,reset} from '../redux/authReducers/authSlice';
import { borderColor } from "@mui/system";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {user,isError,isSuccess,isLoading,message} = useSelector(state=>state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    
    console.log(isLoading)
    if(isSuccess || user)
    {
      window.location.assign('/');
      dispatch(reset())
    }

  },[user,isError,isSuccess,isLoading])

  function handleLogin(e) {
    e.preventDefault();
    console.log(username,password)
    const data={username, password};
    
    try {
      dispatch(login(data));
    
    } catch (error) {
      
    }
  }

  return (
    <div className="Login__Container">
      <div className="login__Advertise">
      <img src = {require('../images/logo_vertical_dark.png')} className="advertise_logo"></img>
      <div className="comingSoon">
        <h4>Coming soon on</h4>
      <img src = {require('../images/apple_google.png')} className="advertise_logo_icons"></img>
      </div>
      
      </div>
      <div className = "login__Login">
        
    
      <div style={{height:20,marginBottom:0}}>
      {isLoading && <Dots color="#29b0db"/>}
      </div>
        <div style={{height:20,marginBottom:20}}>
        {isError && <h2 style={{color:"red",fontSize:20}}>{message}</h2>}
        {!isError && <h2 style={{color:"#505050",fontSize:20}}>Welcome</h2>}
        </div>
      
      
          
        <form onSubmit={handleLogin} className = "LoginForm__Container">
      
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className = "LoginForm__Input"
            placeholder="Username or Email Address"
            style={isError?{borderWidth:1, borderColor:"red"}:{borderWidth:1,borderColor:"#505050"}}
          />
      

        
        
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className = "LoginForm__Input"
            placeholder="password"
            style={isError?{borderWidth:1, borderColor:"red"}:{borderWidth:1,borderColor:"#505050"}}
          />
        
        
        <Button variant="contained" style = {{width:'80%',backgroundColor:'#29b0db',padding:'13px',marginBottom:20}} type = "submit">Login</Button>
        </form>

        <a onClick={()=>navigate('/validateEmail')} className="Login__MeetDev">Forgot Password?</a>

        <div class = "IOE__Pulchowk">
        <img src = {require('../images/tu_Logo.png')}></img>
        <span>Designed for IOE, Pulchowk Campus</span>
        </div>
        

      </div>
  </div>



    
  );
}
 