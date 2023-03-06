import React, { useEffect } from 'react'
import '../styles/EachRecord.css';
import { useNavigate } from 'react-router-dom';
import { setRecords } from '../redux/recordReducer/recordSlice';
import {useSelector,useDispatch} from 'react-redux';
function EachRecords({username,subjectName,classType,className}) {

  const {records} = useSelector(state=>state.record);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(records)
  },[])
  const handleRecord =()=>{

    localStorage.setItem("class_name",className);
    localStorage.setItem("class_type",classType);
    localStorage.setItem("subject",subjectName);

    
    var recordSet = [];
    records.map(EachRecord=>{
      if(EachRecord.class_name === className && EachRecord.class_type === classType &&
        EachRecord.subject === subjectName)
        {
          
          recordSet.push(EachRecord);
          console.log(EachRecord["attendance_record"]["03/05/2023"]["Records"]);
          dispatch(setRecords(recordSet));
        }
        
    })

    navigate('view_records')
  }
  return (
    <div className='Container' onClick={handleRecord}>
         <div className = "EachRecord__Container">
                <div className = "EachRecord__Heading">
                     <h4>{subjectName}</h4>
                </div>
                <div className = "EachRecord__LecClass">
                    <h5>{classType} - {className}</h5>
                </div>

    </div>

    </div>
   
  )
}

export default EachRecords

