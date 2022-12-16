import React, { useEffect, useState } from 'react'
// style
import './patientStatus.scss';
// component
import DetailedStatus from './DetailedStatus';
import axios from 'axios';
import './detailedStatus.scss';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

function PatientStatus({outStatusReRender, setOutStatusReRender}) {

  const [speciality, setSpeciality] = useState('내과');
  const [patientStatus, setPatientStatus] = useState();
  const data = ['전체', '대기중', '진료중', '치료', '완료'];
  const [btnActive, setBtnActive] = useState(0);
  const [statusCode, setStatusCode] = useState(null);
  const [room, setRoom] = useState("");

  useEffect(()=>{
    setRoom("out")

    if (room !== "") {
      // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
      // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
      socket.emit("join_room", room);
  }
  },[room])

  useEffect(()=>{
    axios.post("http://localhost:9090/outStatus/getdocpatCon", {
      SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' '),
      OUTPATIENT_STATUS_CODE: statusCode
    }).then((res)=>{
      setPatientStatus(res.data);
      setOutStatusReRender(()=>true);
    });
  },[outStatusReRender, setOutStatusReRender, speciality, statusCode])

  useEffect(()=> {
    setTimeout(() => 
        socket.on("receipt_render", ()=>
          axios.post("http://localhost:9090/outStatus/getdocpatCon", {
            SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' '),
            OUTPATIENT_STATUS_CODE: statusCode
            }).then((res)=>{
            setPatientStatus(res.data);
  })),50)
  },[setOutStatusReRender,speciality,statusCode])
  //여기서 on을 받는다.

  useEffect(()=> {
    setTimeout(() => 
        socket.on("sunab_render", ()=>
          axios.post("http://localhost:9090/outStatus/getdocpatCon", {
            SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' '),
            OUTPATIENT_STATUS_CODE: statusCode
            }).then((res)=>{
            setPatientStatus(res.data);
  })),50)
  },[setOutStatusReRender,speciality,statusCode])

  useEffect(()=> {
    setTimeout(() => 
        socket.on("doctor_render", ()=>
          axios.post("http://localhost:9090/outStatus/getdocpatCon", {
            SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' '),
            OUTPATIENT_STATUS_CODE: statusCode
            }).then((res)=>{
            setPatientStatus(res.data);
  })),50)
  },[setOutStatusReRender,speciality,statusCode])

  useEffect(()=> {
    setTimeout(() => 
        socket.on("change_state", ()=>{console.log("욱민김")
          axios.post("http://localhost:9090/outStatus/getdocpatCon", {
            SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' '),
            OUTPATIENT_STATUS_CODE: statusCode
            }).then((res)=>{
            setPatientStatus(res.data);
  })}),50)
  },[setOutStatusReRender,speciality,statusCode])



  return (
    <div className='patient-status'>
      <div>
        <p className='section-title'>환자현황</p>
        <select className='filter' onChange={(e) => {
                setSpeciality(() => e.target.value);
              }}>
          <option>내과</option>
          <option>이비인후과</option>
          <option>정형외과</option>
        </select>
      </div>
      <div className='status'>
        <p>
        {data.map((item, idx) => {
        return (
          <span key={idx}>
            <button
              value={idx}
              className={"btn" + (idx === parseInt(btnActive) ? " active" : "")}
              onClick={(e) => {
                setBtnActive(() => {
                  return (e.target.value);
                });
                if(idx === 0) {setStatusCode(null)} else if (idx === 1) {setStatusCode('OC')} else if (idx === 2) {setStatusCode('OA')}
                  else if (idx === 3) {setStatusCode('OB')} else if (idx === 4) {setStatusCode('OE')}
              }}
            >
              {item}
            </button>
          </span>
        );
      })}</p>
        <div>
          {patientStatus!==null && patientStatus!==undefined? patientStatus.map((data, index) => (
            <DetailedStatus key={index} data={data} index={index} setPatientStatus = {setPatientStatus}/>
          )):""}
        </div>
      </div>
    </div>
  )
}

export default PatientStatus;
