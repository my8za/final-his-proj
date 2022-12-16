package com.douzone.HISservice.repository;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Mapper
@Repository
public interface StasticDAO {

    Map<String, Object> getYearStastics (Map<String, Object> yearStatic);
}
