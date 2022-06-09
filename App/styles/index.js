import { StyleSheet } from "react-native";
import textStyles from "./textStyles";
import linkStyle from "./linkStyle";
import buttonStyles from "./buttonStyles";
import paperStyles from "./paperStyles";
import inputTextStyles from "./inputTextStyles";
import underlineStyles from "./underlineStyles";
import { colours } from "./globals";

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: colours.background.toString(),
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 30    
    },
    form:{
      padding: 30,
      justifyContent:'center'
    },
    ...underlineStyles,
    ...textStyles,
    ...linkStyle,
    ...buttonStyles,
    ...paperStyles, 
    ...inputTextStyles,

  });

  
  export default styles