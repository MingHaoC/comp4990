package com.server.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.util.*;

// todo: might need to update the model to match the k2 database user schema

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "events")
public class Event {

    //todo
    // remember to remove @nullable annotation.

    @Column(name = "event_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public Integer eventId;

    @OneToMany(mappedBy = "user")
    private List<UserEvent> users;

    @Column(name = "title")
    public String eventTitle;

    @Column(name = "description")
    @Nullable
    public String eventDescription;

    // what to do if the event has multiple days/time slots?
    @Column(name = "times")
    @Nullable
    public Date times;

    @Column(name = "location")
    @Nullable
    public String location;

    //multiple forms of contact, email and phone.
    @Column(name = "phone_contact")
    @Nullable
    public String phoneContact;

    @Column(name = "email_contact")
    @Nullable
    public String emailContact;

    //optional
    // if we want to tag events to break them up into categories
    // language/entertainment/lessons etc.
    @Column(name = "tags")
    @Nullable
    public String tags;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    public Event(String eventTitle, @Nullable String eventDescription, @Nullable Date times, @Nullable String location) {
        this.eventTitle = eventTitle;
        this.eventDescription = eventDescription;
        this.times = times;
        this.location = location;
    }

}
