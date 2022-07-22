import React from 'react';
import Event from './Event';
import PropTypes from 'prop-types';
import {Paper, Underline, Filter} from '../index'
import { View } from 'react-native';
import styles from '../../styles';
import { useState, useEffect } from 'react';
/**
 * Holds event components
 * @param {*} props - indclude an array of events
 * @returns Events component
 */
const Events = (props) => {    
    const _events = props.events

    //Use to track events listed
    const [events, setEvents] = useState(_events)

    //update events listed when _events is changed
    useEffect(() => {
        setEvents(_events)
    }, [_events])

    return (
    <>
        <Filter />

        {/* Events container */}
        <Paper  
            //Header displays # of event results
            header={3} 

            title={'Event Results'} 
            headerTitleStyle={[
                styles.bold,
                styles.attentionText_1
            ]}

            description={`${events.length} Results`} 
            descriptionStyle={[
                styles.h3,
                styles.bold,
                styles.attentionText_1,
            ]}

            headerStyle={[
                styles.row,
            ]}

            //hide underline to align description and heading on either sides of row
            underlineStyle={
                styles.disappeared
            }

        >
            {/*Becuase the underline above is hidden, add another one */}
            <Underline />

            {/*Display a Preview of Each Event*/}
            <View style={styles.form}>
                {events.map((event) => {
                    return <Event key={event.id} {...event} />
                })}
            </View>

        </Paper>
    </>
    );

}

Events.prototype = {
    events: PropTypes.array.isRequired
}

Events.defaultProps = {
    events: []
}
export default Events