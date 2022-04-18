package com.server.service;

import com.server.model.User;
import org.springframework.http.ResponseEntity;

public interface UserService {

    ResponseEntity<String> updateUserInformation(User user);

    ResponseEntity<String> updateUserAddress(User user);

}
