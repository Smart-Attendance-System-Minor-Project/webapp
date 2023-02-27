import React from 'react'
import '../styles/EachRecord.css';
import { useNavigate } from 'react-router-dom';
function EachRecords({username,subjectName,classType,className}) {

  const navigate = useNavigate();
  const handleRecord =()=>{

    localStorage.setItem("class_name",className);
    localStorage.setItem("class_type",classType);
    localStorage.setItem("subject",subjectName);

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

