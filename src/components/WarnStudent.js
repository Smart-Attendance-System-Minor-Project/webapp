import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import EachStudentWarn from './EachStudentWarn'
import '../styles/WarnStudent.css'
function WarnStudent() {

    
    var {absentStudents} = useSelector(state=>state.absence);
   
  return (
    <>
    <h3>Absent Students</h3>
    <div className='warnStudent__Container'>
        {absentStudents.map(eachStudentAbsence=>{
            return (
            <EachStudentWarn 
            name = {eachStudentAbsence.name}
            absentCount = {eachStudentAbsence.absentCount}
            />          
            )
            
        })}
    </div>
    </>
    
  )
}

export default WarnStudent