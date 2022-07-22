import React, { useState, useEffect } from 'react';
import {Paper, ProjectButton} from '../index'
import { Text, View } from "react-native"
import styles from '../../styles';
import {CgMoreO} from 'react-icons/cg'

const FIRST_CHARS = 200;    //indicate the amount of characters of the description to display in preview


/**
 * Formats an event for a list preview. 
 * In the preview the only attributes of the event lsited are 
 * - name
 * - first chars of description
 * - Valid age range for the event
 * @param {*} param - Event properties
 * @returns Event component
 */
const Event = ({id, name, description, min_age, max_age}) => {

    //Used to disable the "more info" button
    const [btnDisabled, setBtnDisabled] = useState(false)

    //Disable the button if the id is undefined so that the modal cannot be opened for an invalid event
    const useEffect = (() => {
        if(id == undefined){
            setBtnDisabled(true)
        }
    }, [id])

    /**
     * Opens Event Details Modal so the user can view all event properties
     */
    const openDetails = () => {
        console.log("Open Modal for event #"+id)
    }

    return (
        <Paper  
                /*Name of Event */
                title={name} 
                header={1} 
                headerTitleStyle={[ 
                    styles.attentionText_1
                ]}

                /*Event Age Range */
                description={`${min_age} years - ${max_age} years`}
                style={[
                    styles.paddingVerticalMed,
                    styles.marginVerticalLarge,
                    {
                    width: '90%',
                }]}
                descriptionStyle={[
                    styles.bold
                ]}
                >
            <View style={styles.form}>

                {/*Event Description */}   
                <Text   style={[
                    styles.secondaryText,
                    styles.paddingBottomMed
                ]}
                >
                    {
                        //Show only the first characters of description as to not create an overly bulky layout
                        description.substring(0,FIRST_CHARS)
                    }
                    {
                        //Include ellipes to inidcate that not all text is present is some of the description was cut out
                        (description.length > FIRST_CHARS) && '...'
                    }
                </Text>

                {/*More Info Button */}
                {/*Opens a Modal so user can see all event properties */}
                <ProjectButton 
                    title={<Text style={styles.mediumText}
                    onPress={() => {openDetails()}}
                    disabled={btnDisabled}
                    ><CgMoreO /> More Info</Text>} />

            </View>

        </Paper>
    );
}

Event.defaultProps = {
    id: -1,
    name: "UNDEFINED",
    description: "",
    min_age: 0,
    max_age: 100,
}


export default Event