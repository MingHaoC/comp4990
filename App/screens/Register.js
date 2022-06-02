import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles'
import {Link, Paper, ProjectTextInput, ProjectButton, Ul, Underline} from '../components'

export default function Register() {
  return (
    <>
        <Link text='Login' style={{alignSelf:'flex-end'}}/>

        <Paper title='Create a Profile' header='1' headerTitleStyle={styles.h2} image={require('../assets/register-icon.png')}> 

            <View style={styles.form}>

                <ProjectTextInput   placeholder='Firstname' errorText='Test' />
                <ProjectTextInput   placeholder='Lastname' />
                <ProjectTextInput   placeholder='Email' />


                <Text style={[styles.h3]}>Create your Password</Text>
                <Underline />
                <Text style={[styles.mutedText, {marginTop: 5}]} >Your password must have at least:</Text>
                <Ul style={styles.mutedText} >8 characters</Ul>
                <Ul style={styles.mutedText} >1 letter</Ul>
                <Ul style={[styles.mutedText, {marginBottom: 18}]} >1 number</Ul>
                

                <ProjectTextInput   placeholder='Password' />
                <ProjectTextInput   placeholder='Verification' />

                <ProjectButton title='Register' type='default' />
                
            </View>
        </Paper>
    </>
  );
} 