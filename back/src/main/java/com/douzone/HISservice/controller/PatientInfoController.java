package com.douzone.HISservice.controller;


import com.douzone.HISservice.service.PatientInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/patient")
@RequiredArgsConstructor
public class PatientInfoController {

    private final PatientInfoService patientInfoService;

    // 특정 환자 입원 정보 READ
    @PostMapping("/outInfo")
    public Map<String, Object> getInpatientInfo(@RequestBody Map<String, Object> outInfoElement) {
        System.out.println(outInfoElement);
        System.out.println(
                patientInfoService.getPatientInfo(outInfoElement)
        );
        return (patientInfoService.getPatientInfo(outInfoElement));
    }

    // 환자 등록 정보 READ
    @PostMapping("/regInfo")
    public Map<String, Object> getPatientRegistrationInfo(@RequestBody Map<String, Object> regInfoElement) {
        System.out.println(regInfoElement);
        return (patientInfoService.getPatientRegistrationInfo(regInfoElement));
    }


    // 환자 등록 INSERT
    @PostMapping("/insert")
    public int insertPatientInfo (@RequestBody Map<String, Object> params){
        return patientInfoService.insertPatientInfo(params);
    }

    // 특정 환자 퇴원예정일 UPDATE
    @PutMapping("/dischargeDueDate")
    public Map<String, Object>changeDischargeDueDate (@RequestBody Map<String, Object> newDischargeDate){

        patientInfoService.changeDischargeDueDate(newDischargeDate);
        return (patientInfoService.getPatientInfo(newDischargeDate));
    }

    // 진료중 상태의 환자 클릭시 정보 조회
    @GetMapping("/treatmentPatientInfo")
    public List<Map<String, Object>> getTreatmentPatientInfo(@RequestParam String receivePk) {
        return patientInfoService.getTreatmentPatientInfo(receivePk);
    }

    // 진료환자 과거 병력 리스트 조회
    @GetMapping("/pastTreatmentList")
    public List<Map<String, Object>> getPastTreatmentList(@RequestParam String patientPk) {
        return patientInfoService.getPastTreatmentList(patientPk);
    }

    // 진료환자 과거 병력 상세 조회
    @GetMapping("/pastTreatmentDetail")
    public List<Map<String, Object>> getPastTreatmentDetail(@RequestParam String patientID, @RequestParam String treatmentDate) {
        return patientInfoService.getPastTreatmentDetail(patientID, treatmentDate);

    }

    // 진료환자 과겨 병력 상세 조회 - regTime 추가
    @GetMapping("/getTreatmentHistoryDetail")
    public List<Map<String, Object>> getTreatmentHistoryDetail(@RequestParam String patientID, @RequestParam String treatmentDate, @RequestParam String regTime) {
        System.out.println("====================================================================="+patientID);

        System.out.println(patientInfoService.getTreatmentHistoryDetail(patientID, treatmentDate, regTime));
        return patientInfoService.getTreatmentHistoryDetail(patientID, treatmentDate, regTime);

    }

}
