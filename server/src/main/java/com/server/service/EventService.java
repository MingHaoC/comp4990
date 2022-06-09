package com.server.service;
import com.server.model.Event;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface EventService {

    ResponseEntity<Event> getEvent(Integer id);

    ResponseEntity<List<Event>> getAllEvents();

    ResponseEntity<String> createNewEvent(Event event);

    ResponseEntity<String> removeUserFromEvent(Integer userID, Integer eventID);

    ResponseEntity<String> deleteEvent(Integer eventID);

}
