package com.server.service.impl;

import com.server.component.JwtTokenProvider;
import com.server.constant.RoleName;
import com.server.model.User;
import com.server.repository.RoleRepo;
import com.server.repository.UserRepository;
import com.server.service.AuthenticationService;
import com.server.util.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationServiceImpl.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Override
    public ResponseEntity<String> register(User user) {
        User newUser = new User();
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        newUser.setAddress(user.getAddress());
        newUser.setRoles(Collections.singleton(roleRepo.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."))));
        newUser.hashPassword();
        try {
            if (userRepository.findByEmail(newUser.getEmail()).isPresent())
                return new ResponseEntity<>("The email is already registered on our website", HttpStatus.CONFLICT);
            userRepository.save(newUser);
            userRepository.flush();
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Something went wrong in the " + AuthenticationServiceImpl.class + " Method: register method. Exception: ", e);
            return new ResponseEntity<>("Server error: Something went wrong while trying to register please contact support", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> login(String email, String password) {
        try {
            Optional<User> query = userRepository.findByEmail(email);
            if (query.isPresent()) {
                User user = query.get();
                // todo: If the check pass, we should be returning a JWT token instead of a string
                if (user.checkPass(password))
                    return new ResponseEntity<>(jwtTokenProvider.generateJwtToken(user), HttpStatus.OK);
            }
            // no user found or incorrect email or password match
            return new ResponseEntity<>("The username and password you enter is invalid", HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            logger.error("Something went wrong in the " + AuthenticationServiceImpl.class + ", login method. Exception: ", e);
            return new ResponseEntity<>("Server error: Something went wrong while trying to login please try again later", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
