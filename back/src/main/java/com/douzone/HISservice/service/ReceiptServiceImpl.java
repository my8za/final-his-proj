package com.douzone.HISservice.service;

import com.douzone.HISservice.repository.ReceiptDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReceiptServiceImpl implements ReceiptService{
    private final ReceiptDAO receiptDAO;

    @Override
    public List<Map<String, Object>> getAdReceiptList(Map<String, Object> filterFlag) {
        String flag = filterFlag.get("filter").toString();
        System.out.println("여기까지왔다");
        System.out.println(flag);
        if(flag.equals("[today]")) {
            System.out.println("fffff");
            return receiptDAO.getAdReceiptListToday();
        }else if(flag.equals("[middlePayment]")){
            System.out.println("qqqqqq");
            return receiptDAO.getMiddlePaymentList();
        }else{
            System.out.println("pppppp");
            System.out.println("lsitCount : "+receiptDAO.getAdReceiptListAll().size());
            return receiptDAO.getAdReceiptListAll();
        }
    }


    @Override
    public void getChangeStateList() {
        List<Map<String, Object>> chageKeyList = receiptDAO.getChangeStateList();
        System.out.println(chageKeyList.size());
        for(Map<String, Object> a : chageKeyList){
            receiptDAO.putChangeState(a);
            System.out.println(a);
        }
//        List<Map<String, Object>> chageMiddleList = receiptDAO.getChangeMiddleList();
//        System.out.println(chageMiddleList.size());
//        for(Map<String, Object> a : chageMiddleList){
//            receiptDAO.putChangeMiddle(a);
//            System.out.println(a);
//        }
    }


    @Override
    public List<Map<String, Object>> getAdReceipt(String admissionId) {
        System.out.println("qwerAll : "+receiptDAO.getAdReceipt(admissionId));
        return receiptDAO.getAdReceipt(admissionId);
    }

    @Override
    public void setAdReceipt(Map<String, Object> test) {
        receiptDAO.putReceiptComplete(test); //상태값 변경
        System.out.println("update완료");
        receiptDAO.setAdReceipt(test); // 입원수납정보
        System.out.println("insert완료");
    }
}
