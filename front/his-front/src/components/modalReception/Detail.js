import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
// style
import '../../styles/scss/reset.scss';
import '../../components/modalReception/Detail.scss';
// components 

const Detail = ({ patientID, treatmentDate, regTime }) => {

    // 환자 과거병력 조회 SELECT
    const registrationInfo = useSelector(state => state.readPatientRegistrationInfo.value[1]);
    
    // 상세 과거병력 SELECT
    const detailedMedicalHistory = useSelector(state => state.readDetailedMedicalHistory.value[5]);
    let medicalHistoryInfo;
    detailedMedicalHistory.length > 0 && detailedMedicalHistory.map(data =>  medicalHistoryInfo = data)
  
    const [detail, setDetail] = useState([{}]);
    

    useEffect(() => {
        axios.get("http://localhost:9090/patient/getTreatmentHistoryDetail", 
        {params : {
            patientID : patientID,
            treatmentDate : treatmentDate,
            regTime : regTime
        }})
        .then((res) => {
          setDetail(res.data)
        })
    }, [patientID, treatmentDate, regTime])

    return(
      <div className="detail-box">
          <main>
            <div>
                <p>과거 병력</p>
                <hr />
                <br /><br />
                <div>
                  <p className="patient-title">환자 정보</p>
                  <table>
                      <tbody>
                          <tr>
                              <th>이름</th>
                              <td>
                                {registrationInfo!==null && registrationInfo!==undefined ? <span>{registrationInfo.PATIENT_NAME}</span> : <input readOnly value={detail[0].PATIENT_NAME || ''}/>}
                              </td>
                              <th colSpan={2}>주민등록번호</th>
                              <td colSpan={2}>
                                {registrationInfo!==null && registrationInfo!==undefined ? <span>{registrationInfo.PATIENT_SSN}</span> : <input readOnly value={detail[0].PATIENT_SSN || ''} />}
                              </td>
                              <th>보험유무</th>
                              <td>
                                {registrationInfo!==null && registrationInfo!==undefined ? (registrationInfo.INSURANCE === 0 ? 'X':'O') : <input readOnly value={detail[0].INSURANCE_CHECK || ''} />}
                              </td>
                          </tr>
                      </tbody>
                      <tbody>
                          <tr>
                              <th>S/A</th>
                              <td id="SA">
                                {registrationInfo!==null && registrationInfo!==undefined? registrationInfo.GENDER : (detail[0].GENDER)}
                                / {registrationInfo!==null && registrationInfo!==undefined? registrationInfo.PATIENT_AGE : (detail[0].PATIENT_AGE || '')}
                              </td>
                              <th>TEL</th>
                              <td>
                                {registrationInfo!==null && registrationInfo!==undefined ? <span>{registrationInfo.PATIENT_TEL}</span> : <input readOnly value={detail[0].PATIENT_TEL || ''} />}
                              </td>
                              <th>진료과</th>
                              <td>
                                {registrationInfo!==null && registrationInfo!==undefined ? <span>{registrationInfo.SPECIALITY}</span> : <input readOnly value={detail[0].SPECIALITY || ''} />}
                              </td>
                              <th>진료구분</th>
                              <td><input readOnly value="재진" /></td>
                          </tr>
                      </tbody>
                      <tbody>
                          <tr>
                              <th colSpan={2}>주소</th>
                              <td colSpan={10}>
                                {registrationInfo!==null && registrationInfo!==undefined ? <span>{registrationInfo.PATIENT_ADDR}</span> : <input className="addr" readOnly value={detail[0].PATIENT_ADDR || ''} />}
                              </td>
                          </tr>
                      </tbody>
                      <tbody>
                          <tr>
                              <th colSpan={2}>증상</th>
                              <td colSpan={10}>
                                {medicalHistoryInfo!==null && medicalHistoryInfo!==undefined ? <span>{medicalHistoryInfo.SYMPTOM}</span> : <input className="symptom" readOnly value={detail[0].SYMPTOM || ''} />}
                              </td>
                          </tr>
                      </tbody>
                  </table>
                </div>

                <div className="record-box">
                  <p className="record-title">진료 기록</p>
                  <table>
                      <tbody>
                          <tr>
                              <th>진료 의사</th>
                              <td>
                                {medicalHistoryInfo!==null && medicalHistoryInfo!==undefined ? <span>{medicalHistoryInfo.EMP_NAME}</span> : <input readOnly value={detail[0].EMP_NAME || ''} />}
                              </td>
                              <th>병 명</th>
                              <td>
                                {medicalHistoryInfo!==null && medicalHistoryInfo!==undefined ? <span>{medicalHistoryInfo.DIAGNOSIS}</span> : <input readOnly value={detail[0].DIAGNOSIS || ''} />}
                              </td>
                              <th>치료</th>
                              <td>
                                {medicalHistoryInfo!==null && medicalHistoryInfo!==undefined ? <span>{medicalHistoryInfo.TREATMENT_CHECK}</span> : <input readOnly value={detail[0].TREATMENT_CHECK || ''} />}
                              </td>
                              <th>입원</th>
                              <td>
                                {medicalHistoryInfo!==null && medicalHistoryInfo!==undefined ? <span>{medicalHistoryInfo.ADMISSION_CHECK}</span> : <input readOnly value={detail[0].ADMISSION_CHECK || ''}/>}
                              </td>
                              <th>약 처방</th>
                              <td>
                                {medicalHistoryInfo!==null && medicalHistoryInfo!==undefined ? <span>{medicalHistoryInfo.MEDICINE_CHECK}</span> : <input readOnly value={detail[0].MEDICINE_CHECK || ''}/>}
                              </td>
                          </tr>
                      </tbody>
                      <tbody>
                          <tr>
                              <th>치료오더</th>
                              <td colSpan={10}>
                                {medicalHistoryInfo!==null && medicalHistoryInfo!==undefined ? <span>{medicalHistoryInfo.TREATMENT_ORDER}</span> : <input readOnly value={detail[0].TREATMENT_ORDER || ''} />}
                              </td>
                          </tr>
                      </tbody>
                      <tbody>
                          <tr>
                              <th>입원 오더</th>
                              <td colSpan={10}>
                                {medicalHistoryInfo!==null && medicalHistoryInfo!==undefined ? <span>{medicalHistoryInfo.ADMISSION_DUEDATE}</span> : <input readOnly value={detail[0].ADMISSION_DUEDATE || ''} />}
                              </td>
                          </tr>
                      </tbody>
                      <tbody>
                          <tr>
                              <th>약 처방</th>
                              <td colSpan={10}>
                                {medicalHistoryInfo!==null && medicalHistoryInfo!==undefined ? <span>{medicalHistoryInfo.MEDICINE}</span> : <input readOnly value={detail[0].MEDICINE || ''} />}
                              </td>
                          </tr>
                      </tbody>
                      <tbody>
                          <tr className="memo-tr">
                              <th>진료 메모</th>
                              <td colSpan={10}>
                                {medicalHistoryInfo!==null && medicalHistoryInfo!==undefined ? <span>{medicalHistoryInfo.TREATMENT_MEMO}</span> : <input readOnly value={detail[0].TREATMENT_MEMO || ''} />}
                              </td>
                          </tr>
                      </tbody>
                  </table>
                </div>
            </div>
          </main>
      </div>
  )
}

export default Detail;