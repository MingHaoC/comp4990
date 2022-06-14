import { textColours, fontFamily, colours, rgba } from "./globals";

//All new styles must be added using the same format:
// [newLinkStyleName]LinkText
// [newLinkStyleName]LinkOnPress
// [newLinkStyleName]LinkBottomBorder
// [newLinkStyleName]LinkContainer
 
const linkStyle = {

    // #region Global Styling
    linkText: {
        fontFamily: fontFamily,
        fontSize: 18,
        lineHeight: 22,
    },
    linkOnPress: {
        color: textColours.attention_1.toString(), 
        fontSize: 18,
        lineHeight: 22
    },
    linkContainer:{
        alignSelf: 'flex-start'
    },
    linkBottomBorder: {
        borderColor: textColours.attention_1.toString(),
        marginTop: 3,
    },
    linkBottomHidden: {
        opacity: 0
    },

    LinkContainerOnPress:{},
    // #endregion

    // #region Default Styling
    defaultLinkText: {
        color: textColours.attention.toString(),  
    },
    defaultLinkOnPress: {
        color: textColours.attention_1.toString(), 
    },
    defaultLinkBottomBorder: {
        borderColor: textColours.attention_1.toString(),
    },
    defaultLinkContainer: {

    },
    defaultLinkContainerOnPress: {

    },
    // #endregion 

    // #region For Top Level Dropdown Menu Links

    //Initial link text style
    topLevelDropdownMenuLinkLinkText: {
        color: textColours.background.toString(),
        
    },

    //Link text style onPress
    topLevelDropdownMenuLinkLinkOnPress: {
        backgroundColor: new rgba(colours.middleground.r,colours.middleground.g,colours.middleground.b,.7).toString(),
        color: textColours.secondary.toString()
    },

    //Style of link text underline. Only visible onPress
    topLevelDropdownMenuLinkLinkBottomBorder: {
        opacity: 0
    },
    topLevelDropdownMenuLinkLinkContainerOnPress: {
        backgroundColor: new rgba(colours.middleground.r,colours.middleground.g,colours.middleground.b,.7).toString(),
    },
    //Container of Link text + underline
    topLevelDropdownMenuLinkLinkContainer: {
        width:'100%',
        backgroundColor: colours.middleground.toString(),
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    // #endregion

    // #region All other links in drop down menu

    //Initial link text style
    dropdownMenuLinkLinkText: {
        color: textColours.background.toString(),
    },

    //Link text style onPress
    dropdownMenuLinkLinkOnPress: {
        color: textColours.background.toString()

    },

    dropdownMenuLinkLinkContainerOnPress: {
        backgroundColor: colours.secondary.toString(),
    },

    //Style of link text underline. Only visible onPress
    dropdownMenuLinkLinkBottomBorder: {
        opacity: 0
    },
    

    //Container of Link text + underline
    dropdownMenuLinkLinkContainer: {
        width:'100%',
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: colours.primary.toString(),
    },
    // #endregion

    // #region New Link style template:
    /*Please copy&paste instead of overwrite so people who wish to add a new style in the future have easy access.

    //Initial link text style
    [newLinkStyleName]LinkText: {

    },

    //Link text style onPress
    [newLinkStyleName]LinkOnPress: {

    },

    //Style of link text underline. Only visible onPress
    [newLinkStyleName]LinkBottomBorder: {

    },

    //Container of Link text + underline
    [newLinkStyleName]LinkContainer: {

    },

    //Container of Link text + underline on press styling
    [newLinkStyleName]LinkContainerOnPress: {

    },
    */
   // #endregion
}

export default linkStyle