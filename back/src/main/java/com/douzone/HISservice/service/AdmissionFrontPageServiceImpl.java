package com.douzone.HISservice.service;

import com.douzone.HISservice.repository.AdmissionFrontPageDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdmissionFrontPageServiceImpl implements AdmissionFrontPageService{
    private final AdmissionFrontPageDAO admissionFrontPageDAO;

    @Override
    public List<Map<String, Object>> getBedInfo() {
        List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();

        Map<String, Object> test = admissionFrontPageDAO.getDisChargeCount();
        Map<String, Object> test2 = admissionFrontPageDAO.getBedInfo();
        test2.put("outDuePatient",test.get("outDuePatient"));
        listMap.add(test2);
        return listMap;
    }

    public List<Map<String, Object>> getAvailable(){

        return admissionFrontPageDAO.getAvailable();
    };


    @Override
    public List<Map<String, Object>> getDisChargeList() {

        return admissionFrontPageDAO.getDisChargeList();
    }
    @Override
    public void putDisCharged(Map<String, Object> admissionId) {

        System.out.println("아아아아아아 : "+admissionId);
        System.out.println(admissionId.get("WARD").toString());
        System.out.println(admissionId.get("ROOM_NUM").toString());
        System.out.println(admissionId.get("BED_NUM").toString());
        admissionFrontPageDAO.putDisCharged(admissionId);
        admissionFrontPageDAO.putChangeBedState(admissionId);

    }

    @Override
    public List<Map<String, Object>> getMyInPatient() {
        return admissionFrontPageDAO.getMyInPatient();
    }


}
