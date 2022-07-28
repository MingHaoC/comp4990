/**
 * Defines core style properties that are to be used across all style documents.
 * Core properties are: colours, font size, line height, general sizes, and mode 
 * @authors avdouloa@uwindsor.ca, 
 */

//#region Sizing
/**
 * Used to indicate the general sizing for padding, margin, borders, width, height
 * Not used for fonts
 */
const sizing = {
    XLarge: 30,
    Large: 18,
    Medium: 9,
    Small: 4,
    XSmall: 2,
    FullContainer: '100%',
    LargeContainer: '90%',
    MediumContainer: '70%',
    HalfConatiner: '50%',
    SmallContainer: '20%',

}

/**
 * Used to size fonts
 */
const fontSizing = {
    XLarge: {fontSize:38, lineHeight: 44},
    Large: {fontSize: 30, lineHeight: 36},
    Medium: {fontSize: 18, lineHeight: 22},
    Small: {fontSize: 16, lineHeight: 20},
    XSmall: {fontSize: 13, lineHeight: 15}
}
//#endregion

// #region Mode
/**
 * Mode indicates the current theme mode. Colour values can change depedning on diffrent modes selected
 */

//Indicates possible theme mode
const modes = ['light','dark']

//Indicates current mode
let mode = modes[0]

/**
 * Updates the current mode
 * @param {number} mode_id Id of mode to set as current
 */
const setMode = (mode_id) => {
    //Ensure index is in bounds
    if(mode_id >= 0 && mode_id < modes.length){
        mode = mode[mode_id]
    }
}

/**
 * Inidcates he current mode
 * @returns An object indicating the mode name and id. Sample return {id: 0, name: 'description'}
 */
const getMode = () => {

    return {id: '', name: ''}
}
//#endregion

// #region Colours
/**
 * Theme colours used throughout the app
 */
const default_colours = {
    theme_colour: 'rgb(136, 16, 5)',            //Dark red
    theme_tint:'rgba(224, 0, 52, .7)',          //light red
    theme_shade: 'rgb(70, 8, 2)',               //darker red
    muted_1: 'rgba(33, 33, 33, 0.07)',          //light grey
    muted_2: 'rgb(111, 111, 111)',              //a dark grey colour
    theme_complement: 'rgb(15, 188, 185)',      //Turqois, a complement colour of the theme colour
    base_shade: 'rgba(255,255,255,1)',             //Indicates the base shade. Should be black or white
    tinted_base_shade: 'rgb(248, 248, 248)',    //A light grey, close to white                  
    main_text_color: 'rgb(33, 33, 33)',         //light black or dark grey
    muted_text_1:'rgba(155, 155, 159, 1)',      //light grey
    muted_text_2:'rgba(91, 91, 96, 1)',         //dark grey
    error: 'rgb(136, 16, 5)',                   //dark red
    modal_backdrop: 'rgba(0,0,0,.7)'            //transparent black
}

/**
 * Provides the ability to change the theme colour based on mode
 * @returns rgb string of theme colour
 */
const getThemeColour = () => {
    switch (mode) {
        //light mode by default
        default:
            return default_colours.theme_colour
    }
}

/**
 * Provides the ability to change the theme theme_shade based on mode
 * @returns rgb string of theme_shade colour
 */
 const getThemeShade = () => {
    switch (mode) {
        //light mode by default
        default:
            return default_colours.theme_shade
    }
}

/**
 * Provides the ability to change muted_1 colour based on mode
 * @returns rgb string muted_1 colour
 */
const getMuted1 = () => {
    switch (mode) {
        //light mode by default
        default:
            return default_colours.muted_1
    }
}
/**
 * Provides the ability to change muted_2 colour based on current mode
 * @returns rgb string containing muted_2 colour code
 */
const getMuted2 = () => {
    switch (mode) {
        //light mode by default
        default:
            return default_colours.muted_2
    }
}

/**
 * Provides the ability to change theme_complement colour based on current mode
 * @returns RGB string containing corresponding theme_complement colour code 
 */
const getThemeComplement = () => {
    switch (mode) {
        //light mode by default
        default:
            return default_colours.theme_complement
    }
}

/**
 * Provides the ability to change base_shade colour based on current mode
 * @returns RGB string containing corresponding base_shade colour code 
 */
const getBaseShade = () => {
    switch (mode) {
        case 'dark':
            return 'rgba(0,0,0,1)';

        //light mode by default
        default:
            return default_colours.base_shade
    }
}

/**
 * Provides the ability to change tinted_base_shade colour based on current mode
 * @returns RGB string containing tinted_base_shade base_shade colour code 
 */
const getTintedBaseShade = () => {
    switch (mode) {
        case 'dark':
            return 'rgba(33, 33, 33, 1)';

        //light mode by default
        default:
            return default_colours.tinted_base_shade
    }
} 

/**
 * Provides the ability to change main_text_color colour based on current mode
 * @returns RGB string containing main_text_color base_shade colour code 
 */
const getMainTextColour = () => {
    switch (mode) {
        case 'dark':
            return 'rgba(248, 248, 248, 1)';

        //light mode by default
        default:
            return default_colours.main_text_color;
    }
}

/**
 * Provides the ability to change theme_tint colour based on current mode
 * @returns RGB string containing theme_tint base_shade colour code 
 */
const getThemeTint = () => {
    switch (mode) {
        //light mode by default
        default:
            return default_colours.theme_tint;
    }
}


/**
 * Provides the ability to change muted_text_1 colour based on current mode
 * @returns RGB string containing muted_text_1 base_shade colour code 
 */
const getMutedText1 = () => {
    switch (mode) {
        //light mode by default
        default:
            return default_colours.muted_text_1;
    }
}

/**
 * Provides the ability to change muted_text_2 colour based on current mode
 * @returns RGB string containing muted_text_2 base_shade colour code 
 */
const getMutedText2 = () => {
    switch (mode) {
        //light mode by default
        default:
            return default_colours.muted_text_2;
    }
}

/**
 * Provides the ability to change error colour based on current mode
 * @returns RGB string containing error base_shade colour code 
 */
 const getError = () => {
    switch (mode) {
        //light mode by default
        default:
            return default_colours.error;
    }
}

/**
 * Provides the ability to change the modal backdrop colour colour based on mode
 * @returns rgb string of modal backdrop colour
 */
 const getModalBackdropColour = () => {
    switch (mode) {
        //light mode by default
        default:
            return default_colours.modal_backdrop
    }
}

/**
 * Colours to be used across styling of the project
 * Properties with suffix 1 are closer to the base shade 
 * (ie if base shade is white then prop_1 is lighter than prop_2)
 * (if base shade is black then prop_1 should be darker than prop_2)
 */
const colours = {
    theme_colour: getThemeColour(),
    theme_tint: getThemeTint(),
    theme_shade: getThemeShade(),  
    muted_1: getMuted1(),
    muted_2: getMuted2(),
    theme_complement: getThemeComplement(),
    base_shade: getBaseShade(),
    tinted_base_shade: getTintedBaseShade(),              
    main_text_color: getMainTextColour(),
    muted_text_1: getMutedText1(),
    muted_text_2: getMutedText2(),
    error: getError(),
    modal_backdrop: getModalBackdropColour()
}
// #endregion 

export {colours, sizing, fontSizing, getMode, setMode, modes}