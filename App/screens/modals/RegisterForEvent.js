import { View, Text, Pressable, Modal, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import dummyEvents from '../../dummyEvents'
import styles from '../../styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Paper, ProjectButton, Underline } from '../../components'
import { useFindEventContext } from '../../actions/Find Events/FindEventsContext'

const RegisterForEvent = () => {
    const {
        showNextRegisterDisplay,
        showPreviousRegisterDisplay,
        closeRegisterModal,
        registerForEvent,
        event_details
    } = useFindEventContext()

    const event = event_details.event_selected

    const {
        selected_availability,
        current_display,
        displays,
        is_open
    } = event_details.register

    useEffect(()=>{console.log(selected_availability)},[])
    const [screenDisplays, setDisplays] = useState([    <AdditionalInfo other_information={selected_availability.other_information}/> , 
                                                        <Confirm {...selected_availability} {...event} />])


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
                            <Text style={[styles.h1,styles.muted_text_2_colour, styles.margin_right_xlarge]}>Registration</Text>
                            <ProjectButton type='info' 
                                title='X' 
                                style={[
                                    styles.center, 
                                    styles.margin_left_xlarge
                                ]}
                                onPress={() => {
                                    closeRegisterModal()
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
            
                        {/*Navigation Buttons*/}
                        <View style={[styles.row,styles.padding_vertical_none, styles.padding_horizontal_medium] }>

                            <ProjectButton title={
                                <View style={[styles.center, styles.row, styles.padding_vertical_none]}>
                                    <Icon name='arrow-circle-o-left' style={[ styles.text_medium, styles.base_shade_colour]} />
                                    <Text style={[styles.text_medium, styles.padding_horizontal_medium, styles.base_shade_colour]}>Back</Text>
                                </View>}
                                onPress={() => {showPreviousRegisterDisplay()}}
                            />

                            <ProjectButton title={
                                <View style={[styles.center, styles.row, styles.padding_vertical_none]}>
                                    <Text style={[styles.text_medium, styles.base_shade_colour]}>Next</Text>
                                    <Icon name='arrow-circle-o-right' style={[styles.padding_top_xsmall, styles.padding_horizontal_medium, styles.text_medium, styles.base_shade_colour]} />
                                </View>} 
                                onPress={() => {
                                    showNextRegisterDisplay()
                                }}
                            />
                        </View>

                        {/*Sections*/}
                        <View style={[styles.padding_medium]}>  
                            {(current_display == 0) && <AdditionalInfo {...selected_availability} />}
                            {(current_display == 1) && <Confirm {...event} {...selected_availability} />}

                        </View>

                        {/*Btn Options*/}
                        <View style={[styles.column,]}>

                            <ProjectButton title={
                                <View style={[styles.row]}>
                                    <Icon name='shopping-cart' style={[styles.text_medium,styles.base_shade_colour]}/>
                                    <Text style={[styles.text_medium,styles.base_shade_colour, styles.padding_left_medium]}>Add To Cart</Text>
                                </View>
                                } 
                                type='default'   
                                onPress={() => { registerForEvent()}} 
                                style={[
                                    styles.margin_vertical_medium,
                                    styles.disappeared,
                                    (current_display+1 == displays.length && styles.visible )
                            ]}/>

                            <ProjectButton title='Cancel' 
                                type='info'   
                                onPress={() => { closeRegisterModal()}} 
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

const AdditionalInfo = ({other_information}) => {

    const [info,setInfo] = useState(other_information)
    return(
        <>
            <Text style={[styles.h3, styles.bold, styles.margin_bottom_small]}>Additional Info</Text>
            <Paper style={[styles.padding_medium]}>
                <Text style={[styles.text_small, styles.muted_text_1_colour]}>{info}</Text>
            </Paper>
        </>
    );
}

const Confirm = (props) => {
    const {name, location, days_of_the_week,start_time,end_time, start_date, end_date, prerequistes} = props
    const [confirmationInfo, setConfirmationInfo] = useState({name, 
        location, 
        days_of_the_week: days_of_the_week.join(', '), 
        start_date, 
        end_date, 
        prerequistes, 
        start_time: `${start_time.hour}:${start_time.minute} ${start_time.ante_meridian}`,
        end_time: `${end_time.hour}:${end_time.minute} ${end_time.ante_meridian}`
    })
    return(
        <>
            <Text style={[styles.h3, styles.bold, styles.margin_bottom_small]}>Confirm</Text>
            <Paper style={[styles.padding_medium]}>
                {
                    Object.keys(confirmationInfo).map((propName, index) => {
                        return(
                            <View key={index}>
                                <View  style={[styles.row]}>
                                    <Text style={[styles.text_medium, styles.muted_text_2_colour]}>{propName}:</Text>
                                    <Text style={[styles.text_medium, styles.muted_text_1_colour]}>{confirmationInfo[propName]}</Text>   
                                </View>
                                <Underline />                             
                            </View>

                        );
                    })
                }
            </Paper>
        </>
    );
}

export default RegisterForEvent