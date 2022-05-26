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

    /**
     * Endpoint to register a new user
     *
     * @param user JSON object containing the following field:
     *             firstName: String, lastName: String, address: String, email: String, password: String
     * @return
     */
    @PostMapping(REGISTER)
    public ResponseEntity<String> register(@RequestBody User user) {
        return authenticationService.register(user);
    }

    /**
     * Endpoint used to log user in, returns a json token if successful
     *
     * @param user JSON object containing the following field:
     *             email: String, password: String
     * @return Json token if user credential is correct
     */
    @PostMapping(LOGIN)
    public ResponseEntity<String> login(@RequestBody User user) {
        return authenticationService.login(user.getEmail(), user.getPassword());
    }
}
