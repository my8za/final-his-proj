import axios from "axios";
import React, { useState } from "react";
// style
import '../../styles/scss/reset.scss';
import './patientRegistrationModal.scss';
// components 

const PatientRegistrationModal = () => {
  const [name, setName] = useState();
  const [addr, setAddr] = useState();
  const [tel, setTel] = useState();
  const [ssn, setSsn] = useState();
  const [insurance, setInsurance] = useState();
 
  function patientReg() {
      axios.post("http://localhost:9090/patient/insert", {
      PATIENT_NAME: name,
      PATIENT_ADDR: addr,
      PATIENT_TEL: tel,
      PATIENT_SSN: ssn,
      INSURANCE: insurance
      })
      .then(alert(name + "님 등록 완료"))
      .then(window.location.href="/reception");
  }

  return(
        <div className="patientRegistrationModal">
            <main className="main">
              <div className="infoBox">
                  <p className="infoTitle">환자 등록</p>
                  <hr />
                  <div className="infoContent">
                      <ul className="infoUl">
                          <li className="infoLi"><label className="infoLabel">이름</label>
                            <input className="infoInput" 
                            onChange={(e) => {
                              setName(e.target.value);
                            }}/>
                          </li>
                          <li className="infoLi"><label className="infoLabel">주소</label>
                            <input className="infoInput"
                            onChange={(e) => {
                              setAddr(e.target.value);
                            }}/>
                          </li>
                          <li className="infoLi"><label className="infoLabel">전화번호</label>
                            <input className="infoInput"
                            onChange={(e) => {
                              setTel(e.target.value);
                            }}/>
                          </li>
                          <li className="infoLi"><label className="infoLabel">주민등록번호</label>
                           <input className="infoInput"
                           onChange={(e) => {
                            setSsn(e.target.value);
                          }}/>
                          </li>
                          <li className="infoLi"><label className="infoLabel">보험</label>
                           <input className="infoInput"
                           onChange={(e) => {
                            setInsurance(e.target.value);
                          }}/>
                          </li>                          
                          <button className="patientReg" onClick={patientReg}>환자 등록</button>
                      </ul>
                  </div>
              </div>
            </main>
        </div>
    )
}

export default PatientRegistrationModal;