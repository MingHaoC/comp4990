import React from 'react';
import {Stylesheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 30    
    },
    input: {
      width: '100%',
      height: 32,
      fontSize: 18,
      color: '#111',
      backgroundColor: '#FFFFFF',
      marginBottom: 18,
      paddingHorizontal: 5,
      borderWidth: 1,
      borderStyle:'solid',
      borderColor: '#C8C7CC',
      border: '1px solid #C8C7CC'
    },  
    form:{
      padding: 30,
      justifyContent:'center'
    },
    mutedText: {
      fontSize: 13,
      color: 'rgba(155, 155, 159, 1)'
    },
    h3:{
      fontSize: 18,
      lineHeight: 22,
      color: '#5B5B60'
    },
    underline:{
      width: '100%',
      borderWidth: 1,
      borderStyle:'solid',
      borderColor: 'rgba(0, 0, 0, 0.07)',
  },
  btn:{
    width: '100%',
    backgroundColor: 'rgba(224, 0, 52, 0.7)',
    borderRadius: 30,
    padding: 9
  },
  btnText:{
    textAlign:'center',
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 22
  },
  linkText:{
    fontSize: 22,
    lineHeight: 44,
    color: 'rgba(138, 16, 5, 0.7)'
  }
  
  
  });

  export default styles