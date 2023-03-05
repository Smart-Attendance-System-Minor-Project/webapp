import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { useDispatch,useSelector } from 'react-redux';
import { setAbsentStudents } from '../redux/recordReducer/absentStudents';
import '../styles/Analytics.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement } from "chart.js";
import { Line } from "react-chartjs-2";
import WarnStudent from '../components/WarnStudent';
import EachStudentWarn from '../components/EachStudentWarn';
ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,LinearScale,PointElement,LineElement);

function Analytics() {
  const {records} = useSelector(state=>state.record);
  const {traverse_data} = useSelector(state=>state.traversing);

  const [average,setAverage] = useState(0);
  const [totalPercent,setTotalPercent] = useState(0);
  const [status,setStatus] = useState('');
  const [comparison,setComparison] = useState('');
  const [eightDayPresentCount,setEightDayPresentCount] = useState([]);
  

  const dispatch = useDispatch();

  useEffect(()=>{
      
   
    if(!localStorage.getItem('token'))
    {
        window.location.assign('/login');
    }

    var arrayOfPresentNumber = [];
    //We only select the latest eight records that is why slice(-8) is used.
    records.slice(-8).map(eachRecord=>{
      
      (traverse_data.dateList).map(eachDate=>{
        var countPresent = 0;
    
        (traverse_data.studentList).map(eachStudent=>{
          if(eachRecord.attendance_record[eachDate]["Records"][eachStudent] === "P")
          {
            countPresent += 1;
          }
        })
        arrayOfPresentNumber.push(countPresent);
      })
      
    })
    
    var absentStudentArray = [];
    
    //the below codes prepares the list of absent students
    records.map(eachRecord=>{
      (traverse_data.studentList).map(eachStudent=>{
        var countAbsent = 0;
        (traverse_data.dateList).map(eachDate=>{
          if(eachRecord.attendance_record[eachDate]["Records"][eachStudent] === "A")
          {
           
            countAbsent += 1;
          }
        })
        const eachAbsentStudent = {
          name:eachStudent,
          absentCount:countAbsent
        };
       
        if(countAbsent) {absentStudentArray.push(eachAbsentStudent)}
        
      })
    })
    dispatch(setAbsentStudents(absentStudentArray))
    setEightDayPresentCount(arrayOfPresentNumber);

    var sumOfPresence = 0;
    arrayOfPresentNumber.map(eachDayPresence=>{
      sumOfPresence += eachDayPresence;
    })
    
    setAverage(parseInt(sumOfPresence / 8));
    setTotalPercent((sumOfPresence / 8) / (traverse_data.studentList).length * 100);

    

  },[])

  return (
    <>
    <Navbar/>
    <div className='Analysis__Container'>
      <h1>Analysis Report of Last Eight Records</h1>
      <div className='analysis_row-one'>
        <div className='each-item-one'>
          <h3>{localStorage.getItem("subject")}</h3>
          <h4>{localStorage.getItem("class_name")} {localStorage.getItem("class_type")==="L"?"Lecture":"Practical"}</h4>
          <h4>Total Classes: {Object.keys(records[0].attendance_record).length}</h4>
        </div>
        <div className='each-item'>
          <h2>Average Student</h2>
          <h1>{average}</h1>
        </div>
        <div className='each-item'>
           <h2>Percent Present</h2>
           <h1>{totalPercent.toFixed(2)}%</h1>
        </div>
        <div className='each-item'>
          <h2>Comparing</h2>
          <h1>Increased</h1>
        </div>
        <div className='each-item'>
          <h2>Status</h2>
          <h1>{average === traverse_data.studentList.length?"Excellent":average>=40 && average < 48?"Good":"Poor"}</h1>
        </div>
       
      </div>
      <div className='analysis_row-two'>
        <div className='warn-student'>
          <WarnStudent/>
        </div>
        <div className='show-graph'>
        <Line
          datasetIdKey='id'
          color='#29b0db'
          data={{
            labels: traverse_data.dateList,
            datasets: [
              {
                id: 1,
                label: 'Present Students',
                data: eightDayPresentCount,
                backgroundColor: '#fff',
                borderColor: '#29b0db' 
                
              }
            ],
          }}
        />
        </div>
      </div>
     
    </div>
    </>
    
  )
}

export default Analytics