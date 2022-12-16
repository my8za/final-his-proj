import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import '../styles/wardSetting.scss'




function WardSetting({inPatientALL,setInPatientALL, setShowRegiInPatient}) {


  const serachInAllPatient = useRef("")
  const [inPatientAllList, setInPatientAllList]=useState([])
      useEffect(()=>{
        axios.get('http://localhost:9090/wardCheck/ocuupiedAllList')
        .then(res=> setInPatientAllList(res.data))
      },[])


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
            <a style= 'border-bottom:1px #EAEAEA solid; color:black; display:block; height: 25px' 
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
            const filteredAccount = inPatientAllList.filter((x) => searchFunc(x.PATIENT_NAME));
            // filteredAccout 배열이 있다면,
            if (filteredAccount !== []) {
              filteredAccount.forEach((acc) => showFilteredAccount(acc));
              if(filteredList.childElementCount){
                for(let i = 0; i < filteredList.childElementCount ; i++ ){
                  filteredList.children[i].addEventListener('click',(e) =>{
                  setInPatientALL({
                    name: e.target.id,
                    ward : (e.target.name + "").substring(0,1)*100,
                    roomNum : ("" + e.target.name).substring(2,3),
                    bedNum : ("" + e.target.name).substring(3),
                    wardRoom: (e.target.name + "").substring(0,3)
                  })
                  resultContainer.style.display = "none";
                    }
                  )
                }  
              }
            }
          }
        });
      },[setInPatientALL,serachInAllPatient,inPatientAllList])

      useEffect(()=>{
        const searchInput = document.getElementById("searchPatientInput")
        searchInput.value = searchInput.defaultValue
      },[inPatientALL])
      
 
  return (
    <div className="wardSetting-wapper">
        <div className="wardSetting-Body">
          <div id="wardSetting-content">
              <h3>입원 환자 등록</h3>
              <fieldset className="search-patient">
                  <h5>환자명</h5>
                  <input id ='searchPatientInput' type="text" tabindex="2" placeholder= '환자명을 검색하세요' defaultValue={inPatientALL.name} onChange={(e)=>serachInAllPatient.current=(e.target.value)}/>
                    <div id="searchPatientInput-container">
                        <ul id="searchPatientInput-list"></ul>
                    </div>
              </fieldset> 
          </div>
          <fieldset>
                <button name="submit" type="btn" className="inRegister-btn" onClick={()=>setShowRegiInPatient(false)}>등록</button>
            </fieldset>
        </div>
    </div>
  );
}
 
export default WardSetting;