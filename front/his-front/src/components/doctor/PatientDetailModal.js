import React, { useEffect, useState } from "react";
// style
import '../../styles/scss/reset.scss';
import '../../components/doctor/PatientDetail.scss';
import axios from "axios";
// components 

const PatientDetailModal = ({ patientID, treatmentDate }) => {

    const [pastTreatmentDetail, setPastTreatmentDetail] = useState([{}]);

    useEffect(() => {

        axios.get("http://localhost:9090/patient/pastTreatmentDetail", 
        {params : {
            patientID : patientID,
            treatmentDate : treatmentDate
        }})
        .then((res) => {
            setPastTreatmentDetail(res.data)
        })

    }, [patientID, treatmentDate])

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
                                <td><input readOnly value={pastTreatmentDetail[0].PATIENT_NAME || ''}/></td>
                                <th colSpan={2}>주민등록번호</th>
                                <td colSpan={2}><input readOnly value={pastTreatmentDetail[0].PATIENT_SSN || ''} /></td>
                                <th>보험유무</th>
                                <td><input readOnly value={pastTreatmentDetail[0].INSURANCE_CHECK || ''} /></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>S/A</th>
                                <td id="SA">{pastTreatmentDetail[0].GENDER}/{pastTreatmentDetail[0].PATIENT_AGE || ''}</td>
                                <th>TEL</th>
                                <td><input readOnly value={pastTreatmentDetail[0].PATIENT_TEL || ''} /></td>
                                <th>진료과</th>
                                <td><input readOnly value={pastTreatmentDetail[0].SPECIALITY || ''} /></td>
                                <th>진료구분</th>
                                <td><input readOnly value="재진" /></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th colSpan={2}>주소</th>
                                <td colSpan={10}><input className="addr" readOnly value={pastTreatmentDetail[0].PATIENT_ADDR || ''} /></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th colSpan={2}>증상</th>
                                <td colSpan={10}><input className="symptom" readOnly value={pastTreatmentDetail[0].SYMPTOM || ''} /></td>
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
                                <td><input readOnly value={pastTreatmentDetail[0].EMP_NAME || ''} /></td>
                                <th>병 명</th>
                                <td><input readOnly value={pastTreatmentDetail[0].DIAGNOSIS || ''} /></td>
                                <th>치료</th>
                                <td><input readOnly value={pastTreatmentDetail[0].TREATMENT_CHECK || ''} /></td>
                                <th>입원</th>
                                <td><input readOnly value={pastTreatmentDetail[0].ADMISSION_CHECK || ''}/></td>
                                <th>약 처방</th>
                                <td><input readOnly value={pastTreatmentDetail[0].MEDICINE_CHECK || ''}/></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>치료오더</th>
                                <td colSpan={10}><input readOnly value={pastTreatmentDetail[0].TREATMENT_ORDER || ''} /></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>입원 오더</th>
                                <td colSpan={10}><input readOnly value={pastTreatmentDetail[0].ADMISSION_DUEDATE || ''} /></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th>약 처방</th>
                                <td colSpan={10}><input readOnly value={pastTreatmentDetail[0].MEDICINE || ''} /></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr className="memo-tr">
                                <th>진료 메모</th>
                                <td colSpan={10}><input readOnly value={pastTreatmentDetail[0].TREATMENT_MEMO || ''} /></td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
              </div>
            </main>
        </div>
    )
}

export default PatientDetailModal;