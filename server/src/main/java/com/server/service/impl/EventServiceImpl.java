package com.server.service.impl;

import com.server.model.Event;
import com.server.repository.EventRepository;
import com.server.service.EventService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;

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
}
