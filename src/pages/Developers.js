import React, { useEffect } from 'react'
import '../styles/Developers.css'
function Developers() {
    useEffect(()=>{
        if(!localStorage.getItem('token'))
        {
            window.location.assign('/login');
        }
    },[]);
  return (
    <div className = "Developers__Container">
        <div className = "Developers__Heading">
            <h1>The Deep Learners</h1>
        </div>

        <div className = "Developer__ContentContainer">
            <div className = "Developer">
                <div className = "Developer__Image">
                <img src = {require('../images/dev_Pratik.jpg')}/>
                </div>
                <div className = "Developer__Content">
                    <h2>Pratik Dahal</h2>
                    <h4 style = {{color:'#29b0db'}}>Backend Engineer</h4>
                </div>
            </div>
            <div className = "Developer">
             <div className = "Developer__Image">
                <img src = {require('../images/dev_Rahul.jpg')}/>
             </div>
             <div className = "Developer__Content">
                    <h2>Rahul Kumar Jha</h2>
                    <h4 style = {{color:'#29b0db'}}>Backend Engineer</h4>
             </div>
            </div>
            <div className = "Developer">
             <div className = "Developer__Image">
                <img src = {require('../images/dev_Rajesh.jpg')}/>
             </div>
             <div className = "Developer__Content">
                    <h2>Rajesh Neupane</h2>
                    <h4 style = {{color:'#29b0db'}}>UI/UX Designer & <br></br>Frontend Engineer</h4>
             </div>
            </div>
          
        </div>
    </div>
  )
}

export default Developers