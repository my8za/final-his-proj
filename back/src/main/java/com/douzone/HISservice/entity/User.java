package com.douzone.HISservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="EMP_INFO_TB")
@Entity
public class User {
    @Id
    private String emp_id_pk;

    private String speciality_ID_FK;
    private String emp_name;
    private String username;
    private String pw;
    private String role;
    private String license;
    private String emp_status;
    private String emp_ssn;
    private String emp_email;
    private String emp_addr;
    private String emp_tel;
    private Date hireDate;
    private Date retireDate;

    public List<String> getRoleList() {
        if(this.role.length() > 0){
            return Arrays.asList(this.role.split(","));
        }
        return new ArrayList<>();
    }

}