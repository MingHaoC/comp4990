import { textColours, fontFamily } from "./globals";


const textStyles = {
    text: {
        fontFamily: fontFamily,
        fontSize: 16,
        color: textColours.primary
    },
    secondaryText:{
        fontFamily: fontFamily,
        fontSize: 16,
        color: textColours.secondary
    },
    bold: {
        fontWeight:'bold'
    },
    mutedText: {
        fontFamily: fontFamily,
        fontSize: 13,
        color: textColours.muted
    },
    h1:{
        fontFamily: fontFamily,
        color: textColours.primary,
        fontSize: 38,
        lineHeight:44,
        fontWeight: 'bold'
    },
    h2:{
        fontFamily: fontFamily,
        color: textColours.secondary,
        fontSize: 30,
        lineHeight:36,
        fontWeight: 'normal'
    },
    h3:{
        fontFamily: fontFamily,
        fontSize: 18,
        lineHeight: 22,
        color: textColours.secondary
    },
    attentionText:{
        color: textColours.attention
    }
}

export default textStyles