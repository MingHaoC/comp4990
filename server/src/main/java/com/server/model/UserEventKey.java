package com.server.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class UserEventKey implements Serializable {

    @Column(name = "user_id")
    Integer userId;

    @Column(name = "event_id")
    Integer eventId;

}
