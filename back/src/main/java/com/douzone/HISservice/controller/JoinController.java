package com.douzone.HISservice.controller;

import com.douzone.HISservice.entity.User;
import com.douzone.HISservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;

@RestController
@RequiredArgsConstructor
public class JoinController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

//    @PostMapping("/join")
//    public String join(@RequestBody User user) {
//        System.out.println("회원가입 진행 : " + user);
//        String rawPassword = user.getPw();
//        String encPassword = bCryptPasswordEncoder.encode(rawPassword);
//        user.setPw(encPassword);
//        userRepository.save(user);
//        return "회원가입완료";
//    }

    @PostMapping("/join")
    public String join(@RequestBody User user) {
        user.setPw(bCryptPasswordEncoder.encode(user.getPw()));
        userRepository.save(user);
        return "회원가입완료";
    }
}
