import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles'
import { useReducer } from 'react';
import {Link, Paper, ProjectTextInput, ProjectButton, Ul, Underline} from '../components'
import reducer from '../actions/loginReducer'

const initialState = {
  Email: '',
  EmailError: {
    error: false,
    errorText: ''
  },
  Password: '',
  PasswordError: {
    error: false,
    errorText: ''
  }
}

export default function Login() {

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    Email,
    EmailError,
    Password,
    PasswordError
  } = state

  const login = () => {
    dispatch({type: "LOGIN"})
  }

  const enterInput = (label, value) => {
    dispatch({type: "ENTER_INPUT", payload: {label, value} })
  }

  return (
    <>
        <Link text='Register' disabled={true} style={{alignSelf:'flex-end'}}/>

        <Paper title='Please Sign In' header='1' headerTitleStyle={styles.h2} image={require('../assets/register-icon-transparent.png')}> 

            <View style={styles.form}>

                <ProjectTextInput  placeholder='Email' 
                                  error={EmailError.error}
                                  errorText={EmailError.errorText}
                                  onChange={(e) => {enterInput('Email',e.target.value )}}/>

                <ProjectTextInput placeholder='Password' 
                                  error={PasswordError.error} 
                                  errorText={PasswordError.errorText}
                                  onChange={(e) => {enterInput('Password',e.target.value )}} />

                <ProjectButton title='Register' type='default' style={{marginBottom: 18}} onPress={login} />
                <ProjectButton title='Forgot Password' type='info'  />
                
            </View>
        </Paper>
    </>
  );
} 