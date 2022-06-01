package com.server.repository;

import com.server.model.Event;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer> {

    Optional<Event> findById(Integer id);
    List<Event> findAll();

    @Override
    void deleteById(Integer id);

    @Override
    <S extends Event> S save(S event);

    @Override
    <S extends Event> boolean exists(Example<S> example);

    //todo checkout this query, is something wrong with it?
    @Query(value = "SELECT event_id FROM events WHERE (title = :eventTitle or :eventTitle is null) " +
            "AND (description = :eventDescription or :eventDescription = null)" +
            "AND (times = :times or times = null)" +
            "AND (location = :location or :location = null)" +
            "AND (phone_contact = :phoneContact or :phoneContact = null)" +
            "AND (email_contact = :emailContact or :emailContact = null)", nativeQuery = true)
    Integer findEventID(@Param("eventTitle")String eventTitle,
                        @Param("eventDescription")String eventDescription,
                        @Param("times")Date times,
                        @Param("location")String location,
                        @Param("phoneContact")String phoneContact,
                        @Param("emailContact")String emailContact);


    @Query("SELECT eu.user.id FROM Event e LEFT JOIN UserEvent eu on e.eventId = eu.event.eventId WHERE e.eventId = :eventId")
    List<Integer> getUserRegisterInEvent(@Param("eventId") Integer eventId);

}
