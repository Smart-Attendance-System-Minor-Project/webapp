import React, { useEffect } from 'react'
import '../styles/EachRecord.css';
import { useNavigate } from 'react-router-dom';
import { setRecords } from '../redux/recordReducer/recordSlice';
import {useSelector,useDispatch} from 'react-redux';
import { setTraversal } from '../redux/recordReducer/studentDateSlice';
import { setForViewRecords,reset } from '../redux/recordReducer/ViewRecordSlice';
function EachRecords({username,subjectName,classType,className}) {

  const {records} = useSelector(state=>state.record);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {isSuccess,isError,isLoading} = useSelector(state=>state.viewRecord); 

  useEffect(()=>{

    if(isSuccess)
    {
      navigate("/view_records");
      
      dispatch(reset());
    }
  },[isSuccess,isError,isLoading])
  const handleRecord =()=>{

    localStorage.setItem("class_name",className);
    localStorage.setItem("class_type",classType);
    localStorage.setItem("subject",subjectName);

    
    var recordSet = [];
    records.map(EachRecord=>{
      if(EachRecord.class_name === className && EachRecord.class_type === classType &&
        EachRecord.subject === subjectName)
        {
          
           var students = [];
           var columnHeaders = [];
           var PresentNumbers = [];
           var absentNumbers = [];
           var csvData = [];
           var presentData = [];
          
           var firstDate = Object.keys(EachRecord["attendance_record"])[0];
           var NumbOfRecords = Object.keys(EachRecord["attendance_record"]).length;
           
           Object.keys(EachRecord.attendance_record[firstDate]["Records"]).map(eachStudent=>{
            students.push(eachStudent);
           })
           students.sort();

           students.map(eachStudent=>{
            var eachStudentPresentData = [];
            var percentPresent = 0;
            var count = 0;
            (Object.keys(EachRecord.attendance_record)).map(eachDate=>{
              eachStudentPresentData.push(EachRecord.attendance_record[eachDate]["Records"][eachStudent])
              if(EachRecord.attendance_record[eachDate]["Records"][eachStudent] === "P")
              {
                count += 1;
              } 

            })
      
            percentPresent = count / NumbOfRecords * 100
            eachStudentPresentData.push(percentPresent.toFixed(2))
            presentData[eachStudent] = eachStudentPresentData;
           })
          
           
       
           columnHeaders = Object.keys(EachRecord.attendance_record);
           columnHeaders.unshift("Roll No");
           columnHeaders.unshift("Name");
           columnHeaders.push("% Presence")

           
           Object.keys(EachRecord["attendance_record"]).map(eachDate=>{
            var countPresent = 0;
            var countAbsent = 0;
            Object.keys(EachRecord["attendance_record"][eachDate]["Records"]).map(eachStudent=>{
              if(EachRecord["attendance_record"][eachDate]["Records"][eachStudent] === "P")
              {
                countPresent += 1;
              }
              else {
                countAbsent += 1;
              }
            })
            PresentNumbers.push(countPresent);
            absentNumbers.push(countAbsent)

           })

           PresentNumbers.unshift(" ");
           PresentNumbers.unshift("Total Present Students");

           absentNumbers.unshift(" ");
           absentNumbers.unshift("Total Absent Students");

           
           //below is code for download records
           students.map(eachStudent=>{
            var count = 0
            var percentPresent = 0;
            var eachStudentRow = [eachStudent.split(' - ')[0],eachStudent.split(' - ')[1]];
            Object.keys(EachRecord.attendance_record).map(eachDate=>{
              if(EachRecord.attendance_record[eachDate]["Records"][eachStudent] === "P")
              {
               count += 1;
              }
              eachStudentRow.push(EachRecord.attendance_record[eachDate]["Records"][eachStudent])
           })
           percentPresent = count / NumbOfRecords * 100;
           eachStudentRow.push(percentPresent.toFixed(2));
           csvData.push(eachStudentRow);
           })

           csvData.push(PresentNumbers);
          
           var completedDataForViewing = [students,columnHeaders,presentData,csvData,Object.keys(EachRecord.attendance_record),PresentNumbers,absentNumbers];

           var traversing_data = {
            studentList:students,
            dateList:Object.keys(EachRecord.attendance_record)
           }
           dispatch(setRecords(EachRecord));
           dispatch(setTraversal(traversing_data))
           dispatch(setForViewRecords(completedDataForViewing));

        }
        
    })

    //navigate('view_records')
  }
  return (
    <div className='Container' onClick={handleRecord}>
         <div className = "EachRecord__Container">
                <div className = "EachRecord__Heading">
                     <h4>{subjectName}</h4>
                </div>
                <div className = "EachRecord__LecClass">
                    <h5>{className} - {classType === "L"?"Lecture":"Practical"}</h5>
                </div>

    </div>

    </div>
   
  )
}

export default EachRecords

