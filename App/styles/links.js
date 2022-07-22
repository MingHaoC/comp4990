import base from "./base";
/**
 * Styles for Link component
 * This acts as a stylesheet that allows for various styles for the Link component
 * In the Link component, a dynamic object is used to select a style which matches the below format.
 * As such, all new styles must be added using the same format:
 * [newLinkStyleName]_link_text 
 * [newLinkStyleName]_link_text_on_press 
 * [newLinkStyleName]_link_underline
 * [newLinkStyleName]_link_underline_on_press
 * 
 * @authors avdouloa@uwindsor.ca, 
 */
const links = {

    //#region Default Link Style
    default_link_text: {
        ...base.theme_colour,
    },
    default_link_text_on_press:{
        ...base.theme_tinted_colour
    },
    default_link_underline: {
        ...base.hidden
    },
    default_link_underline_on_press: {
        ...base.visible,
        ...base.theme_tint_border_color
    },
    //#endregion

    //#region top level dropdown link style
    top_level_dropdown_link_text:{
        ...base.muted_2_coloured_bg,
        ...base.base_shade_colour,
        ...base.padding_vertical_small,
    },
    top_level_dropdown_link_text_on_press:{

    },
    top_level_dropdown_link_underline:{
        ...base.muted_2_coloured_bg,
    },
    top_level_dropdown_link_underline_on_press:{
        ...base.muted_2_coloured_bg,
    },
    //#endregion

    //#region dropdown sub links
    sub_dropdown_link_text:{
        ...base.theme_coloured_bg,
        ...base.base_shade_colour,
        ...base.padding_vertical_small,

    },
    sub_dropdown_link_text_on_press:{

    },
    sub_dropdown_link_underline:{
        ...base.theme_border_color
    },
    sub_dropdown_link_underline_on_press:{
        ...base.theme_border_color
    },
    //#endregion
}

export default links