import React from 'react';
import { View } from 'react-native';
import styles from '../../styles'
import { useReducer } from 'react';
import {Link, Paper, ProjectTextInput, ProjectButton} from '../../components'
import reducer from '../../actions/Auth/Login/loginReducer'
import {useAppContext} from '../../context'
import LoginModal from './auth-modals/LoginModal';
import { LoginProvider, useLoginContext } from '../../actions/Auth/Login/LoginContext';


export default function Login(props) {
return (  
  <LoginProvider>
    <LoginContent {...props} />
  </LoginProvider>)
}

// #endregion
const LoginContent = ({navigation}) => {

  // #region variables


  //For a desciption of state variables see initialState
  const {
    state,
    Email,
    EmailError,
    Password,
    PasswordError,
    LoginPreconditionsMet,
    showModal,              
    Response,
    login,
    enterEmail,
    enterPassword,
    openForgotPasswordModal                
  } = useLoginContext()

  //#endregion

  //#region methods

  /**
   * OnPress login Button
   * Sends POST Request to Login URL if login conditions are met and displays request results. 
   */
  // const login = async() => {
  //   dispatch({type: "VERIFIY_LOGIN_PRECONDITIONS"})

  //   if(LoginPreconditionsMet){

  //     console.log('loading...')
  //     //TODO: Create Loading Screen
  //     const response = await loginPOST(Email, Password) 
  //     dispatch({type: 'CONFIRM_LOGIN', payload: {...response}})

  //   }
  // }

  /**
   * OnPress Dismiss Button in Modal
   * Closes the login Modal
   */
  const closeModal = () => {
    // dispatch({type: "CLOSE_MODAL"})
  }

  /**
   * Tracks and updates the values of inputs
   * @param {string} label Name of the input
   * @param {string} value Value of the input
   */
  const enterInput = (label, value) => {
    // dispatch({type: "ENTER_INPUT", payload: {label, value} })
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
                                  onChangeText={(text) => {enterEmail(text)}}/>

                <ProjectTextInput placeholder='Password' 
                                  error={PasswordError.error} 
                                  errorText={PasswordError.errorText}
                                  label="Password"
                                  onChangeText={(text) => {enterPassword(text)}} />

                <ProjectButton title='Login' type='default' style={{marginBottom: 18}} onPress={() => {login()}} />
                <ProjectButton title='Forgot Password' type='info' onPress={() => {openForgotPasswordModal()}}  />
                
            </View>
        </Paper>

        <LoginModal {...state} closeModal={closeModal} />


    </View>
  );
} 
