import React from 'react';
import {Text, View, Image} from 'react-native'
import styles from '../styles';
import { useEffect } from 'react';
import Underline from './Underline';

export default function Paper({children,title, description, image, header, style, headerTitleStyle, underlineStyle, descriptionStyle, imageStyle})
{
    return(
        <>
            {(image && header=='1') && <Image   style={[
                                                            styles.paperHeader1Image, 
                                                            imageStyle
                                                        ]} 
                                                source={image} 
                                            />
            }

            <View style={styles.paperContainer}>

            {title ?    (   <>
                                <View style={[
                                                (header != '1'  ? styles.paperHeader 
                                                                : styles.paperHeader1),
                                                style
                                            ]}>

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
