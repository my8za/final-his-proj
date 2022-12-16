import axios from 'axios';
import React, { useEffect, useState } from 'react'
// style
import './wardCheck.scss';

//redux
import { useDispatch } from 'react-redux';
import {getCareInfo, getInpatientInfo, getMediRecords} from '../../redux/AdmissionPatientInfoApi';
import { selectPeople } from '../../redux/InPatientInfoSlice';
import { API_URL } from '../../utils/constants/Config';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3001');

// const specialityName = window.localStorage.getItem('specialityName');
const empIdPk = window.localStorage.getItem('empIdPk');

let data = {
  empIdPk : 'O220019' //세션에 있는 사번
}

const WardOpions = [
  { key:"1", value : "100" , name : "병동선택"},
  { key:"2", value : "200" , name : "내과 : 200"},
  { key:"3", value : "300" , name : "정형외과 : 300"},
  { key:"4", value : "400" , name : "이빈후과 : 400"},
];

const RoomOpions = [
  { key:"1" , value : "0" , name : "호실선택"},
  { key:"2" , value : "1" , name : "1호실"},
  { key:"3" , value : "2" , name : "2호실"},
  { key:"4" , value : "3" , name : "3호실"},
  { key:"5" , value : "4" , name : "4호실"},
  { key:"6" , value : "5" , name : "5호실"},
];



const WardCheck = ({bedInfo}) => {
  
  let bedInfoState = bedInfo;
    socket.on("bedInfoChange",(data)=>{
       if(!bedInfoState){
          bedInfoState = true;
        }else{
          bedInfoState = false;
        }
        setSelected(()=>bedInfoState);})
        // 확인해야할부분 --> order쪽에서 승인 시 socket.on하여 확인 하지만 입원승인 후 바로 재랜더할지 입실완료 후 재랜더할지 결정해야함.

    // console.log(data.empIdPk);
    // data.ward = "200";

  const [roomInfos, setRoomInfos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [ward, setWard] = useState([]);
  const [room, setRoom] = useState([]);

  // if(data.empIdPk.indexOf("O") !== -1){
  //   data.ward = "200";
  //   setWard("200");
  // }


  let showWard =true;
  
  //ward 로컬 정보 수정한거 머지 되면 들고와서 사용
  if(empIdPk.substring(0,1) === 'I'){
    showWard=(false)
    data.ward = '200';
  }


  let selectedInInfo;
  const dispatch = useDispatch();

    const sendWardbasicData = (e) =>{
     
        selectedInInfo = {
        "name": roomInfos[e.target.id].PATIENT_NAME,
        "ward" : (roomInfos[e.target.id].WARDROOM + "").substring(0,1)*100,
        "roomNum" : (roomInfos[e.target.id].WARDROOM + "").substring(2),
        "bedNum" : (roomInfos[e.target.id].BED_NUM)
        }


      dispatch(selectPeople(selectedInInfo))
      selectedInInfo = JSON.stringify(selectedInInfo)
     
      // 비동기 정보
      dispatch(getInpatientInfo(selectedInInfo));
      dispatch(getCareInfo(selectedInInfo));
      dispatch(getMediRecords(selectedInInfo))
    }

  
    
  
    useEffect(()=>{
      setTimeout(() => 
      axios.get(API_URL+"/wardCheck/roominfos", {params : data})
        .then(res => setRoomInfos(res.data))
        ,50)
    },[selected, bedInfo]);
    
    const wardHandleChange = (e) => {
        
      // console.log(e.target.value);
      if(e.target.value === "100"){
        delete data.ward;
        delete data.roomNum;
        setWard(e.target.value);
        setRoom('0');
        setSelected(e.target.value);
      }else{
        data.ward = e.target.value;
        setWard(e.target.value);
        setSelected(e.target.value);
      }

    }

    const WardSelectBox = (props) =>{
       
      return (
        <select onChange={wardHandleChange} value={ward}>
              {props.options.map((option) => (
                  <option
                    defaultValue={props.defaultValue === option.value}
                    key={option.value}
                    value={option.value}
                    
                  >
                    {option.name}
                  </option>
              ))}
        </select>
      )
    }
    const roomHandleChange = (e) => {
      
      if(e.target.value === "0"){
        delete data.roomNum;
      }else{
        data.roomNum = e.target.value;
      }
      // console.log(data);
      setRoom(e.target.value);
      setSelected(e.target.value);
      
    }

    const RoomSelectBox = (props) =>{
      return (
        <select onChange={roomHandleChange} value={room}>
              {props.options.map((option) => (
                  <option
                    defaultValue={props.defaultValue === option.value}
                    key={option.value}
                    value={option.value}   
                  >
                    {option.name}
                    
                  </option>
                  
              ))}
        </select>
      )
    }

    
  return (
    <div className='ward-check'>
      <div className='filter'>
        {/* {data.empIdPk.indexOf("O") !== -1  ? <WardSelectBox options={WardOpions} defaultValue=''/> : <WardSelectBox options={WardOpions} defaultValue='200'/>} */}
        {showWard && <WardSelectBox options={WardOpions} defaultValue=''/>}
        <RoomSelectBox options={RoomOpions} defaultValue=''/>
      </div>
      <div className='table-wrapper'>
          <table className="styled-table">
            <thead>
              <tr>
                <th>-</th>
                <th>병실</th>
                <th>이름</th>
                <th>주치의</th>
              </tr>
          </thead>
          <tbody>
            {roomInfos.map((wardNum, index) => (
              <tr key={index}>
                <td id ={index} onClick={sendWardbasicData}>{wardNum.BED_NUM}</td>
                <td id ={index} onClick={sendWardbasicData}>{wardNum.WARDROOM}</td>
                <td id ={index} onClick={sendWardbasicData}>{wardNum.PATIENT_NAME}</td>
                <td id ={index} onClick={sendWardbasicData}>{wardNum.EMP_NAME}</td>
              </tr>
              
            ))}
            
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default WardCheck;
