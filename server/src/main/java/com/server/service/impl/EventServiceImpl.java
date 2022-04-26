package com.server.service.impl;

import com.server.model.Event;
import com.server.repository.EventRepository;
import com.server.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;

    @Override
    public ResponseEntity<Event> getEvent(Integer id) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isPresent())
            return new ResponseEntity<>(event.get(), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<List<Event>> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        if (!events.isEmpty())
            return new ResponseEntity<>(events, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<String> createNewEvent(@RequestBody Event event){

        //eventRepository.save(event);

        return new ResponseEntity<>("Server error: Service Currently Not Available.", HttpStatus.SERVICE_UNAVAILABLE);

    }

    @Override
    public ResponseEntity<String> removeUserFromEvent(/*@RequestBody Integer userID, @RequestBody Integer eventID*/){

        return new ResponseEntity<>("Server error: Service Currently Not Available.", HttpStatus.SERVICE_UNAVAILABLE);
    }


}
