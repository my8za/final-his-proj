package com.douzone.HISservice.service;

import com.douzone.HISservice.repository.UserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserInfoServiceImpl implements UserInfoService {

    private final UserDAO userDAO;

    @Override
    public List<Map<String, Object>> getMyInfo(String username) {
        return userDAO.getMyInfo(username);
    }
}
