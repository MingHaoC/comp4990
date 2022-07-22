import { Text, View } from 'react-native';
import styles from '../../styles'
import {Link, Paper, ProjectTextInput, ProjectButton, Ul, Underline} from '../../components'
import { useReducer } from 'react';
import reducer from '../../actions/registerReducer'
import { useAppContext } from '../../context';
import { RegisterModal } from '../../components/RegisterComponents';

// #region initial state
const initialState = {
  Firstname: '',    //Value of Firstname Input
  /*Indicates error in Firstname input*/
  FirstnameError: {
      error: false,
      errorText: ''
  },

  Lastname: '',    //Value of Lastname Input
  /*Indicates error in Lastname input*/
  LastnameError:{
    error: false,
    errorText: ''
  },

  Address: '',     //Value of Address Input
  /*Indicates error in Address input*/
  AddressError: {
    error: false,
    errorText: ''
  },

  Email: '',       //Value of Email Input
  /*Indicates error in Email input*/
  EmailError: {
    error: false,
    errorText: ''
  },

  Password: '',     //Value of Password Input
  /*Indicates error in Password input*/
  PasswordError: {
    error: false,
    errorText: ''
  },

  Verification: '',    //Value of Verification Input
  /*Indicates error in Verification input*/
  VerificationError: {
    error: false,
    errorText: ''
  },

  /*Response from sending a POST request to Register URL*/
  Response: {
    status: 500, 
    text: 'System Error'
  },

  showModal: false,   //Indicates if the LoginModal should be visible
                      //Modal is used to show POST request response

  registerPreconditionsMet: false, //Indicates if all the requirements have been met to send a POST request to Register
}

// #endregion

export default function Register({navigation}) { 

  // #region variables
  const {registerPOST} = useAppContext();
  const [state, dispatch] = useReducer(reducer, initialState)

  //For a desciption of state variables see initialState
  const {
    Firstname,
    FirstnameError,
    Lastname,
    LastnameError,
    Address,
    AddressError,
    Email,
    EmailError,
    Password,
    PasswordError,
    Verification,
    VerificationError,
    showModal,
    Response,
    registerPreconditionsMet
  } = state
  
  // #endregion
  
  // #region methods

  /**
   * onBlur of Password Input
   * Checks if the password provided by the user meets the requirements. If password requirements are not met an error is displayed 
   * @param {string} password Value of Password Input
   */
  const createPassword = (password) => {
      dispatch({type: "CREATE_PASSWORD", payload: password})

  } 

  /**
   * Tracks and updates the values of inputs
   * @param {string} label Name of the input
   * @param {string} value Value of the input
   */
  const enterInput = (label, value) => {
    dispatch({type: "ENTER_INPUT", payload: {label, value} })
  }

  /**
   * OnChange VerificationInput, onChange Password Input, onPress Registration Button
   * Ensures that password verification value provided by the user matches the password value provided. If the values do not match an error is displayed
   * @param {string} verifiyPassword Value of Verification Input
   */
  const enterVerifiyPassword = (verifiyPassword) => {
    dispatch({type: "VERIFIY_PASSWORD_MATCHES", payload: verifiyPassword})
  }

  /**
   * OnPress Login Button
   * Sends POST Request to Register URL if conditions are met and displays request results. 
   */
  const register = async() => {
      dispatch({type: 'CHECK_REGISTRATION_PRECONDITIONS'})

      if(registerPreconditionsMet)
      {
        console.log('loading...')
        //ToDo: Create Loading Screen
        const response = await registerPOST(Address,Firstname,Lastname,Email,Password);
        dispatch({type: 'CONFIRM_REGISTRATION', payload: {...response}})
      }

  }

  /**
   * OnPress Dismiss Button in Modal
   * Closes the Register Modal
   */
  const closeModal = () => {
    dispatch({type: "CLOSE_MODAL"})
  }

  // #endregion

  return (
    <View style={styles.container}>
       {/*Main Page*/}
        <>
        <Link text='Login' target='Login' disabled={false} isExternal={false} style={{alignSelf:'flex-end'}} navigation={navigation} />

        <Paper  title='Create a Profile' 
                header='1' 
                headerTitleStyle={[styles.h2, styles.margin_vertical_large]}
                // image={require('../../assets/register-icon-transparent.png')}
                > 

          <View style={[
              styles.column,
              styles.padding_horizontal_xlarge
            ]}>
                <ProjectTextInput placeholder='Firstname'  
                                // label='First Name'
                                onChange={(e) => 
                                {
                                  enterInput('Firstname', e.target.value)
                                }}
                                error={FirstnameError.error}
                                errorText={FirstnameError.errorText} />

                <ProjectTextInput placeholder='Lastname'
                                  // label='Last Name'
                                  onChange={(e) => 
                                    {
                                      enterInput('Lastname', e.target.value)
                                    }}
                                  error={LastnameError.error}
                                  errorText={LastnameError.errorText} />
              
              
              <ProjectTextInput placeholder='Address'
                                // label='Address'
                                  onChange={(e) => 
                                    {
                                      enterInput('Address', e.target.value)
                                    }}
                                  error={AddressError.error}
                                  errorText={AddressError.errorText} />

              <ProjectTextInput   placeholder='Email'
                                  // label='Email'
                                  onChange={(e) => 
                                  {
                                    enterInput('Email', e.target.value)
                                  }} 
                                  error={EmailError.error}
                                  errorText={EmailError.errorText}  />


                <Text style={[styles.h3]}>Create your Password</Text>
                <Underline />
                <Text style={[styles.mutedText, {marginTop: 5}]} >Your password must have at least:</Text>
                <Ul style={styles.mutedText} >8 characters</Ul>
                <Ul style={styles.mutedText} >1 letter</Ul>
                <Ul style={[styles.mutedText, {marginBottom: 18}]} >1 number</Ul>
                

                <ProjectTextInput   placeholder='Password' 
                                    // label='Password'
                                    onChange={(e) => {
                                      enterInput('Password', e.target.value)
                                      if(VerificationError.error){
                                        enterVerifiyPassword(Verification)
                                      }
                                    }}
                                    onBlur={(e) => {
                                      createPassword(Password)
                                    }}    
                                    error={PasswordError.error}
                                    errorText={PasswordError.errorText}
                                    style={{paddingBottom: 30}}
                                    />


                <ProjectTextInput   placeholder='Verification'
                                    // label='Password Verification'
                                    onChange={(e) => {
                                      enterInput('Verification', e.target.value)
                                      enterVerifiyPassword(e.target.value)
                                    }}
                                    error={VerificationError.error}
                                    errorText={VerificationError.errorText} 
                                    style={{paddingBottom: 30}}
                                    /> 

                <ProjectButton title='Register' type='default' onPress={() => {
                  enterVerifiyPassword(Verification)
                  register()
                }}/>
                
            </View>
        </Paper>
        </>

        <RegisterModal {...state} closeModal={closeModal} />


    </View>
  );
}
