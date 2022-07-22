import base from "./base";
/**
 * Styles for ProjectButton
 * This acts as a stylesheet that allows for various styles for the ProjectButton component
 * In the ProjectButton component, a dynamic object is used to select a style which matches the below format.
 * As such, all new styles must be added using the same format:
 * [newBtnStyleName]_btn 
 * [newBtnStyleName]_btn_on_press 
 * [newBtnStyleName]_btn_text
 * [newBtnStyleName]_btn_text_on_press
 * 
 * @authors avdouloa@uwindsor.ca, 
 */
const buttons = {

    //#region Default Style

    /*Button Background */
    default_btn: {
        ...base.theme_tinted_coloured_bg
    },

    /*Button Background on Press */
    default_btn_on_press:{
        ...base.theme_coloured_bg
    },

    /*Button Text */
    default_btn_text:{
        ...base.base_shade_colour,
    },

    /*Button Text on Press */
    default_btn_text_on_press:{
        ...base.base_shade_colour
    },

    //#endregion

    //#region Info Style
    /*Button Container */
    info_btn: {
        ...base.border,
        ...base.main_text_color_border_color,
        ...base.base_shade_bg
    },

    /*Button Background on Press */
    info_btn_on_press:{
        ...base.main_text_colour_bg
    },

    /*Button Text */
    info_btn_text:{
        ...base.main_text_colour
    },

    /*Button Text on Press */
    info_btn_text_on_press:{
        ...base.base_shade_colour
    },
    //#endregion

    //#region Attention

    /*Button Background */
    attention_btn: {
        ...base.theme_complement_coloured_bg
    },

    /*Button Background on Press */
    attention_btn_on_press:{
        ...base.muted_2_coloured_bg
    },

    /*Button Text */
    attention_btn_text:{
        ...base.base_shade_colour,
    },

    /*Button Text on Press */
    attention_btn_text_on_press:{
        ...base.base_shade_colour
    },

    //#endregion
}

export default buttons
