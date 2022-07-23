import React from 'react';
import { Text, TextInput, View} from 'react-native';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from '../../styles'

/**
 * Acts like a TextInput component but it is stylized
 */
const ProjectTextInput = (props)  => {

    const { label,      //string, appears above the textInput to describe it
            type,       //string, style type 
            errorText,  //string, appears bellow the textInput to descrbe an error
            error,      //bool, inidcates if an error has occured

            /* Inline Styling */
            form_input_container,
            form_input_label,
            form_input,
            form_input_on_focus,
            form_input_on_error,
            form_input_error_text,

            //Built in props
            onFocus, onBlur, style} = props

    //Tracks error state. If an error occours the textInput style changes and the error text is visable
    const [isError, setIsError] = useState(error)
    useEffect(() => {
        setIsError(error)
    }, [error, errorText, type])

    //Used to tarck if the input is being focused. The style changes if the input is focused.
    const [isFocused, setIsFocused] = useState(false)

    return (
        
        <View style={[
                        styles[`${type}_form_input_container`],
                        form_input_container,
                        style
                    ]}
        >
            {/*Label text*/}
            <Text style={[
                        styles.text_medium,
                        styles.muted_text_1_colour,
                        styles[`${type}_form_input_label`],
                        form_input_label
                        ]}
            >{label}</Text>

            {/*Actual TextInput*/}
            <TextInput  /*selectionColor={styles.theme_complement_colour.color}*/

                        //place above so props bellow are not overwritten
                        {...props}
                        ref={props.inputRef}
                        style={[
                                styles.border,
                                styles.padding_horizontal_small,
                                styles.text_medium,
                                styles.padding_vertical_small,
                                styles.main_text_colour,
                                styles.stretch,
                                styles.margin_top_small,
                                styles.base_shade_bg,
                                styles[`${type}_form_input`],
                                form_input,
                                (isFocused ? [styles.muted_1_coloured_bg, styles[`${type}_form_input_on_focus`], form_input_on_focus] : ''),
                                (isError ? [styles.error_border, styles[`${type}_form_input_on_error`],form_input_on_error] : ''),

                            ]} 

                        onFocus={() => {
                            //change to focused style 
                            setIsFocused(true)

                            //default functions passed in props. 
                            onFocus()
                        }}
                        onBlur={()=>{
                            //chnage to unfocused style
                            setIsFocused(false)

                            //default function passed in props
                            onBlur()
                        }}

            />
            
            {/*Error Text*/}
            <Text style={[
                            styles.text_xsmall,
                            styles.error_colour,
                            styles.margin_bottom_medium,
                            styles[`${type}_form_input_error_text`],
                            form_input_error_text,
                isError ? [] 
                        : [styles.hidden]
            ]}>{errorText}</Text>

        </View>
    );
}

// #region defaultProps and PropTypes
ProjectTextInput.propTypes = {
    errorText: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.bool,
    type: PropTypes.string
}

ProjectTextInput.defaultProps = {
    error: false,
    type: '',
    onBlur: () => {},
    onFocus: () =>{}
}
// #endregion

export default ProjectTextInput