package com.example.restservice.security;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class AuthenticationController {

    @PostMapping("/login")
    public ResponseEntity<String> authenticate() {
        return (ResponseEntity<String>) ResponseEntity.ok().header("access-control-allow-origin");
    };
}
