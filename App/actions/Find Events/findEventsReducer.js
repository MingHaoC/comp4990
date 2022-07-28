import dummyEvents from "../../dummyEvents"

const reducer = (state, action) => {
    if(action.type == "SET_REGISTER_LOADING"){
        state.event_details.register.Loading = action.payload
        return {...state}
    }
    if(action.type == "SET_LOADING"){
        state.Loading = action.payload
        return {...state}
    }
    if(action.type == 'DISPLAY_EVENTS'){
        return {...state, events: action.payload}
    }
    if(action.type == 'DISPLAY_CATEGORIES'){
        const newFilterCategories = {...state.event_filter.category, items: action.payload }
        const newFilter = {...state.event_filter, category: newFilterCategories} 

        return {...state, event_filter: newFilter}
    } 
    if(action.type == 'DISPLAY_LOCATIONS'){
        const newFilterLocations = {...state.event_filter.location, items: action.payload }
        const newFilter = {...state.event_filter, location: newFilterLocations} 
        return {...state, event_filter: newFilter}
    }
    if(action.type == 'OPEN_EVENT_DETAILS'){
        const newEventDetails = {...state.event_details, is_open: true, event_selected: action.payload}
        return {...state, event_details: newEventDetails}
    }
    if(action.type == 'CLOSE_EVENT_DETAILS'){
        const newEventDetails = {...state.event_details, is_open: false, event_selected: action.payload}
        return {...state, event_details: newEventDetails}
    }
    if(action.type == 'CLOSE_EVENT_FILTER'){
        const newEventFilter = {...state.event_filter, is_open: false}
        return {...state, event_filter: newEventFilter}
    }
    if(action.type == 'OPEN_EVENT_FILTER'){
        const newEventFilter = {...state.event_filter, is_open: true}
        return {...state, event_filter: newEventFilter}
    }
    if(action.type == "SELECT_EVENT_DAYS"){
        let newFilter = {...state.event_filter}
        newFilter.days.days_selected = action.payload
        return {...state, event_filter: newFilter}
    }
    if(action.type == "SELECT_EVENT_ANY_TIME"){
        let newFilter = {...state.event_filter}
        newFilter.time.any_time = action.payload
        return {...state, event_filter: newFilter}
    }
    if(action.type == "SELECT_EVENT_AGES"){
        let newFilter = {...state.event_filter}
        newFilter.age.min_age = action.payload.min_age
        newFilter.age.max_age = action.payload.max_age
        return {...state, event_filter: newFilter}
    }
    if(action.type == "SELECT_EVENT_CATEGORY"){
        let newFilter = {...state.event_filter}
        newFilter.category.selected = action.payload
        return {...state, event_filter: newFilter}
    }
    if(action.type == "SELECT_EVENT_LOCATION"){
        let newFilter = {...state.event_filter}
        newFilter.location.selected = action.payload
        return {...state, event_filter: newFilter}
    }
    if(action.type == "SELECT_EVENT_TIME_RANGE"){
        let newFilter = {...state.event_filter}
        newFilter.time.before_time = action.payload.before_time
        newFilter.time.after_time = action.payload.after_time
        return {...state, event_filter: newFilter}
    }
    if(action.type == "SELECT_EVENT_NAME"){
        let newFilter = {...state.event_filter, name: action.payload}
        const filteredEvents = dummyEvents.filter(event => (event.name.toLowerCase().includes(action.payload.toLowerCase()) ) || (action.payload.trim().length <= 0))

        return {...state, event_filter: newFilter, events: filteredEvents}
    }
    if(action.type == 'FILTER_EVENTS'){
        return {...state, events: action.payload}
    }

    if(action.type == 'CLOSE_AVAILABILITIES_FILTER'){
        const newEventDetails = {...state.event_details}
        newEventDetails.availability_filter.is_open = false;
        return {...state, event_details: newEventDetails}
    }
    if(action.type == 'OPEN_AVAILABILITIES_FILTER'){
        const newEventDetails = {...state.event_details}
        newEventDetails.availability_filter.is_open = true;

        return {...state, event_details: newEventDetails}
    }
    if(action.type == 'FILTER_AVAILABILITIES'){
        const newEventDetails = {...state.event_details}
        newEventDetails.rendered_availabilities = action.payload
        return {...state, event_details: newEventDetails}
    }
    if(action.type == "SELECT_AVAILABLE_DAYS"){
        const newEventDetails = {...state.event_details}
        newEventDetails.availability_filter.days.days_selected = action.payload
        return {...state, event_details: newEventDetails}
    }
    if(action.type == "SELECT_AVAILABLE_ANY_TIME"){
        const newEventDetails = {...state.event_details}
        newEventDetails.availability_filter.time.any_time = action.payload
        return {...state, event_details: newEventDetails}
    }
    if(action.type == "SELECT_AVAILABLE_TIME_RANGE"){
        const newEventDetails = {...state.event_details}
        newEventDetails.availability_filter.time.before_time = action.payload.before_time
        newEventDetails.availability_filter.time.after_time = action.payload.after_time
        return {...state, event_details: newEventDetails}
    }
    if(action.type == "SELECT_AVAILABLE_LOCATION"){
        const newEventDetails = {...state.event_details}
        newEventDetails.availability_filter.location.selected = action.payload
        return {...state, event_details: newEventDetails}
    }
    if(action.type == "SELECT_AVAILABLE_ORDER_BY_VALUE"){
        const newEventDetails = {...state.event_details}
        newEventDetails.availability_filter.order_by.value.direction_selected = action.payload
        return {...state, event_details: newEventDetails}
    }
    if(action.type == "SELECT_AVAILABLE_ORDER_BY_DIRECTION"){
        const newEventDetails = {...state.event_details}
        newEventDetails.availability_filter.order_by.direction.value_selected = action.payload
        return {...state, event_details: newEventDetails}

    }

    if(action.type == "OPEN_REGISTRATION_MODAL"){
        const newEventDetails = {...state.event_details}
        newEventDetails.register.selected_availability = action.payload
        newEventDetails.register.is_open = true
        return {...state, event_details: newEventDetails}
    }
    if(action.type == "CLOSE_REGISTRATION_MODAL"){
        const newEventDetails = {...state.event_details}
        newEventDetails.register.is_open = false
        return {...state, event_details: newEventDetails}
    }
    if(action.type == "UPDATE_REGISTRATION_MODAL_DISPLAY"){
        const newEventDetails = {...state.event_details}
        newEventDetails.register.current_display = action.payload
        // console.log(newEventDetails.register.current_display)
        return {...state, event_details: newEventDetails}
    }

    if(action.type == "OPEN_REGISTRATION_STATUS_MODAL"){
        console.log("Here")
        return {...state, register_result: {is_open: true, success: action.payload}}
    }
    if(action.type == "CLOSE_REGISTRATION_STATUS_MODAL"){
        const status = {
            is_open: false,
            success: true
        }
        return {...state, register_result: status}
    }

    throw new Error('no matching action type')
}

export default reducer
