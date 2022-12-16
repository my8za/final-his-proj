import React, { useEffect, useRef, useState } from 'react'
// style
import '../styles/scss/reset.scss';
import '../styles/reception.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import PatientDetail from '../components/patient/PatientDetail';
import PatientStatus from '../components/patient/PatientStatus';
import Waiting4Payment from '../components/patient/Waiting4Payment';
import Receipt from '../components/patient/Receipt';
import MedicalHistory from '../components/patient/MedicalHistory';
import Modal from '../components/modalReception/Modal';
import PatientRegistrationModal from '../components/modalReception/PatientRegistrationModal';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const Reception = () => {
  const [registration, setRegistration] = useState(false);
  const [data, setdata] = useState();
  const name = useRef("");
  const frontSsn = useRef("");
  const backSsn = useRef("");
  const [patientId, setPatientId] = useState();
  const [empId, setEmpId] = useState();
  const symptom = useRef("");
  const [specialityName, setSpecialityName] = useState('내과');
  const empIdTemp = empId!==null && empId!==undefined?empId.substring(4,11):' ';
  const [waitingReceipt, setWaitingReceipt] = useState([]);
  const [acceptance, setAcceptance] = useState([{}]);
  const [outStatusReRender, setOutStatusReRender] = useState(true);
  const [wait4payReRender, setWait4payReRender] = useState(true);
  const [treatmentNumPk, setTreatmentNumPk] = useState("");
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
    axios.get("http://localhost:9090/outStatus/getwaiting4receipt")
         .then((res) => {
          setWaitingReceipt(res.data);
          setWait4payReRender(()=>true)
        });
  },[wait4payReRender]);

  useEffect(()=> 
    setTimeout(() => 
        socket.on("doctor_render", ()=>{
        axios.get("http://localhost:9090/outStatus/getwaiting4receipt")
        .then((res) => {
         setWaitingReceipt(res.data);
        //  setWait4payReRender(()=>true)
       })}),50)
  ,[])

  useEffect(()=> 
    setTimeout(() => 
        socket.on("change_state", ()=> {console.log("김민욱민욱")
        axios.get("http://localhost:9090/outStatus/getwaiting4receipt")
        .then((res) => {
         setWaitingReceipt(res.data);
        //  setWait4payReRender(()=>true)
       })}),100)
  ,[])

  
  useEffect(()=> 
    setTimeout(() => 
        socket.on("sunab_render", ()=>
        axios.get("http://localhost:9090/outStatus/getwaiting4receipt")
        .then((res) => {
        setWaitingReceipt(res.data);
        //  setWait4payReRender(()=>true)
      })),50)
  ,[])
  
  function patientInfo() {
    if(window.event.keyCode === 13){
      axios.post("http://localhost:9090/patient/regInfo", {
      PATIENT_NAME: name.current,
      PATIENT_SSN: frontSsn.current+"-"+backSsn.current
      }).then((res)=>{
        if(res.data.length === 0 || res.data === null) {
          alert("없는 사람임")
        } else {
          setdata(res.data);
          setPatientId(res.data.PATIENT_ID_PK);
        }
      });
    }
  }

  function receipt() {
    if(symptom.current!==null && symptom.current!==undefined && symptom.current!=='') {
      axios.post("http://localhost:9090/outStatus/receipt", {
        EMP_ID_PK: empIdTemp,
        SPECIALITY: specialityName,
        SYMPTOM: symptom.current,
        PATIENT_ID_PK: patientId
        }).then(() => {
          alert('접수 완료');
          socket.emit("receipt_complete" , {outpatient:room});
          setOutStatusReRender(()=>false);
        });
      } else {
        alert('증상을 입력하세요.')
      } 
  }

  return (
    <div className='reception'>
      <main className='main'>
        <div className='top'>
          <EmpBar/>
        </div>
        <div className='middle'>
          <div className='search-info'>
            <div className='input-patient'>
              <form action=''>
                <label>이름</label>
                <input onChange={(e) => {
                        name.current = e.target.value;
                      }}/>
                <label>주민등록번호</label>
                <input type='number' onChange={(e) => {
                        frontSsn.current = e.target.value;
                      }}/> - 
                <input type='number' onChange={(e) => {
                        backSsn.current = e.target.value;
                      }}
                      onKeyPress={patientInfo}/>
              </form>
            </div>
            <div className='btns'>
              <input type="button" value="등록" className='regbtn' onClick={() => setRegistration(!registration)}/>
              {registration && (
                <Modal closeModal={() => setRegistration(!registration)}>
                  <PatientRegistrationModal/>
                </Modal>
              )}
              <button className='regbtn' onClick={receipt}>접수</button>
            </div>
          </div>
          <PatientDetail data={data} setEmpId={setEmpId} symptom={symptom} setSpecialityName={setSpecialityName}/>
          <MedicalHistory data={data}/>
        </div>
        <PatientStatus className='bottom1' outStatusReRender={outStatusReRender} setOutStatusReRender={setOutStatusReRender}/>
        <Waiting4Payment waitingReceipt={waitingReceipt} setAcceptance={setAcceptance} acceptance={acceptance} setTreatmentNumPk={setTreatmentNumPk}/>
        <Receipt acceptance={acceptance} setAcceptance={setAcceptance} setOutStatusReRender={setOutStatusReRender} setWait4payReRender={setWait4payReRender} treatmentNumPk={treatmentNumPk}/>
      </main>
    </div>
  )
}

export default Reception;