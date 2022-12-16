import React from 'react'
// style
import '../styles/scss/reset.scss';
import '../styles/wardManagement2.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import WardCheck from '../components/patient/WardCheck';
import WardPatientRequest from '../components/WardManagement2/WardPatientRequest';
import WardMangeMentTap from '../components/WardManagement2/WardMangementTab';
import GlobalMangementTab from '../components/WardManagement2/GlobalMangementTab';
import WardMangementModal from '../components/WardManagement2/WardMangementModal';
import { useSelector } from 'react-redux';



const WardManagement2 = () => {
  

  const showModal = useSelector(state=>{
    return state.inPatientInfo.value[1]
  })

  return (
    <div className='ward-management2'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        <div className='item1'>
          <WardCheck/>
        </div>
        <div className='item2'>
        <div className='inpatientDetail-wapper'>
          <WardMangeMentTap/>
        </div>
      </div>
        <div className='item3'>
          <WardPatientRequest/>
        </div>
        <div className='item4'>
          <GlobalMangementTab/>
        </div>
        {showModal && <WardMangementModal/>}
      </main>

    </div>
  );
}

export default WardManagement2;
