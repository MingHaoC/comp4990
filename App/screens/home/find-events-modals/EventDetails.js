import { View, Text, Pressable, Modal, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Paper, Accordian, ProjectButton } from '../../components'
import dummyEvents from '../../dummyEvents'
import styles from '../../styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFindEventContext } from '../../actions/Find Events/FindEventsContext'

/**
 * Expands upon event information. Modal is opened up when user presses 'More Info' on FindEvents screen
 * @returns JSX Modal containing Event Info
 */
const EventDetails = () => {

  //#region props
  /*Get values/actions from context */
  const {
    event_details,
    closeEventDetailsModal
  } = useFindEventContext()
  const availabilities = event_details.rendered_availabilities
  const {
    name, 
    min_age,
    max_age,
    prerequisite_programs,
    description,
    price,
    id
  } = event_details.event_selected
  //#endregion

  return (

    <Modal
    animationType="slide"
    transparent={true}
    visible={event_details.is_open}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
  >
  {/*Backdrop */}
    <View style={[
                  styles.container, 
                  styles.padding_horizontal_large]}>
      <ScrollView>
        {/*Container */}
        <Paper  title={name} 
          description={`${min_age} years - ${max_age} years`}
          header={1}
          headerTitleStyle={[styles.theme_tinted_colour]}
          underlineStyle={[styles.hidden]}
          descriptionStyle={[styles.padding_bottom_medium, styles.bold]}>

          {/*Show description if there is one*/}
          { (description.trim().length > 0) && 
            <Accordian
              
              title="Description" 
              content={ 
                <Text style={[
                              styles.text_small,
                              styles.muted_text_2_colour,
                              styles.padding_medium,
                            ]}>{description}</Text>
              } />
          }

          {/*Show Prerequsistes if any exitss */}
          { (prerequisite_programs.length > 0) &&
            <Accordian title="Prerequisites"
              content={
              <Prerequisites prerequisite_events={dummyEvents} />
              } 
            />     
          }

          <View style={[
            styles.row
          ]}>
            <Text style={[
              styles.text_medium, 
              styles.muted_text_2_colour, 
              styles.padding_horizontal_medium]}>Price</Text>

            <Text style={[
              styles.text_medium, 
              styles.muted_text_2_colour, 
              styles.padding_horizontal_medium]}>

              {/*Instead of showing $0 show Free*/}
              { (price <= 0) && 'Free'} {(price > 0 ) && `$${price}`}</Text>
          </View>  
          
          {/*Always show availabilities tab even when none exist*/}
          <Accordian title="Availabilities" 
            collapsed={true}
            content={
                <Availabilities availabilities_item={availabilities} />
            } 
          />     

          <ProjectButton title='Close' type='info' style={[styles.margin_medium]} onPress={() => {closeEventDetailsModal()}} />
        </Paper>
      </ScrollView>
   
    </View>
  </Modal>

  )
}

/**
 * Container filled with prerequisite info. Is displayed when prerequsite accordian button is pressed
 * @param {Array} prerequisite_events - Array of prerequistes from an event
 * @returns JSX Container Listing out prerequisites
 */
const Prerequisites = ({prerequisite_events}) => {
  const [prerequisites, setPrerequisites] = useState(prerequisite_events)
  return(
    <View style={[styles.padding_medium]} >
      {
        prerequisites.map((prerequisite_event) => {
          return <Prerequisite key={prerequisite_event.id} prerequisite_event={prerequisite_event} />
        })
      }
    </View>
  );
}

/**
 * Displays the prerequsite item
 * @param {Event} prerequisite_event - Prerequsite event
 * @returns JSX Containing prerequsite event details
 */
const Prerequisite = ({prerequisite_event}) => {

  //#region props
  /*Get props from context*/
  const{
    openEventDetailsModal
  } = useFindEventContext()

  const {
    name,
    id
  } = prerequisite_event
  //#endregion

  return(
    <Paper style={[
      styles.row, 
      styles.padding_medium, 
      styles.margin_vertical_medium
      ]}>

      <Text style={[
        styles.text_medium, 
        styles.muted_text_2_colour, 
        styles.center
        ]}>{name}</Text>

      <ProjectButton  title={
        <Text style={[styles.center]}>
        {/* <BsArrowRightSquare/> */}
        </Text>} 
        style={[
          styles.small_container, 
          styles.center
        ]}
        onPress={() => {openEventDetailsModal(id)}} />

    </Paper>
  );
}

/**
 * Container filled with availability info. Is displayed when prerequsite accordian button is pressed
 * @param {Array} availabilities_item an array containing all availabilities 
 * @returns JSX continer listing out each availability for an event
 */
const Availabilities = ({availabilities_item}) => {
  
  /*Get props from context */
  const{
    openAvilabilitiesFilter
  } = useFindEventContext()


  return(
    <View style={[styles.padding_medium]}>

      {/*Toggle Filter Container*/}
      <Paper style={[
        styles.margin_vertical_medium,
      ]}>

        {/*Toggle Filter Button */}
        <Pressable onPress={() => {openAvilabilitiesFilter()}}>

          <Text style={[
            styles.text_medium,
            styles.center,
            styles.margin_vertical_medium
          ]}>
            {/* <BsSliders style={styles.text_medium} />  */}
            <Text style={[styles.theme_tinted_colour, styles.center]}><Icon name='filter' style={[styles.text_medium]}/>   Filter Availability</Text>

          </Text>
        </Pressable>
      </Paper>

      {/*List Availabilities */}
      {
        availabilities_item.map((availability) => {
          return <Availability key={availability.barcode} availability_item={availability} />
        })
      }
    </View>
  );
}

/**
 * Creates a display for an availabilty 
 * @param {Object} availability_item Describes availability for an event. Required props: barcode, location, start_date, end_date, start_time, end_time, days_of_the_week
 * @returns JSX Object describing a single open avilable time to register for an event
 */
const Availability = ({availability_item}) => {

  //Get props and actions from context
  const {
    openRegisterModal,
    viewInSchedule, 
    event_details
  } = useFindEventContext()

  const {
    id
  } = event_details.event_selected

  //All prop names in an availability item
  //We will enumerate through the props instead of manually creating a row for each prop as all the styling is the same for all
  //If you add any new props, be sure to add it to this array with its display name
  const props = [
    {name:'location',display:'Location'},
    {name:'days_of_the_week', display: 'Days'}, 
    {name:'start_time',display:'Start Time'},
    {name:'end_time',display:'End Time'},
    {name:'start_date',display:'Start Date'},
    {name:'end_date',display:'End Date'}
  ]
  return (
    <Paper style={[styles.margin_bottom_medium]}>
      {/*Display Row with Event Prop */}
      {
        //Because each row has exactly the same style, we will cycle through prop names instead of copy and pasting each row and changing value
        props.map((prop,index) =>{
          return(
          <View key={index}
            style={[
              styles.row, 
              styles.padding_horizontal_medium, 
              styles.padding_vertical_xsmall
            ]}>
            
            {/*Label */}
            <Text style={[
              styles.text_small, 
              styles.muted_text_2_colour
            ]}>{prop.display}:
            </Text>

            {/*Value */}
            <Text style={[
              styles.text_small, 
              styles.muted_text_1_colour
            ]}>
              {/*Fix Times */}
              {(prop.name == 'start_time' || prop.name == 'end_time') && `${availability_item[prop.name].hour}:${availability_item[prop.name].minute} ${availability_item[prop.name].ante_meridian}`}
              {/*Days is an array so we must turn it into a string before printing */}
              {(prop.name == 'days_of_the_week') && availability_item[prop.name].join(', ')}
              {(prop.name != 'days_of_the_week' && prop.name != 'start_time' && prop.name != 'end_time') && availability_item[prop.name]}
            </Text>

        </View>)
        })
      }

      {/*Container for Option Buttons */}
      <View style={[
        styles.row, 
        styles.padding_horizontal_medium
      ]}>

        <ProjectButton title='Register' onPress={() => {openRegisterModal(availability_item.barcode)}} />

        <ProjectButton title={
            <Text>
            <Icon name='calendar' style={[styles.text_medium, styles.padding_right_medium]} />  Schedule
            </Text>
          } 
          type='info' 
          onPress={() => {viewInSchedule(availability_item.barcode)}} 
        />

      </View>
    </Paper>
  );
}

export default EventDetails