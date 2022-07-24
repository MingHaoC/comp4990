import { View, Text, Pressable, ScrollView, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Paper, ProjectButton, ProjectTextInput, Underline, ProjectHeader, Accordian } from '../../components'
import styles from '../../styles'
import { FindEventProvider, useFindEventContext } from '../../actions/Find Events/FindEventsContext'
import EventDetails from './find-events-modals/EventDetails'
import EventFilter from './find-events-modals/EventFilter'
import AvailabilityFilter from './find-events-modals/AvailabilityFilter'
import RegisterForEvent from './find-events-modals/RegisterForEvent'
import ConfirmEventRegistration from './find-events-modals/ConfirmEventRegistration'
import Icon from 'react-native-vector-icons/FontAwesome';

/** 
 * This screen is used to allow users to view, search, and register for events
 * @returns JSX Find Event Screen
 */
const FindEvents = (props) => {

    return (
    <FindEventProvider>
        <StatusBar />
        <FindEventsContent {...props} />

        {/*MODALS */}
        <EventDetails />
        <EventFilter />
        <AvailabilityFilter />
        <RegisterForEvent />
        <ConfirmEventRegistration />
    </FindEventProvider>
  )
}
/**
 * We use this component because you cannot directly access a context in the provider component.
 * @returns JSX FindEvents Page Content
 */
const FindEventsContent = ({navigation}) => {
    const { 
        openEventFilterModal,
        filterEvents,
        event_filter,
        selectEventName
    } = useFindEventContext();

    const {
        name
    } = event_filter
    
    return (
        <>

    {/*Top of Screen, opens drawer and notifications*/}
    <ProjectHeader navigation={navigation}>

        {/* Search for Event By Name*/}
        <ProjectTextInput   placeholder='Find Events...' 
            form_input_error_text={[styles.disappeared]} 
            form_input={[styles.margin_bottom_small]} 
            form_input_label={[styles.disappeared]}
            onChangeText={(value) => {
                selectEventName(value)
            }}

        />

    </ProjectHeader>

    {/*Background */} 
    <View style={[
        styles.container, 
        styles.padding_large
    ]}>

        {/*Container for Toggle Filter Button*/}
        <Paper style={[
            styles.margin_vertical_medium,
        ]}>

            {/*Toggle Filter Button*/}
            <Pressable onPress={() => {openEventFilterModal()}}>
                <Text style={[
                    styles.text_medium,
                    styles.center,
                    styles.margin_vertical_medium
                ]}>
                    <Icon name='filter' style={[styles.text_medium]}/> 
                    <Text style={styles.theme_tinted_colour}>  Filter Events</Text>
                </Text>
            </Pressable>

        </Paper>

        {/*Events*/}
        <Paper style={[ styles.center]}>

                <ScrollView>

                    <Events />
                    
                </ScrollView>
        </Paper>    
    </View>

    </>
    );
}

/**
 * A List of Events with Name, Description, and an option to read more only.
 * @returns JSX List of Events
 */
const Events = () => {
    const {events} = useFindEventContext()

    return(
    <View style={[
        styles.padding_horizontal_medium,
        styles.margin_bottom_xlarge
    ]}>
        {/*Display Number of Results */}
        <View style={[
            styles.row, 
            styles.padding_horizontal_medium
        ]}>

            {/*Label */}
            <Text style={[
                styles.text_medium, 
                styles.theme_tinted_colour,
                styles.bold,
            ]} 
            >Event Results</Text>

            {/*Value */}
            <Text style={[
                styles.text_medium, 
                styles.theme_tinted_colour,
                styles.bold
            ]} 
            >{events.length} Results</Text>

        </View>

        <Underline />

        {/*Event List*/}
        <ScrollView>
        {
            events.map((event) =>{
                return <Event {...event} key={event.id}/>
            })
        }
        </ScrollView>

    </View>);
}

/**
 * Condensed Event Items. Shows Name, Description, and option to read more
 * @returns JSX Event Item
 */ 
const Event = ({id, name, description}) => {

    //Get props and actions from context
    const {
        openEventDetailsModal
    } = useFindEventContext()


    return(
    <View style={styles.margin_vertical_medium}> 

        {/*Event Container */}
        <Paper   title={name} 
            header={2} 
            headerTitleStyle={[
                styles.h1, 
                styles.theme_tinted_colour,
                ]}>

                {/*Content Container (Not including title) */}
                <View style={[
                    styles.column,
                    styles.padding_medium,
                    styles.padding_top_small,
                ]}>
                    {/*Description */}
                    <Text style={[
                                    styles.text_medium,
                                    styles.muted_text_1_colour, 
                                    styles.padding_bottom_large
                                ]}
                    >{description}</Text>

                    <ProjectButton title='More Information' 
                        onPress={() => {openEventDetailsModal(id)}}
                    />

                </View>
        </Paper>
    </View>
    );
}

export default FindEvents