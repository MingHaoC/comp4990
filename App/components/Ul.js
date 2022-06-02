import React from 'react';
import { Text} from 'react-native'


export default function Ul(props)
{
    const {children, style} = props
    return(
        <Text style={style} {...props}>&#x2022;  {children}</Text>

    );
}
