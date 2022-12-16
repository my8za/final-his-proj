package com.douzone.HISservice.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface UserDAO {

    List<Map<String, Object>> getMyInfo(String pk);

    void changePwd(String newPwd, String pk);

    void changeAddr(String newAddr, String pk);

    List<Map<String, Object>> getHeaderInfo(String pk);

    void addDoctorSchedule(Map<String, Object> data);

    List<Map<String, Object>> getMyScheduleList(String date, String empIdPk);

    List<Map<String, Object>> getSelectedSchedule(String scheduleIdPk);

    void updateSchedule(Map<String, Object> data);

    void deleteSchedule(String schedulePk);

    List<Map<String, Object>> filterCategory(String category, String empIdPk, String date);
}
