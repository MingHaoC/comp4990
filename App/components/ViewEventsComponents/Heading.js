import React from 'react';
import { Text } from "react-native"
import styles from '../../styles';
import {Paper, SearchBar, Drawer} from '../index'
import {BsBell} from 'react-icons/bs'

const Heading = () => {
    return (<Paper style={[styles.row, styles.paddingVerticalNone, styles.marginVerticalNone ]}>
        <Drawer />
        <SearchBar type='EventsSearchBar' style={[styles.center]}/>
        <Text   style={[
            styles.h2,
            styles.mutedTextColour,
            styles.paddingHorizontalMed,
            styles.paddingVerticalMed
        ]}
        >
            <BsBell />
        </Text>

    </Paper>);
}
export default Heading