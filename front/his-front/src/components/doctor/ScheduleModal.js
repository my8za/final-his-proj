import React from "react";
 
import '../../components/doctor/ScheduleModal.scss';

function AddScheduleModal(props) {
 
function closeModal() {
    props.closeModal();
  }
 
  return (
    <div className="ScheduleModal" onClick={closeModal}>
      <div className="ScheduleModalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        {props.children}
      </div>
    </div>
  );
}
 
export default AddScheduleModal;