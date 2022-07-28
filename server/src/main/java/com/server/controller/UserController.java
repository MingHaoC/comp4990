package com.server.controller;

import com.server.model.User;
import com.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.server.constant.Route.*;

@RestController
@RequestMapping(USER)
public class UserController {

    @Autowired
    UserService userService;

   /**
     * Get user by Id
     *
     * @param user JSON object containing the following field
     *             id: Integer
     * @return
     */
    @GetMapping()
    public ResponseEntity<User> getUser(@RequestBody User user) {
        return userService.getUser(user);
    }

    /**
     * Update the following user information: firstname, lastname, address, phone number
     *
     * @param user JSON object containing the following field
     *             firstName: String, lastName: String, address: String, phoneNumber: String, id: Integer
     * @return
     */
    @PostMapping(EDIT)
    public ResponseEntity<String> EditUserInformation(@RequestBody User user) {
        return userService.updateUserInformation(user);
    }

    /**
     * Update the user address
     *
     * @param user JSON object containing the following field
     *             address: String, id: Integer
     * @return
     */
    @PostMapping(EDIT_ADDRESS)
    public ResponseEntity<String> EditUserAddress(@RequestBody User user) {
        return userService.updateUserAddress(user);
    }

    /**
     * Update the user firstname and lastname
     *
     * @param user JSON object containing the following field
     *             firstName: String, lastName: String, id: Integer
     * @return
     */
    @PostMapping(EDIT_NAME)
    public ResponseEntity<String> EditUserName(@RequestBody User user) {
        return userService.updateUserName(user);
    }

    /**
     * Update the user phone number
     *
     * @param user JSON object containing the following field:
     *             phoneNumber: String, id: Integer
     * @return
     */
    @PostMapping(EDIT_PHONE_NUMBER)
    public ResponseEntity<String> EditPhoneNumber(@RequestBody User user) {
        return userService.updateUserPhoneNumber(user);
    }

    /**
     * Register an expo notification for a user
     *
     * @param user JSON object containing the following field
     *             email: String, expoToken: String
     * @return
     */
    @PostMapping(REGISTER_EXPO_TOKEN)
    public ResponseEntity<String> RegisterExpoToken(@RequestBody User user){
        return userService.registerExpoToken(user);
    }
}
