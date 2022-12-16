import React from "react";
import './emergencyModal.scss';
function EmergencyModal({setShowEmergency, showWardRoom}) {
 
function closeModal() {
    setShowEmergency(false)
  }
 
  return (
    <div className="Modal-wapper" onClick={closeModal}>
        <div className="modal-Body" onClick={(e) => e.stopPropagation()}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">응급상황</div>
                    <div className="modal-body">
                        <div className="modal-code">CODE 0</div>
                        <div className="modal-message">{showWardRoom}호 응급상황 발생</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
 
export default EmergencyModal;