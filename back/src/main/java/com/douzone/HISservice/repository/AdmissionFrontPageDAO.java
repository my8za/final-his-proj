package com.douzone.HISservice.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface AdmissionFrontPageDAO {

    Map<String, Object> getBedInfo();

    List<Map<String, Object>> getDisChargeList();

    void putDisCharged(Map<String, Object> admissionId);

    List<Map<String, Object>> getMyInPatient();

    void putChangeBedState(Map<String, Object> admissionId);

    Map<String, Object> getDisChargeCount();

    List<Map<String, Object>> getAvailable();
}
