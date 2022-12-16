import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/constants/Config';
import './admissionDue.scss';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001')

const InitList = () => {return (
    <div className='discharge-Due-small-square'>
        <ul>
            <li>
                <p className='init-due-position'>
                    <span>금일 입원예정자가 없습니다.</span> 
                </p>
            </li>
        </ul>
    </div>
)
}


const AdmissionDue = () => {
    const [admissionDueList, setAdmissionDueList] = useState([]);
    const [room, setRoom] = useState("");

    useEffect(()=>{
        setTimeout(() => 

        axios.get(API_URL+"/admissionReq/admissionDueList")
            .then(res => setAdmissionDueList(res.data))
            , 50);
    },[]);

    useEffect(()=>{
        setRoom("입원")

        if (room !== "") {
        // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
        // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
        socket.emit("join_room", room);
    }
    },[room])


    useEffect(()=>{
        socket.on("admissionOrder", (data)=>{
            setAdmissionDueList((list)=>[...list,data])
        })

    },[])

    // useEffect(() => {
    //     const timer = setTimeout(() => console.log('Initial timeout!')
    //   }, []);


    function complete (admissionIdPk,WARDROOM,BED_NUM) {
        alert("입원완료");
        socket.emit("send_bedInfoChange", {admission : room});
    

        // let ward = (WARDROOM+"").substring(0,1)*100;
        // let room = (WARDROOM+"").substring(2);

        // let data = {ADMISSION_ID_PK: admissionIdPk,
        //              WARD : ward,
        //              ROOM_NUM : room,
        //              BED_NUM : BED_NUM
        //             };
        // // console.log(admissionIdPk)

        // let changeState = disChargeFinish;
        // if(changeState === false){
        //     changeState = true;
            
        // }else if(changeState === true){
        //     changeState = false;
        // }

        // let bedInfoState = bedInfo;
        // if(bedInfoState === false){
        //     bedInfoState = true;
            
        // }else if(bedInfoState === true){
        //     bedInfoState = false;
        // }

    }

        // axios.put(API_URL+"/AdmissionFront/discharged", JSON.stringify(data), {headers:{"Content-Type" : `application/json`},})
        // .then(setDisChargeFinish(()=>changeState));
        // setBedInfo(()=>bedInfoState);
        // }
        
    
    const AdmissionListData = ()=>{return(admissionDueList.map((v,index) => (
                                                                    
                                                                    <div className='admission-Due-small-square'  key={v.index}>
                                                                        <ul className='ul-tag'>
                                                                            <li>
                                                                                <p className='admission-due-position'>
                                                                                    <span className='a'>{v.PATIENT_NAME}</span>
                                                                                    <span className='b'>{v.GENDER} / {v.AGE}</span>
                                                                                    <span className='c'>{v.PATIENT_SSN}</span>
                                                                                    <span className='d'></span>
                                                                                    <span className='e'>15:00</span>
                                                                                    <span className='f'>{v.WARDROOM}호 {v.BED_NUM}실</span>
                                                                                    
                                                                                    <input className='g complete'type='button' value = "입실완료" onClick={() => {complete(v.ADMISSION_ID_PK,v.WARDROOM,v.BED_NUM)}}/>
                                                                                </p>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                )))}

    


    return (
        <div className='admission-Due-wapper'>
            <div className='admission-Due-big-square'>
                {admissionDueList.length !== 0 ? <AdmissionListData/>: <InitList/>}
                
            </div>
        </div>
    )
}

export default AdmissionDue

// const [messageList , setMessageList] = useState([])

// const [room, setRoom] = useState("");

// useEffect(()=>{
//   axios.post('http://localhost:9090/admission/allInPatientReqs',
//   {specialityName:specialityName},
//       {
//         headers: {
//           "Content-Type" : `application/json`,
//         },
//       }).then(res=> setMessageList(res.data))

// },[])

