import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/EmailEnterPage.css"
function EmailEnterPage() {
    const [email,setEmail]= useState('');
    const navigate = useNavigate();
    const [error,setError] = useState('');

    useEffect(()=>{},[error])

    const handleEmailVerification =async()=> {
     
        const emailData = {
            email:email
        }
        try {
            localStorage.setItem('emailForChangePassword',email);
            const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/forgot_password/',emailData);
            navigate('/otpValidation');
        } catch (error) {
            setError(error.response.data.error)
        }
        
      

    }
  return (

    <div className='EmailEnterPage__Container'>
        
        <div className = "EmailEnterPage__Heading">
            <h2>Enter the email you used during registration.</h2>
            <h3 style={{color:'red'}}>{error}</h3>
        </div>
        <div className = "EmailEnterPage__Input">
            <input onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email Address"></input>
        </div>
        <div className = "EmailEnterPage__Button">
            <button onClick={handleEmailVerification}>Validate Email</button>
            <a onClick={()=>navigate('/login')} id = "takeMeBack">Back to login</a>
        </div>
       
    </div>
  )
}

export default EmailEnterPage