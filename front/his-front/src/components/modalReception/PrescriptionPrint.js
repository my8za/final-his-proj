import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
// style
import './prescriptionPrint.scss';

const PrescriptionPrint = ({prescriptionData, setPrescriptionPrint}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'prescription',
    onAfterPrint: ()=> setPrescriptionPrint(false)
  });
  
  return (
      <div>
        <div className="prescription-wrapper" ref={componentRef}>
          <div className="prescription-content">
            <p className='insurance-target'>( 건강보험 ) 피보험자: <span>{prescriptionData.PATIENT_NAME}</span> </p>
            <table>
              <tbody>
                <tr><th colSpan={10} className="prescription-title">처방전</th></tr>
                <tr className="align-box">
                  <th colSpan={2} className="align1 thick">교부번호</th><td colSpan={2}>Ipsum</td>
                  <th rowSpan={3} className="text-mode thick">의료기관</th>
                  <th colSpan={2} className="align1 thick">명 &nbsp;&nbsp; 칭</th><td colSpan={3} className="align2">부산 더존 병원</td>
                </tr>
                <tr className="align-box">
                  <th rowSpan={2} className="text-mode thick">환 자</th>
                  <th className="align3 thick">성 명</th><td colSpan={2}>{prescriptionData.PATIENT_NAME}<br/>({prescriptionData.PATIENT_ID_PK})</td>
                  <th colSpan={2} className="align1 thick">대표전화</th><td colSpan={3} className="align2">(051)-000-0000</td>
                </tr>
                <tr className="align-box">
                  <th className="align3 thick">주민등록번호</th><td colSpan={2}>{prescriptionData.PATIENT_SSN}</td>
                  <th colSpan={2} className="align1 thick">팩스번호</th><td colSpan={3} className="align2">(051)-000-0000</td>
                </tr>
                <tr className="align-box">
                  <th rowSpan={2} className="thick">질병</th><td className='thick' rowSpan={2}>질병 코드</td>
                  <th rowSpan={2}>{prescriptionData.DIAGNOSIS_CODE}</th><td className='thick' colSpan={2} rowSpan={2}>의<br/>사</td>
                  <th className="align1 thick">담당의</th><td colSpan={3}>{prescriptionData.EMP_NAME}</td>
                </tr>
                <tr className="align-box"><th className="align1 thick">의사번호</th><td colSpan={3}>{prescriptionData.EMP_ID_PK}</td></tr>

                <tr className="align-box"><th colSpan={10}>* 환자의 요구가 있는 때에는 질병분류기호를 기재하지 아니합니다.</th></tr>
                <tr className="align-box">
                  <th className="thick" colSpan={4}>처방 의약품</th><th className="thick" colSpan={2}>1회<br/>투약량</th><th className="thick" colSpan={4}>용법</th>
                </tr>
                <tr>
                  <td colSpan={4} className='align-top'>
                    <p>{prescriptionData.MEDICINE}</p>
                  </td>
                  <td colSpan={2}  className='align-top'>
                  {prescriptionData.MEDICINE!==null&&prescriptionData.MEDICINE!==undefined?prescriptionData.MEDICINE.split('\n').map((data,index) => {
                    return <p key={index}>1</p>
                  }):''}
                  </td>
                  <td colSpan={4}  className='align-top'>
                  {prescriptionData.MEDICINE!==null&&prescriptionData.MEDICINE!==undefined?prescriptionData.MEDICINE.split('\n').map((data,index) => {
                    return <p key={index}>식후 30분 복용</p>
                  }):''}
                  </td>
                </tr>
                <tr className="align-box">
                  <th className='thick' colSpan={2}>사용기간</th><th className='thick' colSpan={2}>사용일({prescriptionData.TREATMENT_DATE})<br/>로 부터 3일간</th><th className='thick' colSpan={6}>사용기간내에 약국에 제출하여야 합니다.</th>
                </tr>
                <tr className="align-box"><th colSpan={10}>의 약 품 조 제 내 역</th></tr>
                <tr className="align-box"><th rowSpan={4}  className="text-mode">조제내역</th><th>조제기관명</th><td colSpan={3}></td><th colSpan={3} rowSpan={2}>처방약 변경, 수정, 확인,<br/> 대체 시 그 내용 등</th></tr>
                <tr className="align-box"><th>조제약사</th><td colSpan={3}></td></tr>
                <tr className="align-box"><th>조제량</th><td colSpan={3}></td></tr>
                <tr className="align-box"><th>조제년월일</th><td colSpan={3}></td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <button className='print-btn' onClick={handlePrint}>처방전 출력</button>
      </div>
  )
}

export default PrescriptionPrint;
