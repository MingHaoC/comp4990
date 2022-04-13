package com.server.model;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

// todo: might need to update the model to match the k2 database user schema

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "events")
public class Event {

    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    public Integer eventId;

    @Column(name = "title")
    public String eventTitle;

    @Column(name = "description")
    public String eventDescription;

    // what to do if the event has multiple days/time slots?
    @Column(name = "times")
    public Date times;

    @Column(name = "location")
    public String location;

    // may need to break this up into different methods of contact
    // email/phone
    @Column(name = "contact")
    public String contact;

    //optional
    // if we want to tag events to break them up into categories
    // language/entertainment/lessons etc.
    @Column(name = "tags")
    public String tags;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

}
