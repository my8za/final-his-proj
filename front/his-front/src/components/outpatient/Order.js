import React, { useState } from 'react'
// components
import MedicalNote from './MedicalNote';
import TreatmentOrder from './TreatmentOrder';

const Order = ({ patientDetails }) => {
  const [ active, setActive ] = useState(0);

  const menuList = {
    0: <MedicalNote patientDetails={patientDetails} />,
    1: <TreatmentOrder patientDetails={patientDetails} />
  };

  const changeMenu = (num) => {
    setActive(num);
  };
  

  return (
    <div className='order'>
      <ul className="tab-menu">
        <li className={`${active === 0? 'active': ''}`} onClick={() => {changeMenu(0)}}>진료메모</li>
        <li className={`${active === 1? 'active': ''}`} onClick={() => {changeMenu(1)}}>치료오더</li>
      </ul>
      <div id="tab-content">
        {menuList[active]}
      </div>
    </div>
  );
}

export default Order
