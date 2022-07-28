import { View, Text, Pressable, Modal, ScrollView } from 'react-native'
import React, { useState } from 'react'
import styles from '../../../styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFindEventContext } from '../../../actions/Find Events/FindEventsContext'
import { Paper, Accordian, ProjectButton  } from '../../../components'

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
          description={ (min_age > 0 && max_age > 90) ? `${min_age} years - ${max_age} years` : ''}
          header={1}
          headerTitleStyle={[styles.theme_tinted_colour]}
          underlineStyle={[styles.hidden]}
          descriptionStyle={[styles.padding_bottom_medium, styles.bold]}>

          {/*Show description if there is one*/}
          { (description != undefined && description.trim().length > 0) && 
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
          { (prerequisite_programs != undefined && prerequisite_programs.length > 0) &&
            <Accordian title="Prerequisites"
              content={
              <Prerequisites prerequisite_events={dummyEvents} />
              } 
            />     
          }

          {price != undefined && <>
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
          </>}
          {/*Always show availabilities tab even when none exist*/}
          <Accordian title="Availabilities" 
            collapsed={false}
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
Prerequisites.defaultProps = {
  prerequisite_events:[]
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
        availabilities_item.map((availability, index) => {
          return <Availability key={index} {...availability} />
        })
      }
    </View>
  );
}

Availabilities.defaultProps ={
  availabilities_item: []
}
/**
 * Creates a display for an availabilty 
 * @param {Object} availability_item Describes availability for an event. Required props: barcode, location, start_date, end_date, start_time, end_time, days_of_the_week
 * @returns JSX Object describing a single open avilable time to register for an event
 */
const Availability = ({days_of_the_week,location, start_time, end_time, start_date,end_date, barcode}) => {

  //Get props and actions from context
  const {
    openRegisterModal,
    viewInSchedule, 
    event_details
  } = useFindEventContext()

  const {
    id
  } = event_details.event_selected



  
  return (
    <Paper style={[styles.margin_bottom_medium]}>
      {/*Display Row with Event Prop */}
      
          {/*Days*/}
          <View 
            style={[
              styles.row, 
              styles.padding_horizontal_medium, 
              styles.padding_vertical_xsmall
            ]}>
            
            {/*Label */}
            <Text style={[
              styles.text_small, 
              styles.muted_text_2_colour
            ]}>Days:
            </Text>

            {/*Value */}
            <Text style={[
              styles.text_small, 
              styles.muted_text_1_colour,
              styles.medium_container
            ]}>
              {days_of_the_week.join(', ')}
            </Text>

        </View>

            {/*Location*/}
            <View 
            style={[
              styles.row, 
              styles.padding_horizontal_medium, 
              styles.padding_vertical_xsmall
            ]}>
            
            {/*Label */}
            <Text style={[
              styles.text_small, 
              styles.muted_text_2_colour
            ]}>Location:
            </Text>

            {/*Value */}
            <Text style={[
              styles.text_small, 
              styles.muted_text_1_colour,
              styles.medium_container
            ]}>
              {location}
            </Text>

        </View>

        

        {/*Time*/}
        <View 
          style={[
            styles.row, 
            styles.padding_horizontal_medium, 
            styles.padding_vertical_xsmall
          ]}>
          
          {/*Label */}
          <Text style={[
            styles.text_small, 
            styles.muted_text_2_colour
          ]}>Time:
          </Text>

          {/*Value */}
          <Text style={[
            styles.text_small, 
            styles.muted_text_1_colour,
            styles.medium_container
          ]}>
            {(start_time.hour == 0 && end_time.hour == 0) &&` All Day`}
            {!(start_time.hour == 0 && end_time.hour == 0) && `${start_time.hour}:${ (parseInt(start_time.minute) < 10) ? `0${start_time.minute}` : `${start_time.minute}` } ${start_time.ante_meridian} - ${end_time.hour}:${ (parseInt(start_time.minute) < 10) ? `0${start_time.minute}` : `${start_time.minute}` } ${end_time.ante_meridian}`}
          </Text>

        </View>

        {/*Start Date*/}
        <View 
          style={[
            styles.row, 
            styles.padding_horizontal_medium, 
            styles.padding_vertical_xsmall
          ]}>
          
          {/*Label */}
          <Text style={[
            styles.text_small, 
            styles.muted_text_2_colour
          ]}>{ (new Date(start_date).getFullYear() == 1995 || new Date(end_date) == 1995) && `Date:`}
          { !(new Date(start_date).getFullYear() == 1995 || new Date(end_date) == 1995) && `Start Date:`}
          </Text>

          {/*Value */}
          <Text style={[
            styles.text_small, 
            styles.muted_text_1_colour,
            styles.medium_container
          ]}>
            { (new Date(start_date).getFullYear() == 1995 || new Date(end_date) == 1995) && `Continuous`}
          { !(new Date(start_date).getFullYear() == 1995 || new Date(end_date) == 1995) && `${start_date}`}
          </Text>

        </View>

      {/*Container for Option Buttons */}
      <View style={[
        styles.row, 
        styles.padding_horizontal_medium
      ]}>

        <ProjectButton title='Register' onPress={() => {openRegisterModal(barcode)}} />

        <ProjectButton title={
            <Text>
            <Icon name='calendar' style={[styles.text_medium, styles.padding_right_medium]} />  Schedule
            </Text>
          } 
          type='info' 
          onPress={() => {viewInSchedule(barcode)}} 
        />

      </View>
    </Paper>
  );
}
Availability.defaultProps = {
  days_of_the_week: [],
  location:  "",
  start_time: {hour: 0, minute: 0, ante_meridain: 'AM'},
  end_time: {hour: 0, minute: 0, ante_meridain: 'AM'},
  start_date: new Date(1995, 11, 17).toLocaleDateString(),
  end_date: new Date(1995, 11, 17).toLocaleDateString()

}

export default EventDetails