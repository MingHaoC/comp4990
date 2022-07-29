const reducer = (state, action) => {
    if(action.type == "DISPLAY_EVENTS")
    {
        return {...state, events: action.payload}
    }
    if(action.type == "DISPLAY_CATEGORIES")
    {
        return {...state, events: action.payload}
    }
    if(action.type == "DISPLAY_LOCATIONS")
    {

        return {...state}
    }
    if(action.type == "OPEN_DROP_MODAL"){
        const newDropModalState = state.drop_event_modal
        newDropModalState.is_open = true
        newDropModalState.event_selected = action.payload
        console.log(action.payload)
        return {...state, drop_event_modal: newDropModalState}
    }
    if(action.type == "CLOSE_DROP_MODAL"){
        const newDropModalState = state.drop_event_modal
        newDropModalState.is_open = false
        newDropModalState.event_selected = state.undefined_event
        return {...state, drop_event_modal: newDropModalState}
    }
    if(action.type == "OPEN_EVENT_FILTER_MODAL"){
        const newFilterState = state.event_filter
        newFilterState.is_open = true
        return {...state, event_filter: newFilterState}
    }
    if(action.type == "SELECT_EVENT_NAME"){
        return {...state}
    }
    if(action.type == "SELECT_EVENT_TIME_RANGE"){
        let newFilter = {...state.event_filter}
        newFilter.time.before_time = action.payload.before_time
        newFilter.time.after_time = action.payload.after_time
        return {...state, event_filter: newFilter}
    }
    if(action.type == "SELECT_EVENT_LOCATION"){
        let newFilter = {...state.event_filter}
        newFilter.location.selected = action.payload
        return {...state, event_filter: newFilter}
    } 
    if(action.type == "SELECT_EVENT_CATEGORY"){
        let newFilter = {...state.event_filter}
        newFilter.category.selected = action.payload
        return {...state, event_filter: newFilter}
    }
    if(action.type == "SELECT_EVENT_AGES"){
        let newFilter = {...state.event_filter}
        newFilter.age.min_age = action.payload.min_age
        newFilter.age.max_age = action.payload.max_age
        return {...state, event_filter: newFilter}
    }
    if(action.type == "SELECT_EVENT_ANY_TIME"){
        let newFilter = {...state.event_filter}
        newFilter.time.any_time = action.payload
        return {...state, event_filter: newFilter}
    }
    if(action.type == "SELECT_EVENT_DAYS"){
        let newFilter = {...state.event_filter}
        newFilter.days.days_selected = action.payload
        return {...state, event_filter: newFilter}
    }
    if(action.type == "CLOSE_EVENT_FILTER_MODAL"){
        const newFilterState = state.event_filter
        newFilterState.is_open = false
        return {...state, event_filter: newFilterState}
    }
    throw new Error('no matching action type')
}

export default reducer
