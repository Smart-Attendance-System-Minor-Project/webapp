import React,{useEffect, useState} from 'react'
import '../styles/OTPEnter.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function OTPEnterPage() {
    const navigate = useNavigate();
    const [otp1,setOTP1] = useState('');
    const [otp2,setOTP2] = useState('');
    const [otp3,setOTP3] = useState('');
    const [otp4,setOTP4] = useState('');
    const [otp5,setOTP5] = useState('');
    const [otp6,setOTP6] = useState('');

    const [otp1Focus,setOTP1Focus] = useState(true);
    const [otp2Focus,setOTP2Focus] = useState(false);
    const [otp3Focus,setOTP3Focus] = useState(false);
    const [otp4Focus,setOTP4Focus] = useState(false);
    const [otp5Focus,setOTP5Focus] = useState(false);
    const [otp6Focus,setOTP6Focus] = useState(false);

    useEffect(()=>{},[otp1Focus,otp2Focus,otp3Focus,otp4Focus,otp5Focus,otp6Focus])

    const [completeOTP,setCompleteOTP] = useState('');

    const handleOTPVerification = async()=>{
        

        const validatingData = {
            email:localStorage.getItem('emailForChangePassword'),
            otp:completeOTP

        }

        try {
            
            const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/otp_validation/',validatingData);
            if(response.data.success)
            {
                navigate('/changePassword');
            }
        } catch (error) {
            alert('OTP validation failed!')
            navigate('/validateEmail');
        }
       



        
    }
  return (
    <div className='OTP__Container'>
        <div>
            <h2>Enter the OTP sent to<br></br><span style={{color:"#29b0db"}}>{localStorage.getItem('emailForChangePassword')}</span> </h2>
        </div>
        <div></div>
        <div className = "OTP__EnterBox">
            <input onChange={(e)=>{setOTP1(e.target.value);setOTP2Focus(true)}} maxlength={1} autoFocus = {otp1Focus}></input>
            <input onChange={(e)=>{setOTP2(e.target.value)}} maxlength={1} autoFocus = {otp2Focus}></input>
            <input onChange={(e)=>{setOTP3(e.target.value)}} maxlength={1} autoFocus = {otp3Focus}></input>
            <input onChange={(e)=>{setOTP4(e.target.value)}} maxlength={1} autoFocus = {otp4Focus}></input>
            <input onChange={(e)=>{setOTP5(e.target.value)}} maxlength={1} autoFocus = {otp5Focus}></input>
            <input onChange={(e)=>{setCompleteOTP(otp1+otp2+otp3+otp4+otp5+e.target.value)}} maxlength={1} autoFocus = {otp6Focus}></input>
        </div>
        <div>
            <button onClick={handleOTPVerification} id = "Verify">Verify OTP</button>
        </div>
    </div>
  )
}

export default OTPEnterPage