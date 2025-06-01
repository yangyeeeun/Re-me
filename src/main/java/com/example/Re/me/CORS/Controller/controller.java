package com.example.Re.me.CORS.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class controller {
    @GetMapping("/api/test")
    public String test(){
        return "테스트";
    }
}
