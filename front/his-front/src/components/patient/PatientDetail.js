import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
// style
import './patientDetail.scss';


const PatientDetail = ({ data, setEmpId, symptom, setSymptom, setSpecialityName}) => {
  const [doctorList, setDoctorList] = useState();
  const [speciality, setSpeciality] = useState('내과');

  useEffect(()=>{
    axios.post("http://localhost:9090/outStatus/doctorList", {
      SPECIALITY_ID_FK: (speciality === '내과' ? 'N' : speciality === '이비인후과' ? 'E' : speciality === '정형외과' ? 'J' : ' ') 
      }).then((res)=>{
        setDoctorList(res.data);
        setEmpId(res.data[0].EMP_NAME+'('+res.data[0].EMP_ID_PK+')');
      });
  },[speciality, setEmpId]);

  // selectBox option selected 이벤트
  const selected = useSelector(state => state.selectSpeciality.value[3]);
  const selectedDoctor = useSelector(state => state.selectEmpName.value[4]);
  
  let detailInfo;
  const medicalHistory = useSelector(state => state.readDetailedMedicalHistory.value[5]);
  medicalHistory.map(data => (detailInfo = data))
  console.log(detailInfo)



  return (
    <div className='patient-detail'>
      <table>
        <tbody>
          <tr>
            <th className='devide1 border-left'>S/A</th>
            <td className='devide1'>
              <span>
              {/* 원무수납_환자정보 */}
                {data!==null && data!==undefined? data.GENDER:" "}
              {/* 외래간호_환자정보 */}
                {detailInfo!==null && detailInfo!==undefined? detailInfo.GENDER:" "}
              </span>
              &nbsp; / 
              <span>
                {data!==null && data!==undefined? data.PATIENT_AGE:" "}
                {/* {patientDetails!==null && patientDetails!==undefined? patientDetails.PATIENT_AGE:" "} */}
              </span>
            </td>
            <th className='devide1'>Tel</th>
            <td>
              {data!==null && data!==undefined? data.PATIENT_TEL:" "}
              {/* {patientDetails!==null && patientDetails!==undefined? patientDetails.PATIENT_TEL:" "} */}
            </td>
            <th className='devide1'>진료과</th>
            <td>
              <select
                defaultValue={selected}
                onChange={(e) => {
                setSpeciality(e.target.value);
                setSpecialityName(e.target.value);
                }
              }>
                {
                  selected !== null && selected !== undefined ?
                  <option value={selected}>{selected}</option>
                  :
                  <>
                    <option value='내과'>내과</option>
                    <option value='이비인후과'>이비인후과</option>
                    <option value='정형외과'>정형외과</option>
                  </>
                }
                
              </select>
            </td>
            <th className='devide1'>담당의</th>
            <td>
              <select defaultValue={selectedDoctor}
                onChange={(e) => {
                setEmpId(e.target.value);
              }}>
              {doctorList!==null && doctorList!==undefined? doctorList.map((data, index) => (
                  <option value={data.EMP_NAME} key={index}>{data.EMP_NAME}({data.EMP_ID_PK})</option>
            )) : 
            ''
            }
              </select>
            </td>
            <th className='devide1'>보험유무</th>
            <td className='devide1'>
              {data!==null && data!==undefined? (data.INSURANCE === 0 ? 'X':'O') : " "}
              {/* {patientDetails!==null && patientDetails!==undefined? (patientDetails.INSURANCE === 0 ? 'X':'O') : " "} */}
            </td>
            <th className='devide1'>진료구분</th>
            <td className='devide1'>
              {data!==null && data!==undefined? (data.treatmentInfo.length === 0 ? '초진':'재진') : " "}
              {/* {registrationInfo!==null && registrationInfo!==undefined? (registrationInfo.treatmentInfo.length === 0 ? '초진':'재진') : " "} */}
            </td>
          </tr>
          <tr>
            <th colSpan={3}>주소</th>
            <td colSpan={9}>
              {data!==null && data!==undefined? data.PATIENT_ADDR:" "}
              {/* {patientDetails!==null && patientDetails!==undefined? patientDetails.PATIENT_ADDR:" "} */}
            </td>
          </tr>
          <tr>
            <th colSpan={3}>증상</th>
            <td colSpan={9}>
              {/* {patientDetails!==null && patientDetails!==undefined ? 
                <span>{patientDetails.SYMPTOM}</span> : 
                <input 
                onChange={(e)=> {symptom.current = e.target.value}}/>} */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PatientDetail;