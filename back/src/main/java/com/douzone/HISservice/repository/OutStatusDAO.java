package com.douzone.HISservice.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface OutStatusDAO {

    // 환자 현황 전체 SELECT
    List<Map<String, Object>> getOutStatus (Map<String, Object> outStatusElement);


    // 환자 현황 필터 SELECT
    List<Map<String, Object>> getOutStatusCon (Map<String, Object> outStatusElement);



    // 접수 INSERT
    int insertReceiveInfo(Map<String, Object> params);

    // 최근접수번호 id(R22~~) SELECT
    String getRecentSeq(String currYr);


    // 과 별 의사 리스트와 해당 의사들의 환자 현황 SELECT
    List<Map<String, Object>> getDoctorList (Map<String, Object> params);

    // 의사 개인 환자 현황 리스트
    List<Map<String, Object>> getMyPatient(String doctorID);


    // 수납 대기 환자 SELECT
    List<Map<String, Object>> getWaiting4Receipt (Map<String, Object> params);

    // 수납 SELECT
    List<Map<String, Object>> getAcceptance (Map<String, Object> params);

    // 수납 금액 INSERT
    void insertReceipt(Map<String, Object> params);


    // 수납 후 환자 상태 UPDATE
    void putOutStatus(Map<String, Object> params);

    void putChangeState(Map<String, Object> speciality);

    List<Map<String, Object>> getPrescription(Map<String, Object> treatmentNumPk);
}

