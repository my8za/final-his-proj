package com.douzone.HISservice.service;


import com.douzone.HISservice.repository.PatientInfoDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PatientInfoServiceImpl implements PatientInfoService {
    private final PatientInfoDAO patientInfoDAO;

    // 특정 환자 입원 정보 READ
    @Override
    public Map<String, Object> getPatientInfo (Map<String, Object> outInfoElement){
        return patientInfoDAO.getPatientInfo(outInfoElement);
    }

    // 환자 등록 정보 READ
    @Override
    public Map<String, Object> getPatientRegistrationInfo (Map<String, Object> regInfoElement){
        Map<String, Object> patientInfo = patientInfoDAO.getPatientRegistrationInfo(regInfoElement);

        if(patientInfo == null || patientInfo.size() == 0) {
            return null;
        }
        else {
            patientInfo.put("treatmentInfo",patientInfoDAO.getTreatmentInfo(patientInfo));
        }
        return patientInfo;
    }


    // 환자 등록 INSERT
    @Override
    public int insertPatientInfo(Map<String, Object> params){
        System.out.println(params);
        LocalDate now = LocalDate.now();
        String currYrMnth = String.valueOf(now.getYear()).substring(2) + now.getMonthValue();
        System.out.println("currYrMnth : " + currYrMnth);
        String curPatientId = patientInfoDAO.getRecentPK(currYrMnth);
        System.out.println("curPatientId : " + curPatientId);

        if(curPatientId == null) {
            curPatientId = currYrMnth + "0001";
        } else {
            curPatientId = String.valueOf(Integer.parseInt(curPatientId.substring(4))+1);
            for(int i=0; i<4; i++) {
                if(curPatientId.length() < 4) {
                    curPatientId = "0" + curPatientId;
                } else {
                    break;
                }
            }
            curPatientId = currYrMnth + curPatientId;
        }
        System.out.println("curPatientId : " + curPatientId);
        params.put("PATIENT_ID_PK", curPatientId);

        // 생년월일로 나이 INSERT
        if(Integer.parseInt(params.get("PATIENT_SSN").toString().split("-")[1].substring(0, 1)) < 3){
            int birYr = Integer.parseInt("19"+params.get("PATIENT_SSN").toString().split("-")[0].substring(0,2));
            int age = now.getYear() - birYr + 1;
            System.out.println("1900년대생 : " + birYr);
            params.put("PATIENT_AGE", age);
        } else if(Integer.parseInt(params.get("PATIENT_SSN").toString().split("-")[1].substring(0, 1)) < 5) {
            int birYr = Integer.parseInt("20"+params.get("PATIENT_SSN").toString().split("-")[0].substring(0,2));
            int age = now.getYear() - birYr + 1;

            System.out.println("2000년대생 : " + birYr);
            params.put("PATIENT_AGE", age);
        }



        // 생년월일로 성별 INESRT
        if(Integer.parseInt(params.get("PATIENT_SSN").toString().split("-")[1].substring(0, 1)) % 2 == 1) {
            params.put("GENDER", "M");
        }
        else {
            params.put("GENDER", "F");
        }

        System.out.println(params);

        return patientInfoDAO.insertPatientInfo(params);
    }

            // 특정 환자 퇴원예정일 UPDATE
    public void changeDischargeDueDate (Map<String, Object> newDischargeDate){

        patientInfoDAO.changeDischargeDueDate(newDischargeDate);
    }

    @Override
    public List<Map<String, Object>> getPastTreatmentList(String patientPk) {
        return patientInfoDAO.getPastTreatmentList(patientPk);
    }
    @Override
    public List<Map<String, Object>> getPastTreatmentDetail(String patientID, String treatmentDate) {
        return patientInfoDAO.getPastTreatmentDetail(patientID, treatmentDate);
    }

    @Override
    public List<Map<String, Object>> getTreatmentHistoryDetail(String patientID, String treatmentDate, String regTime) {
        return patientInfoDAO.getTreatmentHistoryDetail(patientID, treatmentDate, regTime);
    }

    @Override
    public List<Map<String, Object>> getTreatmentPatientInfo(String receivePk) {
        return patientInfoDAO.getTreatmentPatientInfo(receivePk);
    }
}


