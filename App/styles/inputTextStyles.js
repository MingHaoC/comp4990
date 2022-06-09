import { textColours, fontFamily, colours } from "./globals";

//All new styles must be added using the same format:
// [newTextInputStyleName]TextInputContainer -> container for label + textInput + errorText
// [newTextInputStyleName]TextInputLabel -> styling for input label
// [newTextInputStyleName]TextInputFocused -> styling for input when onfocus
// [newTextInputStyleName]TextInputError -> styling for input when there is an error
// [newTextInputStyleName]TextInputErrorText -> styling for the error text that appears bellow the input


const inputTextStyles = {

    //Default styling
    TextInputContainer:{

    }, 
    TextInput: {
        width: '100%',
        height: 32,
        fontSize: 14,
        color: textColours.primary.toString(),
        backgroundColor: textColours.background.toString(),
        paddingHorizontal: 5,
        borderWidth: 1,
        borderStyle:'solid',
        borderColor: '#C8C7CC',
        
    },
    TextInputFocused: {
        backgroundColor: colours.background.toString(),
    },
    TextInputLabel:{

    },
    TextInputErrorText:{
        fontFamily: fontFamily,
        fontSize: 13,
        color: '#a94442',
        height: 18,
        marginBottom: 5,
    },
    textInputErrorHidden : {
        opacity: 0
    },
    TextInputError: {
        borderStyle:'dotted',
        borderColor: '#a94442',
    },



    /*
    New ProjectTextInput style template:
    Please copy&paste instead of overwrite so people who wish to add a new style in the future have easy access.

    [newTextInputStyleName]TextInputContainer: {

    },
    [newTextInputStyleName]TextInput:{
        
    },
    [newTextInputStyleName]TextInputLabel: {

    },
    [newTextInputStyleName]TextInputFocused: {

    },
    [newTextInputStyleName]TextInputError: {

    },
    [newTextInputStyleName]TextInputErrorText: {

    },
    */
}

export default inputTextStyles