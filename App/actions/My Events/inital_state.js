/**
 * Initial state for My Events
 */ 
 export default class initial_state {
    constructor() {

        //Default Event Values. Falls back on these values in case of null/undefined values
        this.undefined_event = {                
            id: -1,
            name: "undefined",
            description: "",
            other_information: "",
            location: "",
            category: "",
            start_date: "undefined",
            end_date: "undefined",
            start_time: {hour:0,minute:0,ante_meridian:"AM"},
            end_time: {hour:0,minute:0,ante_meridian:"AM"},
            days_of_the_week: [],
            min_age: 0,
            max_age: 100
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

        }
 
        /**
         * Modal used to confirm if a user would like to drop an event
         */
        this.drop_event_modal = {
            is_open: false,                        //Indicates if the modal is open or closed
            event_selected: this.undefined_event   //The event the user has selected to drop
        }
    }
 }