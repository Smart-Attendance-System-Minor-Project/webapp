import React from 'react'
import Navbar from '../Navbar'
import EachClass from '../components/EachClass'
import '../styles/Home.css'
function Home() {
  return (
    <div>
        <Navbar/>

        <div className = "HomePage__Container">
            <div className='HomePage__Class'>
                <h3 style = {{textAlign:'left'}}>Class</h3>
                <hr style={{width:'90%',opacity:'30%'}}></hr>
                <div className = "EachClass__List">
                    <div className = "EachClass__Each">
                            <EachClass
                                subjectName = "DATABASE MANAGEMENT SYSTEM"
                                classType="Lecture"
                                className = "076BCTCD"

                            />
                    </div>
                    <div className = "EachClass__Each">
                            <EachClass
                                subjectName = "EMBEDDED SYSTEM"
                                classType="Practical"
                                className = "076BCTCD"

                            />
                    </div>
                   
                </div>

            </div>
            <div className='HomePage__Records'>
                <h3 style = {{textAlign:'left'}}>Records</h3>
                <hr style={{width:'90%',opacity:'30%'}}></hr>
            </div>
        </div>
    </div>
  )
}

export default Home