package com.douzone.HISservice.service;


import com.douzone.HISservice.repository.AdmissionHandlePageDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdmissionHandlePageServiceImpl implements  AdmissionHandlePageService{

    private final AdmissionHandlePageDAO admissionHandlePageDAO;

// 간호기록

    // 특정 환자 간호기록 READ
    @Override
    public List<Map<String, Object>>  getCareInfos (Map<String, Object> careInfosElements){

        return admissionHandlePageDAO.getCareInfos(careInfosElements);
    }

    // 특정 환자 간호기록 CREATE
    @Override
    public void setCareInfo (Map<String, Object> careInfoElements){
        admissionHandlePageDAO.setCareInfo(careInfoElements);
    }
    // 특정 환자 간호기록 UPADTE
    @Override
    public void changeCareInfo (Map<String, Object> upDateCareInfoElements){
        admissionHandlePageDAO.changeCareInfo(upDateCareInfoElements);
    };

// 처방기록

    //특정 환자별 처방기록 READ
    @Override
    public List<Map<String, Object>>  getMediRecords (Map<String, Object> mediRecordsElements){
        return admissionHandlePageDAO.getMediRecords(mediRecordsElements);
    }

    //특정 환자별 처방기록 CREATE
    @Override
    public void setMediRecord (Map<String, Object> mediRecordElements){
        admissionHandlePageDAO.setMediRecord(mediRecordElements);
    }

    // 특정 환자별 처방기록 UPDATE
    @Override
    public void changeMediRecord (Map<String, Object> upDateMediRecordElements){
        admissionHandlePageDAO.changeMediRecord(upDateMediRecordElements);
    };

    // 복약 체크 시 상태 업데이트 UPDATE
    @Override
    public void changeTakeMediStatus (Map<String, Object> upDateTakeMediStatusElements){
        admissionHandlePageDAO.changeTakeMediStatus(upDateTakeMediStatusElements);
    };

// 환자 일정

    // 해당 병동 전체 환자 일정 READ
    @Override
    public List<Map<String, Object>>  getInpatientSchedules (Map<String, Object> inpatientSchedulesElements){
        LocalDate now = LocalDate.now();
        if(inpatientSchedulesElements.get("searchDate") == null) {
            inpatientSchedulesElements.put("searchDate", now);
        }
        return admissionHandlePageDAO.getInpatientSchedules(inpatientSchedulesElements);
    }
    // 해당 병동 전체 환자 일정 CREATE
    @Override
    public void setInpatientSchedule (Map<String, Object> inpatientScheduleElements){
         admissionHandlePageDAO.setInpatientSchedule(inpatientScheduleElements);
    }

    // 해당 병동 전체 환자 일정 UPDATE
    @Override
    public void changeSchedule (Map<String, Object> upDateScheduleElements){
        admissionHandlePageDAO.changeSchedule(upDateScheduleElements);
    };

    // 해당 병동 전체 환자 일정 상태 UPDATE
    @Override
    public void changeScheduleStatus (Map<String, Object> upDateScheduleStatusElements){
        admissionHandlePageDAO.changeScheduleStatus(upDateScheduleStatusElements);
    };

// 인계 사항

    // 나에게 전달 된 인계사항 READ
    @Override
    public List<Map<String, Object>>  getReceiveHandOver (Map<String, Object> userName){
        return admissionHandlePageDAO.getReceiveHandOver(userName);
    };

    // 내가 작성한 인계사항 READ
    @Override
    public List<Map<String, Object>>  getSendHandOver (Map<String, Object> userName){
        return admissionHandlePageDAO.getSendHandOver(userName);
    };
    @Override
    public List<Map<String, Object>> getInNurseList(){
        return admissionHandlePageDAO.getInNurseList();
    };



    // 인계 사항 CREATE
    @Override
    public void setHandOver (Map<String, Object> handOverElements){
        admissionHandlePageDAO.setHandOver(handOverElements);
    };

    // 내가 작성한 인계사항 UPDATE
    @Override
    public void changeHandover (Map<String, Object> upDateHandOverElements){
        admissionHandlePageDAO.changeHandover(upDateHandOverElements);
    };

// 환자 호출

    // 로딩 시 호출 현황 READ
    @Override
    public List<Map<String, Object>>  getInPatientReq (Map<String, Object> inPatientReqElements){
        return admissionHandlePageDAO.getInPatientReq(inPatientReqElements);
    };


    // 환자, 간호사 소켓 요청 시 UPDATE
    @Override
    public  void changeInPatientReq (Map<String, Object> sendPatientReqElements) {
        admissionHandlePageDAO.changeInPatientReq(sendPatientReqElements);
    };

}
