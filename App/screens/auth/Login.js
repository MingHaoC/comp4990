import React from 'react';
import { View } from 'react-native';
import styles from '../../styles'
import { useReducer } from 'react';
import {Link, Paper, ProjectTextInput, ProjectButton} from '../../components'
import reducer from '../../actions/loginReducer'
import {useAppContext} from '../../context'
import {LoginModal} from '../../components/LoginComponents'

// #region Initial State
const initialState = {
  Email: '',      //Value of Email Input

  /*Indicates if there is an error concering the Email input and what the error is*/
  EmailError: {
    error: false,
    errorText: ' '
  },
  Password: '',     //Value of Password Input

  /*Indicates if there is an error concering the Password input and what the error is*/
  PasswordError: {
    error: false,
    errorText: ' '
  }, 
  LoginPreconditionsMet: false, //Indicates if all the requirements have been met to send a POST request to login

  showModal: false,             //Indicates if the LoginModal should be visible
                                //Modal is used to show POST request response

  /*Response from sending a POST request to Login URL*/
  Response: {
    status: 500, 
    text: 'System Error'
  },
}
// #endregion
export default function Login({navigation}) {

  // #region variables
  const {loginPOST} = useAppContext();
  const [state, dispatch] = useReducer(reducer, initialState)

  //For a desciption of state variables see initialState
  const {
    Email,
    EmailError,
    Password,
    PasswordError,
    LoginPreconditionsMet,
    showModal,              
    Response                
  } = state

  //#endregion

  //#region methods

  /**
   * OnPress login Button
   * Sends POST Request to Login URL if login conditions are met and displays request results. 
   */
  const login = async() => {
    dispatch({type: "VERIFIY_LOGIN_PRECONDITIONS"})

    if(LoginPreconditionsMet){

      console.log('loading...')
      //TODO: Create Loading Screen
      const response = await loginPOST(Email, Password) 
      dispatch({type: 'CONFIRM_LOGIN', payload: {...response}})

    }
  }

  /**
   * OnPress Dismiss Button in Modal
   * Closes the login Modal
   */
  const closeModal = () => {
    dispatch({type: "CLOSE_MODAL"})
  }

  /**
   * Tracks and updates the values of inputs
   * @param {string} label Name of the input
   * @param {string} value Value of the input
   */
  const enterInput = (label, value) => {
    dispatch({type: "ENTER_INPUT", payload: {label, value} })
  }
  //#endregion

  return (
    <View style={styles.container}>
        <Link text='Register' disabled={false} target='Register' isExternal={false} style={{alignSelf:'flex-end'}} navigation={navigation}/>

        <Paper  title='Please Sign In' 
                header='1' 
                headerTitleStyle={[styles.h2, styles.margin_vertical_large]}
                image={require('../../assets/register-icon-transparent.png')}> 

            <View style={[
              styles.column,
              styles.padding_xlarge
            ]}>

                <ProjectTextInput  placeholder='Email' 
                                  label="Email"
                                  error={EmailError.error}
                                  errorText={EmailError.errorText}
                                  onChange={(e) => {enterInput('Email',e.target.value )}}/>

                <ProjectTextInput placeholder='Password' 
                                  error={PasswordError.error} 
                                  errorText={PasswordError.errorText}
                                  label="Password"
                                  onChange={(e) => {enterInput('Password',e.target.value )}} />

                <ProjectButton title='Login' type='default' style={{marginBottom: 18}} onPress={() => {login()}} />
                <ProjectButton title='Forgot Password' type='info'  />
                
            </View>
        </Paper>

        <LoginModal {...state} closeModal={closeModal} />


    </View>
  );
} 
