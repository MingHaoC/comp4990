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
    @Query(value = "SELECT event_id FROM events WHERE title = :eventTitle " +
            "AND description = :eventDescription " +
            "AND times = :times " +
            "AND location =  :location " +
            "AND phone_contact = :phoneContact " +
            "AND email_contact = :emailContact " +
            "AND tags = :tags", nativeQuery = true)
    Integer findEventID(@Param("eventTitle")String eventTitle,
                        @Param("eventDescription")String eventDescription,
                        @Param("times")Date times,
                        @Param("location")String location,
                        @Param("phoneContact")String phoneContact,
                        @Param("emailContact")String emailContact,
                        @Param("tags")String tags);

}
