import { StyleSheet, Text, View, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SignUpBtn from './SignUpBtn';
import Header from './Header';
import LoginBox from './LoginBox';


export default function LoginRoot() {

 
  return (
    <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss()
    }}>
      {/* Screen */}
      <View style={styles.loginScreen}>
        {/*sign up*/}
        <SignUpBtn/>

        {/*Header*/}
        <Header/>

        {/*Login Box*/}
        <LoginBox/>

      </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    backgroundColor: '#F8F8F8F8'
  }
})
