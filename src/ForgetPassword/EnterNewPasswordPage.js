import React, { useState } from 'react'
import axios from 'axios';
import '../styles/EnterNewPassword.css'
import { useNavigate } from 'react-router-dom';
function EnterNewPasswordPage() {
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const handleChangePassword = async()=>{
      

      const validateData = {
        password:password,
        confirm_password:confirmPassword,
        email:localStorage.getItem('emailForChangePassword')
      }
      
      try {
        const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/password_reset/',validateData);

        //localStorage.removeItem('emailForChangePassword');
        navigate('/login');

        
      } catch (error) {
       console.log(error); 
      }
    }

  return (
    <div className='EnterPassword__Container'>
      <h1>Enter your new password.</h1>
        <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Password'></input>
        <input onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" placeholder='Confirm Password'></input>
        <button onClick={handleChangePassword}>Change Password</button>
    </div>
  )
}

export default EnterNewPasswordPage