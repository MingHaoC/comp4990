import React from 'react';
import {Text, View, Image} from 'react-native'
import styles from '../styles';
import { useEffect } from 'react';
import Underline from './Underline';

/**
 * Used to contain app contents. 
 * The entirety of the render section deals with the header. The main paper is just children wrapped in a view
 */
export default function Paper({
    title,              //string, will appear at the top to describe the contents of the paper
    description,        //string, will appear bellow the title, used to further describe contents
    image,              //string, image location
    header,             //number, indicates the headding level of the title. ie: h1, h2,h3
    headerTitleStyle,   //style object, further expands the style of the title
    underlineStyle,     //style object, further expands the style of the underline (which appears bellow the title to seperate the title from the rest of the paper content)
    descriptionStyle,   //style object, further expands the style of the description
    imageStyle,         //style object, further expands the style of the image

    //Built in props
    style,children})
{
    return(
        <>
            {/*The image appears above the paper when the heading is 1. Otherwise it will be displayed to the left of the title*/}
            {(image && header=='1') && <Image   style={[
                                                            styles.paperHeader1Image, 
                                                            imageStyle
                                                        ]} 
                                                source={image} 
                                            />
            }

            <View style={styles.paperContainer}>

            {title ?    (   <>
                                {/*There are diffrent styles for the paper header depending on the heading. Depending on the heading the image appears in diffrent locations so the flex orientation is diffrent*/}
                                <View style={[
                                                (header != '1'  ? styles.paperHeader 
                                                                : styles.paperHeader1),
                                                style
                                            ]}>

                                    {/*Render the image to the left of the title if heading is less than 1*/}
                                    {(image && header != '1') && <Image style={[
                                                                                    styles.paperHeaderImage,
                                                                                    imageStyle
                                                                                ]} 
                                                                        source={image} 
                                                                        text={title} 
                                                                    />}

                                    <Text style={[
                                                    styles[`h${header}`], 
                                                    (header != 1 ? styles.paperHeaderTitle : ''), 
                                                    headerTitleStyle
                                                ]}
                                    >        
                                    {title}
                                    </Text>

                                    { (description && header == '1') && <Text style={[
                                                                                        styles.mutedText,
                                                                                        descriptionStyle
                                                                                    ]}>
                                                                        {description}
                                                                        </Text>
                                    }

                                </View>
                                { (description && header != '1') && <Text style={[
                                                                                    styles.mutedText, 
                                                                                    styles.paperHeaderText,
                                                                                    descriptionStyle
                                                                                ]}
                                                                    >{description}</Text>
                                }

                                <Underline style={underlineStyle} />
                            </>
                        ) 

                        : <></>
            }
            {children}
            </View>
        </>


    );
}
