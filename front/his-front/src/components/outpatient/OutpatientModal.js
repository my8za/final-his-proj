import React from 'react'
// style
import './outpatientModal.scss';

const OutpatientModal = ({ data }) => {
  return (
    <div className='detail-content'>
      <p className="record-title">진료 기록</p>
      <hr />
      <table>
        <tbody>
            <tr>
              <th>진료 의사</th>
              <td></td>
              <td><input readOnly value={data.EMP_NAME || ''} /></td>
              <th>병 명</th>
              <td><input readOnly value={data.DIAGNOSTIC_NAME || ''} /></td>
              <th>치료</th>
              <td><input readOnly value={data.TREATMENT_CHECK || ''} /></td>
              <th>입원</th>
              <td><input readOnly value={data.ADMISSION_CHECK || ''}/></td>
              <th>약 처방</th>
              <td><input readOnly value={data.PRESCRIPTION_CHECK || ''}/></td>
            </tr>
            <tr>
              <th>치료오더</th>
              <td colSpan={10}><input readOnly value={data.TREATMENT_ORDER || ''} /></td>
            </tr>
            <tr>
              <th>입원 오더</th>
              <td colSpan={10}><input readOnly value={data.ADMISSION_DUEDATE || ''} /></td>
            </tr>
            <tr>
              <th>약 처방</th>
              <td colSpan={10}><input readOnly value={data.PRESCRIPTION || ''} /></td>
            </tr>
            <tr className="memo-tr">
              <th>진료 메모</th>
              <td colSpan={10}><input readOnly value={data.TREATMENT_MEMO || ''} /></td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default OutpatientModal
