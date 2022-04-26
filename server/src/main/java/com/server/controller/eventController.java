package com.server.controller;

import com.server.model.Event;
import com.server.service.impl.EventServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.server.constant.Route.*;

@RestController
@RequestMapping(EVENT)
public class eventController {

    @Autowired
    private EventServiceImpl eventService;

    @GetMapping
    public ResponseEntity<Event> getEvent(@RequestBody Integer id) {
        return eventService.getEvent(id);
    }

    @GetMapping(EVENT_LIST)
    public ResponseEntity<List<Event>> getEventList() {
        return eventService.getAllEvents();
    }

    //todo:
    //if it the first time a user is registering for this event, add it to the event table, and register the user to the event
    //if another user registers for this event, no need to add it to the event table again, just register the user to the event
    @PostMapping(NEW_EVENT)
    public ResponseEntity<String> newEvent(@RequestBody Event event) {
        return eventService.createNewEvent(event);
    }

    @PostMapping(CANCEL_EVENT)
    public ResponseEntity<String> cancelEvent(/*@RequestBody Integer userID, @RequestBody Integer eventID*/){
        return eventService.removeUserFromEvent(/*userID, eventID*/);
    }
}
