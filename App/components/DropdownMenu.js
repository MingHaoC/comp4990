import React, { useState } from 'react';
import {ScrollView} from 'react-native'
import {RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import PropTypes from 'prop-types';
import Link from './Link';

const PADDING_LEFT_INCREMENT = 18;  //The amount of left padding to add to children options so they appear more right than their parents
const INIT_PADDING_LEFT = 0;        //Default left padding

// #region option objects

/**
 * Object used to describe items within the dropdown menu
 */
class menuOption {
    /**
     * @param {string} name - The name that will appear in the dropdown menu
     */
    constructor(name = '')
    {
      this.name = name;
    }
}

/**
 * Describes title items within the dropdown menu.
 * Title items allow the user to expand options on press
 * Pressing a title option will not change the screen location
 */
class titleMenuOption extends menuOption {
    /**
     * 
     * @param {string} name - The name that will appear in the dropdown menu
     * @param {Array} children - Array of other menuOptions (including either child or title menu options). These menu options will expand onPress of the title option
     */
    constructor(name='', children=[]){
        super(name);
        this.children = children
    }
}

/**
 * Describes child menu option. Child menu options should lead the user to a new screen on press
 */
class childMenuOption extends menuOption{
    /**
     * 
     * @param {string} name - The name that will appear in the dropdown menu
     * @param {string} target - The target location tp lead the user after pressing the option
     * @param {boolean} isExternal - Indicates if the user should be guided to a screen in the App or an external website
     */
    constructor(name = '', target = '', isExternal = true)
    {
        super(name);
        this.target = target;
        this.isExternal = isExternal
    }
}
// #endregion

/**
 * Creates a dropdown menu
 */
const DropdownMenu = (props) => {
    
    const {
        children   //an array menu options
    } = props;

    const [options, setOptions] = useState(children)

    return (
    <ScrollView>
    {
        options.map((option, index) => {
            return (<Option key={index} {...option}  depth={INIT_PADDING_LEFT}/>)

        })
    }
    </ScrollView>);
}
/**
 * Title items allow the user to expand options on press
 * Pressing a title option will not change the screen location
 */
const TitleOption = (props) => {
    const {
        name,   //string, name that will appear in the dropDown menu
        depth   //number, inidcates the number of parents the option has. Used to tab over children
        } = props

    const [children, setChildren] = useState(props.children)
    const [childrenShown, setChildrenShown ] = useState(false)

    //On press, collapse or expand children options
    const _handleOnPress = () => {
        setChildrenShown(!childrenShown)
    }

    return(<>
            <Link   text='' 
                    type='top_level_dropdown'
                    disabled={true}
                    target=''
                    onPress={_handleOnPress}
                    style={{paddingLeft: depth}}

            >
                {`${name} `}
                {/*Toggle between an up or down arrow depending on if the title should collapse or expand onPress*/}
                { (!childrenShown) && <RiArrowUpSLine />}
                { (childrenShown) && <RiArrowDownSLine />}
            </Link> 

            {
            children.map( (child, index) => {
                    let temp = depth;   //increase depth if it is a child. Calcualtes the amount of padding to add on the left

                    //render if children should be expanded
                    if(childrenShown){
                        {/*change depth to tab over all child options*/}
                        return <Option key={index}  {...child} depth={temp+=PADDING_LEFT_INCREMENT} />
                    }
 
            })}
        </>)
}

/**
 * Describes child menu option. Child menu options should lead the user to a new screen on press
 */
const ChildOption = (props) => {
    const   {
                name,       //string, name that will appear in the dropdown menu
                depth,      //number, depth indicates the number of parents an option has. It i used to tab children over
                target,     //string, The location to navigate to
                isExternal  //bool, Indicates if the link location is internal or external
            } = props

    //Disable the link if the target is undefined
    const isDisabled = !target 

    return <Link    text={name} 
                    type='sub_dropdown'
                    disabled={isDisabled}
                    target={target}
                    isExternal={isExternal}
                    style={{paddingLeft: depth}}
            />
}

/**
 * Represents a option in the dropdown menu
 */
const Option = (props) => {
    
    const   {children   //An array of menuOptions. If the option is a title option then it will have children options that will be expanded/collapsed on press
            } = props

    //If an option has children => it is a titleOption
    if(children.length > 0){
        return <TitleOption {...props}  />
    }else{
        return <ChildOption {...props}  />
    }
}

// #region default Props and PropTypes

/*Option */
Option.propTypes = {
    depth: PropTypes.number.isRequired,
    children: PropTypes.array
}

Option.defaultProps = {
    depth: 0,
    children: [],
    isExternal: false,
    target: ''
}

/*Title Option */
TitleOption.propTypes = {
    depth: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

TitleOption.defaultProps = {
    depth: 0,
}

/*Title Child */
ChildOption.propTypes = {
    depth: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
}

ChildOption.defaultProps = {
    depth: 0
}

// #endregion

const dropDownMenuFormatters = {menuOption, titleMenuOption, childMenuOption}
export {DropdownMenu, dropDownMenuFormatters}