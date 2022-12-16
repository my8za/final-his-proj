package com.douzone.HISservice.controller;

import com.douzone.HISservice.config.auth.PrincipalDetails;
import com.douzone.HISservice.entity.User;
import com.douzone.HISservice.repository.UserRepository;
import com.douzone.HISservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserService userService;

    @PostMapping("/join")
    public String join(@RequestBody User user) {
        user.setPw(bCryptPasswordEncoder.encode(user.getPw()));
        user.setEmp_id_pk("R220001");
        user.setSpeciality_ID_FK("R");
        user.setEmp_name("신용기");
        user.setRole("ROLE_INRECEIPT");
        user.setLicense("R220001");
        user.setEmp_status("재직");
        user.setEmp_ssn("991207-1264598");
        user.setEmp_tel("010-2227-1396");
        user.setEmp_email("dydrl@naver.com");
        user.setHireDate(new Date(2022-11-22));
        user.setRetireDate(null);
        user.setEmp_addr("부산광역시 금정구");
        userRepository.save(user);
        return "회원가입완료";
    }

    @PostMapping("/myPage")
    public List<Map<String, Object>> getMyInfo(Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String pk = principal.getUser().getEmp_id_pk();
        System.out.println("이거야" + userService.getMyInfo(pk));
        return userService.getMyInfo(pk);
    }

    @PostMapping("/changePwd")
    public String changePwd(@RequestBody Map<String, Object> pwd, Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String pk = principal.getUser().getEmp_id_pk();
        String userPwd = principal.getUser().getPw();
        String newPwd = bCryptPasswordEncoder.encode((String) pwd.get("newPwd"));

        if(bCryptPasswordEncoder.matches((CharSequence) pwd.get("presentPwd"), userPwd) == false) {
            return "현재 비밀번호와 일치하지 않습니다.";
        } else {
            System.out.println("비밀번호가 일치합니다!");
        }

        return userService.changePwd(newPwd, pk);
    }

    @PostMapping("/changeAddr")
    public String changeAddr(@RequestBody Map<String, Object> addr, Authentication authentication) {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String pk = principal.getUser().getEmp_id_pk();
        String newAddr = (String) addr.get("newAddr");
        System.out.println(newAddr);
        return userService.changeAddr(newAddr, pk);
    }

    @GetMapping("/headerInfo")
    public List<Map<String, Object>> getHeaderInfo(Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String pk = principal.getUser().getEmp_id_pk();
        return userService.getHeaderInfo(pk);
    }

    @PostMapping("/addSchedule")
    public List<Map<String, Object>> addDoctorSchedule(@RequestBody Map<String, Object> data) {
        return userService.addDoctorSchedule(data);
    }

    @GetMapping("/myScheduleList")
    public List<Map<String, Object>> getMyScheduleList(@RequestParam String date, @RequestParam String empIdPk) {
        return userService.getMyScheduleList(date, empIdPk);
    }

    @GetMapping("/selectedSchedule")
    public List<Map<String, Object>> getSelectedSchedule(@RequestParam String scheduleIdPk) {
        return userService.getSelectedSchedule(scheduleIdPk);
    }

    @PostMapping("/updateSchedule")
    public String updateSchedule(@RequestBody Map<String, Object> data) {
        userService.updateSchedule(data);
        return "일정이 수정되었습니다.";
    }

    @PostMapping("/deleteSchedule")
    public List<Map<String, Object>> deleteSchedule(@RequestBody Map<String, Object> data) {
        String date = data.get("date").toString();
        String empIdPk = data.get("empIdPk").toString();
        String schedulePk = data.get("schedulePk").toString();
        return userService.deleteSchedule(date, empIdPk, schedulePk);
    }

    @GetMapping("/filterCategory")
    public List<Map<String, Object>> filterCategory(@RequestParam String category, @RequestParam String empIdPk, @RequestParam String date) {
        return userService.filterCategory(category, empIdPk, date);
    }
}
