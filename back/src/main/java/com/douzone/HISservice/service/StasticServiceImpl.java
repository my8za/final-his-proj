package com.douzone.HISservice.service;

import com.douzone.HISservice.repository.StasticDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StasticServiceImpl implements StasticService{
    private final StasticDAO stasticDAO;
    @Override
    public List<Object> getYearStastic (Map<String, Object> yearStaticElements){
        System.out.println("서비스 임플"+yearStaticElements.get("year"));
        int years = (Integer)yearStaticElements.get("year");
        ArrayList sendList = new ArrayList();
        sendList.add(yearStaticElements.get("spectiality1"));
        sendList.add(yearStaticElements.get("spectiality2"));
        sendList.add(yearStaticElements.get("spectiality3"));
        Map<String, Object> yearStatic = new HashMap<>();
        List<Object> getYearStastics = new ArrayList<>();

        for(int i =0; i<4; i++) {
            for (int j = 0; j < 3; j++) {
                years = years - i;
                yearStatic.put("nowYear", years);
                yearStatic.put("spectiality", sendList.get(j));
                years = years + i;
                getYearStastics.add(stasticDAO.getYearStastics(yearStatic));
            }
        }
        return getYearStastics;
    }
}
