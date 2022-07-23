import React, { useState, useContext, useReducer, useEffect } from 'react'
import dummyEvents from "../../dummyEventsRegistered"
import initial_state from "./inital_state"
import reducer from './MyEventsReducer'

const MyEventContext = React.createContext()
const init_state = {...new initial_state}

const MyEventProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, init_state)

    const getEvents = () => {
        const events = dummyEvents
        dispatch({type: "DISPLAY_EVENTS", payload:events})

        // getEventCategories(events)
        // getEventLocations(events)
    }

    const getEventCategories = (events) => {
        const categories = []
        dispatch({type: "DISPLAY_CATEGORIES", payload:categories})
    }

    const getEventLocations = (events) => {
        const locations = []
        dispatch({type: "DISPLAY_LOCATIONS", payload:locations})
    }

    const navigateToEvent = (id) => {
        console.log('TODO: Naviagtion')
    }

    const openEventFilter = () => {
        dispatch({type: "OPEN_EVENT_FILTER_MODAL"})
    }

    const filterEvents = () => {
        console.log("TODO: Filter Events")
    }
 
    const selectFilterLocation = (value) => {
        dispatch({type: "SELECT_EVENT_LOCATION"})
    }

    const selectFilterCategory = (value) => {
        dispatch({type: "SELECT_EVENT_CATEGORY"})
    }

    const selectFilterAges = (minAge, maxAge) => {
        dispatch({type: "SELECT_EVENT_AGES"})
    }

    const selectFilterDays = (days) => {
        dispatch({type: "SELECT_EVENT_DAYS"})
    }

    const selectFilterTimes = (startTime, endTime) => {
        dispatch({type: "SELECT_EVENT_TIME_RANGE"})
    }

    const selectFilterAnytime = () => {
        dispatch({type: "SELECT_EVENT_ANY_TIME"})
    }

    const selectFilterOrderBy = () => {

    }

    const selectEventName = (value) => {
        dispatch({type: "SELECT_EVENT_NAME"})
    }

    const resetEventFilter = () => {
        selectFilterAges(0,99)
        selectFilterCategory('')
        selectFilterDays([])
        selectFilterLocation('')
        selectFilterDays([0,1,2,3,4,5,6])
        selectFilterTimes({},{})
        selectFilterOrderBy()
    }

    const closeEventFilter = () => {
        dispatch({type: "CLOSE_EVENT_FILTER_MODAL"})
    }
    const openDropEventModal = (id) => {
        const event = state.events.filter((event) => event.id == id)[0]
        console.log(event)
        dispatch({type: "OPEN_DROP_MODAL",payload:event})
    }

    const dropEvent = (id) => {
        console.log("TODO: Drop Event")
        closeDropEventModal()
    }

    const closeDropEventModal = () =>{
        dispatch({type: "CLOSE_DROP_MODAL"})
    }

    openEventInSchedule = () => {
        console.log("TODO: Open schedule")
    }


    useEffect(() => {
        getEvents()
    },[])
    return (
        <MyEventContext.Provider value={{
            ...state,
            openEventInSchedule,
            closeDropEventModal,
            dropEvent,
            openDropEventModal,
            openEventFilter,
            selectEventName,
            selectFilterAges,
            selectFilterCategory,
            selectFilterDays,
            selectFilterLocation,
            selectFilterOrderBy,
            selectFilterTimes,
            selectFilterAnytime,
            filterEvents,
            resetEventFilter,
            closeEventFilter,
            navigateToEvent,
        }}>
            {children}
        </MyEventContext.Provider>
    );
}

const useMyEventContext = () => {
    return useContext(MyEventContext)
  }
  
  export { MyEventContext, MyEventProvider, useMyEventContext }