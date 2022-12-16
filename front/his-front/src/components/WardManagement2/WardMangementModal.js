import axios from 'axios';
import { parseISO} from 'date-fns';
import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeCareInfo, changeHandover, changeMediRecord, changeSchedule, setCareInfo, setHandOver, setInpatientSchedule, setMediRecord } from '../../redux/AdmissionPatientInfoApi';
import {setStartDate } from '../../redux/InChangeDateSlice';
import {executeModal, globalmodifyElement, modifyElement} from '../../redux/InPatientInfoSlice';

import './wardMangementModal.scss';

const WardMangementModal = () => {

  const dispatch = useDispatch()
  const userName = window.localStorage.getItem('userName');
  const specialityName = window.localStorage.getItem('specialityName');
  const getEmpName = window.localStorage.getItem('name');
  const ward = window.localStorage.getItem('ward');
  
  const ModalMode = ()=>{
      dispatch(executeModal(false));
      dispatch(modifyElement(null));
      dispatch(globalmodifyElement(null));

    }

    const selectPeople = useSelector(state=>{
      return state.inPatientInfo.value[0]
    }) 
    const getModalMode = useSelector(state=>{
      return state.inPatientInfo.value[2]
    })

    const modifyElements = useSelector(state=>{
      return state.inPatientInfo.value[3]
    })

    const globalModifyElements = useSelector(state=>{
      return state.inPatientInfo.value[4]
    })

      
    const saveContent = useRef("")
    const saveForthContent = useRef("")
    const saveThirdContent = useRef("")
    const saveScheduleDate = useRef("")
    const serachInPatient = useRef("")

   


  // 직원 검색 기능

  const [inNurseList, setInNurseList]=useState([])
  const [inNurse, setInNurse]=useState({
      userName : "",
      name:""
      })

  useEffect(()=>{
    axios.post('http://localhost:9090/admission/inNurseList')
    .then(res=>setInNurseList(res.data))

  },[])

  useEffect(()=>{

    const searchInput = document.getElementById("searchInput")
    const resultContainer = document.getElementById("suggestions-container")
    const filteredList = document.getElementById("suggestions-list")
    const searchFunc = (objId) => {
      let searchId = searchInput.value;
      return objId.indexOf(searchId) !== -1;
    }
    const showFilteredAccount = (account) => {
      resultContainer.style.display = "block";
      const filteredOne = document.createElement("li");
      filteredOne.innerHTML = `
      <div class="suggest-container">
        <a class="suggest-username" style= 'border-bottom:1px #EAEAEA solid; color:black; display:block' 
          id =${account.USERNAME} name=${account.EMP_NAME}>
        이름: ${account.EMP_NAME} , 소속 : ${account.SPECIALITY_NAME}, 이메일: ${account.EMP_EMAIL}</a>
      </div>`;
      filteredList.append(filteredOne);
      
    };
    searchInput.addEventListener("keyup", () => {
      //초기화
      filteredList.innerHTML = "";
      resultContainer.style.display = "none";
      // input 값이 있다면,
      if (searchInput.value) {
        const filteredAccount = inNurseList.filter((x) => searchFunc(x.EMP_NAME));
        // filteredAccout 배열이 있다면,
        if (filteredAccount !== []) {
          filteredAccount.forEach((acc) => showFilteredAccount(acc));
          if(filteredList.childElementCount){
            for(let i = 0; i < filteredList.childElementCount ; i++ ){
              filteredList.children[i].addEventListener('click',(e) =>{
              setInNurse({
                userName :e.target.id,
                name:(e.target.name)
              })
              resultContainer.style.display = "none";
                }
              )
            }  
          }
        }
      }
    });
  },[saveThirdContent,inNurseList])



  useEffect(()=>{
    let searchInput = document.getElementById("searchInput")
    searchInput.value = searchInput.defaultValue
  },[inNurse])


  // 환자 검색

  const [inPatientWardList, setInPatientWardList]=useState([])
  const [inPatientWard, setInPatientWard]=useState({
      name: "",
      ward : "",
      roomNum : "",
      bedNum : ""
      })

      useEffect(()=>{
        axios.get('http://localhost:9090/wardCheck/ocuupiedList', {params : {
          ward : ward
        }})
        .then(res=> setInPatientWardList(res.data))
      },[ward])

      useEffect(()=>{
        const searchInput = document.getElementById("searchPatientInput")
        const resultContainer = document.getElementById("searchPatientInput-container")
        const filteredList = document.getElementById("searchPatientInput-list")
        const searchFunc = (objId) => {
          let searchId = searchInput.value;
          return objId.indexOf(searchId) !== -1;
        }
        const showFilteredAccount = (account) => {
          resultContainer.style.display = "block";
          const filteredOne = document.createElement("li");
          filteredOne.innerHTML = `
          <div class="suggest-container">
            <a style= 'border-bottom:1px #EAEAEA solid; color:black; display:block' 
            id =${account.PATIENT_NAME} name=${account.WARDROOM}${account.BED_NUM}>
            이름: ${account.PATIENT_NAME} , 호실 : ${account.WARDROOM}, 병상번호: ${account.BED_NUM}</a>
          </div>`;
          filteredList.append(filteredOne);
          
        };
        searchInput.addEventListener("keyup", () => {
          //초기화
          filteredList.innerHTML = "";
          resultContainer.style.display = "none";
          // input 값이 있다면,
          if (searchInput.value) {
            const filteredAccount = inPatientWardList.filter((x) => searchFunc(x.PATIENT_NAME));
            // filteredAccout 배열이 있다면,
            if (filteredAccount !== []) {
              filteredAccount.forEach((acc) => showFilteredAccount(acc));
              if(filteredList.childElementCount){
                for(let i = 0; i < filteredList.childElementCount ; i++ ){
                  filteredList.children[i].addEventListener('click',(e) =>{
                  setInPatientWard({
                    name: e.target.id,
                    ward : (e.target.name + "").substring(0,1)*100,
                    roomNum : ("" + e.target.name).substring(2,3),
                    bedNum : ("" + e.target.name).substring(3)
                  })
                  resultContainer.style.display = "none";
                    }
                  )
                }  
              }
            }
          }
        });
      },[serachInPatient,inPatientWardList])

      useEffect(()=>{
        const searchInput = document.getElementById("searchPatientInput")
        searchInput.value = searchInput.defaultValue
      },[inPatientWard])
      

  let treatData;
  let sendElements;
  let modalTitle;
  let modalDate = new Date();
  modalDate = modalDate.getFullYear()+"-"+ (modalDate.getMonth()+1)+"-" + modalDate.getDate();
  let modalWriter = '작성자';
  let modalContentTitle = '간호 기록'
  let patientName;
  selectPeople &&(patientName = selectPeople.name);
  let modalBtn ='등록';
  let addContentTitle = '약 종류';
  let addInput=false
  let thirdTitle = '환자명'
  let literate=true
  let thirdDefaultValue = "";
  let NewScheduleDate = true;
  let ModalContentdefaultValue = "";
  let forthdefaultValue = "";
  let insertPatientInfo = true;
  let search = true;
  // 간호기록 Update
  if(getModalMode === 'careInfo-modify'){
    modalTitle= 'Modify CareInfo'
    modalBtn = '수정'  
    if(modifyElements !=null){
      if(modifyElements.nurseName === getEmpName){
        ModalContentdefaultValue = modifyElements.careContent
      if(saveContent.current===""){
        saveContent.current = (modifyElements.careContent)
        }
      treatData = ()=>{
        sendElements ={
        "name": selectPeople.name,
        "ward" : selectPeople.ward,
        "roomNum" : selectPeople.roomNum,
        "bedNum" : selectPeople.bedNum,
        "careContent": saveContent.current,
        "careIdPk" : modifyElements.careIdPk
        }
      sendElements = JSON.stringify(sendElements)
       
      let confirmValue = window.confirm("수정 하시겠습니까 ?");
      if(confirmValue){
        dispatch(executeModal(false))
        dispatch(changeCareInfo(sendElements))
        dispatch(modifyElement(null))
        }     
      }
      }else{
      dispatch(executeModal(false))
    }
  }else{dispatch(executeModal(false))}
  }


  // 간호기록 Create
  else if(getModalMode === 'careInfo-create'){
    modalTitle= 'Create CareInfo'
    treatData = ()=>{
      sendElements ={
      "name": selectPeople.name,
      "ward" : selectPeople.ward,
      "roomNum" : selectPeople.roomNum,
      "bedNum" : selectPeople.bedNum,
      "nurseName" : getEmpName,
      "careContent" :  saveContent.current
        }
      sendElements = JSON.stringify(sendElements)
        
      if(saveContent.current === ""){
        alert("빈값이 존재 합니다 확인 해주세요")
        }else{
          let confirmValue = window.confirm("등록하시겠습니까 ?");
          if(confirmValue){
            dispatch(executeModal(false))
            dispatch(setCareInfo(sendElements))
        }      
      }
    }
  }

  // 처방기록 Update
  else if(getModalMode === 'medi-check-modify'){
    modalTitle= 'Modify Medicine Record'
    modalBtn = '수정'
    modalContentTitle = '처방 기록'
    if(modifyElements !=null){
      if(modifyElements.oderer === getEmpName){
        ModalContentdefaultValue = modifyElements.orderContent
        forthdefaultValue = modifyElements.medicineName
        addInput = true
        if(saveContent.current===""){
          saveContent.current= (modifyElements.orderContent)
        }
        if(saveForthContent.current === ""){
          saveForthContent.current=(modifyElements.medicineName)
        }
        treatData = ()=>{
          sendElements ={
          "name": selectPeople.name,
          "ward" : selectPeople.ward,
          "roomNum" : selectPeople.roomNum,
          "bedNum" : selectPeople.bedNum,
          "orderContent": saveContent.current,
          "recordIdPk" : modifyElements.recordIdPk,
          "medicineName": saveForthContent.current
            }
          sendElements = JSON.stringify(sendElements)
          let confirmValue = window.confirm("수정 하시겠습니까 ?");
          if(confirmValue){
            dispatch(executeModal(false))
            dispatch(changeMediRecord(sendElements))
            dispatch(modifyElement(null))
            }     
          }
      }
      else{
        dispatch(executeModal(false))
      }
    }
    else{dispatch(executeModal(false))}
}

//처방기록 Create
else if(getModalMode === 'medi-check-create'){
    modalTitle= 'Create Medicine Record'
    modalContentTitle = '처방 기록'
    addInput = true;
    treatData = ()=>{
    sendElements ={
      "name": selectPeople.name,
      "ward" : selectPeople.ward,
      "roomNum" : selectPeople.roomNum,
      "bedNum" : selectPeople.bedNum,
      "oderer" : getEmpName,
      "oderContent" :  saveContent.current,
      "medicineName" : saveForthContent.current
      }
    sendElements = JSON.stringify(sendElements)
    if(saveContent.current === "" || saveForthContent.current === ""){
      alert("빈값이 존재 합니다 확인 해주세요")
    }else{
      let confirmValue = window.confirm("등록하시겠습니까 ?");
      if(confirmValue){
        dispatch(executeModal(false))  
        dispatch(setMediRecord(sendElements))
        }      
      }
    }
  }
// 인계 사항 Update
  else if(getModalMode === 'handover-modify'){
    modalTitle= 'Modify HandOver'
    modalBtn = '수정'
    thirdTitle = '인계자'
    modalContentTitle = '인계 사항'
    literate =false
    search = false
    if(globalModifyElements !=null){
      // 이부분 아래계정이름으로 구분 하도록 나중에 변경 현제는 이름이 달라도 일단 눌러진다
      //getEmpName 으로 대체 준비
      if(globalModifyElements.empName === getEmpName){
        thirdDefaultValue = globalModifyElements.handOverTarget
        ModalContentdefaultValue = globalModifyElements.handOverContent
        if(saveContent.current===""){
          saveContent.current= globalModifyElements.handOverContent
          }
        if(saveThirdContent.current === ""){
          setTimeout(() => {
            saveThirdContent.current= globalModifyElements.handOverTarget
            console.log(saveThirdContent.current)
          }, 100);
          }else{
            saveThirdContent.current = inNurse.name
          }
        treatData = ()=>{
          sendElements ={
            "userName": userName,
            "handOverTarget" : saveThirdContent.current,
            "handOverContent" : saveContent.current,
            "handOverPK" : globalModifyElements.handOverPK
            }

          sendElements = JSON.stringify(sendElements)
          let confirmValue = window.confirm("수정 하시겠습니까 ?");
          if(confirmValue){
                dispatch(executeModal(false))
                dispatch(changeHandover(sendElements))
                dispatch(globalmodifyElement(null))
              } 
        }
      }
      else{
        dispatch(executeModal(false))
      }
  } 
  else{dispatch(executeModal(false))}
}
// 인계 사항 create  
  else if(getModalMode === 'handover-create'){
    modalTitle= 'Create HandOver';
    thirdTitle = '인계자';
    thirdDefaultValue = '';
    modalContentTitle = '인계 사항';
    literate =false;
    search = false;
    treatData = ()=>{
    sendElements ={
      "userName": userName,
      "handOverTarget" : inNurse.userName,
      "handOverContent" : saveContent.current
    }
    sendElements = JSON.stringify(sendElements)
    if(saveContent.current === "" || saveThirdContent.current === ""){
      alert("빈값이 존재 합니다 확인 해주세요")
    }
    else{
      let confirmValue = window.confirm("등록하시겠습니까 ?");
      if(confirmValue){
        dispatch(executeModal(false))
        dispatch(setHandOver(sendElements));
        }      
      }  
    }

  } 
// 해당 병동 전체 환자일정  Update  
  else if(getModalMode === 'schedule-modify'){
    modalTitle= 'Modify Schedule'
    modalBtn = '수정'
    thirdTitle = '위치'
    thirdDefaultValue = ''
    modalContentTitle = '일정 내용'
    literate =false
    NewScheduleDate=false
  

    if(globalModifyElements !=null){
        thirdDefaultValue = globalModifyElements.schedulePlace
        ModalContentdefaultValue = globalModifyElements.scheduleContent
        if(saveContent.current===""){
          saveContent.current= (globalModifyElements.scheduleContent)
          }
        if(saveThirdContent.current === ""){
            saveThirdContent.current=(globalModifyElements.schedulePlace)
          }
        if(saveScheduleDate.current === ""){
            saveScheduleDate.current=(globalModifyElements.scheduleDate)
          }
        treatData = ()=>{
            sendElements ={
            "scheduleDate": (saveScheduleDate.current),
            "schedulePlace" : saveThirdContent.current,
            "scheduleContent" : saveContent.current,
            "scheduleIdPk" : globalModifyElements.scheduleIdPk,
            "specialityName":specialityName,
            "LastModifier": getEmpName
              }
            let newdate = parseISO(saveScheduleDate.current)
            sendElements = JSON.stringify(sendElements)
            let confirmValue = window.confirm("수정 하시겠습니까 ?");
            if(confirmValue){
              dispatch(executeModal(false))
              dispatch(changeSchedule(sendElements))
              dispatch(globalmodifyElement(null))
              dispatch(setStartDate(newdate))
            } 
          }
        }
    else{dispatch(executeModal(false))}
  }
  

  //해당 병동 전체 환자일정  create 
  else if(getModalMode === 'schedule-create'){
    modalTitle= 'Create Schedule'
    modalContentTitle = '일정 내용'
    modalWriter= '환자 정보'
    thirdTitle = '위치'
    thirdDefaultValue = ''
    literate =false
    NewScheduleDate = false
    insertPatientInfo = false
    
    treatData = ()=>{
    sendElements ={
      "name": inPatientWard.name,
      "ward" : inPatientWard.ward,
      "roomNum" : inPatientWard.roomNum,
      "bedNum" : inPatientWard.bedNum,
      "schedulePlace" : saveThirdContent.current,
      "scheduleContent" :  saveContent.current,
      "scheduleDate" : saveScheduleDate.current,
      "specialityName" : specialityName,
      "LastModifier": getEmpName
    }
    
    if( saveThirdContent.current === "" || 
    saveContent.current === "" || saveScheduleDate.current === ""
    ){
      alert("빈값이 존재 합니다 확인 해주세요")
    }
    else if(inPatientWard.name === ""){
      alert("잘못된 환자 정보입니다 검색을 다시 하세요")
    }
    else{
      let confirmValue = window.confirm("등록하시겠습니까 ?");
      let newdate = parseISO(saveScheduleDate.current)
      sendElements = JSON.stringify(sendElements)
      if(confirmValue){
        dispatch(executeModal(false))
        dispatch(setInpatientSchedule(sendElements))
        dispatch(setStartDate(newdate))
        }      
      }
    }
  }
return(
<div className='wppaer' onClick={ModalMode}>
  <div className="container" onClick={(e) => e.stopPropagation()}>  
        <div id="contact">
            <h3>{modalTitle}</h3>
            <fieldset>
                <h5>날짜</h5>
                {NewScheduleDate ? <input type="text" tabindex="1" readOnly value={modalDate}/>
                : <input type="datetime-local" tabindex="1" onChange={(e)=>saveScheduleDate.current=(e.target.value)}/>
                  }
            </fieldset>
            {insertPatientInfo ? 
            <fieldset>
                <h5>{modalWriter}</h5>
                <input id ='searchPatientInput' type="text" tabindex="2" readOnly value={getEmpName}/>
            </fieldset> 
                :
            <fieldset>
              <h5>{modalWriter}</h5>
                  <input id ='searchPatientInput' type="text" tabindex="3" placeholder= '환자명을 검색하세요' defaultValue={inPatientWard.name} onChange={(e)=>serachInPatient.current=(e.target.value)}/>
                  <div id="searchPatientInput-container">
                      <ul id="searchPatientInput-list"></ul>
                    </div>
            </fieldset> 
                }
            
            {literate ? <fieldset>
                <h5>{thirdTitle}</h5>
                <input id ='searchInput' type="text" tabindex="3" readOnly value={patientName}/>
            </fieldset> :
            ( search ?
            <fieldset>
                <h5>{thirdTitle}</h5>
                <input id ='searchInput' type="text" tabindex="3" placeholder= {thirdDefaultValue} defaultValue={thirdDefaultValue} onChange={(e)=>saveThirdContent.current=(e.target.value)}/>
            </fieldset>
            : 
            <fieldset>
                <h5>{thirdTitle}</h5>
                <input id ='searchInput' type="text" tabindex="3" placeholder={thirdDefaultValue} defaultValue={inNurse.name} onChange={(e)=>saveThirdContent.current=(e.target.value)}/>
                <div id="suggestions-container">
                  <ul id="suggestions-list"></ul>
                </div>
            </fieldset>
              )}
            {addInput && <fieldset>
                <h5>{addContentTitle}</h5>
                <input type="text" defaultValue={forthdefaultValue} tabindex="4" onChange={(e)=>saveForthContent.current=e.target.value}/>
            </fieldset>}
            <fieldset>
                <h5>{modalContentTitle}</h5>
                <textarea defaultValue= {ModalContentdefaultValue} tabindex="5" required onChange={(e)=>saveContent.current= e.target.value}></textarea>
            </fieldset>
            <fieldset>
              <button name="submit" type="btn" id="contact-submit" data-submit="...Sending" onClick={treatData}>{modalBtn}</button>
            </fieldset>
        </div>
    </div>
</div>
    )
}

export default WardMangementModal;