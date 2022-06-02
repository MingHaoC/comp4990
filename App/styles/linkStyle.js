import { textColours, fontFamily } from "./globals";

//All new styles must be added using the same format:
// [newLinkStyleName]LinkText
// [newLinkStyleName]LinkOnPress
// [newLinkStyleName]LinkBottomBorder
// [newLinkStyleName]LinkContainer

const linkStyle = {

    //Global Styling
    linkText: {
        fontFamily: fontFamily,
        fontSize: 18,
        lineHeight: 22
    },
    linkOnPress: {
        color: textColours.pressed, 
        fontSize: 18,
        lineHeight: 22
    },
    linkContainer:{
        alignSelf:'right' 
    },
    linkBottomBorder: {
        borderColor: textColours.pressed,
        marginTop: 3
    },
    linkBottomHidden: {
        opacity: 0
    },

    //Default Styling
    defaultLinkText: {
        color: textColours.attention,  
    },
    defaultLinkOnPress: {
        color: textColours.pressed, 
    },
    defaultLinkBottomBorder: {
        borderColor: textColours.pressed,
    },
    defaultLinkContainer: {

    }
}

export default linkStyle