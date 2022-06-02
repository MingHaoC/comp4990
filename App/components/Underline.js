import React from 'react';
import {StyleSheet, Text, View} from 'react-native'
import styles from '../styles';

export default function Underline(props)
{
    return(
        <View {...props} style={[styles.underline, props.style]}  ></View>

    );
}

