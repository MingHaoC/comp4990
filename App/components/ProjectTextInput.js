import styles from "../styles";
import React from 'react';
import { Text, TextInput, View} from 'react-native';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

const ProjectTextInput = (props) => {

    const {label, labelStyle, errorText, error} = props

    const [isError, setIsError] = useState(error)
    const [isFocused, setIsFocused] = useState(false)
    return (
        
        <View style={[
                        styles.textInputContainer
                    ]}
        >
            <Text style={[
                        styles.mutedText,
                        styles.textInputLabel,
                        labelStyle
                        ]}
            >{label}</Text>

            <TextInput  {...props}
                        style={[
                                styles.textInput, 
                                (isFocused ? styles.textInputFocused : ''),
                                (isError ? styles.textInputError : ''),
                                props.style
                            ]} 
                        selectionColor='#19bcb9'
                        placeholderTextColor='#9B9B9F'
                        onFocus={() => {
                            setIsFocused(true)
                        }}
                        onBlur={()=>{
                            setIsFocused(false)}
                        }
            />
            <Text style={[
                isError ? [styles.textInputErrorText] : [styles.textInputErrorText, styles.textInputErrorHidden]
            ]}>{errorText}</Text>

        </View>
    );
}

ProjectTextInput.propTypes = {
    errorText: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.bool
}

ProjectTextInput.defaultProps = {
    error: false
}

export default ProjectTextInput