import React from 'react'
import { useSelector } from 'react-redux';
// style
import './inpatientDetail.scss';

const InpatientDetail = () => {

  const inpatientDetail = useSelector(state=>{
    return state.inPatientInfo.value[5]
  })
  return (
    <div className='inpatient-detail'>
      <table>
        <tbody>
          <tr>
            <th className='devide1'>환자명</th>
            <td >{(inpatientDetail != null) ? inpatientDetail.PATIENT_NAME : "   "}</td>
            <th children='devide2'>성별</th>
            <td>{(inpatientDetail != null) ?  inpatientDetail.GENDER : "   "}</td>
            <th className='devide3'>환자 전화 번호</th>
            <td className='devide4'>{(inpatientDetail != null) ?  inpatientDetail.PATIENT_TEL : "   "}</td>           
          </tr>
          <tr>
            <th className='devide1'>보호자명</th>
            <td>{(inpatientDetail != null) ?  inpatientDetail.PROTECTOR_NAME : "   "}</td>
            <th children='devide2'>보호자 연락처</th>
            <td>{(inpatientDetail != null) ?  inpatientDetail.PROTECTOR_TEL : "  "}</td>
            <th className='devide3'>환자 주소</th>
            <td className='devide4'>{(inpatientDetail != null) ?  inpatientDetail.PATIENT_ADDR : "  "}</td>           
          </tr>
          <tr>
            <th className='devide1'>담당의</th>
            <td>{(inpatientDetail != null) ?  inpatientDetail.EMP_NAME : "  "}</td>
            <th children='devide2'>진료과</th>
            <td>{(inpatientDetail != null) ? inpatientDetail.SPECIALITY_NAME: "  "}</td>
            <th className='devide3'>진단명</th>
            <td className='devide4'>{(inpatientDetail != null) ?  inpatientDetail.DIAGNOSIS : "  "}</td>           
          </tr>
        </tbody>
      </table>
     
    </div>
  )
}

export default InpatientDetail
