import { textColours, fontFamily, colours } from "./globals";

//All new styles must be added using the same format:
// [newBtnStyleName]Btn 
// [newBtnStyleName]BtnPress 
// [newBtnStyleName]BtnText
// [newBtnStyleName]BtnPressText

const buttonStyles = {
 
    // Global style
    btn:{
        width: '100%',
        borderRadius: 25,
        paddingHorizontal: 30,
        paddingVertical: 8,
    },
    btnText:{
        textAlign:'center',
        fontSize: 14,
        lineHeight: 24,
        fontWeight: 'bold',
        letterSpacing: 2
    },

    //Default button style 
    defaultBtn:{
        backgroundColor: colours.secondary.toString(),
    },
    defaultBtnPress:{
        backgroundColor: colours.primary.toString(),
    },
    defaultBtnText:{
        color: textColours.background.toString(),
    },
    defaultBtnPressText:{
        color: textColours.background.toString(),
    },

    //Info button style
    infoBtn:{
        borderWidth: 1,
        borderStyle:'solid',
        borderColor: colours.foreground.toString(),
        backgroundColor: textColours.background.toString()
    },
    infoBtnPress:{
        backgroundColor: colours.foreground.toString()
    },
    infoBtnText:{
        color: textColours.primary.toString()
    },
    infoBtnPressText:{
        color: textColours.background.toString(),
    },

    /*
    New ProjectButton style template:
    Please copy&paste instead of overwrite so people who wish to add a new style in the future have easy access.

    //Style of button
    [newBtnStyleName]Btn:{

    },

    //Style button onPress
    [newBtnStyleName]BtnPress:{

    },

    //Style of button text
    [newBtnStyleName]BtnText:{

    },

    //Style of button text onPress
    [newBtnStyleName]BtnPressText:{

    },

    */

}

export default buttonStyles