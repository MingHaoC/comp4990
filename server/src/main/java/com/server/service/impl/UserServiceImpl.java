package com.server.service.impl;

import com.server.model.User;
import com.server.repository.UserRepository;
import com.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public ResponseEntity<User> getUser(User user) {
        try {
            User getUser = userRepository.getById(user.getId());
            User returnUser = new User();
            returnUser.setId(getUser.getId());
            returnUser.setFirstName(getUser.getFirstName());
            returnUser.setLastName(getUser.getLastName());
            returnUser.setAddress(getUser.getAddress());
            returnUser.setPhoneNumber(getUser.getPhoneNumber());
            return ResponseEntity.ok(returnUser);
        } catch(Exception e) {
            return ResponseEntity.ok(null);
        }
    }

    @Override
    public ResponseEntity<String> updateUserInformation(User user) {
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
            return new ResponseEntity<>("An server error has occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateUserAddress(User user) {
        if(!VerifyUser(user.id))
            return new ResponseEntity<>("You cannot modified another user data with your JWT Token", HttpStatus.UNAUTHORIZED);

        try {
            userRepository.updateAddress(user.getAddress(), user.getId());
            return new ResponseEntity<>("User address was updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An server error has occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateUserName(User user) {
        if(!VerifyUser(user.id))
            return new ResponseEntity<>("You cannot modified another user data with your JWT Token", HttpStatus.UNAUTHORIZED);

        try {
            userRepository.updateName(user.getFirstName(), user.getLastName(), user.getId());
            return new ResponseEntity<>("User address was updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An server error has occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateUserPhoneNumber(User user) {
        if(!VerifyUser(user.id))
            return new ResponseEntity<>("You cannot modified another user data with your JWT Token", HttpStatus.UNAUTHORIZED);

        try {
            userRepository.updatePhoneNumber(user.getPhoneNumber(), user.getId());
            return new ResponseEntity<>("User address was updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("An server error has occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> registerExpoToken(User user) {
        if (userRepository.findByEmail(user.getEmail()).isEmpty()) {
            return new ResponseEntity<>("User doesn't exists", HttpStatus.NOT_FOUND);
        }
        if (userRepository.updateExpoToken(user.getEmail(), user.getExpoToken()) == 1)
            return new ResponseEntity<>("Successfully added token", HttpStatus.OK);
        return new ResponseEntity<>("Error, could not add the expo token", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean VerifyUser(int formData) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (((UserDetailsImpl) authentication.getPrincipal()).getId()) == formData;
    }

}
