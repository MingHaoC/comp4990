package com.server.service.impl;

import com.server.model.Event;
import com.server.model.User;
import com.server.model.UserEvent;
import com.server.model.UserEventKey;
import com.server.repository.EventRepository;
import com.server.repository.UserEventRepository;
import com.server.repository.UserRepository;
import com.server.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.ignoreCase;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserEventRepository userEventRepository;

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
    public ResponseEntity<String> userRegisterForNewEvent(Event event, Integer userID) {
        User newUser = new User();
        newUser.setId(userID);

        //example matcher to only match required fields
        //we dont need to match id, createdAt, or updatedAt. Match everything else.
        ExampleMatcher eventMatcher = ExampleMatcher.matching()
                .withIgnorePaths("eventId", "createdAt", "updatedAt")
                .withMatcher("eventTitle", ignoreCase().exact())
                .withMatcher("eventDescription", ignoreCase().exact())
                .withMatcher("emailContact", ignoreCase().exact())
                .withMatcher("phoneContact", ignoreCase().exact())
                .withMatcher("location", ignoreCase().exact())
                .withMatcher("times", ignoreCase().exact());

        Optional<Event> matchedEvent = eventRepository.findOne(Example.of(event, eventMatcher));
        System.out.println(matchedEvent);

        //todo still need to solve the problem of getting the eventID when the event already exists in the table
        if (matchedEvent.isEmpty()) {
            //does not exist in table
            //save a new event
            event = eventRepository.save(event);
        }else{
            //does exist in table
            //get the event that has been matched with
            event = matchedEvent.get();

            //check to see if the user is already registered for this event
            List<UserEvent> temp = userEventRepository.getRegistrationRecord(event.eventId, userID);
            if(!temp.isEmpty()){
                return new ResponseEntity<>("User is already registered for this event.", HttpStatus.OK);
            }
        }

        //add the registration to the table.
        userEventRepository.save(new UserEvent(new UserEventKey(), newUser, event));

        return new ResponseEntity<>("User Successfully registered for Event", HttpStatus.OK);
    }


    @Override
    public ResponseEntity<String> removeUserFromEvent(Integer userID, Integer eventID) {

        //get the event and the user
        Optional<Event> event = eventRepository.findById(eventID);
        Optional<User> user = userRepository.findById(userID);

        if (user.isEmpty()) {
            return new ResponseEntity<>("User does not exist.", HttpStatus.NOT_FOUND);
        }
        if (event.isEmpty()) {
            return new ResponseEntity<>("Event does not exist.", HttpStatus.NOT_FOUND);
        }

        UserEvent probe = new UserEvent(new UserEventKey(), user.get(), event.get());
        ExampleMatcher registerMatcher = ExampleMatcher.matching()
                .withIgnorePaths("id")
                .withMatcher("userID", ignoreCase())
                .withMatcher("eventId", ignoreCase());

        Optional<UserEvent> registedEvent = userEventRepository.findOne(Example.of(probe, registerMatcher));

        //delete the entry in the database
        registedEvent.ifPresent(userEvent -> userEventRepository.deleteById(userEvent.getId()));

        return new ResponseEntity<>("Removed User: " + userID + " from Event: " + eventID, HttpStatus.OK);

    }

    @Override
    public ResponseEntity<List<Event>> getEventsThatUserRegisteredFor(Integer userID) {

        Optional<User> user = userRepository.findById(userID);

        if(user.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        List<Event> events = eventRepository.getUsersRegisteredEvents(userID);

        if(events.isEmpty()){
            //if the user is not registered for any events
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(events, HttpStatus.OK);
    }

}
