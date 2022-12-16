package com.douzone.HISservice.controller;

import com.douzone.HISservice.config.auth.PrincipalDetails;
import com.douzone.HISservice.entity.User;
import com.douzone.HISservice.service.ReceiptService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/AdmissionReceipt")
@RequiredArgsConstructor
public class ReceiptController {
    private final ReceiptService receiptService;

    @PostMapping("/AdReceiptList")
    public List<Map<String, Object>> getAdReceiptList(@RequestBody Map<String, Object> filterFlag) {
        System.out.println("9999999"+filterFlag);
        System.out.println("9999999"+receiptService.getAdReceiptList(filterFlag));
        return(receiptService.getAdReceiptList(filterFlag));
    }

    @PutMapping("/changeStateList")
    public void getChangeStateList() {
        receiptService.getChangeStateList();
    }



    //입원수납정보
    @PostMapping("/AdReceipt")
    public List<Map<String, Object>> getAdReceipt(@RequestBody Map<String, Object> test) {
        System.out.println("터지는 부분 : " + test);
        try {
            if(test.get("ADMISSION_ID_PK") != null && test.get("ADMISSION_ID_PK") != "") {
                String admissionId = test.get("ADMISSION_ID_PK").toString();
                System.out.println("터지는 부분2 : " + admissionId);
                return (receiptService.getAdReceipt(admissionId));
            }
        } catch (NullPointerException e) {
            e.printStackTrace();
        }
        return null;

    }


    //입원환자 수납완료
    @PostMapping("/AdReceiptComplete")
    public void setAdReceipt(@RequestBody Map<String, Object> test) {

        receiptService.setAdReceipt(test);
//        return(receiptService.setAdReceipt(test));

    }


}
