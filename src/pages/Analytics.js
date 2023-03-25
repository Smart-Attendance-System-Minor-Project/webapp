import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useDispatch,useSelector } from 'react-redux';
import { setAbsentStudents } from '../redux/recordReducer/absentStudents';
import '../styles/Analytics.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement,BarElement, scales } from "chart.js";
import { Bar } from "react-chartjs-2";
import WarnStudent from '../components/WarnStudent';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Collapse } from '@mui/material';
import {IconButton} from '@mui/material';

import {Alert} from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement,BarElement);

function Analytics() {

  const {traverse_data} = useSelector(state=>state.traversing);

  const {students,dateList,presentNumbers,absentNumbers,presentData} = useSelector(state=>state.viewRecord);
  const [average,setAverage] = useState(0);
  const [totalPercent,setTotalPercent] = useState(0);
  const [eightDayPresentCount,setEightDayPresentCount] = useState([]);
  
  const [openCollapse, setOpenCollapse] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius:3,
    boxShadow: 24,
    p: 4,
  };
  const data = {
    labels:dateList,
  datasets: [
    {
      label: 'Present Students',
      data: presentNumbers.slice(2),
      backgroundColor: "#29b0db",
    },
    {
      label: 'Absent Students',
      data: absentNumbers.slice(2),
      backgroundColor: "red",
    },
  
  ]
  };

  useEffect(()=>{
      
   
    if(!localStorage.getItem('token'))
    {
        window.location.assign('/login');
    }

    var arrayOfPresentNumber = [];
   
    
    
    var absentStudentArray = [];
    
    //the below codes prepares the list of absent students
      students.map(eachStudent=>{
        var countAbsentWithNotice = 0;
        var countAbsentWithoutNotice = 0;
        presentData[eachStudent].map(rowData=>{
          if(rowData === "A")
          {
            countAbsentWithoutNotice += 1;
          }
          if(rowData === "L")
          {
            countAbsentWithNotice += 1;
          }
        })
        const eachAbsentStudent = {
          name:eachStudent,
          absentCountWithNotice:countAbsentWithNotice,
          absentCountWithoutNotice:countAbsentWithoutNotice
        };
       
        if(countAbsentWithoutNotice || countAbsentWithNotice) {absentStudentArray.push(eachAbsentStudent)}

      })
    
      
        
        
     
    
    dispatch(setAbsentStudents(absentStudentArray))
    setEightDayPresentCount(arrayOfPresentNumber);

    var sumOfPresence = 0;
    presentNumbers.slice(2).map(eachDayAverage=>{
      sumOfPresence += eachDayAverage;
    })
    
    setAverage(parseInt(sumOfPresence)/dateList.length);
    setTotalPercent((average) / students.length * 100);

    

  },[average])

  function successDisplay()
  {
    return (
      <Box sx={{ width: '40%',margin:'auto' }}>
        <Collapse in={openCollapse}>
          <Alert
            action={
              <Button
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenCollapse(false);
                }}
              >
                Close
              </Button>
            }
            sx={{ mb: 2 }}
          >
           Student warned successfully!
          </Alert>
        </Collapse>
       
      </Box>
    );
  }

  
  function presenceMeaningModal(){
    return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Presence Status Meaning
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style = {{color:"#29b0db"}}>Excellent</span> if average number of students is equal to {students.length}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span style = {{color:"#29b0db"}}>Good</span> if average number of students is less than {students.length} and more than {students.length - 4}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <span style = {{color:"#29b0db"}}>Poor</span> if average number of students is less than {students.length-4}
          </Typography>
        </Box>
      </Modal>
    </div>
    )
  }

  if(dateList.length > 0)
  {
    return (
      <>
      {presenceMeaningModal()}
      <Navbar/>
      {successDisplay()}
      <div className='Analysis__Container'>
       
        <h1>Analysis Report of Records</h1>
        <div className='analysis_row-one'>
          <div className='each-item-one'>
            <h3>{localStorage.getItem("subject")}</h3>
            <h4>{localStorage.getItem("class_name")} {localStorage.getItem("class_type")==="L"?"Lecture":"Practical"}</h4>
           
          </div>
          <div className='each-item'>
             <h2>Total Records</h2>
             <h1>{dateList.length}</h1>
          </div>
          <div className='each-item'>
            <h3>Average number of Students</h3>
            <h1>{parseInt(average)}</h1>
          </div>
          <div className='each-item'>
             <h2>In Percentage</h2>
             <h1>{totalPercent.toFixed(2)}%</h1>
          </div>
        
         
          <div className='each-item'>
            <h2>Presence</h2>
           
            <h1>{average === traverse_data.studentList.length?"Excellent":average>=(traverse_data.studentList.length - 4)&& average <traverse_data.studentList.length?"Good":"Poor"}</h1>
            <p style={{textAlign:"center",textDecoration:"underline", color:"#29b0db",marginRight:0,cursor:"pointer"}}
            
            onClick = {handleOpen}
            >Presence meaning</p>
          </div>
         
         
        </div>
        <div className='analysis_row-two'>
          <div className='warn-student'>
            <WarnStudent settingSuccess = {setOpenCollapse}/>
          </div>
          <div className='show-graph'>
           
          <Bar
            datasetIdKey='id'
            color='#29b0db'
            data = {data}
            options={
             { responsive: true,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true
                }
            }
            }}
           
            
          />
          </div>
        </div>
       
      </div>
      </>
      
    )

  }

  else
  {
    return (
      <div>
        <h1>Cannot perform analysis for records less than eight.</h1>
        <h4>Please make sure you have a minimum of eight records of each class to generate the analysis report of that class.</h4>
      </div>
    )
  }
 
}

export default Analytics