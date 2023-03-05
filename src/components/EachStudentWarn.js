import React, { useState } from 'react'
import '../styles/EachStudentWarn.css'
import { Modal,Box,Typography,Button,TextField } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

function EachStudentWarn({name,absentCount}) {
  const [show,setShow] = useState(false);
  const [subject,setSubject] = useState('Notice Regarding Your Absence');
  const [message,setMessage] = useState('');


  const {records} = useSelector(state=>state.record);
  const handleClose = ()=> setShow(false);
  const handleShow = ()=> setShow(true);
  const warnthisStudent =async()=>
  {
    const emailingData = {
      message:message,
      total_absent:absentCount,
      total_class:Object.keys(records[0].attendance_record).length,
      student_name:name.split(' - ')[0],
      subject:subject,
      subject_name:localStorage.getItem('subject'),
      class_name:localStorage.getItem('class_name'),
      email:"076bct055.rajesh@pcampus.edu.np"

    }

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };
  try {
    const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/warn/',emailingData,config);
  } catch (error) {
    console.log(error)
  }
    
  }
  return (
    <>
    
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx ={{
        width:"500px",
        height:"500px",
        backgroundColor:'#fff',
        borderRadius:3,
        position:'fixed',
        top:'5%',
        left:'30%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-around'
      }}>
        <Typography id="modal-modal-title" variant="h5" component="h6" sx = {{textAlign:'center'}}>
          Warn {name.split(' - ')[0]}
        </Typography>
        <Typography id="modal-modal-description" sx={{textAlign:'center',color:'#29b0db'}}>
          You can add your own subject and a message for the student.
        </Typography>
        <div style={{display:'flex',flexDirection:'column'}}>
        <input onChange={(e)=>{setSubject(e.target.value)}} value={subject}></input>
        <input onChange={(e)=>{setMessage(e.target.value)}} value={message}></input>
        </div>
       
        <div>
        <Button variant="contained" onClick={warnthisStudent}>Send Email</Button>
        <Button variant="outlined" onClick = {()=>setShow(false)}>Cancel</Button>
        </div>
       
      </Box>
    </Modal>
        

      <div className='eachStudent__Warn'>
        <div className='eachStudent__Info'>
            <h4>{name.split(' - ')[0]} - <span style={{color:"#29b0db"}}>{name.split(' - ')[1]}</span></h4>
            
            <h4>Total Absent: <span style={{fontWeight:'800'}}>{absentCount} days</span></h4>
            
        </div>
        <div className='wantTo__Warn'>
            <button onClick = {handleShow}>Warn</button>
        </div>
        
      </div>
      
      </>
    
  )
}


export default EachStudentWarn