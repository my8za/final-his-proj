package com.douzone.HISservice.service;



import java.util.List;
import java.util.Map;

public interface PatientInfoService {

    // 특정 환자 입원 정보 READ
    public Map<String, Object> getPatientInfo (Map<String, Object> outInfoElement);

    // 환자 등록 정보 READ
    public Map<String, Object>  getPatientRegistrationInfo (Map<String, Object> regInfoElement);

    // 환자 등록 정보 INSERT
    public int insertPatientInfo(Map<String, Object> params);

    // 특정 환자 퇴원예정일 UPDATE
    public void changeDischargeDueDate (Map<String, Object> newDischargeDate);

    List<Map<String, Object>> getPastTreatmentList(String patientPk);

    List<Map<String, Object>> getPastTreatmentDetail(String patientID, String treatmentDate);

    List<Map<String, Object>> getTreatmentHistoryDetail(String patientID, String treatmentDate, String regTime);

    List<Map<String, Object>> getTreatmentPatientInfo(String receivePk);
}
