import styles from "../styles";
import React from 'react';
import { Text, TextInput, View} from 'react-native';
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { colours } from "../styles/globals";
import ProjectTextInput from "./ProjectTextInput";

const SearchBar = () => {
    return (
        <ProjectTextInput placeholder='Search events...'/>
    );
}

export default SearchBar