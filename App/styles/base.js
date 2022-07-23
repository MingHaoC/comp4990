/**
 * Style framework for this project
 * @authors avdouloa@uwindsor.ca, 
 */
 import {colours, fontSizing, sizing} from './globals'
 
 /**
  * All possible background colours to be used in the project
  */
 const background_colors = {
     theme_coloured_bg: {
         backgroundColor: colours.theme_colour
     },
     theme_tinted_coloured_bg: {
         backgroundColor: colours.theme_tint
     },
     theme_shaded_coloured_bg:{
         backgroundColor: colours.theme_shade
     },
     theme_complement_coloured_bg:{
         backgroundColor: colours.theme_complement
     },
     muted_1_coloured_bg:{
         backgroundColor: colours.muted_1
     },
     muted_2_coloured_bg: {
         backgroundColor: colours.muted_2
     },
     base_shade_bg: {
         backgroundColor: colours.base_shade
     },
     base_shade_tinted_bg:{
         backgroundColor: colours.tinted_base_shade
     },
     error_bg: {
         backgroundColor: colours.error
     },
     main_text_colour_bg:{
         backgroundColor: colours.main_text_color
     },
     muted_text_1_bg:{
         backgroundColor: colours.muted_text_1
     },
     muted_text_2_bg: {
         backgroundColor: colours.muted_text_2
     },
     modal_backdrop_bg:{
      backgroundColor: colours.modal_backdrop
     },
     transparent_bg: {
      backgroundColor: 'rgba(0,0,0,0)'
     }
 }
 
 /**
  * All possible colours to be used in the project
  */
 const colors = {
     theme_colour: {
         color: colours.theme_colour
     },
     theme_tinted_colour: {
         color: colours.theme_tint
     },
     theme_shaded_colour:{
         color: colours.theme_shade
     },
     theme_complement_colour:{
         color: colours.theme_complement
     },
     muted_1_colour:{
         color: colours.muted_1
     },
     muted_2_colour: {
         color: colours.muted_2
     },
     base_shade_colour: {
         color: colours.base_shade
     },
     base_shade_tinted_colour:{
         color: colours.tinted_base_shade
     },
     error_colour: {
         color: colours.error
     },
     main_text_colour:{
         color: colours.main_text_color
     },
     muted_text_1_colour:{
         color: colours.muted_text_1
     },
     muted_text_2_colour: {
         color: colours.muted_text_2
     }
 }
 
 /**
  * All possible margin styles to be used across the project
  */
 const margins = {
     //#region margin
     margin_xlarge: {
         margin: sizing.XLarge
       },
       margin_large: {
         margin: sizing.Large
       },
       margin_medium: {
         margin: sizing.Medium
       },
       margin_small: {
         margin: sizing.Small
       },
       margin_xsmall:{
         margin: sizing.XSmall
       },
       margin_none: {
         margin: 0
       },
     //#endregion
 
     //#region /*Horizontal Margin */
     margin_horizontal_xlarge: {
         marginHorizontal: sizing.XLarge
       },
       margin_horizontal_large: {
         marginHorizontal: sizing.Large
       },
       margin_horizontal_medium: {
         marginHorizontal: sizing.Medium
       },
       margin_horizontal_small: {
         marginHorizontal: sizing.Small
       },
       margin_horizontal_xsmall:{
         marginHorizontal: sizing.XSmall
       },
       margin_horizontal_none: {
         marginHorizontal: 0
       },
       //#endregion
   
       //#region /*Vertical Margin */
       margin_vertical_xlarge: {
         marginVertical: sizing.XLarge
       },
       margin_vertical_large: {
         marginVertical: sizing.Large
       },
       margin_vertical_medium: {
         marginVertical: sizing.Medium
       },
       margin_vertical_small: {
         marginVertical: sizing.Small
       },
       margin_vertical_xsmall:{
         marginVertical: sizing.XSmall
       },
       margin_vertical_none: {
         marginVertical: 0
       },
       //#endregion
   
       //#region /*Top Margin*/
       margin_top_xlarge: {
         marginTop: sizing.XLarge
       },
       margin_top_large: {
         marginTop: sizing.Large
       },
       margin_top_medium: {
         marginTop: sizing.Medium
       },
       margin_top_small: {
         marginTop: sizing.Small
       },
       margin_top_xsmall:{
         marginTop: sizing.XSmall
       },
       margin_top_none: {
         marginTop: 0
       },
       //#endregion
   
       //#region /*Bottom Margin*/
       margin_bottom_xlarge: {
         marginBottom: sizing.XLarge
       },
       margin_bottom_large: {
         marginBottom: sizing.Large
       },
       margin_bottom_medium: {
         marginBottom: sizing.Medium
       },
       margin_bottom_small: {
         marginBottom: sizing.Small
       },
       margin_bottom_xsmall:{
         marginBottom: sizing.XSmall
       },
       margin_bottom_none: {
         marginBottom: 0
       },
       //#endregion
   
       //#region /*Right Margin*/
       margin_right_xlarge: {
         marginRight: sizing.XLarge
       },
       margin_right_large: {
         marginRight: sizing.Large
       },
       margin_right_medium: {
         marginRight: sizing.Medium
       },
       margin_right_small: {
         marginRight: sizing.Small
       },
       margin_right_xsmall:{
         marginRight: sizing.XSmall
       },
       margin_right_none: {
         marginRight: 0
       },
       //#endregion
   
     //#region /*Left Margin*/
     margin_left_xlarge: {
         marginLeft: sizing.XLarge
       },
       margin_left_large: {
         marginLeft: sizing.Large
       },
       margin_left_medium: {
         marginLeft: sizing.Medium
       },
       margin_left_small: {
         marginLeft: sizing.Small
       },
       margin_left_xsmall:{
         marginLeft: sizing.XSmall
       },
       margin_left_none: {
         marginLeft: 0
       },
       //#endregion
 }
 
 /**
  * All possible padding styles to be used across the project
  */
 const paddings = {
     //#region pading
     padding_xlarge: {
         padding: sizing.XLarge
       },
       padding_large: {
         padding: sizing.Large
       },
       padding_medium: {
         padding: sizing.Medium
       },
       padding_small: {
         padding: sizing.Small
       },
       padding_xsmall:{
         padding: sizing.XSmall
       },
       padding_none: {
         padding: 0
       },
     //#endregion
 
     //#region /*Horizontal Padding */
     padding_horizontal_xlarge: {
         paddingHorizontal: sizing.XLarge
       },
       padding_horizontal_large: {
         paddingHorizontal: sizing.Large
       },
       padding_horizontal_medium: {
         paddingHorizontal: sizing.Medium
       },
       padding_horizontal_small: {
         paddingHorizontal: sizing.Small
       },
       padding_horizontal_xsmall:{
         paddingHorizontal: sizing.XSmall
       },
       padding_horizontal_none: {
         paddingHorizontal: 0
       },
       //#endregion
   
       //#region /*Vertical Padding */
       padding_vertical_xlarge: {
         paddingVertical: sizing.XLarge
       },
       padding_vertical_large: {
         paddingVertical: sizing.Large
       },
       padding_vertical_medium: {
         paddingVertical: sizing.Medium
       },
       padding_vertical_small: {
         paddingVertical: sizing.Small
       },
       padding_vertical_xsmall:{
         paddingVertical: sizing.XSmall
       },
       padding_vertical_none: {
         paddingVertical: 0
       },
       //#endregion
   
       //#region /*Top Padding*/
       padding_top_xlarge: {
         paddingTop: sizing.XLarge
       },
       padding_top_large: {
         paddingTop: sizing.Large
       },
       padding_top_medium: {
         paddingTop: sizing.Medium
       },
       padding_top_small: {
         paddingTop: sizing.Small
       },
       padding_top_xsmall:{
         paddingTop: sizing.XSmall
       },
       padding_top_none: {
         paddingTop: 0
       },
       //#endregion
   
       //#region /*Bottom Padding*/
       padding_bottom_xlarge: {
         paddingBottom: sizing.XLarge
       },
       padding_bottom_large: {
         paddingBottom: sizing.Large
       },
       padding_bottom_medium: {
         paddingBottom: sizing.Medium
       },
       padding_bottom_small: {
         paddingBottom: sizing.Small
       },
       padding_bottom_xsmall:{
         paddingBottom: sizing.XSmall
       },
       padding_bottom_none: {
         paddingBottom: 0
       },
       //#endregion
   
       //#region /*Right Padding*/
       padding_right_xlarge: {
         paddingRight: sizing.XLarge
       },
       padding_right_large: {
         paddingRight: sizing.Large
       },
       padding_right_medium: {
         paddingRight: sizing.Medium
       },
       padding_right_small: {
         paddingRight: sizing.Small
       },
       padding_right_xsmall:{
         paddingRight: sizing.XSmall
       },
       padding_right_none: {
         paddingRight: 0
       },
       //#endregion
   
     //#region /*Left Padding*/
     padding_left_xlarge: {
         paddingLeft: sizing.XLarge
       },
       padding_left_large: {
         paddingLeft: sizing.Large
       },
       padding_left_medium: {
         paddingLeft: sizing.Medium
       },
       padding_left_small: {
         paddingLeft: sizing.Small
       },
       padding_left_xsmall:{
         paddingLeft: sizing.XSmall
       },
       padding_left_none: {
         paddingLeft: 0
       },
       //#endregion
 }
 
 /**
  * All possible border colours to be used across the project
  */
 const border_colors = {
     //#region /*Border Colours*/
     theme_border_color:{
         borderColor: colours.theme_colour
     },
     theme_tint_border_color:{
         borderColor: colours.theme_tint
     },
     theme_shade_border_color:{
         borderColor: colours.theme_shade
     },
     muted_1_border_color:{
         borderColor: colours.muted_1
     },
     muted_2_border_color:{
         borderColor: colours.muted_2
     },
     theme_complement_border_color:{
         borderColor: colours.theme_complement
     },
     base_shade_border_color:{
         borderColor: colours.base_shade
     },
     tinted_base_shade_border_color:{
         borderColor: colours.tinted_base_shade
     },
     main_text_color_border_color:{
         borderColor: colours.main_text_color
     },
     muted_1_text_border_color:{
         borderColor: colours.muted_text_1
     },
     muted_2_text_border_color:{
         borderColor: colours.muted_text_2
     },
     error_border_color:{
         borderColor: colours.error
     },
     //#endregion
 
     //#region Border Colour Bottom
     theme_border_bottom_color:{
         borderBottomColor: colours.theme_colour
     },
     theme_tint_border_bottom_color:{
         borderBottomColor: colours.theme_tint
     },
     theme_shade_border_bottom_color:{
         borderBottomColor: colours.theme_shade
     },
     muted_1_border_bottom_color:{
         borderBottomColor: colours.muted_1
     },
     muted_2_border_bottom_color:{
         borderBottomColor: colours.muted_2
     },
     theme_complement_border_bottom_color:{
         borderBottomColor: colours.theme_complement
     },
     base_shade_border_bottom_color:{
         borderBottomColor: colours.base_shade
     },
     tinted_base_shade_border_bottom_color:{
         borderBottomColor: colours.tinted_base_shade
     },
     main_text_color_border_bottom_color:{
         borderBottomColor: colours.main_text_color
     },
     muted_1_text_border_bottom_color:{
         borderBottomColor: colours.muted_text_1
     },
     muted_2_text_border_bottom_color:{
         borderBottomColor: colours.muted_text_2
     },
     error_border_bottom_color:{
         borderBottomColor: colours.error
     },
     //#endregion
 
     //#region Border Colour Top
     theme_border_top_color:{
         borderStartColor: colours.theme_colour
     },
     theme_tint_border_top_color:{
         borderStartColor: colours.theme_tint
     },
     theme_shade_border_top_color:{
         borderStartColor: colours.theme_shade
     },
     muted_1_border_top_color:{
         borderStartColor: colours.muted_1
     },
     muted_2_border_top_color:{
         borderStartColor: colours.muted_2
     },
     theme_complement_border_top_color:{
         borderStartColor: colours.theme_complement
     },
     base_shade_border_top_color:{
         borderStartColor: colours.base_shade
     },
     tinted_base_shade_border_top_color:{
         borderStartColor: colours.tinted_base_shade
     },
     main_text_color_border_top_color:{
         borderStartColor: colours.main_text_color
     },
     muted_1_text_border_top_color:{
         borderStartColor: colours.muted_text_1
     },
     muted_2_text_border_top_color:{
         borderStartColor: colours.muted_text_2
     },
     error_border_top_color:{
         borderStartColor: colours.error
     },
     //#endregion
 
     //#region Border Colour Right
     theme_border_right_color:{
         borderRightColor: colours.theme_colour
     },
     theme_tint_border_right_color:{
         borderRightColor: colours.theme_tint
     },
     theme_shade_border_right_color:{
         borderRightColor: colours.theme_shade
     },
     muted_1_border_right_color:{
         borderRightColor: colours.muted_1
     },
     muted_2_border_right_color:{
         borderRightColor: colours.muted_2
     },
     theme_complement_border_right_color:{
         borderRightColor: colours.theme_complement
     },
     base_shade_border_right_color:{
         borderRightColor: colours.base_shade
     },
     tinted_base_shade_border_right_color:{
         borderRightColor: colours.tinted_base_shade
     },
     main_text_color_border_right_color:{
         borderRightColor: colours.main_text_color
     },
     muted_1_text_border_right_color:{
         borderRightColor: colours.muted_text_1
     },
     muted_2_text_border_right_color:{
         borderRightColor: colours.muted_text_2
     },
     error_border_right_color:{
         borderRightColor: colours.error
     },
     //#endregion
 
     //#region Border Colour Left
     theme_border_left_color:{
         borderLeftColor: colours.theme_colour
     },
     theme_tint_border_left_color:{
         borderLeftColor: colours.theme_tint
     },
     theme_shade_border_left_color:{
         borderLeftColor: colours.theme_shade
     },
     muted_1_border_left_color:{
         borderLeftColor: colours.muted_1
     },
     muted_2_border_left_color:{
         borderLeftColor: colours.muted_2
     },
     theme_complement_border_left_color:{
         borderLeftColor: colours.theme_complement
     },
     base_shade_border_left_color:{
         borderLeftColor: colours.base_shade
     },
     tinted_base_shade_border_left_color:{
         borderLeftColor: colours.tinted_base_shade
     },
     main_text_color_border_left_color:{
         borderLeftColor: colours.main_text_color
     },
     muted_1_text_border_left_color:{
         borderLeftColor: colours.muted_text_1
     },
     muted_2_text_border_left_color:{
         borderLeftColor: colours.muted_text_2
     },
     error_border_left_color:{
         borderLeftColor: colours.error
     },
     //#endregion
 
 }
 
 /**
  * All possible border styles to be used across the project
  */
 const borders = {
     border: {
         borderStyle: 'solid',
         borderWidth: 1,
         borderColor: colours.muted_1
     },
     error_border:{
         borderStyle: 'dashed',
         borderWidth: 1,
         borderColor: colours.error
     },
     border_radius_1:{
         borderRadius: 25
     },
     ...border_colors,
 
     //#region border width
     border_width:{
         borderWidth: 1
     },
     border_width_xlarge:{
         borderWidth: sizing.XLarge
     },
     border_width_large:{
         borderWidth: sizing.Large
     },
     border_width_medium:{
         borderWidth:sizing.Medium,
     },
     border_width_small:{
         borderWidth: sizing.Small
     },
     border_width_xsmall:{
         borderWidth: sizing.XSmall
     },
 
     border_width_none:{
         borderWidth: 0
     },
     //#endregion
 
     //#region border width top
     border_top_width:{
         borderStartWidth: 1
     },
     border_top_width_xlarge:{
         borderStartWidth: sizing.XLarge
     },
     border_top_width_large:{
         borderStartWidth: sizing.Large
     },
     border_top_width_medium:{
         borderStartWidth:sizing.Medium,
     },
     border_top_width_small:{
         borderStartWidth: sizing.Small
     },
     border_top_width_xsmall:{
         borderStartWidth: sizing.XSmall
     },
     border_top_width_none:{
         borderStartWidth: 0
     },
     //#endregion
 
     //#region border width bottom
     border_bottom_width:{
         borderBottomWidth: 1
     },
     border_bottom_width_xlarge:{
         borderBottomWidth: sizing.XLarge
     },
     border_bottom_width_large:{
         borderBottomWidth: sizing.Large
     },
     border_bottom_width_medium:{
         borderBottomWidth:sizing.Medium,
     },
     border_bottom_width_small:{
         borderBottomWidth: sizing.Small
     },
     border_bottom_width_xsmall:{
         borderBottomWidth: sizing.XSmall
     },
     border_bottom_width_none:{
         borderBottomWidth: 0
     },
     //#endregion
 
     //#region border width right
     border_right_width:{
         borderRightWidth: 1
     },
     border_right_width_xlarge:{
         borderRightWidth: sizing.XLarge
     },
     border_right_width_large:{
         borderRightWidth: sizing.Large
     },
     border_right_width_medium:{
         borderRightWidth:sizing.Medium,
     },
     border_right_width_small:{
         borderRightWidth: sizing.Small
     },
     border_right_width_xsmall:{
         borderRightWidth: sizing.XSmall
     },
     border_right_width_none:{
         borderRightWidth: 0
     },
     //#endregion
 
     //#region border width left
     border_left_width:{
         borderLeftWidth: 1
     },
     border_left_width_xlarge:{
         borderLeftWidth: sizing.XLarge
     },
     border_left_width_large:{
         borderLeftWidth: sizing.Large
     },
     border_left_width_medium:{
         borderLeftWidth:sizing.Medium,
     },
     border_left_width_small:{
         borderLeftWidth: sizing.Small
     },
     border_left_width_xsmall:{
         borderLeftWidth: sizing.XSmall
     },
     border_left_width_none:{
         borderLeftWidth: 0
     },
     //#endregion
 
 }
 
 /**
  * All possible text styles 
  */
 const texts = {
 
     text_xlarge:{
         ...colors.main_text_colour,
         ...fontSizing.XLarge
     },
     text_large:{
         ...colors.main_text_colour,
         ...fontSizing.Large
     },
     text_medium:{
         ...colors.main_text_colour,
         ...fontSizing.Medium
     },
     text_small:{
         ...colors.main_text_colour,
         ...fontSizing.Small
     },
     text_xsmall:{
         ...colors.main_text_colour,
         ...fontSizing.XSmall
     },
     bold:{
         fontWeight: 'bold'
     },
     normal_text:{
      fontWeight: 'normal'
     },
     mutedText: {
         ...colors.muted_text_1_colour,
         ...fontSizing.XSmall
     },
     h1:{
         ...colors.main_text_colour,
         ...fontSizing.XLarge,
         fontWeight: 'bold'           
     },
     h2: {
         ...colors.muted_2_colour,
         ...fontSizing.Large,
         fontWeight: 'normal'
     },
     h3: {
         ...colors.muted_2_colour,
         ...fontSizing.Medium
     },
     center_text: {
      textAlign: 'center'
     },
     right_text: {
      textAlign: 'right'
     },
     left_text:{
      textAlign: 'left'
     }
 
 }
 
 const orientation ={
     row: {
         flexDirection: 'row',
         width: sizing.FullContainer,
         justifyContent: 'space-between',
         paddingVertical: sizing.Medium
     },
     row_start: {
       flexDirection: 'row',
       width: sizing.FullContainer,
       justifyContent: 'flex-start',
       alignItems: 'center',
       paddingVertical: sizing.Medium
     },
     column: {
         flexDirection: 'column',
         width: sizing.FullContainer,
         marginVertical: sizing.Medium
     },
     full_container:{
         width: sizing.FullContainer
     },
     medium_container:{
         width: sizing.MediumContainer
     },
     half_container:{
         width: sizing.HalfConatiner
     },
     small_container:{
         width: sizing.SmallContainer
     },
     start:{
       alignSelf: 'flex-start'
     },
     end:{
       alignSelf: 'flex-end'
     },
     center:{
       alignSelf: 'center'
     },
     stretch: {
       alignSelf: 'stretch'
     },
 }
 
 const display = {
     //still takes up space but cannot be seen
     hidden:{
         opacity: 0,
       },
       //takes up no space, cannot be seen
       disappeared: {
         display: "none",
       },
       visible :{
         display: 'flex',
         opacity: 1
     }
 }

const container = {
      flex: 1,
      // alignItems: 'center',
      justifyContent: 'flex-start',
      ...paddings.padding_xlarge, 
      ...background_colors.base_shade_tinted_bg
}
 
 export default {
     ...background_colors,
     ...colors,
     ...margins,
     ...paddings,
     ...borders,
     ...texts,
     ...display,
     ...orientation,
     container,
 }