package com.douzone.HISservice.service;

import java.util.List;
import java.util.Map;

public interface UserInfoService {
    List<Map<String, Object>> getMyInfo(String username);
}
