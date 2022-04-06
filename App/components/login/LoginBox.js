import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React from 'react'

export default function LoginBox() {
  return (
    <View elevation={5} style={styles.loginBox}>
        {/*Email input*/}
        <TextInput 
        style={styles.input} 
        placeholder='Email Address'/>

        {/*password input*/}
        <TextInput 
        style={styles.input} 
        placeholder='Password'/>

        {/*login btn*/}
        <View style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
        </View>

        {/*reset password*/}
        <Text style={styles.forgotPass}>Reset Password</Text>
  </View>
  )
}

const styles = StyleSheet.create({
    loginBox: {
        width: '80%',
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        padding:20,
        backgroundColor:'#fff',
        shadowColor: "#6F6F6F",
        borderRadius: 10,
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1}
    },

    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        marginVertical: 20,
        width: '100%'
    },

    btn: {
        marginVertical: 20,
        width: '100%',
        backgroundColor: '#8A1005',
        borderRadius: 10,
        padding: 10,
        alignItems:'center',
        justifyContent: 'center'
    },

    btnText: {
        color: '#F8F8F8F8',
        fontSize: 18
    },

    forgotPass: {
        marginVertical: 20,
        fontSize: 18,
        color: '#636466'
    }
})