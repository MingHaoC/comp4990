import React, { useContext, useState } from 'react';
import {Text, View, Image} from 'react-native'
import styles from '../styles'
import Underline from './Underline';

/**
 * Used to contain app contents. 
 * The entirety of the render section deals with the header. The main paper is just children wrapped in a view
 * @authors avdouloa@uwindsor.ca, 
 */
const PaperContext = React.createContext();

const Paper = ({
    title,              //string, will appear at the top to describe the contents of the paper
    description,        //string, will appear bellow the title, used to further describe contents
    image,              //string, image location
    header,             //number, indicates the headding level of the title. ie: h1, h2,h3
    headerTitleStyle,   //style object, further expands the style of the title
    underlineStyle,     //style object, further expands the style of the underline (which appears bellow the title to seperate the title from the rest of the paper content)
    descriptionStyle,   //style object, further expands the style of the description
    imageStyle,         //style object, further expands the style of the image
    headerStyle,         //contains description + title

    style,children}) => {
    const props = {
        title,              //string, will appear at the top to describe the contents of the paper
        description,        //string, will appear bellow the title, used to further describe contents
        image,              //string, image location
        header,             //number, indicates the headding level of the title. ie: h1, h2,h3
        headerTitleStyle,   //style object, further expands the style of the title
        underlineStyle,     //style object, further expands the style of the underline (which appears bellow the title to seperate the title from the rest of the paper content)
        descriptionStyle,   //style object, further expands the style of the description
        imageStyle,         //style object, further expands the style of the image
        headerStyle,         //contains description + title

        style,children};

        return(
            <PaperContext.Provider value={props}>
                <PaperWrapper children={children} />
            </PaperContext.Provider>
        );
}

const PaperWrapper = ({children}) =>
{
    const {header, style} = useContext(PaperContext)
    return(
        <>
            {(header == 1) && <HeaderImage />}
            <View style={[ 
                styles.base_shade_bg,
                styles.border,
                styles.full_container,
                style
            ]}>
                <HeaderTitle />
                {children}
            </View>
        </>
        //#endregion
    );
}

/**
 * Diffrent styles for header 1 and all other headers.
 * This function was created just to condense the logic 
 * @returns an image component
 */
const HeaderImage = () => {
    const {
        image, 
        imageStyle,
        title, 
        header} = useContext(PaperContext)
    if(!image){
        return <></>
    }

    if(header == 1){
        return (
            <Image   style={[
                styles.paper_header_1_image, 
                imageStyle
            ]} 
            source={image} 
            text={title} 
            />
        );
    }
    else{
        return(
            <Image style={[
                styles.paper_header_image,
                imageStyle
            ]} 
            source={image} 
            text={title} 
            />
        );
    }
}

const HeaderTitle = () => {
    const {
            header, 
            title, 
            headerStyle,
            headerTitleStyle,
        } = useContext(PaperContext)

    if(!title){
        return (<></>);
    }

    if(header == 1){
    return(
        <View  style={[
                        styles.full_container,
                        styles.column, 
                        headerStyle
                    ]} >
                <Text style={[
                            styles[`h${header}`], 
                            styles.center,
                            headerTitleStyle
                            ]}
                >        
                {title}
            </Text>
            <HeaderDescription />
            <HeaderUnderline />
        </View>
        );
    }
    else{
        return (
        <View style={[
            styles.full_container,
            styles.column
        ]}>
            <View style={[
                styles.full_container,
                styles.row_start,
                headerStyle
            ]}>
                <HeaderImage/>
                <Text style={[
                            styles[`h${header}`], 
                            styles.start,
                            styles.padding_horizontal_medium,
                            headerTitleStyle
                            ]}
                >        
                {title}
                </Text>
            </View>
            <HeaderDescription />
            <HeaderUnderline />
        </View>
        );
    }
}

const HeaderDescription = () => {
    const {
        header, 
        description,
        descriptionStyle
        } = useContext(PaperContext)
    if(description){
        return (
        <Text style={[
                    styles.text_small,
                    styles.muted_text_1_colour,
                    (header == '1' ? styles.center : styles.start),
                    (header == '1' ? '' : styles.padding_horizontal_medium),
                    descriptionStyle
                    ]}>
        {description}
        </Text>);
    }

    return (<></>)
}

const HeaderUnderline = () => {
    const {underlineStyle} = useContext(PaperContext)
    return(<Underline style={underlineStyle}/>);
}

export default Paper