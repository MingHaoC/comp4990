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

    /**
     * Gets the event information with the given ID
     *
     * @param id JSON object containing the following field:
     *           id: Integer
     *
     * @return
     */
    @GetMapping
    public ResponseEntity<Event> getEvent(@RequestBody Integer id) {
        return eventService.getEvent(id);
    }

    /**
     * gets a list of all the events currently stored within our database
     *
     * @return
     */
    @GetMapping(EVENT_LIST)
    public ResponseEntity<List<Event>> getEventList() {
        return eventService.getAllEvents();
    }

    /**
     * Registers the user for an event
     *
     * @param event JSON object with the following fields:
     *              eventTitle: String
     *              eventDescription: String
     *              location: String
     *              times: Date
     *              emailContact: String
     *              phoneContact: String
     *              tags: String
     *
     * @param userID in the endpoint as a parameter
     *              ex: /event/register?userID=12
     * @return
     */
    @PostMapping(NEW_EVENT)
    public ResponseEntity<String> registerForNewEvent(@RequestBody Event event, @RequestParam Integer userID) {
        return eventService.userRegisterForNewEvent(event, userID);
    }

    /**
     * removes a user from being registered to an event
     *
     * @param - JSON object containing the following fields
     *                userID: Integer,
     *                eventID: Integer
     *
     * @return
     */
    @PostMapping(CANCEL_EVENT)
    public ResponseEntity<String> cancelEvent(Integer userID, Integer eventID){
        return eventService.removeUserFromEvent(userID, eventID);
    }

}
