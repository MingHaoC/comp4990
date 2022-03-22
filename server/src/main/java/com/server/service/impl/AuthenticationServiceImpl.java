package com.server.service.impl;

import com.server.model.User;
import com.server.repository.UserRepository;
import com.server.service.AuthenticationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

// todo: Might need to update the register endpoint when the user models gets updated

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<String> register(User user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        newUser.setAddress(user.getAddress());
        newUser.hashPassword();
        try {
            if (userRepository.findByEmail(newUser.getEmail()).isPresent())
                return new ResponseEntity<>("The email you enter is already registered on our website", HttpStatus.CONFLICT);
            if(userRepository.findByUsername(newUser.getUsername()).isPresent())
                return new ResponseEntity<>("The username you enter is already registered on our website", HttpStatus.CONFLICT);
            userRepository.save(newUser);
            userRepository.flush();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Something went wrong in the AuthenticationServiceImpl class, register method. Exception: ", e);
            return new ResponseEntity<>("Server error: Something went wrong while trying to register please contact support", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //todo: depending on how the user model is setup in k2, we might not need a username, instead the user would login with
    // email and password
    @Override
    public ResponseEntity<String> login(String username, String password) {
        try {
            Optional<User> query = userRepository.findByUsername(username);
            if (query.isPresent()) {
                User user = query.get();
                // todo: If the check pass, we should be returning a JWT token instead of a string
                if (user.checkPass(password))
                    return new ResponseEntity<>("Login success", HttpStatus.OK);
            }
            // no user found or incorrect email + password match
            return new ResponseEntity<>("The username and password you enter is invalid", HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            logger.error("Something went wrong in the AuthenticationServiceImpl class, login method. Exception: ", e);
            return new ResponseEntity<>("Server error: Something went wrong while trying to login please try again later", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
