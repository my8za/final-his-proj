package com.douzone.HISservice.controller;

import com.douzone.HISservice.service.AdmissionFrontPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/AdmissionFront")
@RequiredArgsConstructor
public class AdmissionFrontPageController {

    private final AdmissionFrontPageService adFrontService;

    // 병동 원무 병상 정보
    @GetMapping("/bedInfo")
    public List<Map<String, Object>> getBedInfo() {

        return(adFrontService.getBedInfo());

    }

    @GetMapping("/dischargelist")
    public List<Map<String, Object>> getDisChargeList() {

        return(adFrontService.getDisChargeList());

    }

    @PutMapping("/discharged")
    public void putDisCharged(@RequestBody Map<String, Object> admissionId) {
        adFrontService.putDisCharged(admissionId);

    }

    // 내 입원환자 정보
    @GetMapping("/myInPatient")
    public List<Map<String, Object>> getMyInPatient() {

        return adFrontService.getMyInPatient();

    }

    @GetMapping("/available_room")
    public List<Map<String, Object>> getAvailable() {
        System.out.println("구구구구구구 : " +adFrontService.getAvailable());
        return adFrontService.getAvailable();

    }



}
