package com.douzone.HISservice.service;

import com.douzone.HISservice.repository.TreatmentOrderDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TreatmentOrderServiceImpl implements TreatmentOrderService {

    private final TreatmentOrderDAO treatmentOrderDAO;

    @Override
    public void setMedicalCharts(Map<String, Object> data) {
        String patientStatus = "";

        String receivePk = data.get("receivePk").toString();

        if(data.get("treatmentOrder").toString() == "") {
            patientStatus = "OD";        // 치료 오더가 있는 환자는 치료 상태로 update
        } else { patientStatus = "OB"; } // 치료 오더가 없는 환자는 바로 수납 대기 상태로 update

        treatmentOrderDAO.setMedicalCharts(data);

        treatmentOrderDAO.setPatientStatus(receivePk, patientStatus);

        if(Integer.parseInt(data.get("admissionCheck").toString()) == 1) {
            treatmentOrderDAO.setAdmissionDueDate(data); // 입원 오더가 내려지면 입원 테이블에 insert
        }

    }

    @Override
    public List<Map<String, Object>> getDiagnosisList(String specialityId) {
        return treatmentOrderDAO.getDiagnosisList(specialityId);
    }

    @Override
    public List<Map<String, Object>> getMedicineList(String diagnosis) {
        return treatmentOrderDAO.getMedicineList(diagnosis);
    }
}
