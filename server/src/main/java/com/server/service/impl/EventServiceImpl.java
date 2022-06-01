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
    public ResponseEntity<String> userRegisterForNewEvent(@RequestBody Event event, @RequestParam Integer userID) {
        System.out.println(event.toString());
        System.out.println("USERID: " + userID);
        User newUser = new User();
        newUser.setId(userID);
        int eventID = -1;

        //todo still need to solve the problem of getting the eventID when the event already exists in the table
        if (eventAlreadyExists(event)) {
            //does exist in table

            //todo fix this. this query does not work, it results in NullPointerException.
//            eventID = eventRepository.findEventID(event.eventTitle, event.eventDescription,
//                  event.times, event.location, event.phoneContact, event.emailContact);
        }else{
            //does not exist in table

            Event savedEvent = eventRepository.save(event);
            eventID = savedEvent.eventId;
        }

        Event newEvent = new Event();
        newEvent.setEventId(eventID);

        System.out.println(eventID);

        // after save it to the relational table. Note: there might a better of doing this
        //breaks here
        userEventRepository.save(new UserEvent(new UserEventKey(), newUser, newEvent));

        return new ResponseEntity<>("Server error: Service Currently Not Available.", HttpStatus.SERVICE_UNAVAILABLE);
    }

    public boolean eventAlreadyExists(Event event) {
        boolean test = eventRepository.exists(Example.of(event));
        System.out.println(test);
        return test;
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

//    public int getEventID(Event event){
//        ArrayList<Event> events = (ArrayList<Event>) eventRepository.findAll();
//        ArrayList<Event> eventsWithSameName = new ArrayList<>();
//
//        System.out.println(events.toString());
//
//        for (Event e : events) {
//            if (e.eventTitle.equals(event.eventTitle)) {
//                eventsWithSameName.add(e);
//            }
//        }
//
//        System.out.println(eventsWithSameName);
//
//        for (Event eventCompare : eventsWithSameName) {
//            if (event.compare(eventCompare)) {
//                return eventCompare.eventId;
//            }
//        }
//
//        return 0;
//    }


}
