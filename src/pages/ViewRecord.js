
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { CSVDownload,CSVLink } from 'react-csv';
import { setTraversal } from '../redux/recordReducer/studentDateSlice';

import '../styles/ViewRecords.css'
function ViewRecord() {

    const {records,isSuccess,isError,isLoading} = useSelector(state=>state.record);
    const [iniDate,setIniDate] = useState('');
    const [dateCol,setDateCol] = useState([]);
    const [studentData,setStudentData] = useState([]);
    const [csvHeaders,setcsvHeaders] = useState([]);
    const [csvData,setcsvData] = useState([]);
    const [activateAnalyze,setActivateAnalyze] = useState(false);
    const [percentagePresents,setPercentagePresent] = useState({});


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [recordFinder,setRecordFinder] = useState({
        username:'',
        class_name:'',
        class_type:'',
        subject:''
        })

    useEffect(()=>{
        
        if(!localStorage.getItem('token'))
        {
            window.location.assign('/login');
        }

        //data setting to set the recordFinder which will get the particular records
       async function rundata()
       {
        const recordFinderDataFetch = {
            username:localStorage.getItem('username'),
            class_name:localStorage.getItem('class_name'),
            class_type:localStorage.getItem("class_type"),
            subject:localStorage.getItem("subject")
        }

        //console.log(Object.keys(records['0']["attendance_record"])[0]);
        setIniDate(Object.keys(records[0]["attendance_record"])[0])
        setRecordFinder(recordFinderDataFetch)

        var dateList = [];
        var studentList = [];
        var percentagePresentEach = {};
        
        
        records.map(eachRecord=>{
            
        (Object.keys(eachRecord.attendance_record)).map(eachDate=>{
                dateList.push(eachDate);
            })

        })
        

        
        records.map(eachRecord=>{
            (Object.keys(eachRecord.attendance_record[dateList[0]]["Records"])).map(eachStudent=>{
                studentList.push(eachStudent);
            })
        })

        //variables to set the csv data
        var csvHeaderTemp = [];
        var csvDataTemp = [];
        dateList.map(eachDate=>{
            csvHeaderTemp.push(eachDate);
        })
        
        csvHeaderTemp.push("% Presence");
        csvHeaderTemp.unshift("Roll Number");
        csvHeaderTemp.unshift("Name");


        records.map(eachRecord=>{
            studentList.map(eachStudent=>{
                var count = 0;
                var percentPresent = 0;
                var eachStudentRow = [eachStudent.split(' - ')[0],eachStudent.split(' - ')[1]];
                dateList.map(eachDate=>{
                   if(eachRecord.attendance_record[eachDate]["Records"][eachStudent] === "P")
                   {
                    count += 1;
                   }
                   eachStudentRow.push(eachRecord.attendance_record[eachDate]["Records"][eachStudent])
                })
                percentPresent = count / dateList.length * 100
                percentagePresentEach[eachStudent] = percentPresent
                eachStudentRow.push(percentPresent);
                csvDataTemp.push(eachStudentRow);
            })
        })
        setcsvData(csvDataTemp);
        setcsvHeaders(csvHeaderTemp);
        
       
        setPercentagePresent(percentagePresentEach);

        const traversingData = {
            studentList:studentList,
            dateList:dateList
        }
        dispatch(setTraversal(traversingData));
       }

       rundata();
        
       
        

    },[percentagePresents,isSuccess,isError,isLoading]);

    
  return (
    <>
    <Navbar/>
    <div className='ViewRecord__Container'>
        <h3>{localStorage.getItem("subject")} - {localStorage.getItem('class_name')}</h3>
        <h3>{localStorage.getItem("class_type") === "P"?"Practical":"Lecture"}</h3>
        <div className='ViewRecord__Buttons'>
            {activateAnalyze && <button onClick={()=>{navigate('/analytics')}}>Analyze</button>}
            {/* <button>Download .csv</button> */}
            <CSVLink 
            data={csvData}
            headers = {csvHeaders}
            className = 'btn btn-primary'
            style={{textDecoration:'none',color:"#fff",backgroundColor:"#29b0db",borderRadius:4,padding:9}}
            filename = {`${localStorage.getItem("subject")}_${localStorage.getItem('class_name')}.csv`}
            >Download .csv</CSVLink>
        </div>
        
        <div style={{overflowX:'scroll'}}>
            
        {records.map(eachRecord=>{
             

             
                 
                 {
                     return (
                         <div key = {eachRecord} className="Table__Container">
                             <table style={{width:'100%',marginTop:20}}>
                                 <tr>
                                     <th style={{width:'20%'}}>Name</th>
                                     <th style={{width:'100px'}}>Roll Number</th>
                                     {(Object.keys((eachRecord.attendance_record))).map(date=>{
                                       
                                         return (
                                             <th key={date} style = {{width:'100px'}}>{date}</th>
 
                                         )
                                     })}
                                     <th>Presence</th>
                                 </tr>
                                    
                                     {(Object.keys(eachRecord.attendance_record[Object.keys(eachRecord.attendance_record)[0]]['Records'])).map(eachStudent=>{
                                             
                                         return (
                                             <tr key = {eachRecord}>
                                                 <td>{eachStudent.split(' - ')[0]}</td>
                                                 <td>{eachStudent.split(' - ')[1]}</td>
                                                 {Object.keys((eachRecord.attendance_record)).map(eachDate=>{
                                                    return (
                                                        <td key={eachDate}>{eachRecord.attendance_record[eachDate]["Records"][eachStudent]}</td>
                                                    )
                                                    
                                                 })}
                                                 <td style = {{width:'10%'}}>{percentagePresents[eachStudent]}%</td>
                                                 
                                                 
                                             </tr>
                                         )
                                     })}
                                   
                               
                             </table>
                            
                             
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