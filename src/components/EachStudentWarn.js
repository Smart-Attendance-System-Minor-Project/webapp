import React, { useState,useEffect } from 'react'
import '../styles/EachStudentWarn.css'
import { Modal,Box,Typography,Button,TextField,Alert } from '@mui/material';
import axios from 'axios';
import { Dots } from 'react-activity';
import { useSelector } from 'react-redux';


function EachStudentWarn({name,absentCountWithNotice,absentCountWithoutNotice,set}) {
  const [show,setShow] = useState(false);
  const [subject,setSubject] = useState('Notice Regarding Your Absence');
  const [message,setMessage] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [successEmail,setSuccessEmail] = useState(false);

  useEffect(()=>{},[isLoading,successEmail])
  
  const {dateList} = useSelector(state=>state.viewRecord);
  const handleClose = ()=> setShow(false);
  const handleShow = ()=> setShow(true);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 680,
    height:450,
    bgcolor: 'background.paper',
    borderRadius:3,
    boxShadow: 24,
    p: 4,
  };

  const warnthisStudent = async() =>

  {
    if(subject.length === 0)
    {
      alert("Subject field cannot be empty");
      return
    }

    setIsLoading(true);
    const emailingData = {
      message:message,
      total_absent:absentCountWithNotice+absentCountWithoutNotice,
      total_class:dateList.length,
      student_name:name.split(' - ')[0],
      subject:subject,
      subject_name:localStorage.getItem('subject'),
      class_name:localStorage.getItem('class_name'),
      teacher:localStorage.getItem('fullName'),
      email: `${(name.split(' - ')[1]).toLowerCase()}.${((name.split(' - ')[0]).split(' ')[0]).toLowerCase()}@pcampus.edu.np`

    }
    
    
    
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };
  try {
    
    //console.log(emailingData);
    const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/warn/',emailingData,config);
    setIsLoading(false);
    set(true);
    setShow(false);
  } catch (error) {
    console.log(error)
  }
    
  }

  function warningModal()
  {
    return (
      <div>
        
        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          
        {<Box sx={style}>
            {successEmail && <Alert severity="success">Student warned successfully!</Alert>}
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
              You are about to warn student {name.split(' - ')[0]} via email.
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2,textAlign:"center",mb:5 }}>
              You can add your own subject and a message for the student.
            </Typography>
            <div className='warnInputs'>
            <TextField id="outlined-basic" label="Subject" onChange={(e)=>{setSubject(e.target.value)}} variant="outlined" style={{width:400}} defaultValue="Notice Regarding Your Absence"/>
            <TextField id="outlined-multiline-static" onChange={(e)=>{setMessage(e.target.value)}} label="Message(Optional)" multiline maxRows={4} style={{width:400}}/>
            <div style={{height:20}}>
                {isLoading && <Dots color = "#29b0db"/>}
                
            </div>
          
            </div>
          
            
            <div className = "warn__buttons">
            <Button variant="contained" onClick={warnthisStudent} sx = {{backgroundColor:"#29b0db"}}>Send Email</Button>
            <Button variant="outlined" onClick = {()=>setShow(false)} sx = {{ml:2}}>Cancel</Button>
            </div>

          </Box>}
          
        </Modal>
      </div>
      )
  }
  return (
    <>
    {warningModal()}
   
      <div className='eachStudent__Warn'>
        <div className='eachStudent__Info'>
            <h4>{name.split(' - ')[0]} - <span style={{color:"#29b0db"}}>{name.split(' - ')[1]}</span></h4>
            
            <h4 style={{fontSize:13}}>Absent without Leave Application: <span style={{fontWeight:'800'}}>{absentCountWithoutNotice} days</span></h4>
            <h4 style={{fontSize:13}}>Absent with Leave Application: <span style={{fontWeight:'800'}}>{absentCountWithNotice} days</span></h4>
            
        </div>
        <div className='wantTo__Warn'>
            <button onClick = {handleShow}>Warn</button>
        </div>
        
      </div>
      
      </>
    
  )
}


export default EachStudentWarn