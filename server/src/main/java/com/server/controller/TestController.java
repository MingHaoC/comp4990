package com.server.controller;


import com.server.model.Event;
import com.server.model.User;
import com.server.model.UserEvent;
import com.server.model.UserEventKey;
import com.server.repository.EventRepository;
import com.server.repository.UserEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

import static com.server.constant.Route.*;

@RestController
@RequestMapping(TEST)
public class TestController {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserEventRepository userEventRepository;

    /**
     * The purpose of this is to show @Stephen how to create and query UserEvent
     *
     * @return
     */

    @PostMapping(HEALTH)
    public ResponseEntity<String> HealthCheck() {
        // assume the following is given to you by the user
        User newUser = new User();
        newUser.setId(11); // todo: change the id to an existing id in your database

        Event event = new Event("abc",  "abc", new Date(), "abc"); // assume the inputted info is sent by the frontend

        // todo: you would check if the event exists if not then save it to the db
        // if() { }

        // if it does not exist save the event
        Event savedEvent = eventRepository.save(event);

        // after save it to the relational table. Note: there might a better of doing this
        userEventRepository.save(new UserEvent(new UserEventKey(), newUser, savedEvent));

        // following is how you would query every user that has register for certain event
        // please check the query for getUserRegisterInEvent
        List<Integer> temp = eventRepository.getUserRegisterInEvent(savedEvent.getEventId());
        temp.forEach(System.out::println);

        return new ResponseEntity<>("Ok", HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<String> test() {
        return new ResponseEntity<>("Health status: Ok", HttpStatus.OK);
    }
}
