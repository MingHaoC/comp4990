import { View, ActivityIndicator, Text } from 'react-native';
import styles from '../../styles'
import {Link, Paper, ProjectTextInput, ProjectButton} from '../../components'
import { LoginProvider, useLoginContext } from '../../actions/Auth/Login/LoginContext';
import InfoModal from '../../components/InfoModal';
import Icon from 'react-native-vector-icons/Entypo';

/**
 * Login Screen
 */
export default function Login(props) {
return (  
  <LoginProvider> 
    <LoginContent {...props} />
  </LoginProvider>)
}

/**
 * Login Screen. The reason for this is because you cannot access a context in the same component as the provider
 */
const LoginContent = ({navigation}) => {

  // #region variables
  //For a desciption of state variables see initialState
  const {
    EmailError,               //Object, used to set error on email input, indicates error status and text
    PasswordError,            //Object, used to set error on email input, indicates error status and text
    login,                    //Func, on login button, initiates login
    enterEmail,               //Func, on email input, changes email set in state onTextChange
    enterPassword,            //Func, on password input, changes password in state onTextChange
    openForgotPasswordModal,  //Func, on 'forgot password' button, opens the modal that allows user to reset password
    Loading,                  //bool,used to switch between loading and normal display, indicates if loading
    LoginResponse,            //String, Used in response modal ,text provided on login error. 
    showResponseModal,        //Bool,used on response modal, indicates if response modal is shown or hidden
    toggleResponseModal,      //Func, used in response modal, changes the value of showResponseModal
    HidePassword,             //bool used in password input, indicates if password should be hidden or shown
    toggleHidePassword,       //Func, used on hide password button, toggles HidePassword
  } = useLoginContext()
  //#endregion
  return (
    <View style={styles.container}>
        <Link text='Register' disabled={false} target='Register' isExternal={false} style={{alignSelf:'flex-end'}} navigation={navigation}/>

        {/*Login Container */}
        <Paper  title='Please Sign In' 
                header='1' 
                headerTitleStyle={[styles.h2, styles.margin_vertical_large]}
                image={require('../../assets/register-icon-transparent.png')}> 

            {/*Login Container Content */}
            <View style={[
              styles.column,
              styles.padding_xlarge
            ]}>

              {/*Display loading spinner*/}
              {Loading && <ActivityIndicator size="large" />}

              {/*Hide inputs while loading */}
              {!Loading && 
              <>

                {/*Email Input*/}
                <ProjectTextInput placeholder='Email' 
                                  keyboardType="email-address"
                                  label="Email"
                                  autoComplete="email"
                                  autoCapitalize="none"
                                  error={EmailError.error}
                                  errorText={EmailError.errorText}
                                  onChangeText={(text) => {enterEmail(text)}}/>

                {/*Password Input*/}
                <View style={[styles.row]}>
                  <ProjectTextInput placeholder='Password' 
                                    // keyboardType="visible-password"
                                    autoComplete="password"
                                    autoCapitalize="none"
                                    error={PasswordError.error} 
                                    errorText={PasswordError.errorText}
                                    label="Password"
                                    secureTextEntry={HidePassword}
                                    style={[styles.large_container]}
                                    onChangeText={(text) => {enterPassword(text)}} />
                  
                  {HidePassword && 
                    <Icon name="eye" 
                          style={[styles.text_large,styles.theme_colour,styles.center, styles.padding_left_medium]} 
                          onPress={()=>{toggleHidePassword()}} /> 
                  }
                  {!HidePassword &&
                    <Icon name="eye-with-line" 
                          style={[styles.text_large,styles.theme_colour,styles.center, styles.padding_left_medium]} 
                          onPress={()=>{toggleHidePassword()}} />    
                  }
                </View>
                
                {/*Login Button*/}
                <ProjectButton  title='Login' 
                                type='default' 
                                style={[styles.margin_bottom_large]} 
                                onPress={() => {login()}} />

                {/*Forgot Password Button*/}
                <ProjectButton  title='Forgot Password' 
                                type='info' 
                                onPress={() => {openForgotPasswordModal()}}  />
              </>
              }

            </View>
        </Paper>

        {/*Response Modal. Shows the response after a login fails*/}
        <InfoModal  title="Error" 
                    body={<Text style={[styles.text_medium]}>{LoginResponse}</Text>} 
                    visible={showResponseModal}
                    onClose={() => {toggleResponseModal()}}
                    />
      
    </View>
  );
} 
