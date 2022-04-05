package com.server.service;

import com.server.model.Event;

import java.util.List;

public interface EventService {

    Event loadEventById(Integer id) throws Exception;
    List<Event> loadEvents() throws Exception;

}
