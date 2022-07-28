import React from 'react';
import {Text,Pressable, Linking } from 'react-native'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from '../styles'
import Underline from './Underline';
/**
 * Used to direct a user to a new screen
 * @authors avdouloa@uwindsor.ca, 
 */
export default function Link(props){
    const { text,       //string, link text
            disabled ,  //Bool. indicates if a link works
            type,       //string, style type
            target,     //string, target location ie: link url
            isExternal, //bool, indicate if we are sent to another website or stay on this one

            //built in props
            onPressIn, onPressOut, onPress,style, children, navigation } = props;

    const [isDisabled, setIsDisabled] = useState(isDisabled)
    const [linkText, setLinkText] = useState(text)
    const [linkTarget, setLinkTarget] = useState(target)
    const [isExternalLink, setIsExternalLink] = useState(isExternal)

    //update component if props change
    useEffect(() => {
        setIsDisabled(disabled)
        setLinkText(text)
        setIsExternalLink(isExternal)
        setLinkTarget(target)
    }, [text,disabled,target,isExternal])

    //verifiy that given type styles exists. If it dosen't give a warning
    //to verifiy only when app loads and when type is changed
    useEffect(() => {
        let stylesNotFound = [] 
        if(!styles[`${type}_link_text`]){
            stylesNotFound.push(`${type}_link_text`)
        }
        if(!styles[`${type}_link_text_on_press`]){
            stylesNotFound.push(`${type}_link_text_on_press`)
        }
        if(! styles[`${type}_link_underline`] ){
            stylesNotFound.push(`${type}_link_underline`)
        }
        if(! styles[`${type}_link_underline_on_press`]){
            stylesNotFound.push(`${type}_link_underline_on_press`)
        }
        if(stylesNotFound.length > 0){
            console.warn(`type given is not found. Please create class(es): ${stylesNotFound} in styles/linkStyle`)
        }

    }, [type])

    //used to change style when pressed. By default it is false because it is not initally pressed
    const [isPressed, setIsPressed] = useState(false)

    //NOTE: styles change when link is pressed in/out
    return(
        <Pressable  style={[
                            styles[''], 
                            (isPressed  ? ''
                                        : ''),
                            style
                        ]}

                    onPress={() => {

                        //External links
                        if(isExternalLink && !isDisabled){
                            Linking.openURL(linkTarget)
                        }
                        
                        //Internal Links
                        if(!isExternalLink && !isDisabled){
                            if(navigation){
                                navigation.navigate(target)
                            }
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
            <Text   style={[
                            styles.text_medium,
                            (isPressed    ? 
                                        [
                                            styles[`${type}_link_text_on_press`]
                                        ] 
                                        : 
                                        [
                                            styles[`${type}_link_text`]
                                        ]
                            )
                        ]}
            > {linkText}{children}</Text>
            {/* Underline appears only onPress */}
            <Underline style={[
                                styles[`${type}_link_underline`], 
                                (isPressed  ? styles[`${type}_link_underline_on_press`]
                                            : ''
                                ) 
                            ]} /> 
            
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
    children: <></>,
    navigation: null
}

// #endregion