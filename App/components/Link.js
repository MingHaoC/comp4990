import React from 'react';
import {Text,Pressable} from 'react-native'
import styles from '../styles';
import { useState, useEffect } from 'react'
import Underline from './Underline';
import PropTypes from 'prop-types';


export default function Link(props){
    const {text, style, type} = props;

    //verifiy that given type styles exists. If it dosen't give a warning
    //to verifiy only when app loads and when type is changed
    useEffect(() => {
        let stylesNotFound = []
        if(!styles[`${type}LinkContainer`]){
            stylesNotFound.push(`${type}LinkContainer`)
        }
        if(!styles[`${type}LinkText`]){
            stylesNotFound.push(`${type}LinkText`)
        }
        if(!styles[`${type}LinkOnPress`]){
            stylesNotFound.push(`${type}LinkOnPress`)
        }
        if(! styles[`${type}LinkBottomBorder`] ){
            stylesNotFound.push(`${type}LinkBottomBorder`)
        }
        if(stylesNotFound.length > 0){
            console.warn(`type given is not found. Please create class(es): ${stylesNotFound} in styles/linkStyle`)
        }

    }, [type])

    const [isPressed, setIsPressed] = useState(false)

    //NOTE: styles change when link is pressed in/out
    return(
        <Pressable  style={[styles.linkContainer, styles[`${type}LinkContainer`], style]}
                    onPressIn={() => {
                        setIsPressed(true)
                    }}
                    onPressOut={() => {
                        setIsPressed(false)
                    }}
        >
            <Text style={isPressed ? [styles.linkOnPress, styles[`${type}LinkOnPress`]] : [styles.linkText, styles[`${type}LinkText`]]}>{text}</Text>

            {/* Underline appears only onPress */}
            {isPressed ? <Underline style={[styles.linkBottomBorder, styles[`${type}LinkBottomBorder`]]} /> 
            : <Underline style={[styles.linkBottomBorder,styles.linkBottomHidden]} />} 
            
        </Pressable>
    );
} 

Link.propTypes = {
    text: PropTypes.string.isRequired,
}

Link.defaultProps = {
    type: 'default',
    text: `Please add 'text' prop to set link text`
}