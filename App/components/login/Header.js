import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header() {
  return (
    <View style={styles.headerView}>
      <Text style={styles.headertitle}>Please Sign In</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    headerView: {
        width:'100%',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 30,
        paddingRight: 30
    },

    headertitle: {
        fontSize: 30,
        color: '#8A1005'
    }
})