package com.server.repository;

import com.server.model.UserEvent;
import com.server.model.UserEventKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserEventRepository extends JpaRepository<UserEvent, UserEventKey> {

    @Query(value = "SELECT * FROM users_events WHERE event_id = :eventID AND user_id = :userID", nativeQuery = true)
    List<UserEvent> getRegistrationRecord(@Param("eventID") Integer eventId, @Param("userID") Integer userId);


}
