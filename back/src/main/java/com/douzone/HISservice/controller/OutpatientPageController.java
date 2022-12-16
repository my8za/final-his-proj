package com.douzone.HISservice.controller;

import com.douzone.HISservice.service.OutpatientPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/outpatient")
@RequiredArgsConstructor
public class OutpatientPageController {

    private final OutpatientPageService outpatientPageService;
    // 진료메모 / 치료오더 SELECT
    @PostMapping ("/treatmentInfos")
    public Map<String, Object> getTreatmentInfos(@RequestBody Map<String, Object> treatmentInfosElements) {
        return (outpatientPageService.getTreatmentInfos(treatmentInfosElements));
    }

    // 대기 환자 진찰로 상태 변경시 TREATMENT_INFO_TB INSERT
    @PostMapping ("/addPatientStatusInfo")
    public void addPatientStatusInfo(@RequestBody Map<String, Object> patientStatusInfoElements) {
        outpatientPageService.addPatientStatusInfo(patientStatusInfoElements);
    }
}
