package com.douzone.HISservice.service;


import java.util.List;
import java.util.Map;

public interface BedInfoService {

    // 병동 and 호실 기준 병상 현황 정보 불러오기 READ
    public List<Map<String, Object>> getOccupiedBedInfoList (Map<String, Object> roominfo);

    //병동 기준 입원완료 한 병상 정보 불러오기
    public List<Map<String, Object>> getOccupiedWardList(Map<String, Object> roominfo);

    //전체 입원완료 한 병상 정보 불러오기
    public List<Map<String, Object>> getOccupiedAllList ();

}
