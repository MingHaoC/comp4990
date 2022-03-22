package com.server.service.impl;

import com.server.model.User;
import com.server.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Override
    public ResponseEntity<String> register(User user) {
        return null;
    }

    @Override
    public ResponseEntity<String> login(String email, String password) {
        return null;
    }
}
