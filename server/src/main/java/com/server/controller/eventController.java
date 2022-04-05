package com.server.controller;

import static com.server.constant.Route.*;

import com.server.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> getEvent(@RequestBody Integer id) throws Exception {

        ResponseEntity<String> response = new ResponseEntity<>(eventService.loadEventById(id).toString(), HttpStatus.OK);

        if (response.hasBody()){
            return response;
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping(EVENT_LIST)
    public ResponseEntity<String> getEventList() throws Exception {
        ResponseEntity<String> response = new ResponseEntity<>(eventService.loadEvents().toString(), HttpStatus.OK);

        if (response.hasBody()){
            return response;
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
