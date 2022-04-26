package com.server.controller;

import com.server.model.Event;
import com.server.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.server.constant.Route.*;

@RestController
@RequestMapping(EVENT)
public class eventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<Event> getEvent(@RequestBody Integer id) {
        return eventService.getEvent(id);
    }

    @GetMapping(EVENT_LIST)
    public ResponseEntity<List<Event>> getEventList() {
        return eventService.getAllEvents();
    }

    @PostMapping(NEW_EVENT)
    public ResponseEntity<String> newEvent(@RequestBody Event event) {
        return eventService.createNewEvent(event);
    }
}
