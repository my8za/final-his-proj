import axios from 'axios';
import React from 'react'
// style
import './waiting4Payment.scss';

// let pageId = {pageId : "qwer"};
const role = window.localStorage.getItem('role');

const Waiting4Payment = ({sunabList,setTest, waitingReceipt, setAcceptance, setTreatmentNumPk}) => { // 비구조할당
  
  
  const AdmissionList = () =>{
    function sunabDetail(index){
      // console.log(sunabList[index].ADMISSION_ID_PK);
      setTest(sunabList[index].ADMISSION_ID_PK);
    }
    
    return (
      <div className='waited-people'>
      {sunabList[0] === undefined ? "수납대기 환자가 없습니다." : ""}
      {sunabList.map((sunabList,index) => (
        <div className='waiting-order' onClick={() => sunabDetail(index)}>
            <p className='waiting-name'>
             {sunabList.PATIENT_NAME}&nbsp;
              <span className='medical-hours'>{sunabList.AGE}/{sunabList.GENDER}&nbsp;&nbsp; {sunabList.WARDROOM}호&nbsp;{sunabList.BED_NUM}병상</span>
            </p>
          <p className='status-value'>수납대기</p>
        </div>
    ))}
    </div>
    )
  }

  const OutList = () =>{
    function waitingReceiptDetail(index){
      axios.post("http://localhost:9090/outStatus/getAcceptance", {
        PATIENT_ID_PK: waitingReceipt[index].PATIENT_ID_PK,
        TREATMENT_NUM_PK: waitingReceipt[index].TREATMENT_NUM_PK
        }).then((res)=>{
          setAcceptance(()=>res.data[0]);
        })
      setTreatmentNumPk(waitingReceipt[index].TREATMENT_NUM_PK)
    }
    
    return (
      <div className='waited-people'>
        {waitingReceipt[0] === undefined ? "수납대기 환자가 없습니다." : ""}
        {waitingReceipt.map((data, index) => (
        <div key={index} className='waiting-order' onClick={() => waitingReceiptDetail(index)}>
          <p className='waiting-name'>
          {data.PATIENT_NAME}
            <span className='medical-hours'>{data.REGISTRATION_TIME}</span>
          </p>
          <p className='status-value'>{data.OP_CODE_NAME}</p>
        </div>
        ))}
      </div> 
    )
  }

  



  return (
    <div className='waiting-4-payment'>
      <p className='section-title'>수납 대기 인원</p>
      <div className='content-box'>
          {role === "ROLE_INRECEIPT" ?
          
              <AdmissionList sunabList={sunabList}/> : <OutList />
              
              }
          
        
      </div>
    </div>
  )
}

export default Waiting4Payment;