import { StyleSheet, Text, View, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import LoginBtn from './LoginBtn';
import Header from './Header';
import SignUpBox from './SignUpBox';


export default function SignUpRoot() {

 
  return (
    <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss()
    }}>
      {/* Screen */}
      <View style={styles.loginScreen}>
        {/*sign up*/}
        <LoginBtn/>

        {/*Header*/}
        <Header/>

        {/*Login Box*/}
        <SignUpBox/>

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
