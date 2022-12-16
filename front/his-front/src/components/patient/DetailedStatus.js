import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { getTreatmentInfo, getPatientRegistrationInfo, addPatientStatusInfo, getDetailedMedicalHistory } from '../../redux/OutpatientPageInfoApi';
import { checkOpStatusCode, selectSpeciality, selectEmpName } from '../../redux/outpatientPageInfoSlice';
// style
import './detailedStatus.scss';
// Library
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

const DetailedStatus = ({ data, index, setPatientStatus }) => {
  let speciality = data.SPECIALITY_ID_PK;
  let dispatch = useDispatch();
  const className = ['box', 'waiting-order', 'selected'];
  const [opStatusClassification , setOpStatusClassification] = useState(false)


  // 혜지 환자현황 클릭 이벤트
  const getReceiveId = (data) => {
    const { status, receiveId, patName, PATIENT_SSN, EMP_NAME, SPECIALITY, PATIENT_ID_PK, TREATMENT_DATE, REGISTRATION_TIME} = data;
    console.log(receiveId)
    dispatch(checkOpStatusCode(status)); //treatmentOrder에서 필요
    dispatch(getTreatmentInfo(receiveId));
    dispatch(getPatientRegistrationInfo({patName, PATIENT_SSN}));
    dispatch(selectSpeciality(SPECIALITY));
    dispatch(selectEmpName(EMP_NAME));
    dispatch(getDetailedMedicalHistory({PATIENT_ID_PK, TREATMENT_DATE, REGISTRATION_TIME}));
    }

  // contextMenu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [ sendData, setSendData ] = useState();
  const [ receiveId, setReceiveId ] = useState();
  const [changeState ,setChangeState] =useState();
  const [room, setRoom] = useState("");

  useEffect(()=>{
    setRoom("out")

    if (room !== "") {
      // 프론트에서 백엔드로 데이터 방출 join_room id로 백에서 탐지 가능
      // 2번째 인자인 room은 방이름이며 백에선 data매게변수로 받는다
      socket.emit("join_room", room);
  }
  },[room])

  let updateChangeState = {
    RECEIVE_ID_PK : "",
    SPECIALITY_ID_FK : "",
    status : ""
  };

  let insertData;

  const handleClick = (e, data) => {
    console.log(data)
    if(data.status === "대기중"){
      setOpStatusClassification(true)
    }else{
      setOpStatusClassification(false)
    }
    setAnchorEl(e.currentTarget);
    insertData = {
      receiveId: data.receiveId,
      patientId: data.PATIENT_ID_PK,
      empId: data.EMP_ID_PK
    }
    setSendData(insertData);
    setReceiveId(data.receiveId)

    const { receiveId } = data;


    updateChangeState.RECEIVE_ID_PK = receiveId;
    updateChangeState.SPECIALITY_ID_FK = speciality;
    setChangeState(()=>updateChangeState);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  
  const handleStatus = async(e) => {
    console.log(e.target.id)
    dispatch(addPatientStatusInfo(sendData))
    console.log(sendData)

    updateChangeState.RECEIVE_ID_PK = changeState.RECEIVE_ID_PK;
    updateChangeState.SPECIALITY_ID_FK = changeState.SPECIALITY_ID_FK;
    updateChangeState.status = e.target.id;

    axios.post('http://localhost:9090/outStatus/putChangeState',
      JSON.stringify(updateChangeState),
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      }).then(res=> {setPatientStatus(res.data)})

      let change;
      change = {outpatient : room,
                RECEIVE_ID_PK : changeState.RECEIVE_ID_PK,
                SPECIALITY_ID_FK : changeState.SPECIALITY_ID_FK,
                status : e.target.id
                }
      await socket.emit("click_change_state", change );
  }

  // useEffect(()=> 
  //   setTimeout(() => 
  //       socket.on("change_state", (data)=>{console.log(data)
  //           axios.post('http://localhost:9090/outStatus/getdocpat',
  //           JSON.stringify(data),
  //             {
  //               headers: {
  //                 "Content-Type" : `application/json`,
  //               },
  //             }).then(res=> {setPatientStatus(res.data)})
  //             }),50)
  // ,[setPatientStatus])

    
  
  return (
    <div className='detailed-status'>
      <p>{index+1}진료실 {data.EMP_NAME}</p>
      <div className='order-content'>
          {data.patInfo.map((data, index) => (
            <div key={index} 
              className={data.OUTPATIENT_STATUS_CODE + className[0] + ' ' + className[1] + ' ' + className[2]} 
              onClick={() => {getReceiveId(data)}} 
              id={index}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onContextMenu={(e) => handleClick(e, data)}> 

              <p className='waiting-name'>
                {data.patName}
                <span className='medical-hours'>{data.regTime}</span>
              </p>
              <p className={data.OUTPATIENT_STATUS_CODE}>{data.status}</p>
            </div> 
          ))}
      </div>
      {opStatusClassification && <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          style={{left:"170px" , top:"-25px"}}
        >
          <MenuItem id="OA" onClick={(e)=>{handleClose(); handleStatus(e);}}>진료</MenuItem>
        </Menu> }
      
    </div>
  )
}

export default DetailedStatus;