import { textColours, fontFamily } from "./globals";

const inputTextStyles = {
    textInputContainer:{

    }, 
    textInput: {
        width: '100%',
        height: 32,
        fontSize: 14,
        color: '#111',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 5,
        paddingVerticle: 4,
        borderWidth: 1,
        borderStyle:'solid',
        borderColor: '#C8C7CC',
    },
    textInputFocused: {
        backgroundColor: '#F8F8F8',
    },
    textInputLabel:{

    },
    textInputErrorText:{
        fontFamily: fontFamily,
        fontSize: 13,
        color: '#a94442',
        height: 18,
        marginBottom: 5,
    },
    textInputErrorHidden : {
        opacity: 0
    },
    textInputError: {
        borderStyle:'dotted',
        borderColor: '#a94442',
    }
}

export default inputTextStyles