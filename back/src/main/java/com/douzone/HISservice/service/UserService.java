package com.douzone.HISservice.service;

import java.util.List;
import java.util.Map;

public interface UserService {

    List<Map<String, Object>> getMyInfo(String pk);

    String changePwd(String newPwd, String pk);

    String changeAddr(String newAddr, String pk);

    List<Map<String, Object>> getHeaderInfo(String pk);

    List<Map<String, Object>> addDoctorSchedule(Map<String, Object> data);

    List<Map<String, Object>> getMyScheduleList(String date, String empIdPk);

    List<Map<String, Object>> getSelectedSchedule(String scheduleIdPk);

    void updateSchedule(Map<String, Object> data);

    List<Map<String, Object>> deleteSchedule(String date, String empIdPk, String schedulePk);

    List<Map<String, Object>> filterCategory(String category, String empIdPk, String date);

}
