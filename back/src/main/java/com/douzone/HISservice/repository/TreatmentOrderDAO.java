package com.douzone.HISservice.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface TreatmentOrderDAO {

    void setMedicalCharts(Map<String, Object> data);

    void setAdmissionDueDate(Map<String, Object> data);

    void setPatientStatus(String receivePk, String patientStatus);

    List<Map<String, Object>> getDiagnosisList(String specialityId);

    List<Map<String, Object>> getMedicineList(String diagnosis);

    void setOutpatientStatus(Map<String, Object> data);
}
