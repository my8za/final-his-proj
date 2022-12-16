package com.douzone.HISservice.service;



import java.util.List;
import java.util.Map;

public interface AdmissionHandlePageService {

//간호기록

    // 특정 환자 간호기록 READ
    public List<Map<String, Object>>  getCareInfos (Map<String, Object> careInfosElements);

    // 특정 환자 간호기록 CREATE
    public void setCareInfo (Map<String, Object> careInfoElements);

    // 특정 환자 간호기록 UPADTE
    public void changeCareInfo (Map<String, Object> upDateCareInfoElements);

// 처방기록

    //특정 환자별 처방기록 READ
    public List<Map<String, Object>>  getMediRecords (Map<String, Object> mediRecordsElements);

    //특정 환자별 처방기록 CREATE
    public void setMediRecord (Map<String, Object> mediRecordElements);

    // 특정 환자별 처방기록 UPDATE
    public void changeMediRecord (Map<String, Object> upDateMediRecordElements);

    // 복약 체크 시 상태 업데이트 UPDATE
    public void changeTakeMediStatus (Map<String, Object> upDateTakeMediStatusElements);

// 환자 일정

    // 해당 병동 전체 환자 일정 READ
    public List<Map<String, Object>>  getInpatientSchedules (Map<String, Object> inpatientSchedulesElements);

    // 해당 병동 전체 환자 일정 CREATE
    public void setInpatientSchedule (Map<String, Object> inpatientScheduleElements);

    // 해당 병동 전체 환자 일정 UPDATE
    public void changeSchedule (Map<String, Object> upDateScheduleElements);

    // 해당 병동 전체 환자 일정 상태 UPDATE
    public void changeScheduleStatus (Map<String, Object> upDateScheduleStatusElements);

// 인계 사항

    // 나에게 전달 된 인계사항 READ
    public List<Map<String, Object>>  getReceiveHandOver (Map<String, Object> userName);

    // 내가 작성한 인계사항 READ
    public List<Map<String, Object>>  getSendHandOver (Map<String, Object> userName);

    //인계 사항 작성 하기 위한 직원 검색
    public List<Map<String, Object>>  getInNurseList();

    // 인계 사항 CREATE
    public void setHandOver (Map<String, Object> handOverElements);

    // 내가 작성한 인계사항 UPDATE

    public void changeHandover (Map<String, Object> upDateHandOverElements);

    // 로딩 시 호출 현황 READ
    public List<Map<String, Object>>  getInPatientReq (Map<String, Object> inPatientReqElements);


    // 환자, 간호사 소켓 요청 시 UPDATE
    public  void changeInPatientReq (Map<String, Object> sendPatientReqElements);


}
