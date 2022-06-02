package com.server.repository;

import com.server.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer> {

    Optional<Event> findById(Integer id);
    List<Event> findAll();

    @Query("SELECT eu.user.id FROM Event e LEFT JOIN UserEvent eu on e.eventId = eu.event.eventId WHERE e.eventId = :eventId")
    List<Integer> getUserRegisterInEvent(@Param("eventId") Integer eventId);

}
