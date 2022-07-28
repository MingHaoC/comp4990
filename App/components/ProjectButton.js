import styles from '../styles'
import React from 'react';
import { Text, Pressable} from 'react-native';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';


/**
 * Acts like a Button component but it is stylized
 * @authors avdouloa@uwindsor.ca, 
 */
const ProjectButton = (props) => {
    const { type,       //string, indicates the style type
            title,      //string, the text that will describe button action
            disabled,   //bool Indicates if the button performs an action onPresss

            //Built in props
            onPressIn, onPressOut, onPress} = props

    const [btnTitle, setBtnTitle] = useState(title)
    const [isDisabled, setIsDisabled] = useState(disabled)

    //Style changes if the button is being pressed so the state variable is used to track when the button is pressed
    const [isPressed, setIsPressed] = useState(false);

    //Update state when props change
    useEffect(() =>{
        setBtnTitle(title)
        setIsDisabled(disabled)
    }, [disabled,title])

    //verifiy that given type styles exists. If it dosen't give a warning
    //to verifiy only when app loads and when type is changed
    useEffect(() => {
        let stylesNotFound = []
        if(!styles[`${type}_btn`]){
            stylesNotFound.push(`${type}_btn`)
        }
        if(!styles[`${type}_btn_on_press`]){
            stylesNotFound.push(`${type}_btn_on_press`)
        }
        if(!styles[`${type}_btn_text`]){
            stylesNotFound.push(`${type}_btn_text`)
        }
        if(! styles[`${type}_btn_text_on_press`] ){
            stylesNotFound.push(`${type}_btn_text_on_press`)
        }
        if(stylesNotFound.length > 0){
            console.warn(`type given is not found. Please create class(es): ${stylesNotFound} in styles/buttons`)
        }

    }, [type])

    //NOTE: styles change when button is pressed in/out
    return(
        <Pressable  {...props}
                    style={[
                            styles.stretch, 
                            styles.padding_horizontal_large,
                            styles.padding_vertical_small,
                            styles.border_radius_1,
                            styles[`${type}_btn`], 
                            (isPressed ? styles[`${type}_btn_on_press`] : ''), props.style ]}
                    onPressIn={()=>
                        {
                                setIsPressed(true);
                                onPressIn();
                        
                        }}
                    onPressOut={()=> {
                            setIsPressed(false)
                            onPressOut()
                    }}

                    onPress={() => {
                        if(!isDisabled){
                            onPress();
                        }
                    }}
        >
            <Text style={[
                            styles.text_medium,
                            styles.center, 
                            styles.base_shade_colour, 
                            styles[`${type}_btn_text`], 
                            (isPressed ? styles[`${type}_btn_text_on_press`] : '')
                        ]}>{btnTitle}</Text>
      </Pressable>    
      );
}

// #region defaultProps and PropTypes
ProjectButton.propTypes = {
    type: PropTypes.string.isRequired,
}

ProjectButton.defaultProps = {
    type: 'default',
    title: `Please add 'title' prop to set button text`,
    disabled: false,
    onPressIn: () => {},
    onPressOut: () => {},
    onPress: () => {}
}
// #endregion

export default ProjectButton