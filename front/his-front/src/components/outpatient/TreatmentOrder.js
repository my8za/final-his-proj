import React, { useState,useEffect } from 'react'
import io from 'socket.io-client';
import { useSelector } from 'react-redux'
import axios from 'axios';

const SPECIALITY_ID_FK = 'N';//localStorage.getItem('specialityId') || '';

const socket = io.connect('http://localhost:3001');

const TreatmentOrder = ({ patientDetails }) => {
  /*-소켓-*/
  const [room, setRoom] = useState("");

  useEffect(()=>{
    setRoom("out")

    if (room !== "") {
      // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
      // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
      socket.emit("join_room", room);
  }
  },[room])

  console.log(patientDetails)

  
  // 환자현황 : 환자 상태값
  const opStatusInfo = useSelector(state =>  state.checkOpStatusCode.value[2]);
  console.log(opStatusInfo)
  // 외래진료환자 상태
  let onTreatmentStatus = false;  // 치료
  let completionStatus = false;   // 수납완료
  let otherStatus = false; //진료/대기중
  
  if(opStatusInfo === '치료') {
    onTreatmentStatus = true;
  } else if(opStatusInfo === '수납완료') {
    completionStatus = true;
  } else {
    otherStatus = true;
  }



  // 치료오더 완료버튼 클릭시 외래진료환자 상태 수납대기로 변경
  const receiveId =  patientDetails.RECEIVE_ID_PK;
  console.log(receiveId);
  console.log(SPECIALITY_ID_FK);
  const changePatientCode = () => {
    const opStatusCode = 'OD';
    axios.post('http://localhost:9090/outStatus/putChangeState',
      {
        RECEIVE_ID_PK : receiveId,
        SPECIALITY_ID_FK : SPECIALITY_ID_FK,
        status : opStatusCode
      },
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      })
      // .then(res=> {setPatientStatus(res.data)})

      let change;
      change = {outpatient : room,
                RECEIVE_ID_PK : receiveId,
                SPECIALITY_ID_FK : SPECIALITY_ID_FK,
                status : opStatusCode
                }
      socket.emit("click_change_state", change );

  }

  return (
    <div>
      <div id="tab-treatment-order">
        <p className="icon-title">
          <span className="icon">&gt;</span><span className="task-title">치료오더</span>
        </p>
        <table className='styled-table'>
          <thead>
            <tr>
              <th>체크</th>
              <th>처방내역</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {completionStatus === true ? <td><input type="checkbox" checked/></td> : ""}
              {onTreatmentStatus === true ? <td><input type="checkbox" /></td> : ""}
              {otherStatus === true ? <td><input type="checkbox" disabled={true}/></td> : ""}

              {patientDetails!==null && patientDetails!==undefined ?
                <td>{patientDetails.TREATMENT_ORDER}</td>
                :
                <td></td>}
              <td>-</td>
            </tr>
          </tbody>
        </table>
        {onTreatmentStatus === true ? <p className='btn-tbl'><a href='#!' className='btn' onClick={changePatientCode}>완료</a></p> : ''}
      </div>
    </div>
  )
}

export default TreatmentOrder
