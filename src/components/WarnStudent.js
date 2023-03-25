import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import EachStudentWarn from './EachStudentWarn'
import '../styles/WarnStudent.css'
import { Dots } from 'react-activity'
import axios from 'axios';
import { Modal,Box,Typography,TextField,Button,Alert } from '@mui/material'
function WarnStudent({settingSuccess}) {

    const [show,setShow] = useState(false);
    const [subject,setSubject] = useState('Notice Regarding Your Absence');
    const [message,setMessage] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [studentsForBulkWarn,setStudentsforBulkWarn] = useState([]);
    var {absentStudents} = useSelector(state=>state.absence);
    const {dateList} = useSelector(state=>state.viewRecord);

    useEffect(()=>{

    },[studentsForBulkWarn,show,isLoading])

    const displayDataforBulkWarn =()=>{

      var tempStudentsforBulkWarn = [];
      absentStudents.map((eachStudentRecord,index)=>{
     
        var percentPresence = 100 - (eachStudentRecord.absentCountWithNotice + eachStudentRecord.absentCountWithoutNotice)/dateList.length * 100
        if(percentPresence.toFixed(2) <= 71)
        {
          tempStudentsforBulkWarn.push({'student_name':eachStudentRecord.name,
          'email':`${(eachStudentRecord.name.split(' - ')[1]).toLowerCase()}.${((eachStudentRecord.name.split(' - ')[0]).split(' ')[0]).toLowerCase()}@pcampus.edu.np`,
          'total_absent':(eachStudentRecord.absentCountWithNotice + eachStudentRecord.absentCountWithoutNotice),
          'total_class':dateList.length,
          'presence_percent':percentPresence.toFixed(2)
        })

        }
      })

      setStudentsforBulkWarn(tempStudentsforBulkWarn);
      
      setShow(true);
    }

    const handleBulkWarning =async()=>{
      if(subject.length === 0)
      {
        alert("Subject field cannot be empty");
        return
      }
      setIsLoading(true);
      const emailingData = {
       "subject":subject,
       "teacher":localStorage.getItem("fullName"),
       "subject_name":localStorage.getItem("subject"),
       "class_name":localStorage.getItem("class_name"),
       "bulk":"true",
       "message":message,
       "student_details":studentsForBulkWarn
      }
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
       };

      try {
        

        const response = await axios.post('https://wellattend.pythonanywhere.com/attendance/warn/',emailingData,config);
        setShow(false);
        setIsLoading(false);
        settingSuccess(true);

      } catch (error) {
       
        console.log(error);
      }
    }

    const handleClose = ()=> setShow(false);
    const handleShow = ()=> setShow(true);
   
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 700,
      height:500,
      bgcolor: 'background.paper',
      borderRadius:3,
      boxShadow: 24,
      p: 4,
    };
    
  return (
    <>
    <div>
    <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          
        {<Box sx={style}>
           
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
               Warn all students with percentage presence less than 70.
            </Typography>
          

            <div style={{maxHeight:100,overflowY:'scroll',marginTop:3}}>
              {studentsForBulkWarn.map((eachStudent,index)=>{
                return (
                    <div key = {index} style = {{display:"flex",flexDirection:"row",justifyContent:'space-around'}}>
                      <p>{eachStudent.student_name.split(' - ')[0]}</p>
                      <p>{eachStudent.student_name.split(' - ')[1]}</p>
                      <p>{eachStudent.presence_percent}%</p>
                    </div>
                )
              })}
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 6,textAlign:"center" }}>
              You can add your own subject and a message for the students.
            </Typography>
            <div className='warnInputs'>
            <TextField id="outlined-basic" label="Subject" onChange={(e)=>{setSubject(e.target.value)}} variant="outlined" style={{width:400}} defaultValue="Notice Regarding Your Absence"/>
            <TextField id="outlined-multiline-static" onChange={(e)=>{setMessage(e.target.value)}} label="Message(Optional)" multiline maxRows={4} style={{width:400}}/>
            <div style={{height:20}}>
                {isLoading && <Dots color = "#29b0db"/>}
                
            </div>
          
            </div>
          
            
            <div className = "warn__buttons">
            <Button variant="contained" onClick={handleBulkWarning} sx = {{backgroundColor:"#29b0db"}}>Send Email</Button>
            <Button variant="outlined" onClick = {()=>setShow(false)} sx = {{ml:2}}>Cancel</Button>
            </div>

          </Box>}
          
        </Modal>
    </div>
    <h3>Absent Students</h3>
    <button className = "bulkWarn" onClick={displayDataforBulkWarn}>Bulk Warn</button>
    <div className='warnStudent__Container'>
        {absentStudents.map((eachStudentAbsence,index)=>{
            return (
            <EachStudentWarn 
            key={index}
            set = {settingSuccess}
            name = {eachStudentAbsence.name}
            absentCountWithNotice = {eachStudentAbsence.absentCountWithNotice}
            absentCountWithoutNotice = {eachStudentAbsence.absentCountWithoutNotice}

            />          
            )
            
        })}
    </div>
    </>
    
  )
}

export default WarnStudent