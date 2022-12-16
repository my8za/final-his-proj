package com.douzone.HISservice.controller;

import com.douzone.HISservice.service.OutStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/outStatus")
@RequiredArgsConstructor
public class OutStatusController {

    private final OutStatusService outStatusService;

    // 접수 INSERT
    @PostMapping("/receipt")
    @ResponseBody
    public Map<String, Object> insertReceiveInfo(@RequestBody Map<String, Object> params) {
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("1", outStatusService.insertReceiveInfo(params));
        return response;
    }


    // 과 별 의사 리스트 SELECT
    @PostMapping("/doctorList")
    public List<Map<String, Object>> getDoctorList(@RequestBody Map<String, Object> params) {
        return outStatusService.getDoctorList(params);
    }


    // 과 별 의사 리스트와 해당 의사들의 환자 현황 SELECT
    @PostMapping("/getdocpat")
    public Object getDocPat(@RequestBody Map<String, Object> speciality) {
        List<Map<String, Object>> paramsList = outStatusService.getDoctorList(speciality);
        for(int i=0; i<paramsList.size(); i++) {
            paramsList.get(i).put("patInfo", outStatusService.getOutStatus(paramsList.get(i)));
        }
        System.out.println("오오옹 : "+paramsList);
        return paramsList;
    }



    @PostMapping("/putChangeState")
    public Object putChangeState(@RequestBody Map<String, Object> speciality) {

        outStatusService.putChangeState(speciality);
        List<Map<String, Object>> paramsList = outStatusService.getDoctorList(speciality);
        for(int i=0; i<paramsList.size(); i++) {
            paramsList.get(i).put("patInfo", outStatusService.getOutStatus(paramsList.get(i)));
        }
        System.out.println("하하핳 : "+paramsList);
        return paramsList;
    }


    // 의사 개인 환자 현황 리스트
    @GetMapping("/MyPatient")
    public List<Map<String, Object>> getMyPatient(@RequestParam String doctorID) {
        System.out.println("의사아이디 : "+doctorID);
        return outStatusService.getMyPatient(doctorID);
    }

    @PostMapping("/getdocpatCon")
    public Object getDocPatCon(@RequestBody Map<String, Object> params) {
        System.out.println("민욱련 : "+ params);

        List<Map<String, Object>> paramsList = outStatusService.getDoctorList(params);

        for(int i=0; i<paramsList.size(); i++) {
            if(params.get("OUTPATIENT_STATUS_CODE") == null) {
                paramsList.get(i).put("patInfo", outStatusService.getOutStatus(paramsList.get(i)));
            } else {
                paramsList.get(i).put("patInfo", outStatusService.getOutStatusCon(paramsList.get(i)));
            }
        }
        return paramsList;
    }


    // 수납 대기 환자 SELECT
    @GetMapping("/getwaiting4receipt")
    public List<Map<String, Object>> getWaiting4Receipt(@RequestParam Map<String, Object> params) {
        return outStatusService.getWaiting4Receipt(params);
    }


    // 수납 SELECT
    @PostMapping("/getAcceptance")
    public List<Map<String, Object>> getAcceptance(@RequestBody Map<String, Object> params) {
        return outStatusService.getAcceptance(params);
    }


    // 수납 금액 INSERT
    @PostMapping("/insertReceipt")
    public void insertReceipt(@RequestBody Map<String, Object> params) {
        outStatusService.insertReceipt(params);
    }


    // 외래 환자 처방전
    @PostMapping("/getPrescription")
    public List<Map<String, Object>> getPrescription(@RequestBody Map<String, Object> treatmentNumPk) {
        return outStatusService.getPrescription(treatmentNumPk);
    }
}
