import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../styles/header.scss';

function Header({showNav}) {

  function logout() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('role')
    localStorage.removeItem('name')
    localStorage.removeItem('empIdPk')
    localStorage.removeItem('userName')
    localStorage.removeItem('specialityName')
    window.location.href='http://localhost:3000/';
  }

  const [headerInfo, setHeaderInfo] = useState([{}]);
  const token = localStorage.getItem('jwt') || '';

  useEffect(() => {
    if(token !== '') {
    axios.get("http://localhost:9090/user/headerInfo",
      {headers : {'Authorization': token}}
    ).then((res) => {
      setHeaderInfo(res.data)
    })
  }
  }, [token])

  return (
    <div className='header'>
      {showNav ?
      <div className='profile'>
        <div className='profile-img'></div>
        {/* <img src='https://mv.amaranth10.co.kr/custom/img/labal_pic_.png' /> */}
        <div className='emp-name'>{headerInfo[0].SPECIALITY_NAME} {headerInfo[0].EMP_NAME}</div>
        <button className='logout' onClick={logout}>LogOut</button>
      </div>
      :
      <div className='profile'>
      <div className='profile-imoticon'></div>
      <div className='emp-name'>더조은 병원</div>
    </div>
      }
      <div className='emp-role'>{headerInfo[0].WORK}</div>
    </div>
  )
}

export default Header
