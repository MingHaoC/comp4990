import { View, Text, Pressable, ScrollView, Modal } from 'react-native'
import React from 'react'
import styles from '../../../styles'
import { InlineSelect, Paper, ProjectButton, ProjectTextInput } from '../../../components'
import { useEffect, useState } from 'react'
import CheckBox from 'expo-checkbox'
import RNPickerSelect from "react-native-picker-select";
import { useFindEventContext } from '../../../actions/Find Events/FindEventsContext'
import { colours } from '../../../styles/globals'
import DateTimePicker from '@react-native-community/datetimepicker'; 

const AvailabilityFilter = () => {

    const{ 
        event_details,
        closeAvilabilitiesFilter,
        applyAvailabilitiesFilter,
        resetAvailabilitiesFilter
    } = useFindEventContext()
    

    
    const {is_open} = event_details.availability_filter


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
                                <Text style={[styles.h1,styles.muted_text_2_colour, styles.margin_right_xlarge]}>Availability</Text>
                                <ProjectButton type='info' 
                                    title='X' 
                                    style={[
                                        styles.center, 
                                        styles.margin_left_xlarge
                                    ]}
                                    onPress={() => {
                                        closeAvilabilitiesFilter()
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
                        <Location />
                        <OrderBySelect />


                        {/*Btn Options*/}
                        <View style={[styles.column,]}>

                            <ProjectButton title='Apply' 
                                onPress={() => {
                                    applyAvailabilitiesFilter()
                                }}
                                style={[
                                    styles.margin_vertical_medium,
                            ]}/>

                            <ProjectButton 
                                title='Reset Filter'
                                type='attention'
                                onPress={() => {
                                    resetAvailabilitiesFilter()
                                }}
                                style={[
                                    styles.margin_vertical_medium,
                            ]}/>

                            <ProjectButton title='Cancel' 
                                type='info'   
                                onPress={() => {
                                    closeAvilabilitiesFilter()
                                }} 
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
export default AvailabilityFilter

{/*Inline Select Days Container*/}
const Days = () => {
    const {
        event_details,
        selectAvailableDays
    } = useFindEventContext()

    const {
        data,
        days_selected
    } = event_details.availability_filter.days

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
                selectAvailableDays(selected)
            }}
            multiselect={true}
        />
    </View>
    );
}

const Time = () => {

    const {
        event_details,
        selectAvailabilityAnytime
    } = useFindEventContext()

    const {
        any_time
    } = event_details.availability_filter.time

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
                    onValueChange={() => selectAvailabilityAnytime(!any_time)}
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
        event_details,
        selectAvailableTimeRange
    } = useFindEventContext()
    const{
        hour,
        minute,
        ante_meridian
    } = event_details.availability_filter.time.before_time

    const after_time = event_details.availability_filter.time.after_time
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
                selectAvailableTimeRange(after_time.hour,after_time.minute, after_time.ante_meridian, selected.getHours(), selected.getMinutes(), am)
            }}
        />
        }
    </>

    )
}

const AfterTime = () => {
    const [show, setShow] = useState(false)
    const{
        event_details,
        selectAvailableTimeRange

    } = useFindEventContext()
    const{
        hour,
        minute,
        ante_meridian
    } = event_details.availability_filter.time.after_time


    const before_time = event_details.availability_filter.time.before_time
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
                selectAvailableTimeRange(selected.getHours(), selected.getMinutes(), am, before_time.hour, before_time.minute, before_time.ante_meridian)
                setShow(false)

            }}
            />
        }
    </>
    )
}

{/*Location*/}
const Location = () => {
    const {
        event_details,
        selectAvailabilityLocation
    } = useFindEventContext()

    const {
        items,
        selected
    } = event_details.availability_filter.location
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
                    onValueChange={(value) => selectAvailabilityLocation(value)}
                    items={items}
                />
            </View>

        </View>
    )
}


const OrderBySelect = () => {
    return(
        <View style={[styles.row, styles.full_container]}>
            <OrderByValue />
            <OrderByDirection />
        </View>

    )
}

const OrderByValue = () => {
    const {
        event_details,
        selectAvailabilitiesOrderValue
    } = useFindEventContext()

    const {
        value_selected,
        data
    } = event_details.availability_filter.order_by.value
    return(
        <View style={[styles.medium_container]}>
            <Text style={[
                styles.text_medium, 
                styles.muted_text_2_colour,
            ]}>Order By:</Text>
            <InlineSelect data={data} 
                selectedIndicies={value_selected} 
                onSelect={(selected, item) => {
                    selectAvailabilitiesOrderValue(selected)
            }}/>
        </View>
    )
}

const OrderByDirection = () => {
    const {
        event_details,
        selectAvailabilitiesOrderDirection
    } = useFindEventContext()

    const {
        direction_selected,
        data
    } = event_details.availability_filter.order_by.direction

    return(
        <View style={[styles.small_container]}>
            <Text> </Text>
            <InlineSelect data={data} 
                selectedIndicies={direction_selected} 
                onSelect={(selected, item) => {
                    selectAvailabilitiesOrderDirection(selected)
            }}/>
        </View>
    )
}