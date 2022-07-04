package com.server.repository;

import com.server.model.Event;
import com.server.model.mapper.IEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer> {

    Optional<Event> findById(Integer id);
    List<Event> findAll();

    @Query("SELECT eu.user.id FROM Event e LEFT JOIN UserEvent eu on e.eventId = eu.event.eventId WHERE e.eventId = :eventId")
    List<Integer> getUserRegisterInEvent(@Param("eventId") Integer eventId);

    @Query(value = "SELECT e.eventId as eventId, e.eventTitle as eventTitle, e.eventDescription as eventDescription, e.location as location, e.times as times FROM Event e WHERE e.times BETWEEN :fromDate AND :toDate")
    List<IEvent> findAllByTimeRange(@Param("fromDate") Date fromDate, @Param("toDate") Date toDate);

//    @Query("SELECT eu.event.eventId FROM Event e LEFT JOIN UserEvent eu on e.eventId = eu.event.eventId WHERE e.eventId = :eventId AND userId = :userId")
//    List<Integer> getRegistrationRecord(@Param("eventID") Integer eventId, @Param("userId") Integer userId);

}
