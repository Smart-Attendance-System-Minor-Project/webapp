import React, { useEffect,useState } from 'react'
import Navbar from '../Navbar'
import EachClass from '../components/EachClass'
import EachRecords from '../components/EachRecords'
import '../styles/Home.css'
import { useDispatch } from 'react-redux'
import {setRecords} from '../redux/recordReducer/recordSlice';
import axios from 'axios'
function Home() {

    const [classInfo,setClassInfo] = useState([]);
    const [recordInfo,setRecordInfo] = useState([]);

    //
    
    const dispatch = useDispatch();
    useEffect(()=>{
        async function fetchData()
        {
            const getDataParameter = {
                username:localStorage.getItem('username')
            }
            const getClasses = await axios.post('https://prat051.pythonanywhere.com/attendance/view_class/',getDataParameter);
            const getRecords = await axios.post('https://prat051.pythonanywhere.com/attendance/get_records/',getDataParameter);
            //console.log(getClasses);
            

            setRecordInfo(getRecords.data);
            setClassInfo(getClasses.data);
            
        
            dispatch(setRecords(getRecords.data));

        
        }
        fetchData();
       
    },[])
  return (
    <div>
        <Navbar/>

        <div className = "HomePage__Container">
            <div className='HomePage__Class'>
                <h3 style = {{textAlign:'left'}}>Class</h3>
                <hr style={{width:'90%',opacity:'30%'}}></hr>
                <div className = "EachClass__List">
                    {classInfo.map(eachClass=>{
                        return ( 
                        <div className = "EachClass__Each">
                            <EachClass
                                subjectName = {eachClass.subject}
                                classType={eachClass.class_type}
                                className = {eachClass.class_name}

                            />
                        </div>

                        )
                    })}
                   
                   
                </div>

            </div>
            <div className='HomePage__Records'>
                <h3 style = {{textAlign:'left'}}>Records</h3>
                <hr style={{width:'90%',opacity:'30%'}}></hr>
                <div className = "EachClass__List">
                    {recordInfo.map(eachRecord=>{
                        return (
                            <div className = "EachClass__Each">
                            <EachRecords
                                username={eachRecord.username}
                                subjectName = {eachRecord.subject}
                                classType= {eachRecord.class_type}
                                className = {eachRecord.class_name}
                            />
                           </div>
                        )
                         

                    })};
                
                   
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home