package com.server.service.impl;

import com.server.model.Event;
import com.server.model.User;
import com.server.repository.EventRepository;
import com.server.repository.UserRepository;
import com.server.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

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
        return event.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @Override
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        if (!events.isEmpty())
            return new ResponseEntity<>(events, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    //todo:
    //if it the first time a user is registering for this event, add it to the event table, and register the user to the event
    //if another user registers for this event, no need to add it to the event table again, just register the user to the event
    @Override
    public ResponseEntity<String> userRegisterForNewEvent(@RequestBody Event event, @RequestParam Integer userID) {
        System.out.println(event.toString());
        System.out.println("USERID: " + userID);

        if (!eventAlreadyExistsInDatabase(event)) {
            //add the event to the event table
            eventRepository.save(event);
        }
        //else: do not add the event to the event table.

        //todo fix this. this returns null
        Integer eventID = eventRepository.findEventID(event.eventTitle, event.eventDescription,
                event.times, event.location, event.phoneContact, event.emailContact, event.tags);

        System.out.println("TESTING TESTING TESTING EVENTID: " + eventID);

        //todo
        //register the user to the event
        //need to figure out how to get eventID.
        //add entry with userID and eventID to relational table

        return new ResponseEntity<>("Server error: Service Currently Not Available.", HttpStatus.SERVICE_UNAVAILABLE);
    }

    public boolean eventAlreadyExistsInDatabase(Event event) {
        Example<Event> example = Example.of(event);
        return eventRepository.exists(example);
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


}
