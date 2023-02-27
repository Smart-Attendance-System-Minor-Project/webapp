import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../Navbar';
import '../styles/ViewRecords.css'
function ViewRecord() {

    const {records} = useSelector(state=>state.record);
    const [recordFinder,setRecordFinder] = useState({
        username:'',
        class_name:'',
        class_type:'',
        subject:''
        })

    useEffect(()=>{

        //data setting to set the recordFinder which will get the particular records
       
        const recordFinderDataFetch = {
            username:localStorage.getItem('username'),
            class_name:localStorage.getItem('class_name'),
            class_type:localStorage.getItem("class_type"),
            subject:localStorage.getItem("subject")
        }

        

        setRecordFinder(recordFinderDataFetch)
        

    },[])
  return (
    <>
    <Navbar/>
    <div className='ViewRecord__Container'>
        <h3>{localStorage.getItem("subject")} - {localStorage.getItem('class_name')}</h3>
        <h3>{localStorage.getItem("class_type") === "P"?"Practical":"Lecture"}</h3>
        <button>Analyze</button>
        <button>Download .csv</button>
        <div>
        {records.map(eachRecord=>{
             
           
             if (eachRecord.teacher_username === recordFinder.username && eachRecord.class_name === recordFinder.class_name
                 && eachRecord.class_type === recordFinder.class_type && eachRecord.subject === recordFinder.subject
                 )
                 {
                     return (
                         <div key = {eachRecord}>
                             <table style={{width:'50%'}}>
                                 <tr>
                                     <th>Name</th>
                                     <th>Roll Number</th>
                                     {(Object.keys(JSON.parse(eachRecord.attendance_record))).map(date=>{
                                         return (
                                             <th>{date}</th>
 
                                         )
                                     })}
                                 </tr>
                                 {(Object.keys(JSON.parse(eachRecord.attendance_record))).map(date=>{
                                    return (
                                     (Object.keys(JSON.parse(eachRecord.attendance_record)[date]["Records"])).map(eachStudent=>{
                                             
                                         return (
                                             <tr>
                                                 <td>{eachStudent.split(' - ')[0]}</td>
                                                 <td>{eachStudent.split(' - ')[1]}</td>
                                                 <td>{JSON.parse(eachRecord.attendance_record)[date]["Records"][eachStudent]}</td>
                                             </tr>
                                         )
                                     })
                                    )   
                                 })}
                               
                             </table>
                             <p>{}</p>
                             
                         </div>
                     )
                 }
                
 
 
 
         })}
        </div>
       
    </div>
    </>
    
  )
}

export default ViewRecord