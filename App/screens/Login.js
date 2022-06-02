import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles'
import {Link, Paper, ProjectTextInput, ProjectButton, Ul, Underline} from '../components'

export default function Login() {
  return (
    <>
        <Link text='Register' style={{alignSelf:'flex-end'}}/>

        <Paper title='Please Sign In' header='1' headerTitleStyle={styles.h2} image={require('../assets/register-icon.png')}> 

            <View style={styles.form}>

                <ProjectTextInput   placeholder='Email' />

                <ProjectTextInput   placeholder='Password' />

                <ProjectButton title='Register' type='default' style={{marginBottom: 18}} />
                <ProjectButton title='Forgot Password' type='info' />
                
            </View>
        </Paper>
    </>
  );
} 