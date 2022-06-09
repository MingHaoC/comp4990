import { textColours, fontFamily } from "./globals";


const textStyles = {
    text: {
        fontFamily: fontFamily,
        fontSize: 16,
        color: textColours.primary.toString()
    },
    secondaryText:{
        fontFamily: fontFamily,
        fontSize: 16,
        color: textColours.secondary.toString()
    },
    bold: {
        fontWeight:'bold'
    },
    mutedText: {
        fontFamily: fontFamily,
        fontSize: 13,
        color: textColours.muted.toString()
    },
    h1:{
        fontFamily: fontFamily,
        color: textColours.primary.toString(),
        fontSize: 38,
        lineHeight:44,
        fontWeight: 'bold'
    },
    h2:{
        fontFamily: fontFamily,
        color: textColours.secondary.toString(),
        fontSize: 30,
        lineHeight:36,
        fontWeight: 'normal'
    },
    h3:{
        fontFamily: fontFamily,
        fontSize: 18,
        lineHeight: 22,
        color: textColours.secondary.toString()
    },
    attentionText:{
        color: textColours.attention.toString()
    }
}

export default textStyles