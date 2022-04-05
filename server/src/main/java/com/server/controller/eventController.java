package com.server.controller;

import static com.server.constant.Route.*;

import com.server.model.Event;
import com.server.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(EVENT)
public class eventController {

    @Autowired
    private EventService eventService;

    //todo set up users registering for events
    @PostMapping(EVENT_REGISTER)
    public ResponseEntity<String> register() {
        return null;
    }

    @GetMapping
    public ResponseEntity<Event> getEvent(@RequestBody Integer id) {
        return eventService.getEvent(id);
    }

    @GetMapping(EVENT_LIST)
    public ResponseEntity<List<Event>> getEventList() {
        return eventService.getAllEvents();
    }
}
