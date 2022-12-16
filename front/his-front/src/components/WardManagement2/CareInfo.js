
// style
import './careInfo.scss';
import { useDispatch, useSelector } from 'react-redux';
import {executeModal, modalMode, modifyElement } from '../../redux/InPatientInfoSlice';



const CareInfo = () => {
  
  const dispatch = useDispatch()


  const ModalMode = (e)=>{
    let selectMode = e.target.id
    dispatch(executeModal(true))
    dispatch(modalMode(selectMode))
    let careInfoCheck=document.getElementsByName("careInfo");
    for(let i =0; i < careInfoCheck.length ; i++){
      if(careInfoCheck[i].checked){
        careInfoCheck[i].checked =false;
      }
    }
  }
  
  
  const getCareInfo = useSelector(state=>{
    return state.inPatientInfo.value[6]
  })

  const selectRow = (e)=>{
    let changeCareInfo = {
      careIdPk : getCareInfo[e.target.id].CARE_ID_PK,
      careContent : getCareInfo[e.target.id].CARE_CONTENT,
      nurseName : getCareInfo[e.target.id].NURSE_NAME
    }

    dispatch(modifyElement(changeCareInfo))
  }


  const checkedStatus = useSelector(state=>{
    return state.inPatientInfo.value[4]
  }) 


  return (
    <div className='care-info-container'>
      <div className='care-info-wapper'>
        <table>
          <thead>
            <tr>
              <th>-</th>
              <th>날짜</th>
              <th>간호기록</th>
              <th>작성자</th>
            </tr>
          </thead>
          <tbody>
          {getCareInfo != null ?
          getCareInfo.map((careInfo, index)=>(
            <tr key={index}>
              <td className='careInfo-fix'><input type= "radio" name= "careInfo" id = {index} onClick={selectRow} checked={checkedStatus}/></td>
              <td className='careInfo-date'>{(careInfo.CARE_DATE + "").substring(0,10)}</td>
              <td className='careInfo-content'>{careInfo.CARE_CONTENT}</td>
              <td className='careInfo-writer'>{careInfo.NURSE_NAME}</td>
            </tr>
            ))
          :  
            <tr>
              <td className='careInfo-fix'><input type= "radio" name= "careInfo"/></td>
              <td className='careInfo-date'></td>
              <td className='careInfo-content'>빈 데이터 입니다 환자를 클릭 하세요</td>
              <td className='careInfo-writer'></td>
            </tr>
          }           
          </tbody>
        </table>
      </div>
      {getCareInfo != null &&
      <div className='btn-wapper'>
        <a href='#!' className='btn' id='careInfo-modify' onClick={ModalMode}>수정</a> 
        <a href='#!' className='btn' id='careInfo-create' onClick={ModalMode}>등록</a>
      </div>
      }
    </div>
  )
}

export default CareInfo ;
