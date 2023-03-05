import React,{useState} from 'react'
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
            <input onChange={(e)=>{setOTP1(e.target.value)}}></input>
            <input onChange={(e)=>{setOTP2(e.target.value)}}></input>
            <input onChange={(e)=>{setOTP3(e.target.value)}}></input>
            <input onChange={(e)=>{setOTP4(e.target.value)}}></input>
            <input onChange={(e)=>{setOTP5(e.target.value)}}></input>
            <input onChange={(e)=>{setCompleteOTP(otp1+otp2+otp3+otp4+otp5+e.target.value)}}></input>
        </div>
        <div>
            <button onClick={handleOTPVerification}>Verify OTP</button>
        </div>
    </div>
  )
}

export default OTPEnterPage