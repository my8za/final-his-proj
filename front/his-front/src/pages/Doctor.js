import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import Calendar from 'react-calendar';
import io from 'socket.io-client';
// style
import '../styles/scss/reset.scss';
import '../styles/doctor.scss';
import '../styles/Calendar.css';
import '../components/doctor/PatientDetail.scss';
import '../components/doctor/DoctorSchedule.scss';
// components
import EmpBar from '../components/employee/EmpBar';
import ReducedPatientStatus from '../components/patient/ReducedPatientStatus';
import Modal from '../components/doctor/Modal';
import PatientDetailModal from '../components/doctor/PatientDetailModal';
import DoctorScheduleModal from '../components/doctor/DoctorScheduleModal';

const socket = io.connect('http://localhost:3001');

const Doctor = () => {
  const [treatmentPatientInfo, setTreatmentPatientInfo] = useState([{}]);
  const pastTreatmentList = useRef([{}]);
  const treatmentDate = useRef("");
  const [inPatientList, setInPatientList] = useState([{}]);
  const [value, onChange] = useState(new Date());
  const [visibleTreatmentDiv, setVisibleTreatmentDiv] = useState(false);
  const [visibleMedicineDiv, setVisibleMedicineDiv] = useState(false);
  const [visibleAdmissionDiv, setVisibleAdmissionDiv] = useState(false);
  const [detail, setDetail] = useState(false);
  const [schedule, setSchedule] = useState(false);
  const [medicineOrder, setMedicineOrder] = useState([]);
  const [diagnosisList, setDiagnosisList] = useState([{}]);
  const [medicineList, setMedicineList] = useState([{}]);
  const modalDate = useRef("");
  const diagnosis = useRef("");
  const treatmentMemo = useRef("");
  const treatmentOrder = useRef("");
  const admissionOrder = useRef("");
  const admissionCheck = useRef(0);
  const specialityId = 'N';//localStorage.getItem('specialityId') || '';
  const token = localStorage.getItem('jwt') || '';

  useEffect(() => {

    axios.get("http://localhost:9090/patient/pastTreatmentList", {params : {patientPk: treatmentPatientInfo[0].PATIENT_ID_PK || ''}})
      .then((res) => {
        pastTreatmentList.current = res.data
      });

    axios.get("http://localhost:9090/AdmissionFront/myInPatient")
      .then((res) => {
        setInPatientList(res.data)
    });

    axios.get("http://localhost:9090/treatmentOrder/getDiagnosisList", {
      headers : {'Authorization': token,}
    })
    .then((res) => {
      setDiagnosisList(res.data)
    })

  }, [token, treatmentPatientInfo]);

    /*-??????-*/
    const [room, setRoom] = useState("");

    useEffect(()=>{
      setRoom("out")
  
      if (room !== "") {
        // ??????????????? ???????????? ????????? ?????? join_room id??? ????????? ?????? ??????
        // 2?????? ????????? room??? ??????????????? ????????? data??????????????? ?????????
        socket.emit("join_room", room);
    }
    },[room])

  const getMedicineList = () => {
    axios.get("http://localhost:9090/treatmentOrder/getMedicineList", {params :{diagnosis: diagnosis.current}})
      .then((res) => {
        setMedicineList(res.data)
      })
  };

  const onCheckedElement = (checked, item) => {
    if (checked) {
      setMedicineOrder([...medicineOrder, item]);
    } else if (!checked) {
      setMedicineOrder(medicineOrder.filter(el => el !== item));
    }
  };


  const sendMedicalCharts = () => {

    if(diagnosis.current === '') {
      alert("????????? ??????????????????.");
    } else{

      const data = {
        diagnosis: diagnosis.current,
        treatmentMemo: treatmentMemo.current,
        treatmentOrder: treatmentOrder.current,
        admissionOrder: admissionOrder.current,
        admissionCheck: admissionCheck.current,
        medicineOrder: medicineOrder,
        receivePk: treatmentPatientInfo[0].RECEIVE_ID_PK,
        treatmentPk: treatmentPatientInfo[0].TREATMENT_NUM_PK
      }

      axios.post("http://localhost:9090/treatmentOrder/treatmentDone", JSON.stringify(data),
      {
        headers: {
          "Content-Type" : `application/json`,
        },
      })
      .then((res)=>{
        socket.emit("doctor_complete" , {outpatient : room,
                                      RECEIVE_ID_PK : data.receivePk,
                                      SPECIALITY_ID_FK : specialityId
                                      });
      //emit??? ?????????
        alert(res.data);
        window.location.reload();
      })
    }
  };
  
  return (
    <div className='doctor'>
      <main className='main'>
        <div className='top'>
          <EmpBar />
        </div>
        <div className='infoBox'>
          <span className='infoName'>?????? : </span><input className='nameInput' readOnly value={treatmentPatientInfo[0].PATIENT_NAME || ''}/>
          <span className='infoSsn'>?????????????????? : </span><input className='ssnInput' readOnly value={treatmentPatientInfo[0].PATIENT_SSN || ''}/>
          <div className='dropdown'>
            <a href='#!'className='btn'>????????????</a>
            <div className='dropdown-submenu'>
              <div className='dropdown-box'>
                <table className='dropdown-table'>
                  <thead>
                    <tr>
                      <th>?????? ??????</th>
                      <th>?????????</th>
                      <th>?????? ??? ?????? ??????</th>
                    </tr>
                  </thead>
                  {pastTreatmentList.current.map((data, index)=> (
                    <tbody key={index}>
                      <tr>
                        <td>{data.TREATMENT_DATE || ''}</td>
                        <td>{data.DIAGNOSIS || ''}</td>
                        <td><button 
                              onClick={() => {
                                treatmentDate.current = data.TREATMENT_DATE
                                setDetail(!detail)
                              }}
                            >????????????</button></td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
          {detail && (
            <Modal closeModal={() => setDetail(!detail)}>
              <PatientDetailModal 
                patientID = {treatmentPatientInfo[0].PATIENT_ID_PK}
                treatmentDate = {treatmentDate.current}
              />
            </Modal>
          )}
          <table className='infoTable'>
            <tbody>
              <tr>
                <th className='devide1'>S/A</th>
                <td className='devide1'>{treatmentPatientInfo[0].PATIENT_AGE || ''}/{treatmentPatientInfo[0].GENDER || ''}</td>
                <th className='devide1'>TEL</th>
                <td><input readOnly value={treatmentPatientInfo[0].PATIENT_TEL || ''}/></td>
                <th className='devide1'>?????????</th>
                <td><input readOnly value={treatmentPatientInfo[0].SPECIALITY || ''}/></td>
                <th className='devide1'>????????????</th>
                <td><input readOnly value={treatmentPatientInfo[0].INSURANCE_CHECK || ''}/></td>
                <th className='devide1'>????????????</th>
                <td><input readOnly value={treatmentPatientInfo[0].VISITCOUNT || ''}/></td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th colSpan={2}>??????</th>
                <td colSpan={10}><input readOnly value={treatmentPatientInfo[0].SYMPTOM || ''} /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='item2'>
          <div>
            <Calendar onChange={onChange} value={value}
            formatDay={(locale, value) => 
              value.toLocaleDateString("en", {day: "numeric"})
            }
            onClickDay={(value) => {
              modalDate.current = value.toDateString()
              setSchedule(!schedule)
            }}
            />
          </div>
          {schedule && (
            <Modal closeModal={() => setSchedule(!schedule)}>
              <DoctorScheduleModal modalDate={modalDate.current} />
            </Modal>
          )}
        </div>
        <div className='admissionBox'>
          <span className='admissionTitle'>?????? ??????</span>
          <div className='line'></div>
          <table className='admissionTb'>
            <thead>
              <tr>
                <th className='admissionTh'>????????????</th>
                <th className='admissionTh'>????????????</th>
                <th className='admissionTh'>S/A</th>
                <th className='admissionTh'>????????????</th>
                <th className='admissionTh'>?????? ??????</th>
                <th className='admissionTh'>??????</th>
              </tr>
            </thead>
            {inPatientList.map((data, index) => (
              <tbody key={index}>
                <tr>
                  <td className='admissionTd'>{data.PATIENT_ID_FK || ''}</td>
                  <td className='admissionTd'>{data.PATIENT_NAME || ''}</td>
                  <td className='admissionTd'>{data.GENDER || ''}/{data.PATIENT_AGE || ''}</td>
                  <td className='admissionTd'>{data.ADMISSION_DATE || ''}</td>
                  <td className='admissionTd'>{data.EMP_NAME || ''}</td>
                  <td className='admissionTd'>{data.ROOM_NUM || ''}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className='treatment-box'>
          <span className='box-title'>?????? ??????</span>
          <div className='line' />

            <form className='treatment-form'>

              <div className='divide1'>

                <div className='diagnosis-div'>
                  <span className='diagnosis-title'>??? &nbsp;&nbsp;&nbsp; ??? : </span>
                  <select 
                    className='diagnosis-select' 
                    name="diagnosis" 
                    onChange={(e) => {
                      diagnosis.current = e.target.value
                      getMedicineList()
                    }}>
                    <option name="diagnosisOption" value={""}>?????? ??????</option>
                    {diagnosisList.map((data, index) => (
                      <option key={index} value={data.DIAGNOSIS_CODE}>{data.DIAGNOSIS}</option>
                    ))}
                  </select>
                      <br />
                  <div className='order-div'>
                    <span>??? &nbsp;&nbsp;&nbsp; ??? : </span>
                    <input 
                      className='treatment-checkbox' 
                      type="checkbox" 
                      onClick={() => {
                        setVisibleTreatmentDiv(!visibleTreatmentDiv);
                      }}
                    /> <span>??????</span> 

                    <input 
                      className='admission-checkbox' 
                      type="checkbox" 
                      onChange={() => {
                        admissionCheck.current = 1;
                      }}
                      onClick={() => {
                        setVisibleAdmissionDiv(!visibleAdmissionDiv);
                      }}
                      /> <span>?????? ??????</span>

                    <input 
                      className='medicine-checkbox' 
                      type="checkbox" 
                      name='medicineCheckbox'
                      onClick={() => {
                        if(diagnosis.current === '') {
                          alert('????????? ??????????????????.')
                        } else {
                          setVisibleMedicineDiv(!visibleMedicineDiv);
                        }
                      }}
                    /> <span>???</span>
                  </div>
                </div>

                <div className='order-detail'>
                  {visibleTreatmentDiv && <div className='treatment-detail'>
                    <span>?????? ??????</span> <br /> 
                    <textarea 
                      onChange={(e) => {
                        treatmentOrder.current = e.target.value;
                      }}
                    />
                  </div>}
                  
                  {visibleAdmissionDiv && <div className='admission-detail'>
                    <span>?????? ??????</span> <br /> 
                    <textarea 
                      onChange={(e) => {
                        admissionOrder.current = e.target.value;
                      }}
                    />
                  </div>}

                  {visibleMedicineDiv && <div className='medicine-detail'>
                    <span>??? ??????</span> <br /> 
                    <div className='medicine-div'>
                      <table className='medicine-table'>
                          {medicineList.map((data, index) => (
                            <tbody key={index}>
                              <tr>
                                <th>{data.MEDICINE}</th>
                                <td>
                                  <input type={"checkbox"} value={data.MEDICINE || ''} onChange={(e) => onCheckedElement(e.target.checked, e.target.value)} />
                                </td>
                              </tr>
                            </tbody>
                          ))}
                      </table>
                    </div>
                  </div>}
                </div>

              </div>

              <div className='divide2'>

                <div className='memo-div'>

                  <span className='form-span'>?????? ??????</span> <br /><br /> 
                    <textarea 
                      onChange={(e) => {
                      treatmentMemo.current = e.target.value;
                      }}
                    />

                </div>

                <a 
                  href='#!' 
                  className='btn' 
                  onClick={() => {
                    sendMedicalCharts();
                  }}>??????</a>

              </div>

            </form>
        </div>
        <ReducedPatientStatus setTreatmentPatientInfo={setTreatmentPatientInfo}/>
      </main>
    </div>

  )
}

export default Doctor
