package com.server.service.impl;

import com.server.model.Event;
import com.server.repository.EventRepository;
import com.server.service.EventService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Getter
@Setter
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;

    @Override
    public Event loadEventById(Integer id) throws Exception {

        Optional<Event> event = eventRepository.findById(id);
        if(event.isPresent())
            return loadEventById(id);
        else
            throw new Exception("Event not found with the ID: " + id);

    }

    @Override
    public List<Event> loadEvents() throws Exception {

        List<Event> events = eventRepository.findAll();
        if(!events.isEmpty())
            return events;
        else
            throw new Exception("There are no events.");



    }
}
