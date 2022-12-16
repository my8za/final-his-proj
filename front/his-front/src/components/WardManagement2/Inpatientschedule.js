import React, { useEffect, useRef, useState } from 'react'

// style
import  "react-datepicker/dist/react-datepicker.css" ;
import DatePicker from "react-datepicker";
import './Inpatientschedule.scss';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//redux
import {  useDispatch, useSelector } from 'react-redux';
import { changeScheduleStatus, getInpatientSchedules } from '../../redux/AdmissionPatientInfoApi';
import { executeModal, modalMode, globalmodifyElement} from '../../redux/InPatientInfoSlice';
import { setStartDate } from '../../redux/InChangeDateSlice';
import { parseISO } from 'date-fns';


const InDatePicker = () => {

  const startDate = useSelector(state=>{
    return state.inChangeDate.value[0]
  })
  const changeDate = useRef("")
  changeDate.current = startDate;
  const dispatch = useDispatch();

 

  const specialityName = window.localStorage.getItem('specialityName');
  
  useEffect(()=>{

    changeDate.current = (startDate.getFullYear().toString() +"-"+
    ("00" + `${startDate.getMonth()+ 1}`.toString()).slice(-2) +"-"+("00" + startDate.getDate()).slice(-2));
    
    let changedScheduleElement ={
      specialityName :specialityName,
      scheduleDate : changeDate.current
    }
    if(changedScheduleElement){
      dispatch(getInpatientSchedules(changedScheduleElement))
    }
  },[dispatch, startDate, specialityName])

  return (
    
    <DatePicker id = "datePicker" selected={changeDate.current} onChange={date => dispatch(setStartDate(date))} dateFormat="yyyy년 MM월 dd일"/>
  );
};

const Inpatientschedule = () => {
  const dispatch = useDispatch();
  const specialityName = window.localStorage.getItem('specialityName');
  const ModalMode = (e)=>{
    let selectMode = e.target.id
    dispatch(executeModal(true))
    dispatch(modalMode(selectMode))

    let handOverCheck=document.getElementsByName("schedule");
    for(let i =0; i < handOverCheck.length ; i++){
      if(handOverCheck[i].checked){
        handOverCheck[i].checked =false;
      }
    }
  }

  const scheduleInfo = useSelector(state=>{
    return state.inPatientInfo.value[8]
  })
    
  const selectRow = (e)=>{
    let changescheduleInfo = {
      scheduleIdPk : scheduleInfo[e.target.id].SCHEDULE_ID_PK,
      scheduleContent : scheduleInfo[e.target.id].SCHEDULE_CONTENT,
      schedulePlace:scheduleInfo[e.target.id].SCHEDULE_PLACE,
      scheduleDate:scheduleInfo[e.target.id].SCHEDULE_DATE,
      scheduleStatus:scheduleInfo[e.target.id].PS_CODE_NAME
    }
    dispatch(globalmodifyElement(changescheduleInfo))
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [sendChangeStat ,setSendChangeStat] =useState()

  let updateScheduleStat ;
  const handleClick = (e) => {         
     setAnchorEl(e.currentTarget);
     updateScheduleStat={
      scheduleIdPk : scheduleInfo[e.target.id].SCHEDULE_ID_PK,
      specialityName : specialityName,
      scheduleDate : parseISO(scheduleInfo[e.target.id].SCHEDULE_DATE)
     }
     setSendChangeStat(updateScheduleStat)
   };

   const handleClose = () => {
    setAnchorEl(null);
  };
  const handleStatus = (e)=>{

    setSendChangeStat(sendChangeStat.scheduleStatus = e.target.id)
    
    updateScheduleStat = JSON.stringify(sendChangeStat)
    dispatch(changeScheduleStatus(updateScheduleStat))
  };
 
  return (
    <div className='schedule-container'>
      <InDatePicker/>
      <div className='schedule-wapper'>
        <table>
          <thead>
          {scheduleInfo != null && scheduleInfo[0] != null ? 
            (scheduleInfo[0].errorCode == null &&
            <tr>
              <th>-</th>
              <th>시간</th>
              <th>위치</th>
              <th>일정 내용</th>
              <th>환자명</th>
              <th>상태</th>
            </tr>
            )
          :
            <tr>
              <th>-</th>
              <th>시간</th>
              <th>위치</th>
              <th>일정 내용</th>
              <th>환자명</th>
              <th>상태</th>
            </tr>
          }
            </thead>
            <tbody>
            {scheduleInfo != null && scheduleInfo[0] != null && ((scheduleInfo[0].errorCode == null &&
              (scheduleInfo.map((scheduleInfo, index)=>(
                <tr key={index}>
                <td className='schedule-fix'><input type= "radio" name= "schedule" id = {index} onClick={selectRow}/></td>
                <td>{(scheduleInfo.SCHEDULE_DATE).substring(11,16)}</td>
                <td>{scheduleInfo.SCHEDULE_PLACE}</td>
                <td className='schedule-content'>{scheduleInfo.SCHEDULE_CONTENT}</td>
                <td >{scheduleInfo.PATIENT_NAME}</td>
                <td
                  id={index}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onContextMenu={handleClick}
                  >{scheduleInfo.PS_CODE_NAME}</td>
              </tr>
            )))))}
          </tbody>
        </table>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          style={{left:"28px" , top:"-25px"}}
        >
          <MenuItem id="예정" onClick={(e)=>{handleClose(); handleStatus(e);}}>예정</MenuItem>
          <MenuItem id="진행" onClick={(e)=>{handleClose(); handleStatus(e);}}>진행</MenuItem>
          <MenuItem id="취소" onClick={(e)=>{handleClose(); handleStatus(e);}}>취소</MenuItem>
          <MenuItem id="완료" onClick={(e)=>{handleClose(); handleStatus(e);}}>완료</MenuItem>
        </Menu>
      </div>
      <div className='btn-wapper' >
        <a href='#!' className='btn' id='schedule-modify' onClick={ModalMode}>수정</a> 
        <a href='#!' className='btn' id='schedule-create' onClick={ModalMode}>등록</a>
      </div>
    </div>
  )
}

export default Inpatientschedule ;
