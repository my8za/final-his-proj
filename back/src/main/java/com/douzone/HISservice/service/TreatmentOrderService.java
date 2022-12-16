package com.douzone.HISservice.service;

import java.util.List;
import java.util.Map;

public interface TreatmentOrderService {

    public void setMedicalCharts(Map<String, Object> data);

    public List<Map<String, Object>> getDiagnosisList(String specialityId);

    public List<Map<String, Object>> getMedicineList(String diagnosis);

}
