import React, { useContext, useReducer, useEffect } from 'react'
import { useAppContext } from '../../context'
import dummyEvents from '../../dummyEvents'
import fromExternalToProjectFormat from '../../services/eventAdapter'
import reducer from './findEventsReducer'
import initial_state from './inital_state'
const FindEventContext = React.createContext()


const init_state = {...new initial_state()}


const FindEventProvider = ({children}) => {
    const {
        fetchEventList,
        registerEventPOST
    } = useAppContext()
    
    const [state, dispatch] = useReducer(reducer, init_state)

    const get24HourTime = (hour, minute, ante_meridian) => {
        let hour24 = hour
        if(hour == 12){
            switch (ante_meridian) { 
                case 'AM':
                    hour24 = 0
                    break;
            
                case 'PM':
                    hour = 12
                    break;
            }
        }
        else{
            if(ante_meridian == 'PM'){
                hour24 += 12
            }
        }

        return new Date(2020,1,2,hour24,minute)
    }

    /**
     * Opens event filter
     * Sets state of event_filter.is_open
     */
    const openEventFilterModal = () => {
        dispatch({type: 'OPEN_EVENT_FILTER'}) 

    }

    /**
     * Updates state of event_details.is_open to true as to show the Event Details modal
     */
    const openEventDetailsModal = (id) => {
        //Get selected event
        const selected_event = state.events.filter((event) => fromExternalToProjectFormat(event).id == id)[0]
        const internalEvent = fromExternalToProjectFormat(selected_event)
        dispatch({type: "FILTER_AVAILABILITIES", payload: internalEvent.availabilities})
        dispatch({type: 'OPEN_EVENT_DETAILS', payload: internalEvent})
    }

    /**
     * Opens the registration modal for an event after selecting an availability
     * @param {Number} availabilityBarcode Unqiue code applied to an availability
     */
    const openRegisterModal = (availabilityBarcode) => {
        const avail = state.event_details.event_selected.availabilities.filter((a) => a.barcode == availabilityBarcode)[0]
        dispatch({type: "OPEN_REGISTRATION_MODAL", payload: avail})
    }

    /**
     * Closes the registration modal for an event
     */
    const closeEventDetailsModal = () => {
        dispatch({type: 'CLOSE_EVENT_DETAILS', payload: state.undefined_event})

    }

    const viewInSchedule = (eventId, availabilityBarcode) => {
        console.log("WIP")
    }

    /**
     * Opens availabilty filter modal
     */
    const openAvilabilitiesFilter = () => {
        dispatch({type: "OPEN_AVAILABILITIES_FILTER"})
    }

    /**
     * Updates the value of event_filter.is_open to true as to show the event filter modal
     */
    const closeEventFilterModal = () => {
        dispatch({type: 'CLOSE_EVENT_FILTER'})

    }

    const filterEvents = () => {
        const any_time = state.event_filter.time.any_time
        const min_age = state.event_filter.age.min_age
        const max_age = state.event_filter.age.max_age
        const location = state.event_filter.location.selected
        const category = state.event_filter.category.selected
        const before_time = state.event_filter.time.before_time
        const after_time = state.event_filter.time.after_time
        let days_values = []

        state.event_filter.days.data.forEach(item => {
            if(state.event_filter.days.days_selected.includes(item.id) ){
                days_values.push(item.value)
            }
        })

        const filteredEvents = state.events.filter((event) => { 
            let formattedEvent = fromExternalToProjectFormat(event)
            /*Check if name has been passed. If it has -> filter by passed value, otherwise filter by stored value */

            let validMinAge = (formattedEvent.min_age >= min_age) || min_age == undefined

            let validMaxAge = (formattedEvent.max_age <= max_age) || max_age == undefined || max_age.length <= 0

            let validLocation = (formattedEvent.availabilities && ((formattedEvent.availabilities.filter((a) => a.location == location).length > 0) || location.trim().length == 0))
            
            let validCategory =  (formattedEvent.category && ((formattedEvent.category == category) || category.trim().length <= 0))

            //Check that there is at least 1 availability in an event where 'days of the week' is a subset of 'days selected'
            let isSubset = false;
            if(formattedEvent.availabilities){
                formattedEvent.availabilities.forEach((a) => {
                    let result = a.days_of_the_week.every(val => days_values.includes(val));
                    if(result){isSubset = true}
                })
            }

            const validDays = isSubset

            let validTimes = true;
            if(!any_time){
                let validTimes = false;
                //TODO Account for 12 AM / 12PM. 12PM stays the same and 12AM == 0
                let beforeHour = before_time.ante_meridian == 'PM' ? Number(before_time.hour) + 12 : Number(before_time.hour)
                const filterBeforeTime = new Date(2020,1,2,beforeHour,Number(before_time.minute)).getTime()

                let afterHour = after_time.ante_meridian == 'PM' ? Number(after_time.hour) + 12 : Number(after_time.hour)
                const filterAfterTime = new Date(2020,1,2,afterHour,Number(after_time.minute)).getTime()

                if(event.availabilities){
                    event.availabilities.forEach((a) => {
                        if(a.start_time && a.end_time){
                            let startHour = a.start_time.ante_meridian == 'PM' ? Number(a.start_time.hour) + 12 : Number(a.start_time.hour)
                            console.log(a.start_time.ante_meridian)
                            let start = new Date(2020,1,2,startHour,Number(a.start_time.minute)).getTime()
                            let after = new Date(2020,1,2,a.end_time.ante_meridian == 'PM' ? Number(a.end_time.hour) + 12 : Number(a.end_time.hour),Number(a.end_time.minute)).getTime()
                            console.log('Hour:'+ new Date(start).toLocaleTimeString())
                            console.log('Filter Before Hour:'+ new Date(filterBeforeTime).toLocaleTimeString())
                            console.log('Filter After Hour:'+ new Date(filterAfterTime).toLocaleTimeString())

                            if(start <= filterBeforeTime && start >= filterAfterTime){
                                console.log('success')
                                validTimes = true
                            }
                        }

                    })
                }
            }

            return validMinAge && validMaxAge && validLocation && validCategory && validDays && validTimes
        })

        dispatch({type: 'FILTER_EVENTS', payload: filteredEvents})

    }

    const resetEventFilter = () => {
        const defaultDaysSelected = [0,1,2,3,4,5,6]
        const defaultAnytime = true
        const defaultCategory = '' 
        const defaultLocation = ''
        const defaultMinAge = ''
        const defaultMaxAge = ''

        selectEventDays(defaultDaysSelected)
        selectEventAnytime(defaultAnytime)
        selectEventCategory(defaultCategory)
        selectEventLocation(defaultLocation)
        selectEventAges(defaultMinAge, defaultMaxAge)

    }

    const selectEventAnytime = (value) => {
        dispatch({type:"SELECT_EVENT_ANY_TIME", payload: value})
    }
    const selectEventDays = (selected) => {
        //The inline select returns the full data object. We only need the id, so we will map to it
        dispatch({type: "SELECT_EVENT_DAYS", payload: selected.map(item => item.id)})
    }

    const selectEventAges = (min_age,max_age) => {
        //TODO: check if valid
        dispatch({type: "SELECT_EVENT_AGES", payload: {min_age,max_age}})
    }
    const selectEventCategory = (value) => {
        dispatch({type:"SELECT_EVENT_CATEGORY", payload:value})
    }
    const selectEventLocation = (value) => {
        dispatch({type:"SELECT_EVENT_LOCATION", payload:value})
    }
    const selectEventName = (value) => {
        dispatch({type:"SELECT_EVENT_NAME", payload:value})
    }

    const selectEventTimeRange = (after_hour,after_minute,after_ante_merdian, before_hour, before_minute, before_ante_merdian) => {
        const before_time = {
            hour: `${before_hour}`,
            minute: `${before_minute}`,
            ante_meridian: before_ante_merdian
        }
        const after_time = {
            hour: `${after_hour}`,
            minute: `${after_minute}`,
            ante_meridian: after_ante_merdian
        }
        dispatch({type: "SELECT_EVENT_TIME_RANGE", payload: {before_time,after_time}})
    }

    /**
     * Sends a request to register an event to the server
     */
    const registerForEvent = async() => {
        dispatch({type: "SET_REGISTER_LOADING", payload: true})
        await registerEventPOST({
            tags: state.event_details.event_selected.category,
            eventTitle: state.event_details.event_selected.name,
            eventDescription: state.event_details.event_selected.description,
            location: state.event_details.register.selected_availability.location,
            emailContact: JSON.stringify({
                days_of_the_week: state.event_details.register.selected_availability.days_of_the_week,
                start_time: state.event_details.register.selected_availability.start_time,
                end_time: state.event_details.register.selected_availability.end_time,
                start_date: state.event_details.register.selected_availability.start_date,
            })
        })
        dispatch({type: "SET_REGISTER_LOADING", payload: false})

        //Close any modals that potentially are open
        closeAvilabilitiesFilter()
        closeEventDetailsModal()
        closeEventFilterModal()
        closeRegisterModal()

        dispatch({type:"OPEN_REGISTRATION_STATUS_MODAL", payload:true})
    }

    /**
     * Closes the 
     */
    const closeRegisterModal = () => {
        dispatch({type: "CLOSE_REGISTRATION_MODAL"})
    }

    const showNextRegisterDisplay = () => {
        const displays_length = state.event_details.register.displays.length
        const current_display = state.event_details.register.current_display

        let newIndex = 0

        //ensure new index is in range
        if(current_display + 1 >= displays_length){
            newIndex = displays_length - 1
        }else{
            newIndex += 1
        }

        dispatch({type: "UPDATE_REGISTRATION_MODAL_DISPLAY", payload: newIndex})

    }

    const showPreviousRegisterDisplay = () => {
        const current_display = state.event_details.register.current_display;
        //ensure new index is in range
        const newIndex = current_display-1 < 0 ? current_display : current_display - 1
        dispatch({type: "UPDATE_REGISTRATION_MODAL_DISPLAY", payload: newIndex})    }


    //#endregion

    //#region Availabilities Filter

    const selectAvailabilitiesOrderDirection = (value) => {
        dispatch({type: "SELECT_AVAILABLE_ORDER_BY_DIRECTION", payload: value})
    }

    const selectAvailabilitiesOrderValue = (value) => {
        dispatch({type: "SELECT_AVAILABLE_ORDER_BY_VALUE", payload: value})
    }

    const selectAvailabilityLocation = (value) =>  {
        dispatch({type: "SELECT_AVAILABLE_LOCATION", payload: value})
    }

    const selectAvailableTimeRange = (after_hour,after_minute,after_ante_merdian, before_hour, before_minute, before_ante_merdian) => {
        const before_time = {
            hour: `${before_hour}`,
            minute: `${before_minute}`,
            ante_meridian: before_ante_merdian
        }
        const after_time = {
            hour: `${after_hour}`,
            minute: `${after_minute}`,
            ante_meridian: after_ante_merdian
        }
        dispatch({type: "SELECT_AVAILABLE_TIME_RANGE", payload: {after_time, before_time}})

    }
    const selectAvailabilityAnytime = (value) => {
        dispatch({type: "SELECT_AVAILABLE_ANY_TIME", payload: value})
    }
    const selectAvailableDays = (value) => {
        dispatch({type: "SELECT_AVAILABLE_DAYS", payload: value.map(item => item.id)})
    }

    const closeAvilabilitiesFilter = () => {
        dispatch({type: "CLOSE_AVAILABILITIES_FILTER"})
    }

    const applyAvailabilitiesFilter = () => {
        const any_time = state.event_details.availability_filter.time.any_time
        const before_time = state.event_details.availability_filter.time.before_time
        const after_time = state.event_details.availability_filter.time.after_time
        const location = state.event_details.availability_filter.location.selected
        const order_by_value = state.event_details.availability_filter.order_by.value.value_selected[0]
        const order_by_direction = state.event_details.availability_filter.order_by.direction.direction_selected[0]
        const days_selected = state.event_details.availability_filter.days.days_selected
        const days_data = state.event_details.availability_filter.days.data
        const days_selected_values = []
        days_data.forEach(day => days_selected.includes(day.id) ? days_selected_values.push(day.value) : '' )
        const availabilities = state.event_details.event_selected.availabilities

        const availabilitiesFiltered = availabilities.filter((availability) => {
            //Times are valid if they are between the [after_time,before_time] interval
            let isValidStartTime = true
            let isValidEndTime = true

            /*location is valid if availability location matches filter location or if filter location  is undefined */
            let isValidLocation = (availability.location == location) || !location

            /*availability days must be a subset of selected days */
            let isValidDays = availability.days_of_the_week.every(day => days_selected_values.includes(day))

            if(!any_time){
                let start_time = availability.start_time
                let end_time = availability.end_time
                isValidStartTime = false
                isValidEndTime = false

                //get time in miliseconds
                let before_time_mili = get24HourTime(before_time.hour, before_time.minute, before_time.ante_meridian)
                let after_time_mili = get24HourTime(after_time.hour, after_time.minute, after_time.ante_meridian)
                let start_time_mili = get24HourTime(start_time.hour, start_time.minute, start_time.ante_meridian)
                let end_time_mili = get24HourTime(end_time.hour, end_time.minute, end_time.ante_meridian)

                if(start_time_mili <= before_time_mili && start_time_mili >= after_time_mili){
                    isValidStartTime = true
                }

                if(end_time_mili <= before_time_mili && end_time_mili >= after_time_mili){
                    isValidEndTime = true
                }

            }

            return isValidDays && isValidStartTime && isValidEndTime && isValidLocation
        })
        availabilities.sort(function(a,b) {
            const aDate = new Date(a[order_by_value]);
            const bDate = new Date(b[order_by_value]);
            return aDate - bDate;
        })

        //descending id
        if(order_by_direction == 1){
            availabilitiesFiltered.reverse()
        }
        dispatch({type: "FILTER_AVAILABILITIES", payload: availabilitiesFiltered})

    }

    const resetAvailabilitiesFilter = () => {
        console.log("coming soon...")
    }

    //#endregion

    //#region Register Result Modal
    const closeRegisterResultModal = () => {
        closeAvilabilitiesFilter()
        closeEventDetailsModal()
        closeEventFilterModal()
        closeRegisterModal()
        dispatch({type: "CLOSE_REGISTRATION_STATUS_MODAL"})
    }

    const viewRegisteredEvents = () => {

    }
    //#endregion

    //#region Private Methods

    /**
     * Gets all the events
     */
    const _getEvents = async() => {
        let events = []
        try {
            dispatch({type: "SET_LOADING", payload: true})
                events = await fetchEventList();

        } catch (error) {
            
        }
        dispatch({type: "SET_LOADING", payload: false})
        dispatch({type: 'DISPLAY_EVENTS', payload: events})
    }

    /**
     * Gets all event categories
     * Can be selected in event filter
     */
    const _getEventCategories = () => {
        //Get all catgeories
        let categories = state.events.map((event) => {
            if(event.category){
                return event.category
            }else{
                return " "
            } 
        })
        //Remove duplicates
        categories = [...new Set(categories)]

        let filteredCatgories = categories.filter(c => c.trim().length > 0)

        //Get in correct format for select
        filteredCatgories = filteredCatgories.map((category) => {
            return {label: category, value: category}
        }) 
        dispatch({type: 'DISPLAY_CATEGORIES', payload: filteredCatgories})

    }

    /**
     * Gets all the locations from listed events 
     * Used in event filter
     */
    const _getEventLocations = () => {
        let locations = []

        //Get all locations
        state.events.forEach(event => {
            let avil = event.availabilities 
            if(avil != undefined){
                let locationsFound = avil.map((a) => {
                    if(a.location){
                        return a.location
                    }else{
                        return " "
                    }

                })
                Array.prototype.push.apply(locations,locationsFound); 
            }
        }); 
        //Remove duplicates
        locations = [...new Set(locations)]

        //Remove empty strings
        let filteredLocations = locations.filter(l => l.trim().length > 0)

        //Get in correct format for filter select
        const locationsObjects = filteredLocations.map((location) => {
            if(location){
                return {label: location, value: location}
            }
        })
        dispatch({type: 'DISPLAY_LOCATIONS', payload: locationsObjects})
    }

    /**
     * Ensures that the filter values of the availabilites filter is the same as event filter
     */
    const _setAvailabilitiesFilter = () => {
        //TODO
          //set the avilability filter to match the evnt filter
        // selectAvailabilityAnytime(state.event_filter.time.any_time)
        // selectAvailabilityLocation(state.event_filter.location.selected)
        // selectAvailableDays(state.event_filter.days.days_selected)
        // const before_time = {
        //     hour: state.event_filter.time.before_time.hour,
        //     minute: state.event_filter.time.before_time.minute,
        //     ante_meridian: state.event_filter.time.before_time.ante_meridian,
        // }
        // const after_time = {
        //     hour: state.event_filter.time.after_time.hour,
        //     minute: state.event_filter.time.after_time.minute,
        //     ante_meridian: state.event_filter.time.after_time.ante_meridian,
        // }
        // selectEventTimeRange(after_time.hour,after_time.minute,after_time.ante_meridian,before_time.hour,before_time.minute,before_time.ante_meridian)
    }
    //#endregion

    useEffect(() => {
        _getEvents()
        _getEventCategories()
        _getEventLocations()
    }, [])

    useEffect(() => {
        filterEvents()
        applyAvailabilitiesFilter()
    }, [])

    return (
        <FindEventContext.Provider value={{
                                            ...state,
                                            showNextRegisterDisplay,
                                            showPreviousRegisterDisplay,
                                            selectAvailabilitiesOrderDirection,
                                            selectAvailabilitiesOrderValue,
                                            selectAvailabilityLocation,
                                            selectAvailableTimeRange,
                                            selectAvailabilityAnytime,
                                            selectAvailableDays,
                                            registerForEvent,
                                            openAvilabilitiesFilter,
                                            closeAvilabilitiesFilter,
                                            applyAvailabilitiesFilter,
                                            openEventDetailsModal,
                                            closeEventDetailsModal,
                                            openEventFilterModal,
                                            closeEventFilterModal,
                                            filterEvents,
                                            openRegisterModal,
                                            closeRegisterModal,
                                            viewInSchedule,
                                            resetEventFilter,
                                            resetAvailabilitiesFilter,
                                            selectEventDays,
                                            selectEventAnytime,
                                            selectEventAges,
                                            selectEventCategory,
                                            selectEventLocation,
                                            selectEventName,
                                            selectEventTimeRange,
                                            closeRegisterResultModal
                                        }}
        >
            {children}
        </FindEventContext.Provider>
    );
}
                  

// make sure use
 const useFindEventContext = () => {
    return useContext(FindEventContext)
  }
  
  export { FindEventContext, FindEventProvider, useFindEventContext }

