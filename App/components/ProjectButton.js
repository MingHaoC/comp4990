import styles from "../styles";
import React from 'react';
import { Text, Pressable} from 'react-native';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';


const ProjectButton = (props) => {
    const {type, title} = props
    const [isPressed, setIsPressed] = useState(false);

    //verifiy that given type styles exists. If it dosen't give a warning
    //to verifiy only when app loads and when type is changed
    useEffect(() => {
        let stylesNotFound = []
        if(!styles[`${type}Btn`]){
            stylesNotFound.push(`${type}Btn`)
        }
        if(!styles[`${type}BtnPress`]){
            stylesNotFound.push(`${type}BtnPress`)
        }
        if(!styles[`${type}BtnText`]){
            stylesNotFound.push(`${type}BtnText`)
        }
        if(! styles[`${type}BtnPressText`] ){
            stylesNotFound.push(`${type}BtnPressText`)
        }
        if(stylesNotFound.length > 0){
            console.warn(`type given is not found. Please create class(es): ${stylesNotFound} in styles/buttonStyles`)
        }

    }, [type])

    //NOTE: styles change when button is pressed in/out
    return(
        <Pressable  {...props}
                    style={[styles.btn, styles[`${type}Btn`], (isPressed ? styles[`${type}BtnPress`] : ''), props.style ]}
                    onPressIn={()=>setIsPressed(true)}
                    onPressOut={()=>setIsPressed(false)}
        >
            <Text style={[styles.btnText, styles[`${type}BtnText`], isPressed ? styles[`${type}BtnPressText`] : '']}>{title}</Text>
      </Pressable>    
      );
}

ProjectButton.propTypes = {
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

ProjectButton.defaultProps = {
    type: 'default',
    title: `Please add 'title' prop to set button text`
}

export default ProjectButton