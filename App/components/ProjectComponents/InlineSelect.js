import { View, Text, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import styles from '../../styles'

const InlineSelectContext = React.createContext()

/**
 * Inline select renders pressable option boxes that span the width of a conatiner. 
 * @param {Object} - data -> Array of Objects {label,value}, indicates the option. The label will be displayed in the box. The value is the value that the label repsresnts
 *                 - selectedIndicies -> An array of numbers, each representing an index of an option selected in data
 *                 - multiselect -> bool, indicate if multiple selects are allowed
 *                 - onSelect -> function(selectedOptions, lastSelected), selectedOptions -> array of selected option object {label,value}
 *                                                                        lastSelected -> option object clicked to trigger onSelect function. {label, value}
 * @returns JSX Inline select
 */
const InlineSelect = ({data, selectedIndicies, multiselect, onSelect}) => {

    const [options, setOptions] = useState(data)
    const [width, setWidth] = useState(0)
    const [selected, setSelected] = useState(selectedIndicies)

    /**
     * Indicates if an option at an index is selected
     * @param {number} index the position of the option in data
     * @returns true if item is selected, false otherwsie
     */
     const isSelected = (index) => {
        try {
            return selected.includes(index);
        } catch (error) {
            return false
        }
    }

    /**
     * When an new value is selected, update the list of selected options
     */
    const updateSelected = (index) => {
        //check index is in range
        if(index >= options.length || index < 0 ){
            return;
        }

        //Not multisleect => clear other values
        if(!multiselect){
            setSelected([index])
        }
        //If it is multiselect check if item already selected. If selected => remove. If unselected => add
        else{
            if(isSelected(index)){
                const newSelected = selected.filter(item => item != index)
                setSelected(newSelected)
            }else{
                setSelected([...selected, index])
            }
        }
        return selected
    }

    /**
     * Selected only saves the index selected. This gets the index values
     * @returns An array of all option objects selected
     */
    const getSelectedObjects = (arr) => {
        let optionsObjects = []
        arr.forEach((element, index) => {
            optionsObjects.push({id:index, ...options[element]})
        });
        return optionsObjects
    }

    /**
     * Get the width of each option. 
     * Each option should be the same size so we divide 100% / # of options.
     */
    useEffect(() => {
        setWidth(Math.floor(100/data.length))
        setOptions(data)
        setSelected(selectedIndicies)
    }, [data,selectedIndicies])

    /**
     * Update the selected vals if the selectedIndicies prop changes
     */
    useEffect(() => {
        setSelected(selectedIndicies)
    }, [selectedIndicies])

    return (
        <InlineSelectContext.Provider value={{
            width,
            options,
            updateSelected,
            onSelect,
            selected,
            isSelected,
            multiselect,
            getSelectedObjects
        }}>
            <OptionBlocks options={options} />

        </InlineSelectContext.Provider>
    );
}

/**
 * Lists all option buttons in a row
 * @param {Array} Options - array of objects in the style of {label, value} 
 * @returns A JSX container of option buttons
 */
const OptionBlocks = ({options}) => {

    return(
        <View style={[
            styles.row_start,
            styles.full_container
        ]}>
            {/*List out each option block */}
            {
                options.map((option, index) => {
                    return <Block {...option} key={index} />
                })
            }
        </View>
    )
}

/**
 * A single slectable option component
 * @param {Object} Option - {index, label, value} 
 * @returns A JSX selectable option component
 */
const Block = ({id, label, value}) => {

    const {
        width,
        isSelected,
        updateSelected,
        onSelect,
        getSelectedObjects
    } = useContext(InlineSelectContext)
 
    const [itemSelected, setItemSelected] = useState(isSelected(id))
    useEffect(()=>{
        setItemSelected(isSelected(id))
    },[updateSelected])
    return(
    <Pressable 
        onPress={() => { 
            let selectedItems = updateSelected(id);
            if(!itemSelected){ selectedItems.push(id)}
            if(itemSelected){selectedItems.splice(selectedItems.indexOf(id),1)}
            onSelect(getSelectedObjects(selectedItems),{id, label,value})
        }}
        style={[
            styles.border,
            styles.padding_vertical_medium,
            styles.padding_medium,
            styles.stretch,
            {
                width: `${width}%`, /*Assign caluclated width */
            },
            (itemSelected && styles.theme_tinted_coloured_bg),  //slected => theme tinted
            (itemSelected && styles.base_shade_border_color)    //not selcted => default bg colour
    ]}>

        {/*Option Label */}
        <Text style={[
            (itemSelected && styles.base_shade_colour), //change colour of text on select for good contrast
            styles.center
        ]}>{label}</Text>

    </Pressable>)
}

InlineSelect.defaultProps = {
    selectedIndicies: [],
    multiselect: false,
    onSelect: () => {}
}

export default InlineSelect