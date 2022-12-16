package com.douzone.HISservice.service;

import com.douzone.HISservice.repository.BedInfoDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
//별도 코드 없이 의존성 주입  private final BedImfoDAO admissionDAO 여기
public class BedInfoServiceImpl implements BedInfoService {
    private final BedInfoDAO bedInfoDAO ;
    // 병동 and 호실 기준 병상 현황 정보 불러오기 READ
    @Override
    public List<Map<String, Object>> getOccupiedBedInfoList(Map<String, Object> roominfo) {
        int paramCount = roominfo.size();
        System.out.println("파람카운트 : "+paramCount);
        String empno = roominfo.get("empIdPk").toString();

        //paramCount => 3:병동and호실 기준 병상 list
        //              2:병동 기준 병상 list
        //              3:전체 병상 list
        //
        if (paramCount == 3) {
            return bedInfoDAO.getOccupiedBedInfoList(roominfo);
        } else if (paramCount == 2 && empno.indexOf("O") != -1) {
            return bedInfoDAO.getAllWardList(roominfo);
        } else if (paramCount == 1 && empno.indexOf("O") != -1){
            return bedInfoDAO.getAllBedList(roominfo);
        }else{
            List<Map<String, Object>> listMap = new ArrayList<Map<String, Object>>();
            Map<String, Object> map = new HashMap<String, Object>();

            map.put("fail","실패");
            listMap.add(map);

            return listMap;
        }
    }

    @Override
    public List<Map<String, Object>> getOccupiedWardList(Map<String, Object> roominfo){
        return bedInfoDAO.getOccupiedWardList(roominfo);
    }

    @Override
    public List<Map<String, Object>> getOccupiedAllList (){
        return bedInfoDAO.getOccupiedAllList();
    }
}
