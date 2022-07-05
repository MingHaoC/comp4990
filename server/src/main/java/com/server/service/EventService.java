package com.server.service;
import com.server.model.Event;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface EventService {

    ResponseEntity<Event> getEvent(Integer id);

    ResponseEntity<List<Event>> getAllEvents();

    ResponseEntity<String> userRegisterForNewEvent(Event event, Integer userID);

    ResponseEntity<String> removeUserFromEvent(Integer userID, Integer eventID);

    ResponseEntity<List<Event>> getEventsThatUserRegisteredFor(Integer userID);


}
