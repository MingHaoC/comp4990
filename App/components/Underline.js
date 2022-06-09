import React from 'react';
import {View} from 'react-native'
import styles from '../styles';

/**
 * Creates a horizontal line across its container
 */
export default function Underline(props)
{
    return(
        <View {...props} style={[styles.underline, props.style]}  ></View>

    );
}

