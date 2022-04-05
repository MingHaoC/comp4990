package com.server.controller;


import com.server.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.server.constant.Route.*;

@RestController
@RequestMapping(TEST)
public class TestController {

    @PostMapping(HEALTH)
    public ResponseEntity<String> HealthCheck() {
        return new ResponseEntity<>("Operation ok.", HttpStatus.OK);
    }
}
