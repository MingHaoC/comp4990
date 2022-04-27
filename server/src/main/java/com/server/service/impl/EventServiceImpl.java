package com.server.service.impl;

import com.server.model.Event;
import com.server.model.User;
import com.server.repository.EventRepository;
import com.server.repository.UserRepository;
import com.server.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;
    UserRepository userRepository;

    @Override
    public ResponseEntity<Event> getEvent(Integer id) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isPresent())
            return new ResponseEntity<>(event.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        if (!events.isEmpty())
            return new ResponseEntity<>(events, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<String> createNewEvent(@RequestBody Event event) {
        System.out.println(event.toString());
        eventRepository.save(event);

        return new ResponseEntity<>("Server error: Service Currently Not Available. test", HttpStatus.SERVICE_UNAVAILABLE);

    }

    @Override
    public ResponseEntity<String> removeUserFromEvent(Integer userID, Integer eventID) {

        //todo handle the null userID/eventID somehow

        //get the event and the user
        Optional<Event> event = eventRepository.findById(eventID);
        Optional<User> user = userRepository.findById(userID);

        if (!user.isPresent()) {
            return new ResponseEntity<>("User does not exist.", HttpStatus.NOT_FOUND);
        } else if (!event.isPresent()) {
            return new ResponseEntity<>("Event does not exist.", HttpStatus.NOT_FOUND);
        }

        //todo: remove the user from the event in the database

        return new ResponseEntity<>("Removed User: " + userID + " from Event: " + eventID, HttpStatus.OK);

    }

    @Override
    public ResponseEntity<String> deleteEvent(Integer eventID) {

        eventRepository.deleteById(eventID);
        return new ResponseEntity<>("Event: " + eventID + " has been deleted.", HttpStatus.OK);

    }

}
