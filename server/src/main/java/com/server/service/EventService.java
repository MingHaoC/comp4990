package com.server.service;
import com.server.model.Event;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

public interface EventService {

    ResponseEntity<Event> getEvent(Integer id);

    ResponseEntity<List<Event>> getAllEvents();

    ResponseEntity<String> createNewEvent(@RequestBody Event event);

    ResponseEntity<String> removeUserFromEvent(/*@RequestBody Integer userID, @RequestBody Integer eventID*/);

}
