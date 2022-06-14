import styles from "../styles";
import React from 'react';
import { Text, TextInput, View} from 'react-native';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { colours } from "../styles/globals";

/**
 * Acts like a TextInput component but it is stylized
 */
const ProjectTextInput = (props) => {

    const { label,      //string, appears above the textInput to describe it
            type,       //string, style type 
            errorText,  //string, appears bellow the textInput to descrbe an error
            error,      //bool, inidcates if an error has occured

            //Built in props
            onFocus, onBlur, style} = props

    //Tracks error state. If an error occours the textInput style changes and the error text is visable
    const [isError, setIsError] = useState(error)

    useEffect(() => {
        setIsError(error)
    }, [error, errorText])

    //Used to tarck if the input is being focused. The style changes if the input is focused.
    const [isFocused, setIsFocused] = useState(false)

    //verifiy that given type styles exists. If it dosen't give a warning
    //to verifiy only when app loads and when type is changed
    useEffect(() => {
        let stylesNotFound = [] 
        if(!styles[`${type}TextInputContainer`]){
            stylesNotFound.push(`${type}TextInputContainer`)
        }
        if(!styles[`${type}TextInputLabel`]){
            stylesNotFound.push(`${type}TextInputLabel`)
        }
        if(!styles[`${type}TextInput`]){
            stylesNotFound.push(`${type}TextInput`)
        }
        if(! styles[`${type}TextInputFocused`] ){
            stylesNotFound.push(`${type}TextInputFocused`)
        }
        if(! styles[`${type}TextInputError`] ){
            stylesNotFound.push(`${type}TextInputError`)
        }
        if(! styles[`${type}TextInputErrorText`] ){
            stylesNotFound.push(`${type}TextInputErrorText`)
        }
        if(stylesNotFound.length > 0){
            console.warn(`type given is not found. Please create class(es): ${stylesNotFound} in styles/inputTextStyles`)
        }

    }, [type])

    return (
        
        <View style={[
                        styles[`TextInputContainer`],
                        styles[`${type}TextInputContainer`],
                        style
                    ]}
        >
            {/*Label text*/}
            <Text style={[
                        styles.mutedText,
                        styles[`TextInputLabel`],
                        styles[`${type}TextInputLabel`]
                        ]}
            >{label}</Text>

            {/*Actual TextInput*/}
            <TextInput  selectionColor={`${colours.complement}`}

                        //place above so props bellow are not overwritten
                        {...props}
                        style={[
                                styles[`TextInput`],
                                styles[`${type}TextInput`],
                                (isFocused ? [styles[`TextInputFocused`], styles[`${type}TextInputFocused`]] : ''),
                                (isError ? [styles[`TextInputError`], styles[`${type}TextInputError`]] : ''),
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
                isError ? [styles[`TextInputErrorText`], styles[`${type}TextInputErrorText`]] 
                        : [styles[`TextInputErrorText`], styles[`${type}TextInputErrorText`], styles.textInputErrorHidden]
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