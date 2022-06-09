package com.server.service;

import com.server.model.User;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {
    
    ResponseEntity<String> register(User user);

    ResponseEntity<String> login(String email, String password);
}
