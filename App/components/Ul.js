import React from 'react';
import { Text} from 'react-native'


/**
 * Creates a bulleted item
 * @authors avdouloa@uwindsor.ca, 
 */
export default function Ul(props)
{
    const {children, style} = props
    return(
        <Text style={style} {...props}>&#x2022;  {children}</Text>

    );
}
