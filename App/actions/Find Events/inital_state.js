/**
 * Initial state for FindEvent
 */ 
export default class initial_state {
    constructor() {

        //Default Event Values. Falls back on these values in case of null/undefined values
        this.undefined_event = {                
            id: -1,
            name: "undefined",
            description: "undefined",
            min_age: 0,
            max_age: 100,
            category: "undefined",
            drop_in: true,
            price: -10000,
            prerequisite_programs: [],
            availabilities: []
        }

        this.events = []            //fetched events 
        this.renderedEvents = []    //events that match the applied filter

        /**
         * Event filter properties.
         * These properties control the event filter modal as well as determine which events should be rendered
         */
        this.event_filter = {

            is_open: false,     //indicates if the event filter modal is open
            name: '',           //event name

            /**
             * A user can select values to indicate that they wish to view events occouring on these days
             * A rendered event's days should be a subset of the selected days
             */
            days: {
                //data used to fill inline select. All possible options
                data: [
                    {
                        id: 0,
                        label: 'S',
                        value: 'Sun',
                    },
                    {
                        id: 1,
                        label: 'M',
                        value: 'Mon',
                    },
                    {
                        id:2,
                        label: 'T',
                        value: 'Tues',
                    },
                    {
                        id: 3,
                        label: 'W',
                        value: 'Wed',
                    },
                    {
                        id: 4,
                        label: 'T',
                        value: 'Thurs',
                    },
                    {
                        id: 5,
                        label: 'F',
                        value: 'Fri',
                    },
                    {
                        id: 6,
                        label: 'S',
                        value: 'Sat',
                    }
                ],
                //Indcates which events selected. AKA what should appear as selected/what event days should be filtered by
                days_selected: [0,1,2,3,4,5,6]    
            },

            /**
             * A range of time an event may fall within.
             * If an event does not fall within the time range, then on filter it is not rendered
             */
            time: {
                any_time: true,  //before/after time are disregarded/hidden if true

                //Search for events occouring before this time
                before_time: {
                    hour: '11',
                    minute: '59',
                    ante_meridian: 'PM'
                },
                
                //Search for events occouring after this time
                after_time: {
                    hour: '12',
                    minute: '00',
                    ante_meridian: 'AM'
                },

            },
            /**
             * Determines the category of the events shown
             * In the Event Filter Modal, this value is a dropdown select so only 1 can be selected at a time
             */
            category: {
                selected: '',
                items: []   ////all possible options
            },
            /**
             * Determines the location of where the events shown takes place
             * In the Event Filter Modal, this value is a dropdown select so only 1 can be selected at a time
             */
            location: {
                selected: '',
                items: []   //all possible options
            },
            /**
             * Determines the age range for the events shown
             */
            age:{
                min_age: '',
                max_age: '',
            }

        },
        /**
         * These properties are speciifc to single events rather than a range of events
         * These properties/action associated with them are nested within the event details modal
         */
        this.event_details = {
            is_open: false, //indicates if modal is open
            event_selected: this.undefined_event,   //shown in case of error
            rendered_availabilities: [],    //availabilities that match the filters
            
            /**
             * Event Availabilities filter.
             * Determines which availabilities are displayed in the event details modals
             * These properites are set/updated in the Availabilities Filter Modal
             */
            availability_filter: {
                //These props are the exact same as in event_filter
                is_open: false,                         //Indicates if the availabilies filter modal is open/closed
                location: this.event_filter.location,   //location of the avilabilies shown
                days: this.event_filter.days,           //days the event opening lands on
                time: this.event_filter.time,           //time range of availabilities shown

                /**
                 * Inline single select. Indicate the order of availabilities show
                 */
                order_by: {
                    value:{
                        //data used to fill inline select. All possible options
                        data: [
                            {
                                id: 0,
                                label: 'Start Date',
                                value: 'start_date',
                            },
                            {
                                id: 1,
                                label: 'End Date',
                                value: 'end_date',
                            }
                        ],
                        value_selected: [0]
                    },  
                    //data used to fill inline select. All possible options
                    direction: {
                        data: [
                            {
                                id: 0,
                                label: 'A',
                                value: 'ascending',
                            },
                            {
                                id: 1,
                                label: 'D',
                                value: 'descending',
                            }
                        ],
                        direction_selected: [0]
                    }
                }
            },
            /**
             * Properties used to render the 'register for event modal'
             */
            register: {
                selected_availability: {other_information: ''},
                is_open: false, //indicates if the modal is open or closed
                displays: ['additional info', 'confirm'],   //the registermodal is kinda like a caroseul, in that when you click next just the content styas the same but the container remains the same
                current_display: 0  //current content being displayed
            }
        }
        /**
         * Properties used to render the register modal
         */
        this.register_result = {
            is_open: false, //indicates if the modal is open or closed
            success: true   //indicates the success of an event registration attempt
        }
    }
}