package com.server.service.impl;



import com.server.model.User;
import com.server.repository.UserRepository;
import com.server.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByEmail(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findById(Integer.parseInt(username));
        if (user.isPresent())
            return UserDetailsImpl.build(user.get());
        else
            throw new UsernameNotFoundException("User not found with the email: " + username);
    }
}
