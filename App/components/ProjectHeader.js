import { View, Text, Pressable, StatusBar, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Paper from './Paper'
import styles from '../styles'
import Icon from 'react-native-vector-icons/FontAwesome';

const ProjectHeader = ({children, navigation}) => {


    useEffect(() => {
    })
    const openNotifications = () => {
        console.log('TODO: Open Notifications')
    }
    return (
        <>  

            <StatusBar />
            <Paper style={[
            styles.border,
            styles.border_width_none,
            styles.row,
            styles.border_bottom_width_small,
            styles.padding_vertical_none,
            (Platform.OS == 'ios' ? {paddingTop: 44} : '')

        ]}>
            <Pressable onPress={() => navigation.toggleDrawer()}>
                 <Icon style={[
                    styles.center,
                    styles.text_medium,
                    styles.theme_complement_coloured_bg,
                    styles.base_shade_colour,
                    styles.padding_medium,
                    ]}
                    name="navicon" 
                /> 
            </Pressable>

            <View style={[styles.medium_container]}>
                {children}
                {/* <Text>{hasNotch}</Text> */}
            </View>

            <Pressable onPress={() => {openNotifications()}}>
                <Icon style={[
                    styles.center,
                    styles.text_medium,
                    styles.muted_text_1_colour,
                    styles.padding_medium,
                    ]}
                    name='bell-o' 
                />
            </Pressable>

        </Paper>
        </>
        
  )
}

export default ProjectHeader