import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
        <div>
            <h1>Enter the email you used during registration.</h1>
            <h3 style={{color:'red'}}>{error}</h3>
        </div>
        <div>
            <input onChange={(e)=>{setEmail(e.target.value)}}></input>
        </div>
        <div>
            <button onClick={handleEmailVerification}>Validate Email</button>
        </div>
        {/* <a onClick={navigate('/login')}>Back to login</a> */}
    </div>
  )
}

export default EmailEnterPage