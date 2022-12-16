import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// style
import '../styles/body.scss';
// components
import Nav from '../components/nav/Nav';
import Header from '../layouts/Header';
import Reception from './Reception';
import Doctor from './Doctor';
import Outpatient from './Outpatient';
import WardManagement from './WardManagement';
import WardManagement2 from './WardManagement2';
import MyPage from './MyPage';
import Login from './Login';
import WardPatientCall from './WardPatientCall';
import Stastic from './Stastic';

const PagiNavigation = () => {

  const [showNav, setShowNav] =useState(true);
  return(
    <div className='view'>
      <BrowserRouter>
        <div className='layout'>
          {window.location.pathname === '/' || window.location.pathname === ' '? '' : <header><Header showNav={showNav}/></header>}
          {showNav && (window.location.pathname === '/'  || window.location.pathname === ' ')? '' : <nav><Nav /></nav>}
          <div>
            <Routes>
              <Route path="/" element={<Login/>} />
              {localStorage.getItem('jwt')?
              <>
                <Route path="/reception" element={<Reception />} />
                <Route path="/doctor" element={<Doctor/>} />
                <Route path='/outpatient' element={<Outpatient/>} />
                <Route path='/ward-management' element={<WardManagement/>} />
                <Route path='/ward-management2' element={<WardManagement2/>} />
                <Route path='/stastic' element={<Stastic/>} />
                <Route path='/my-page' element={<MyPage/>} />
                <Route path='/ward' element={<WardPatientCall setShowNav={setShowNav}/>} />
                <Route path='/stastic' element={<Stastic/>} />
              </>
              :
              <>
                <Route path="/reception" element={<Navigate replace to="/"/>} />
                <Route path="/doctor" element={<Navigate replace to="/"/>} />
                <Route path='/outpatient' element={<Navigate replace to="/"/>} />
                <Route path='/ward-management' element={<Navigate replace to="/"/>} />
                <Route path='/ward-management2' element={<Navigate replace to="/"/>} />
                <Route path='/my-page' element={<Navigate replace to="/"/>}/>
                <Route path='/ward' element={<WardPatientCall setShowNav={setShowNav}/>} />
                <Route path='/stastic' element={<Stastic/>} />
              </>}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default PagiNavigation;