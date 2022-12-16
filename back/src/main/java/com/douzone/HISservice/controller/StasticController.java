package com.douzone.HISservice.controller;


import com.douzone.HISservice.service.StasticService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/stastic")
@RequiredArgsConstructor
public class StasticController {

    private final StasticService stasticService;

    @PostMapping("/year")
    public List<Object> getYearStastics(@RequestBody Map<String, Object> yearStaticElements) {
        return stasticService.getYearStastic(yearStaticElements);
    }

}
