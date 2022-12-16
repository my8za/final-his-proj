import React from 'react'
import { useLocation, Link } from "react-router-dom"
import './nav.scss';
import { TbNurse, TbSettings } from "react-icons/tb";
import { RiStethoscopeFill, RiHospitalLine } from "react-icons/ri";
import { AiOutlineBarChart } from "react-icons/ai";
import NavItem from './NavItem';


const Nav = () => {
  // url의 path값을 받아올 수 있다.
  const pathName = useLocation().pathname;
  const menus = [
    { img: <RiHospitalLine />, path: '/reception'}, // 원무
    { img: <RiHospitalLine />, path: '/ward-management'},  //원무병동
    { img: <TbNurse />, path: '/ward-management2'},  //병간
    { img: <TbNurse />, path: '/outpatient'},  // 외래간호
    { img: <RiStethoscopeFill />, path: '/doctor'},  //의사
    { img: <AiOutlineBarChart />, path: '/stastic'},  //경영
    { img: <TbSettings />, path: '/my-page'},  //마이페이지
  ]

  return (
    <div className='nav'>
      
      <div className='nav-menu'>
        {menus.map((menu, index) => {
          return (
            <Link to={menu.path} key={index}>
              <NavItem menu={menu} isActive={pathName === menu.path ? true : false}/>
            </Link>
          );
        })}
      </div>

    </div>
  )
}

export default Nav

