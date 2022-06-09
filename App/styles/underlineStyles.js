import {colours, rgba } from "./globals";

const underlineStyles = {
    underline:{
        alignSelf: 'stretch',
        textAlign: 'center',
        borderWidth: 1,
        borderStyle:'solid',
        borderColor:  new rgba( colours.foreground.r(), colours.foreground.g(), colours.foreground.b(), .07).toString(),
      },
}

export default underlineStyles