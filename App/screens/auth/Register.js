import { ActivityIndicator, Text, View } from 'react-native';
import styles from '../../styles'
import {Link, Paper, ProjectTextInput, ProjectButton, Ul, Underline} from '../../components'
import { ScrollView } from 'react-native-gesture-handler';
import {RegisterProvider, useRegisterContext } from '../../actions/Auth/Register/RegisterContext';
import InfoModal from '../../components/InfoModal';
import Icon from 'react-native-vector-icons/Entypo';

/**
 * Register Screen
 */

export default function Register(props) {
  return (
    <RegisterProvider>
      <RegisterContent {...props} />
    </RegisterProvider>
  );
}

/**
 * The actual content of the regsiter screen
 * We create a seperate component because we cannot access the context within the component that wraps the provider
 */
const RegisterContent = ({navigation}) => { 


  const {
    registerUser,
    enterFirstname,
    enterLastname,
    enterEmail,
    enterAddress,
    enterPassword,
    enterPasswordVerification,
    FirstnameError,
    LastnameError,
    AddressError,
    EmailError,
    PasswordError,
    VerificationError,
    passwordMeetsRequirements,
    verificationMatchesPassword,
    HideVerificationPassword,
    HidePassword,
    Loading,
    RegisterResponse,
    showResponseModal,
    toggleHidePassword,
    toggleHideVerifcationPassword,
    toggleResponseModal
  }  = useRegisterContext()

  return (
    <>
    <ScrollView>
      {/*Background*/}
      <View style={styles.container}>

          <Link text='Login' target='Login' disabled={false} isExternal={false} style={{alignSelf:'flex-end'}} navigation={navigation} />

          {/*Registration Container*/}
          <Paper  title='Create a Profile' 
                  header='1' 
                  headerTitleStyle={[styles.h2, styles.margin_vertical_large]}
                  image={require('../../assets/register-icon-transparent.png')}
                  > 

            {/*Display loading spinner*/}
            {Loading && <ActivityIndicator size="large" />}

            {/*Hide inputs while loading */}
            {!Loading && 
            <>
              {/*Regsitration Container Content*/}
              <View style={[
                styles.column,
                styles.padding_horizontal_large
              ]}>
                  {/*Firstname Input*/}
                  <ProjectTextInput placeholder='Enter first name...'  
                                  label='First Name'
                                  autoComplete="name-given"                                  
                                  onChangeText={(text) => 
                                  {
                                    enterFirstname(text)
                                  }}
                                  error={FirstnameError.error}
                                  errorText={FirstnameError.errorText} />

                  {/*Lastname Input*/}
                  <ProjectTextInput placeholder='Enter last name...'
                                    label='Last Name'
                                    autoComplete="name-family"                                  
                                    onChangeText={(text) => 
                                      {
                                        enterLastname(text)
                                      }}
                                    error={LastnameError.error}
                                    errorText={LastnameError.errorText} />
                
                {/*Address Input*/}
                <ProjectTextInput placeholder='Enter address...'
                                  autoComplete="postal-address-extended-postal-code"
                                  label='Address'
                                  autoCapitalize='none'
                                    onChangeText={(text) => 
                                      {
                                        enterAddress(text)
                                      }}
                                    error={AddressError.error}
                                    errorText={AddressError.errorText} />
                
                {/*Email Input*/}
                <ProjectTextInput   placeholder='Enter email...'
                                    label='Email'
                                    autoCapitalize="none"
                                    autoComplete="email"
                                    keyboardType="email-address"
                                    onChangeText={(text) => 
                                    {
                                      enterEmail(text)
                                    }} 
                                    error={EmailError.error}
                                    errorText={EmailError.errorText}  />

                {/*Password Requirements*/}
                <View>
                  <Text style={[styles.h3]}>Create your Password</Text>
                  <Underline />
                  <Text style={[styles.mutedText, {marginTop: 5}]} >Your password must have at least:</Text>
                  <Ul style={styles.mutedText} >8 characters</Ul>
                  <Ul style={styles.mutedText} >1 letter</Ul>
                  <Ul style={[styles.mutedText, {marginBottom: 18}]} >1 number</Ul>
                </View>

                {/*Password Input*/}
                <View style={[styles.row]}>
                  <ProjectTextInput placeholder='Enter password...' 
                                    // keyboardType="visible-password"
                                    autoComplete="password"
                                    error={PasswordError.error} 
                                    errorText={PasswordError.errorText}
                                    label="Password"
                                    secureTextEntry={HidePassword}
                                    style={[styles.large_container]}
                                    onBlur={()=>{passwordMeetsRequirements()}}
                                    onChangeText={(text) => {enterPassword(text)}} />
                  
                  {HidePassword && 
                    <Icon name="eye" 
                      style={[styles.text_large,
                        styles.theme_colour,
                        styles.start, 
                        styles.padding_top_xlarge,
                        styles.padding_left_medium]} 
                      onPress={()=>{toggleHidePassword()}} /> 
                  }
                  {!HidePassword &&
                    <Icon name="eye-with-line" 
                          style={[styles.text_large,
                            styles.theme_colour,
                            styles.start, 
                            styles.padding_top_xlarge,
                            styles.padding_left_medium]} 
                          onPress={()=>{toggleHidePassword()}} />    
                  }
                </View>


              {/*Password Verification Input*/}
              <View style={[styles.row]}>
                  <ProjectTextInput placeholder='Enter password...' 
                                    secureTextEntry={HideVerificationPassword}
                                    autoComplete="password"
                                    error={VerificationError.error} 
                                    errorText={VerificationError.errorText}
                                    label="Verifiy Password"
                                    style={[styles.large_container]}
                                    onBlur={()=>{verificationMatchesPassword()}}
                                    onChangeText={(text) => {enterPasswordVerification(text)}} />
                  
                  {HideVerificationPassword && 
                    <Icon name="eye" 
                      style={[styles.text_large,
                        styles.theme_colour,
                        styles.start, 
                        styles.padding_top_xlarge,
                        styles.padding_left_medium]} 
                      onPress={()=>{toggleHideVerifcationPassword()}} /> 
                  }
                  {!HideVerificationPassword &&
                    <Icon name="eye-with-line" 
                          style={[styles.text_large,
                            styles.theme_colour,
                            styles.start, 
                            styles.padding_top_xlarge,
                            styles.padding_left_medium]} 
                          onPress={()=>{toggleHideVerifcationPassword()}} />    
                  }
                </View>

                  <ProjectButton title='Register' type='default' onPress={() => {
                    registerUser()
                  }}/>
              
              </View>
            </>}
          </Paper>

        {/*Response Modal. Shows the response after a login fails*/}
        <InfoModal  title="Error" 
                    body={<Text style={[styles.text_medium]}>{RegisterResponse}</Text>} 
                    visible={showResponseModal}
                    onClose={() => {toggleResponseModal()}}
                    />


        <RegisterModal {...state} closeModal={closeModal} />
      </View>
    </ScrollView>
    </>

  );
};
