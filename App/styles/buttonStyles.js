import { textColours, fontFamily } from "./globals";

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
        backgroundColor: 'rgba(224, 0, 52, 0.7)',
    },
    defaultBtnPress:{
        backgroundColor: '#8A1005',
    },
    defaultBtnText:{
        color: '#FFFFFF',
    },
    defaultBtnPressText:{
        color: '#FFFFFF',
    },

    //Info button style
    infoBtn:{
        borderWidth: 1,
        borderStyle:'solid',
        borderColor: '#212121 ',
    },
    infoBtnPress:{
        backgroundColor: '#212121'
    },
    infoBtnText:{
        color: '#212121'
    },
    infoBtnPressText:{
        color: '#FFFFFF',
    }

}

export default buttonStyles