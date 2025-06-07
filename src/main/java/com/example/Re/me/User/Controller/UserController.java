package com.example.Re.me.User.Controller;


import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/user")
    public Object user(@AuthenticationPrincipal OAuth2User principal) {
        return principal != null ? principal.getAttributes() : "로그인 안됨";
    }
}