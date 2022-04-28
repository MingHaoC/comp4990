package com.server.controller;

import com.server.model.User;
import com.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.server.constant.Route.*;

@RestController
@RequestMapping(USER + EDIT)
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping()
    public ResponseEntity<String> EditUserInformation(@RequestBody User user) {
        return userService.updateUserInformation(user);
    }

    @PostMapping(ADDRESS)
    public ResponseEntity<String> EditUserAddress(@RequestBody User user) {
        return userService.updateUserAddress(user);
    }

    @PostMapping(NAME)
    public ResponseEntity<String> EditUserName(@RequestBody User user) {
        return userService.updateUserName(user);
    }

    @PostMapping(PHONE_NUMBER)
    public ResponseEntity<String> EditPhoneNumber(@RequestBody User user) {
        return userService.updateUserPhoneNumber(user);
    }


}
