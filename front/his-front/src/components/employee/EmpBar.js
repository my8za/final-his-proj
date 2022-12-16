import axios from 'axios';
import React, { useEffect, useState} from 'react'
// icon
import { AiFillHome } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

// style
import './empComponents.scss';


function EmpBar() {
  
  const token = localStorage.getItem('jwt') || '';
  const [empBarInfo, setEmpBarInfo] = useState([{}]);

  useEffect(()=>{
    if(token !== '') {
    axios.get("http://localhost:9090/user/headerInfo",
      {headers : {'Authorization': token}}
    ).then((res) => {
      setEmpBarInfo(res.data)
    })
  }
  }, [token])

  return (
    <div className='emp-info'>
      <div className='emp-location'>
        <AiFillHome />
        <p>&nbsp;/{empBarInfo[0].SPECIALITY_NAME}/{empBarInfo[0].EMP_NAME}</p>
      </div>

      <div className='emp-bar'>
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "speciality"><span>근무부서</span>{empBarInfo[0].SPECIALITY_NAME}</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p><span>근무일자</span>{empBarInfo[0].WORKING_DATE}[{empBarInfo[0].WORKING_DAY}]</p>
        </div>                    
        <div className='test2'>
          <BsFillArrowRightCircleFill className='icon'/>
          <p id= "empName"><span>근무자</span>{empBarInfo[0].EMP_NAME}</p>
        </div>                    
      </div>
    </div>
  )
}

export default EmpBar
