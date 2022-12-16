import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getReceiveHandOver, getSendHandOver } from '../../redux/AdmissionPatientInfoApi';
import {executeModal, globalmodifyElement, modalMode} from '../../redux/InPatientInfoSlice';
// style
import './handOver.scss';

const HandOver = () => {
  const dispatch = useDispatch();


  const ModalMode = (e)=>{
    let selectMode = e.target.id
    dispatch(executeModal(true))
    dispatch(modalMode(selectMode))
    let handOverCheck=document.getElementsByName("handOver");
    for(let i =0; i < handOverCheck.length ; i++){
      if(handOverCheck[i].checked){
        handOverCheck[i].checked =false;
      }
    }

  }

    // 시큘리티 마무리 되면 userID얻어서 저장
    const userName = window.localStorage.getItem('userName');

  let user = {
    "userName" : userName
  }

  let handOverElement = JSON.stringify(user)
  
  const [radioChecked, setRadioChecked] =useState(true);

  const ToHandOver = () =>{
    dispatch(getReceiveHandOver(handOverElement));
    setRadioChecked(!radioChecked)
    let handOverCheck=document.getElementsByName("handOver");
    for(let i =0; i < handOverCheck.length ; i++){
      if(handOverCheck[i].checked){
        handOverCheck[i].checked =false;
      }
    }
    
  }
  const FromHanover = () =>{
     dispatch(getSendHandOver(handOverElement));
     setRadioChecked(!radioChecked)
     let handOverCheck=document.getElementsByName("handOver");
    for(let i =0; i < handOverCheck.length ; i++){
      if(handOverCheck[i].checked){
        handOverCheck[i].checked =false;
      }
    }
   }

  const handOverInfo = useSelector(state=>{
    return state.inPatientInfo.value[9]
  })

  const selectRow = (e)=>{
    let changeHandOverInfo = {
      handOverPK : handOverInfo[e.target.id].HANDOVER_ID_PK,
      handOverContent : handOverInfo[e.target.id].HANDOVER_CONTENT,
      handOverTarget:handOverInfo[e.target.id].HANDOVER_TARGET,
      empName: handOverInfo[e.target.id].EMP_NAME
    }
    dispatch(globalmodifyElement(changeHandOverInfo))
  }


  return (
    <div className='handOver-container'>
      <div className='checkBox-container'>
        <div id='handover-radio1' onClick={ToHandOver}>
          <input type='radio' name ='handover-radio' checked={radioChecked} readOnly></input><span>TO ME</span>
        </div>
        <div id='handover-radio2' onClick={FromHanover}>
        <input type='radio' name ='handover-radio' checked={!radioChecked} readOnly /><span>FROM ME</span>
        </div>
      </div>
        <div className='handOver-wapper'>
          <table>
            <thead>
              {handOverInfo != null && handOverInfo[0] != null &&
              (handOverInfo[0].errorCode ==null &&
              <tr>
                <th>-</th>
                <th>날짜</th>
                <th>작성자</th>
                <th>인계자</th>
                <th>인계 사항</th>
              </tr>
              )}
              
            </thead>
            <tbody>
            {handOverInfo != null && handOverInfo[0] != null && ( (handOverInfo[0].errorCode == null ?
              (handOverInfo.map((HandOverInfo, index)=>(
              <tr key ={index}>
                <td className='handOver-fix'><input type= "radio" name= "handOver" id = {index} onClick={selectRow}/></td>
                <td className='handOver-date'>{(HandOverInfo.HANDOVER_DATE + " ").substring(0,10)}</td>
                <td className='handOver-from' >{HandOverInfo.EMP_NAME}</td>
                <td className='handOver-to'>{HandOverInfo.HANDOVER_TARGET}</td>
                <td className='handOver-content'>{HandOverInfo.HANDOVER_CONTENT}</td>
              </tr>
            ))):<div className='handOver-error'>잘못된 직원 정보입니다. 다시 입력 해주세요</div>
            ))}
            </tbody>
          </table>
        </div>
      <div className='btn-wapper' >
        <a href='#!' className='btn' id='handover-modify' onClick={ModalMode}>수정</a> 
        <a href='#!' className='btn' id='handover-create' onClick={ModalMode}>등록</a>
      </div>
    </div>
  )
}

export default HandOver ;
