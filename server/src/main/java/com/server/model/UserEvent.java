package com.server.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "users_events")
public class UserEvent {

    @EmbeddedId
    UserEventKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @MapsId("eventId")
    @JoinColumn(name = "event_id")
    Event event;

    public UserEvent(UserEventKey id) {
        this.id = id;
    }

    public UserEvent(UserEventKey id, User user, Event event) {
        this.id = id;
        this.user = user;
        this.event = event;
    }

    public UserEvent(User user, Event event) {
        this.user = user;
        this.event = event;
    }
}
