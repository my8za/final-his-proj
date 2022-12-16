import React, { useEffect, useState } from 'react'
// style
import '../styles/scss/reset.scss';
import'../styles/wardPatientCall.scss';
// components
import InPatientBar from '../components/inPatient/InPatientBar';


import io from 'socket.io-client';
import axios from 'axios';
import WardSetting from './WardSetting';
const socket = io.connect('http://localhost:3001')


const WardPatientCall = ({setShowNav}) => {
  
  const [room, setRoom] = useState("");
  const [viewNotice, setViewNotice] = useState(false);

  const [inPatientALL, setInPatientALL]=useState({
    name: "",
    ward : "",
    roomNum : "",
    bedNum : "",
    wardRoom: ""
    })

   

    const [showRegiInPatient, setShowRegiInPatient]=useState(true)
    

  useEffect(()=>{
    setShowNav(false)
  },[setShowNav])


    useEffect(()=>{
      setRoom((inPatientALL.ward).toString())
      if (room !== "") {
        // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
        // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
        socket.emit("join_room", room);
    }
    },[room, inPatientALL.ward])

    var click = true;
    const sendData = async() => {
      if(click){
      let callTime = new Date()
      
      const messageData = {
        room: room,
        patientName: inPatientALL.name,
        callTime: callTime.getHours() + ":" + callTime.getMinutes() + ":" + callTime.getSeconds(),
        ward: inPatientALL.ward,
        roomNum: inPatientALL.roomNum,
        bedNum: inPatientALL.bedNum,
        callStatus : "호출"
      };

      const savemassage = {

        callTime: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace('T', ' ') ,
        callStatus : "호출",
        ward: inPatientALL.ward,
        roomNum: inPatientALL.roomNum,
        bedNum: inPatientALL.bedNum
      }

      await socket.emit("send_message", messageData )


    axios.put('http://localhost:9090/admission/InPatientReq',
      savemassage,
        {
          headers: {
            "Content-Type" : `application/json`,
          },
        })
        click = !click;

        setTimeout(function () {
          click = true;
      }, 2000)
      }
  }

  useEffect(()=>{
    socket.on("call_message" + inPatientALL.ward + "-" + inPatientALL.roomNum + "-" +inPatientALL.bedNum, (data)=>{
      setViewNotice(data.go)
    })

  },[inPatientALL.ward, inPatientALL.roomNum, inPatientALL.bedNum])


  const emergency = async()=> {
    if(click){
      let emergencyData ={
        room : room,
        notice : true,
        wardRoom: inPatientALL.wardRoom
      }
      await socket.emit("send_emergencyMessage", emergencyData )
      click = !click;
        setTimeout(function () {
          click = true;
      }, 2000)
    }
  }



  return (
    <div className='WardPatientCall-wapper'>
      {showRegiInPatient && <WardSetting inPatientALL={inPatientALL} setInPatientALL={setInPatientALL} setShowRegiInPatient={setShowRegiInPatient}/>}
      <main className='WardPatientCall-container'>
    
        <div className='top'>
          <InPatientBar inPatientALL={inPatientALL}/>
        </div>
        <div className='btn-wapper' >
          <div id="success-box">
            <div class="dot"></div>
            <div class="dot two"></div>
            <div class="message"><h2 class="alert">도움 필요 시 눌러주세요</h2></div>
            <button class="button-box"  onClick={sendData}><h1 class="green">호 출</h1></button>
        </div>
        <div id="error-box">
          <div class="dot"></div>
          <div class="dot two"></div>
          <div class="message"><h2 class="alert">응급 상황 시 눌러주세요</h2></div>
          <button class="button-box" onClick={emergency}><h1 class="red">긴 급</h1></button>
        </div>
        <div id="notice-box">
          <div class="dot"></div>
          <div class="dot two"></div>
          <div class="notice-message"><h2 class="notice">Notice</h2></div>
          <div class="notice-box">
           { viewNotice && 
           <div class="notice-context-wppper">
              <p class="notice-context">간호사가 가고 있습니다.</p>
              <p class="notice-context">조금만 기다려 주세요.</p>
            </div>
            }
          </div>
        </div>   
      </div>
      </main>

    </div>
  );
}

export default WardPatientCall;
