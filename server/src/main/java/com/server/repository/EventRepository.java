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

    @Query("SELECT ue.user.id FROM Event e LEFT JOIN UserEvent ue on e.eventId = ue.event.eventId WHERE e.eventId = :eventId")
    List<Integer> getUserRegisterInEvent(@Param("eventId") Integer eventId);

    @Query(value = "SELECT * FROM Events e LEFT JOIN Users_Events ue on e.event_id = ue.event_id WHERE ue.user_id = :userId", nativeQuery = true)
    List<Event> getUsersRegisteredEvents(@Param("userId") Integer userId);

//    @Query("SELECT eu.event.eventId FROM Event e LEFT JOIN UserEvent eu on e.eventId = eu.event.eventId WHERE e.eventId = :eventId AND userId = :userId")
//    List<Integer> getRegistrationRecord(@Param("eventID") Integer eventId, @Param("userId") Integer userId);

}
