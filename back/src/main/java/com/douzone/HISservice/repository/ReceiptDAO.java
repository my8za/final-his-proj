package com.douzone.HISservice.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;


import java.util.*;

@Mapper
@Repository
public interface ReceiptDAO {
    // 퇴원예정일
    List<Map<String, Object>> getChangeStateList();
    void putChangeState(Map<String, Object> a);

    List<Map<String, Object>> getChangeMiddleList();
    void putChangeMiddle(Map<String, Object> a);

    List<Map<String, Object>> getAdReceiptListToday();
    List<Map<String, Object>> getMiddlePaymentList();
    List<Map<String, Object>> getAdReceiptListAll();

    List<Map<String, Object>> getAdReceipt(String admissionId);

    void putReceiptComplete(Map<String, Object> test);

    void setAdReceipt(Map<String, Object> test);



}
