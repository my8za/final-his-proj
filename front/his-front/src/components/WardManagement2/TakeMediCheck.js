import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeTakeMediStatus } from '../../redux/AdmissionPatientInfoApi';
import { executeModal, modalMode, modifyElement } from '../../redux/InPatientInfoSlice';
// style
import './takeMediCheck.scss';

const TakeMediCheck = () => {

  const dispatch = useDispatch()
  
  const ModalMode = (e)=>{
    let selectMode = e.target.id
    dispatch(executeModal(true))
    dispatch(modalMode(selectMode))
    let mediCheck=document.getElementsByName("medi");
    for(let i =0; i < mediCheck.length ; i++){
      if(mediCheck[i].checked){
        mediCheck[i].checked =false;
      }
    }
  }

    const getMediRecords = useSelector(state=>{
      return state.inPatientInfo.value[7]
    }) 

    const selectRow = (e)=>{
      let changeMediRecords = {
        recordIdPk : getMediRecords[e.target.id].RECORD_ID_PK,
        orderContent : getMediRecords[e.target.id].ORDER_CONTENT,
        medicineName:getMediRecords[e.target.id].MEDICINE_NAME,
        oderer: getMediRecords[e.target.id].ORDERER
      }
      dispatch(modifyElement(changeMediRecords))
    }


    const patientElements = useSelector(state=>{
      return state.inPatientInfo.value[0]
    }) 

    let takeMediStatus;
    let changeTaking;
    const confirmTaking = (e)=>{
      
      takeMediStatus = !(getMediRecords[e.target.id].TAKE_MEDICINE_STATUS)

        changeTaking ={
        recordIdPk : getMediRecords[e.target.id].RECORD_ID_PK,
        takeMedicineStatus : takeMediStatus,
        name : patientElements.name,
        ward : patientElements.ward,
        roomNum : patientElements.roomNum,
        bedNum : patientElements.bedNum
      }

      dispatch(changeTakeMediStatus(changeTaking))
    }

  return (
    <div className='medi-check-container'>
      <div className='medi-check-wapper'>
        <table>
          <thead>
            <tr>
              <th>-</th>
              <th>날짜</th>
              <th>복용 확인</th>
              <th>처방 내용</th>
              <th>약 종류</th>
              <th>수행자</th>
            </tr>
          </thead>
          <tbody>
            {getMediRecords != null ?
              getMediRecords.map((mediRecords, index)=>(
                <tr key={index}>
                  <td className='medi-fix' ><input type= "radio" name ="medi" id = {index} onClick={selectRow} readOnly/></td>
                  <td className='medi-date' >{(mediRecords.ORDER_DATE + "").substring(0,10)}</td>
                  <td className='medi-check' id = {index}  onClick={confirmTaking} ><input type= "checkbox" id = {index} checked={mediRecords.TAKE_MEDICINE_STATUS} readOnly/></td>
                  <td className='medi-content' >{mediRecords.ORDER_CONTENT}</td>
                  <td className='medi-oderer' >{mediRecords.MEDICINE_NAME}</td>
                  <td className='medi-oderer' >{mediRecords.ORDERER}</td>
                </tr>
                ))
              :  
                <tr>
                <td className='medi-fix'><input type= "radio" name ="medi" readOnly/></td>
                <td className='medi-date'></td>
                <td className='medi-check'><input type= "checkbox"/></td>
                <td className='medi-content'>빈 데이터 입니다 환자를 클릭 해 주세요</td>
                <td className='medi-oderer'></td>
                <td className='medi-oderer'></td>
              </tr>
              }     
          </tbody>
        </table>
      </div>
      {getMediRecords != null &&
      <div className='btn-wapper' >
        <a href='#!' className='btn' id='medi-check-modify' onClick={ModalMode}>수정</a> 
        <a href='#!' className='btn' id='medi-check-create' onClick={ModalMode}>등록</a>
      </div>
      }
    </div>
  )
}

export default TakeMediCheck ;
