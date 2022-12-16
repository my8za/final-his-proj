import React from 'react'
// icon
import { BsFillArrowRightCircleFill } from "react-icons/bs";
// style
import './inPatientBar.scss';

//redux


function InPatientBar({inPatientALL}) {
  
  return (
    <div className='emp-info2'>
      <div className='emp-bar'>
      <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p><span>환자명</span>{inPatientALL.name}</p>
        </div>                     
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p><span>병동</span>{inPatientALL.ward}</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "empName"><span>호실</span>{inPatientALL.roomNum}</p>
        </div>
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "empName"><span>병상</span>{inPatientALL.bedNum}</p>
        </div>                        
      </div>
    </div>
  )
}

export default InPatientBar
