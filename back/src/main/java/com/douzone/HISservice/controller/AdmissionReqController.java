package com.douzone.HISservice.controller;

import com.douzone.HISservice.service.AdmissionReqService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admissionReq")
@RequiredArgsConstructor
public class AdmissionReqController {

    private final AdmissionReqService admissionReqService;


    // 입원 오더 리스트
    @PostMapping("/admissionOrder")
    public List<Map<String, Object>> getAdmissionOrder() {

        return (admissionReqService.getAdmissionOrder());
    }

    // 입원 승인 , 반려
    @PostMapping("/admissionAccept")
    public int putAdmissionAccept(@RequestBody Map<String, Object> admissionElement) {
        System.out.println(admissionElement);
        int a = admissionReqService.putAdmissionAccept(admissionElement);
        System.out.println("성공여부 : " + a);
        return a;
    }

    // 입원 예정 리스트
    @GetMapping("/admissionDueList")
    public List<Map<String, Object>> getAdmissionDueList() {
        System.out.println("dkdkkdkdkdkdkd : "+admissionReqService.getAdmissionDueList());
        return (admissionReqService.getAdmissionDueList());
    }

    // 입원 완료
    @PutMapping("/admissionComplete")
    public String putAdmissionComplete(@RequestBody Map<String, Object> admissionId) {
        admissionReqService.putAdmissionComplete(admissionId);
        return "success";
    }


}
