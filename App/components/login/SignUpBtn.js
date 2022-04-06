import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SignUpBtn() {
  return (
    <View style={styles.signUpBtnView}>
      <Text style={styles.signUpBtn}>Sign Up</Text>
    </View>
  )
}

const styles = StyleSheet.create({

    signUpBtnView: {
        width:'100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        marginVertical: 30,
        paddingRight: 30
    },

    signUpBtn: {
        fontSize: 18,
        color: '#636466'
    }
})