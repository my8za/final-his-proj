package com.douzone.HISservice.repository;


import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface PatientInfoDAO {

    // 특정 환자 입원 정보 READ
    Map<String, Object> getPatientInfo (Map<String, Object> outInfoElement);

    // 환자 등록 정보 READ
    Map<String, Object> getPatientRegistrationInfo (Map<String, Object> outInfoElement);

    List<HashMap<String, Object>> getTreatmentInfo (Map<String, Object> params);


    // 환자 등록 INSERT
    String getRecentPK (String currYrMnth);

    int insertPatientInfo(Map<String, Object> params);


    // 특정 환자 퇴원예정일 UPDATE
    void changeDischargeDueDate (Map<String, Object> newDischargeDate);

    List<Map<String, Object>> getPastTreatmentList(String patientPk);

    List<Map<String, Object>> getPastTreatmentDetail(String patientID, String treatmentDate);

    List<Map<String, Object>> getTreatmentHistoryDetail(String patientID, String treatmentDate, String regTime);

    List<Map<String, Object>> getTreatmentPatientInfo(String receivePk);

}
