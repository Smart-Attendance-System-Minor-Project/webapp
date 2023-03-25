import React from 'react'
import '../styles/EachClass.css';
function EachClass({subjectName,classType,className}) {
  return (
    <div className = "EachClass__Container">
        <div className = "EachClass__Heading">
        <h4>{subjectName}</h4>
        </div>
       
        <div className = "EachClass__LecClass">
            <h5>{className} - {classType === "L"?'Lecture':"Practical"}</h5>
        
        </div>

    </div>
  )
}

export default EachClass

