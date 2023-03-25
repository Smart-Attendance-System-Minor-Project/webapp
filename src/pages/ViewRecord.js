
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { CSVDownload,CSVLink } from 'react-csv';
import { setTraversal } from '../redux/recordReducer/studentDateSlice';
import { Table } from 'react-bootstrap';

import '../styles/ViewRecords.css'
function ViewRecord() {

    const {students,columnData,presentData,presentNumbers,absentNumbers,csvData} = useSelector(state=>state.viewRecord);
    const navigate = useNavigate();
 
    useEffect(()=>{
        
        //console.log(presentData);
        if(!localStorage.getItem('token'))
        {
            window.location.assign('/login');
        }

    },[]);

    
  return (
    <>
    <Navbar/>
    <div className='ViewRecord__Container'>
        <h3>{localStorage.getItem("subject")} - {localStorage.getItem('class_name')}</h3>
        <h3>{localStorage.getItem("class_type") === "P"?"Practical":"Lecture"}</h3>
        <div className='ViewRecord__Buttons'>
            <button onClick={()=>{navigate('/analytics')}}>Analyze</button>
           
            <CSVLink 
            data={csvData}
            headers = {columnData}
            className = 'btn btn-primary'
            style={{textDecoration:'none',color:"#fff",backgroundColor:"#29b0db",borderRadius:4,padding:9}}
            filename = {`${localStorage.getItem("subject")}_${localStorage.getItem('class_name')}.csv`}
            >Download .csv</CSVLink>
        </div>

        <div style={{display:'flex',flexDirection:'row',justifyContent:'center',overflowY:'scroll', height: 900}}>
        <div>
        <table style = {{}}>
            <tr>
                {columnData.slice(0,2).map((eachColumn,index)=>{
                    return(
                        <th key = {index} style = {{width:200}}>{eachColumn}</th>
                    )
                })}
            </tr>
            {students.map((eachStudent,index)=>{
                return (
                    <tr key = {index}>
                        <td style={{width:'350px'}}>{eachStudent.split(' - ')[0]}</td>
                        <td style={{width:'150px'}}>{eachStudent.split(' - ')[1]}</td>
                    </tr>
                )
            })}
            <tr>
                <th style={{color:"#29b0db"}}>Total Present Students</th>
            </tr>
            <tr>
                <th style = {{color:"#29b0db"}}>Total Absent Students</th>
            </tr>
        </table>
        </div>    
       
        <div className='ViewRecord__TableContainer'>

           
            <table style={{width:400,overflowX:'scroll'}} striped="column" responsive>
            <tr>
                {columnData.slice(2).map((eachColumn,index)=>{
                    return(
                        <th key = {index} style = {{width:500}}>{eachColumn}</th>
                    )
                })}
            </tr>
            {students.map((eachStudent,index)=>{
                
                return (
                    <tr key = {index}>
                       
                        {presentData[eachStudent].map((eachrow,index)=>{
                           
                             return (
                               
                                <td key = {index} style = {{width:"100px"}}>{eachrow}</td>
                            )

                             
                         
                        })}
                    </tr>
                    
                )
            })}
            <tr>
            {presentNumbers.slice(2).map((eachLastRow,index)=>{
                   return (
                    <td key = {index} style = {{color:"#29b0db"}}>{eachLastRow}</td>
                )
               
            })}

            </tr>
            <tr>
            {absentNumbers.slice(2).map((eachLastRow,index)=>{
                 return (
                    <td key = {index} style = {{color:"#29b0db"}}>{eachLastRow}</td>
                )
            })}

            </tr>

           

            </table>
            
          
        </div>
    </div>
       
        
       
       
    </div>
    </>
    
  )
}

export default ViewRecord