import { Text, Pressable } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../styles'
import Underline from './Underline'
import Paper from './Paper'
import PropTypes from 'prop-types';
/**
 * The accordian component allows one to hide or show a section of content. The content is toggled by a pressable title.
 */
const Accordian = (props) => {
    const { title,          //String. The text that labels the accordian
            content,        //JSX Node. Inner content of accordian
            collapsed,      //bool. Indicates if the accordian is collapsed or expanded
            titleContainerStyle,    //style for title container
            arrowStyle,             //style for up/down arrow
            titleStyle,             //style for the title text

            //built in props
            onPressIn, onPressOut, onPress, style
        } = props;

    const [isCollapsed, setIsCollapsed] = useState(collapsed)

    //Reload accordian anytime the props change
    useEffect(()=>{
        
        setIsCollapsed(collapsed)
    },[collapsed])

    return (
    <Paper style={style}>
         <Pressable  style={[styles.row_start, titleContainerStyle]} 
                    onPress={() => { 
                        //toggle is collapsed on press
                        setIsCollapsed(!isCollapsed)
                        onPress()
                    }}
                    onPressIn={() => {onPressIn()}}
                    onPressOut={() => {onPressOut()}}
        >
            <Text style={[
                            styles.h3, 
                            styles.padding_horizontal_small,
                            arrowStyle
                        ]}
            >
                {isCollapsed ? <Icon name='chevron-down' /> : <Icon name='chevron-up' />}
                </Text>

            <Text style={[
                            styles.h3, 
                            styles.padding_horizontal_small,
                            titleStyle
                        ]}
            >{title}</Text>

        </Pressable> 

        {/*Show collapsed content when isCollapsed = false*/}
            {!isCollapsed   ?  (<>
                                    <Underline /> 
                                    {content}
                                </>) 
                            :   <></>
            }

    </Paper>
    )
}

Accordian.propTypes = {
    collapsed: PropTypes.bool,
    title: PropTypes.string,
    content: PropTypes.node
}

Accordian.defaultProps = {
    collapsed: true,
    title: 'Undefined',
    content: <></>,
    onPressIn: () => {},
    onPressOut: () => {},
    onPress: () => {},
}

export default Accordian