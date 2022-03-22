package com.server.controller;

import com.server.model.User;
import com.server.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.server.constant.Route.*;

@RestController
@RequestMapping(USER)
public class authenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping(REGISTER)
    public ResponseEntity<String> register(@RequestBody User user) {
        return authenticationService.register(user);
    }

    @PostMapping(LOGIN)
    public ResponseEntity<String> login(@RequestBody User user) {
        return authenticationService.login(user.getEmail(), user.getPassword());
    }
}
