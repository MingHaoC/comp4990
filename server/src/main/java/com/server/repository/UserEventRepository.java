package com.server.repository;

import com.server.model.UserEvent;
import com.server.model.UserEventKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEventRepository extends JpaRepository<UserEvent, UserEventKey> {
}
