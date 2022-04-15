package com.server.service.impl;

import com.server.model.User;
import com.server.repository.UserRepository;
import com.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<String> editInformation(User user) {
        try {
            Optional<User> getUser = userRepository.findById(user.getId());
            if(getUser.isPresent()) {
                User updateUser = getUser.get();
                updateUser.setFirstName(user.getFirstName());
                updateUser.setLastName(user.getLastName());
                updateUser.setPhoneNumber(user.getPhoneNumber());
                updateUser.setAddress(user.getAddress());
                userRepository.save(updateUser);
                return new ResponseEntity<>("User was saved successfully", HttpStatus.OK);
            } else
                return new ResponseEntity<>("User with that id was not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
