


import { View, Text, ScrollView, Modal } from 'react-native'
import React, { useContext } from 'react'
import styles from '../../../styles'
import { InlineSelect, Paper, ProjectButton, ProjectTextInput } from '../../../components'
import { useState } from 'react'
import CheckBox from 'expo-checkbox'
import RNPickerSelect from "react-native-picker-select";
import { colours } from '../../../styles/globals'
import DateTimePicker from '@react-native-community/datetimepicker'; 
import { useMyEventContext } from '../../../actions/My Events/MyEventsContext'


const EventFilter = () => {
    /*Get props and actions from context */
    const {
        closeEventFilter,
        filterEvents,
        event_filter,
        resetEventFilter
    } = useMyEventContext();

    const {
        is_open,
    } = event_filter



    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={is_open}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
        }}>
            {/*Add scroll so that no items get cut off by screen length */}
            <ScrollView style={[styles.modal_backdrop_bg]}>

                {/*Backdrop*/}
                <View style={[
                    styles.container, 
                    styles.padding_horizontal_large,
                    styles.transparent_bg
                ]}>
                    {/*Container */}
                    <Paper  title={
                            <View style={[styles.row]}>
                                <Text style={[styles.h1,styles.muted_text_2_colour, styles.margin_right_xlarge]}>Event Filter</Text>
                                <ProjectButton type='info' 
                                    title='X' 
                                    style={[
                                        styles.center, 
                                        styles.margin_left_xlarge
                                    ]}
                                    onPress={() => {
                                        closeEventFilter()
                                }} />

                            </View>
                        } 
                        description={'Please review carefully to ensure that all information is correct.'}
                        header={2}
                        style={[
                            styles.padding_horizontal_medium
                        ]}
                        descriptionStyle={[
                            styles.padding_bottom_medium
                    ]}>
                    
                        <Days />
                        <Time />
                        <Age />
                        <Category />
                        <Location />

                        {/*Btn Options*/}
                        <View style={[styles.column,]}>

                            <ProjectButton title='Apply' 
                                onPress={() => {
                                    filterEvents()  
                                }}
                                style={[
                                    styles.margin_vertical_medium,
                            ]}/>

                            <ProjectButton 
                                title='Reset Filter'
                                type='attention'
                                onPress={() => {resetEventFilter()}}
                                style={[
                                    styles.margin_vertical_medium,
                            ]}/>

                            <ProjectButton title='Cancel' 
                                type='info'   
                                onPress={() => {closeEventFilter()}} 
                                style={[
                                    styles.margin_vertical_medium
                            ]}/>

                        </View>
                    </Paper>
                </View>
            </ScrollView>
        </Modal>
    )
}

export default EventFilter

{/*Inline Select Days Container*/}
const Days = () => {
    const {
        event_filter,
        selectEventDays
    } = useMyEventContext()

    const{
        data,
        days_selected
    } = event_filter.days

    return(
    <View style={[
        styles.column, 
        styles.full_container
    ]}>
        {/*Label */}
        <Text style={[
            styles.text_medium, 
            styles.muted_text_2_colour
        ]}>Days:</Text>

        {/*Input */}
        <InlineSelect data={data} 
            selectedIndicies={days_selected} 
            onSelect={(selected, item) => {
                selectEventDays(selected)
            }}
            multiselect={true}
        />
    </View>
    );
}

const Time = () => {
    const {
        event_filter,
        selectEventAnytime
    } = useMyEventContext()

    const {
        any_time
    } = event_filter.time

    return (
    <>
        {/*Time -> Any time Container*/}
        <View style={[styles.row]}>

            {/*Label*/}
            <Text style={[styles.text_medium, 
                styles.muted_text_2_colour,
            ]}>Time:</Text>

            {/*Input */}
            <Text style={[
                styles.end,
                styles.text_medium, 
                styles.muted_text_2_colour,
            ]}>
                <CheckBox
                    value={any_time}
                    onValueChange={() => selectEventAnytime(!any_time)}
                    color={any_time ? colours.theme_tint : undefined}
                /> Any Time
            </Text>

        </View>

        {/*Time Pickers*/}
        {!any_time && 
        <View style={[styles.row, styles.padding_horizontal_large]}>

            <AfterTime />
            <BeforeTime />

        </View>}
    </>
    )
}

const BeforeTime = () => {
    const [show, setShow] = useState(false)
    const{
        event_filter,
        selectEventTimeRange
    } = useMyEventContext(FindEventContext)
    const{
        hour,
        minute,
        ante_meridian
    } = event_filter.time.before_time

    const after_time = event_filter.time.after_time
    return(
    <>
        <View style={[styles.start]}>

            <View style={[styles.column]}>

                {/*Label*/}
                <View style={[styles.row_start]}>

                    <Text style={[styles.text_medium, 
                            styles.muted_text_2_colour,
                            styles.padding_right_xlarge
                        ]}>Before:</Text>

                    <ProjectButton title='O' 
                        onPress={() => setShow(true)}
                        style={[
                            {height:50, width: 50, justifyContent: 'center'}
                    ]} />
                </View>

                <Text style={[styles.text_large]}>{hour}:{minute} {ante_meridian}</Text>
            </View>
        </View>

        {show &&
        <DateTimePicker
            value={new Date(2020,7,29,11,59,0)}
            display="default"
            mode='time'
            is24Hour={false}
            onChange={(event,selected) => { 
                setShow(false)
                let am = selected.getHours() < 12 ? 'AM' : 'PM'
                selectEventTimeRange(after_time.hour,after_time.minute, after_time.ante_meridian, selected.getHours(), selected.getMinutes(), am)
            }}
        />
        }
    </>

    )
}

const AfterTime = () => {
    const [show, setShow] = useState(false)
    const{
        event_filter,
        selectEventTimeRange

    } = useMyEventContext()
    const{
        hour,
        minute,
        ante_meridian
    } = event_filter.time.after_time


    const before_time = event_filter.time.before_time
    return(
    <>
        <View style={[styles.start]}>
            
            <View style={[styles.column]}>

                {/*Label*/}
                <View style={[styles.row_start]}>

                    <Text style={[styles.text_medium, 
                            styles.muted_text_2_colour,
                            styles.padding_right_xlarge
                        ]}>After:</Text>

                    <ProjectButton title='O' 
                        onPress={() => setShow(true)}
                        style={[
                            {height:50, width: 50, justifyContent: 'center'}
                    ]} />
                </View>

                <Text style={[styles.text_large]}>{hour}:{minute} {ante_meridian}</Text>
            </View>
        </View>

        {show &&
        <DateTimePicker
            value={new Date()}
            display="default"
            mode='time'
            is24Hour={false}
            onChange={(event,selected) => { 
                let am = selected.getHours() < 12 ? 'AM' : 'PM'
                selectEventTimeRange(selected.getHours(), selected.getMinutes(), am, before_time.hour, before_time.minute, before_time.ante_meridian)
                setShow(false)

            }}
            />
        }
    </>
    )
}

{/*Age Container*/}
const Age = () => {
    const {
        event_filter,
        selectEventAges
    } = useMyEventContext()

    const {
        max_age,
        min_age,
    } = event_filter.age

    return(
    <View>

        {/*Label */}
        <Text style={[
            styles.text_medium, 
            styles.muted_text_2_colour,
        ]}>Age:</Text>

        {/*Age Input Row */}
        <View style={[ styles.row_start, styles.padding_vertical_none]}>

            {/*Min Age Label */}
            <ProjectTextInput placeholder='Min'
                form_input_label={[styles.disappeared]} 
                form_input_error_text={[styles.disappeared]}
                value={min_age}
                keyboardType='number-pad'
                onChangeText={(value) => selectEventAges(value, max_age)}
            />

            {/*Min Age Input */}
            <Text style={[
                styles.text_medium, 
                styles.muted_text_2_colour, styles.center, 
                styles.padding_horizontal_medium,
            ]}> years - </Text>

            {/*Max Age Label */}
            <ProjectTextInput placeholder='Max'
                keyboardType='number-pad'
                form_input_label={[styles.disappeared]} 
                form_input_error_text={[styles.disappeared]}
                value={max_age}
                onChangeText={(value) => selectEventAges(min_age, value)}
            />

            {/*Max Age Input */}
            <Text style={[
                styles.text_medium, 
                styles.muted_text_2_colour,
                styles.padding_left_medium,
            ]}> years</Text>

        </View>
    </View>
    )
}

{/*Category*/}
const Category = () => {
    const{
        event_filter,
        selectEventCategory
    } = useMyEventContext()

    const {
        items,
        selected,
    } = event_filter.category

    return(
        <View style={[styles.margin_vertical_medium]}>

            {/*Label */}
            <Text style={[
                styles.text_medium, 
                styles.muted_text_2_colour,
            ]}>Category:</Text>

            {/*Input */}
            {/*Input has no border by default and cannot style one so we will just wrap in border */}
            <View style={[styles.border]}>
                <RNPickerSelect
                    value={selected}
                    onValueChange={(value) => selectEventCategory(value)}
                    items={items}
                />
            </View>

        </View>
    )
}

{/*Location*/}
const Location = () => {
    const {
        event_filter,
        selectEventLocation
    } = useMyEventContext()

    const {
        items,
        selected
    } = event_filter.location
    return (
        <View style={[styles.margin_vertical_medium]}>

            {/*Label */}
            <Text style={[
                styles.text_medium, 
                styles.muted_text_2_colour,
            ]}>Location:</Text>

            {/*Input */}
            {/*Input has no border by default and cannot style one so we will just wrap in border */}
            <View style={[styles.border]}>
                <RNPickerSelect
                    value={selected}
                    onValueChange={(value) => selectEventLocation(value)}
                    items={items}
                />
            </View>

        </View>
    )
}