package com.douzone.HISservice.service;


import com.douzone.HISservice.repository.UserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserDAO userDAO;

    @Override
    public List<Map<String, Object>> getMyInfo(String pk) {
        return userDAO.getMyInfo(pk);
    }

    @Override
    public String changePwd(String newPwd, String pk) {
        userDAO.changePwd(newPwd, pk);
        return "비밀번호를 변경하였습니다.";
    }

    @Override
    public String changeAddr(String newAddr, String pk) {
        userDAO.changeAddr(newAddr, pk);
        return "주소를 변경하였습니다.";
    }

    @Override
    public List<Map<String, Object>> getHeaderInfo(String pk) {
        return userDAO.getHeaderInfo(pk);
    }

    @Override
    public List<Map<String, Object>> addDoctorSchedule(Map<String, Object> data) {
        String empIdPk = data.get("empIdPk").toString();
        String date = data.get("scheduleDate").toString();
        userDAO.addDoctorSchedule(data);
        return userDAO.getMyScheduleList(date, empIdPk);
    }

    @Override
    public List<Map<String, Object>> getMyScheduleList(String date, String empIdPk) {
        return userDAO.getMyScheduleList(date, empIdPk);
    }

    @Override
    public List<Map<String, Object>> getSelectedSchedule(String scheduleIdPk) {
        return userDAO.getSelectedSchedule(scheduleIdPk);
    }

    @Override
    public void updateSchedule(Map<String, Object> data) {
        userDAO.updateSchedule(data);
    }

    @Override
    public List<Map<String, Object>> deleteSchedule(String date, String empIdPk, String schedulePk) {
        userDAO.deleteSchedule(schedulePk);
        return userDAO.getMyScheduleList(date, empIdPk);
    }

    @Override
    public List<Map<String, Object>> filterCategory(String category, String empIdPk, String date) {
        return userDAO.filterCategory(category, empIdPk, date);
    }
}
