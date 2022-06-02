import { StyleSheet } from "react-native";
import textStyles from "./textStyles";
import linkStyle from "./linkStyle";
import buttonStyles from "./buttonStyles";
import paperStyles from "./paperStyles";
import inputTextStyles from "./inputTextStyles";

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 30    
    },
    form:{
      padding: 30,
      justifyContent:'center'
    },
    underline:{
      alignSelf: 'stretch',
      textAlign: 'center',
      borderWidth: 1,
      borderStyle:'solid',
      borderColor: 'rgba(0, 0, 0, 0.07)',
    },
    
    ...textStyles,
    ...linkStyle,
    ...buttonStyles,
    ...paperStyles, 
    ...inputTextStyles,

  });

  
  export default styles