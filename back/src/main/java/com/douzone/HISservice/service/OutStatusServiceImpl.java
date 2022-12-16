package com.douzone.HISservice.service;

import com.douzone.HISservice.repository.OutStatusDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OutStatusServiceImpl implements OutStatusService{

    private final OutStatusDAO outStatusDAO;

    // 환자 현황 전체
    @Override
    public List<Map<String, Object>> getOutStatus(Map<String, Object> outStatusElement) {
//        System.out.println(outStatusElement);
        List<Map<String, Object>> outStatus = outStatusDAO.getOutStatus(outStatusElement);
        return outStatus;
    }

    @Override
    public void putChangeState(Map<String, Object> speciality) {
        outStatusDAO.putChangeState(speciality);
    }

    // 환자 현황 필터
    @Override
    public List<Map<String, Object>> getOutStatusCon(Map<String, Object> outStatusElement) {
//        System.out.println(outStatusElement);
        List<Map<String, Object>> outStatus = outStatusDAO.getOutStatusCon(outStatusElement);
        return outStatus;
    }


    // 접수 INSERT
    @Override
    public int insertReceiveInfo(Map<String, Object> params){
        LocalDate now = LocalDate.now();
        String currYr = "R"+String.valueOf(now.getYear()).substring(2);
        String receiveId = getRecentSeq(currYr);

        System.out.println(params);

        System.out.println("currYr : " + currYr);
        System.out.println("receiveId : " + receiveId);

        if(receiveId == null) {
            receiveId = currYr + "000001";
        } else {
            receiveId = receiveId.replace(currYr, "");
            int receiveIdPlus = Integer.parseInt(receiveId) + 1;
            String receiveIdStr = String.valueOf(receiveIdPlus);
            for(int i=0; i<6; i++) {
                if(receiveIdStr.length() < 6) {
                    receiveIdStr = "0" + receiveIdStr;
                } else {
                    break;
                }
            }
            receiveId = currYr + receiveIdStr;
        }
        System.out.println("receiveId : " + receiveId);
        params.put("RECEIVE_ID_PK", receiveId);


        return outStatusDAO.insertReceiveInfo(params);

    }

    // 접수 최근 번호
    @Override
    public String getRecentSeq(String currYr) {
        return outStatusDAO.getRecentSeq(currYr);
    }


    // 과 별 의사 리스트
    @Override
    public List<Map<String, Object>> getDoctorList (Map<String, Object> params){
        return outStatusDAO.getDoctorList(params);
    }

    // 의사 개인 환자 현황 리스트
    @Override
    public List<Map<String, Object>> getMyPatient(String doctorID) {
        return outStatusDAO.getMyPatient(doctorID);
    }


    // 수납 대기 환자 SELECT

    @Override
    public List<Map<String, Object>> getWaiting4Receipt(Map<String, Object> params) {
        return outStatusDAO.getWaiting4Receipt(params);
    }


    // 수납 SELECT
    @Override
    public List<Map<String, Object>> getAcceptance(Map<String, Object> params) {
        List<Map<String, Object>> acceptanceList = outStatusDAO.getAcceptance(params);

        int treatCost = (int) acceptanceList.get(0).get("PATIENT_AGE");
        String treatmentOrder = acceptanceList.get(0).get("TREATMENT_ORDER") != null ? acceptanceList.get(0).get("TREATMENT_ORDER").toString() : null;
        int careCost, prescriptionCost, timeCost, insuranceCost, totalCost;
        String visit = acceptanceList.get(0).get("VISIT") != null ? acceptanceList.get(0).get("VISIT").toString() : null;
        String prescription = acceptanceList.get(0).get("MEDICINE") != null ? acceptanceList.get(0).get("MEDICINE").toString() : null;
        int time = Integer.parseInt(acceptanceList.get(0).get("REGISTRATION_TIME").toString().substring(0,2));
        int insurance = (int) acceptanceList.get(0).get("INSURANCE");

        treatCost = treatCost < 7 || treatCost > 64 ? 5000 : 7000;
        careCost = treatmentOrder == null ? 0 : 10000;
        prescriptionCost = prescription == null ? 0 : visit.equals("재진") ? 3000 : 5000;
        timeCost = (int)(time < 9  ? treatCost * -0.1 : time > 17 ? treatCost * 0.1 : 0);
        insuranceCost = (int)(insurance == 1 ? (treatCost + careCost + prescriptionCost + timeCost) * 0.25 : 0);
        totalCost = (treatCost + careCost + prescriptionCost + timeCost - insuranceCost);

        System.out.println(prescriptionCost);
        acceptanceList.get(0).put("treatCost", treatCost);
        acceptanceList.get(0).put("insuranceCost", insuranceCost);
        acceptanceList.get(0).put("careCost", careCost);
        acceptanceList.get(0).put("timeCost", timeCost);
        acceptanceList.get(0).put("prescriptionCost", prescriptionCost);
        acceptanceList.get(0).put("totalCost", totalCost);

        return acceptanceList;
    }


    // 수납 금액 INSERT
    @Override
    public void insertReceipt(Map<String, Object> params) {
        System.out.println("서비스임플 params");
        System.out.println(params);
        outStatusDAO.insertReceipt(params);
        outStatusDAO.putOutStatus(params);
    }

    // 외래 환자 처방전
    @Override
    public List<Map<String, Object>> getPrescription(Map<String, Object> treatmentNumPk) {
        return outStatusDAO.getPrescription(treatmentNumPk);
    }
}
