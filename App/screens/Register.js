import { Text, View } from 'react-native';
import styles from '../styles'
import {Link, Paper, ProjectTextInput, ProjectButton, Ul, Underline} from '../components'
import { useReducer } from 'react';
import reducer from '../actions/registerReducer'

const initialState = {
  Firstname: '',
  FirstnameError: {
      error: false,
      errorText: ''
  },

  Lastname: '',
  LastnameError:{
    error: false,
    errorText: ''
},

  Email: '',
  EmailError: {
    error: false,
    errorText: ''
},

  Password: '',
  PasswordError: {
    error: false,
    errorText: ''
},

  Verification: '',
  VerificationError: {
    error: false,
    errorText: ''
}

}

export default function Register() { 

  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    Firstname,
    FirstnameError,
    Lastname,
    LastnameError,
    Email,
    EmailError,
    Password,
    PasswordError,
    Verification,
    VerificationError
  } = state
  
  const createPassword = (password) => {
      dispatch({type: "CREATE_PASSWORD", payload: password})

  } 

  const enterInput = (label, value) => {
    dispatch({type: "ENTER_INPUT", payload: {label, value} })
  }

  const enterVerifiyPassword = (verifiyPassword) => {
    dispatch({type: "VERIFIY_PASSWORD_MATCHES", payload: verifiyPassword})
  }

  const register = () => {
      dispatch({type: 'REGISTER'})
  }

  return (
    <>
        <Link text='Login' target='' disabled={true} style={{alignSelf:'flex-end'}}/>

        <Paper title='Create a Profile' header='1' headerTitleStyle={styles.h2} image={require('../assets/register-icon-transparent.png')}> 

            <View style={styles.form}>

                <ProjectTextInput placeholder='Firstname'  
                                onChange={(e) => 
                                {
                                  enterInput('Firstname', e.target.value)
                                }}
                                error={FirstnameError.error}
                                errorText={FirstnameError.errorText} />

                <ProjectTextInput placeholder='Lastname'
                                  onChange={(e) => 
                                    {
                                      enterInput('Lastname', e.target.value)
                                    }}
                                  error={LastnameError.error}
                                  errorText={LastnameError.errorText} />

              <ProjectTextInput   placeholder='Email'
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
                                    label='Password'
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
                                    label='Verification'
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
  );
} 