import React from 'react';
import {View} from 'react-native'
import styles from '../../styles'

/**
 * Creates a horizontal line across its container
 * @authors avdouloa@uwindsor.ca, 
 */
export default function Underline(props)
{
    return(
        <View {...props} style={[styles.stretch, styles.border, styles.border_bottom_width_none,  props.style]}  ></View>

    );
}

