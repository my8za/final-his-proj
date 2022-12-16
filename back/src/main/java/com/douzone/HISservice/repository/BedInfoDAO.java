package com.douzone.HISservice.repository;


import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
@Repository
public interface BedInfoDAO {

    // 병동 and 호실 기준 병상 현황 정보 불러오기 READ
    List<Map<String, Object>> getOccupiedBedInfoList(Map<String, Object> roominfo);

    // 병동 기준 병상 현황 정보 불러오기
    List<Map<String, Object>> getAllWardList(Map<String, Object> roominfo);

    // 전체 병상 현황 정보 불러오기
    List<Map<String, Object>> getAllBedList(Map<String, Object> roominfo);

    //병동 기준 입원완료 한 병상 정보 불러오기
    List<Map<String, Object>> getOccupiedWardList(Map<String, Object> roominfo);

    //병동 기준 입원완료 한 병상 정보 불러오기
    List<Map<String, Object>> getOccupiedAllList();
}
