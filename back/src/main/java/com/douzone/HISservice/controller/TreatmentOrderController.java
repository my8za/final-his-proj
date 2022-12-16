package com.douzone.HISservice.controller;

import com.douzone.HISservice.config.auth.PrincipalDetails;
import com.douzone.HISservice.service.AdmissionFrontPageService;
import com.douzone.HISservice.service.TreatmentOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/treatmentOrder")
@RequiredArgsConstructor
public class TreatmentOrderController {

    private final TreatmentOrderService treatmentOrderService;

    @GetMapping("/getDiagnosisList")
    public List<Map<String, Object>> getDiagnosisList(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String specialityId = principal.getUser().getSpeciality_ID_FK();
        return treatmentOrderService.getDiagnosisList(specialityId);
    }

    @GetMapping("/getMedicineList")
    public List<Map<String, Object>> getMedicineList(@RequestParam String diagnosis) {
        return treatmentOrderService.getMedicineList(diagnosis);
    }

    @PostMapping("/treatmentDone")
    public String setMedicalCharts(@RequestBody Map<String, Object> data){
        treatmentOrderService.setMedicalCharts(data);
        return "진료 완료!";
    }
}
