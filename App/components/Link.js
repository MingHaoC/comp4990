import React from 'react';
import {Text,Pressable, Linking } from 'react-native'
import styles from '../styles';
import { useState, useEffect, useRef } from 'react'
import Underline from './Underline';
import PropTypes from 'prop-types';

/**
 * Used to direct a user to a new screen
 */
export default function Link(props){
    const { text,       //string, link text
            disabled ,  //Bool. indicates if a link works
            type,       //string, style type
            target,     //string, target location ie: link url
            isExternal, //bool, indicate if we are sent to another website or stay on this one

            //built in props
            onPressIn, onPressOut, onPress,style, children } = props;


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
        if(! styles[`${type}LinkContainerOnPress`]){
            stylesNotFound.push(`${type}LinkContainerOnPress`)
        }
        if(stylesNotFound.length > 0){
            console.warn(`type given is not found. Please create class(es): ${stylesNotFound} in styles/linkStyle`)
        }

    }, [type])

    //used to change style when pressed. By default it is false because it is not initally pressed
    const [isPressed, setIsPressed] = useState(false)

    //NOTE: styles change when link is pressed in/out
    return(
        <Pressable  style={[styles.linkContainer, styles[   `${type}LinkContainer`], 
                                                            (isPressed  ? styles[`${type}LinkContainerOnPress`] 
                                                                        : ''),
                                                            style
                                                        ]}

                    onPress={() => {

                        //External links
                        if(isExternal && !disabled){
                            Linking.openURL(target)
                        }
                        
                        //Internal Links
                        if(!isExternal && !disabled){
                            //TODO: Handle internal linking
                        }

                        onPress()
                    }}

                    onPressIn={() => {
                        setIsPressed(true);
                        onPressIn()
                    }}
                    onPressOut={() => {
                        setIsPressed(false);
                        onPressOut()
                    }}
        >
            <Text   style={isPressed    ? [styles.linkOnPress, styles[`${type}LinkOnPress`]] 
                                        : [styles.linkText, styles[`${type}LinkText`]]}
            > {text}{children}</Text>
            {/* Underline appears only onPress */}
            {isPressed ? <Underline style={[styles.linkBottomBorder, styles[`${type}LinkBottomBorder`]]} /> 
            : <Underline style={[styles.linkBottomBorder,styles.linkBottomHidden]} />} 
            
        </Pressable>
    );
} 
// #region propTypes and defaultProps
Link.propTypes = {
    text: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    isExternal: PropTypes.bool,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    isExpanding: PropTypes.bool
}

Link.defaultProps = {
    type: 'default',
    text: `Please add 'text' prop to set link text`,
    isExternal: true,
    disabled: false,
    isExpanding: false,
    onPressIn: () => {},
    onPressOut: () => {},
    onPress: () => {},
    children: <></>
}

// #endregion