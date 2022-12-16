package com.douzone.HISservice.service;



import java.util.List;
import java.util.Map;

public interface AdmissionReqService {

    // 입원 오더 리스트
    List<Map<String, Object>> getAdmissionOrder();

    // 입원 승인
    int putAdmissionAccept (Map<String, Object> admissionElement);

    List<Map<String, Object>> getAdmissionDueList();

    void putAdmissionComplete(Map<String, Object> admissionId);
}
