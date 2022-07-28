import { View, Text, Modal } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Paper, ProjectButton } from '../../../components'
import styles from '../../../styles'
import { useFindEventContext } from '../../../actions/Find Events/FindEventsContext'

const ConfirmEventRegistration = ({navigation}) => {

  const {
    register_result,
    closeRegisterResultModal
  } = useFindEventContext()
  return (

  
    <Modal
      animationType="fade"
      transparent={true}
      visible={register_result.is_open}
      onRequestClose={() => {
          Alert.alert("Modal has been closed.");
    }}>
      <View style={[styles.container, 
        styles.center,
        styles.modal_backdrop_bg]}>
        
        <Paper  header={1}
                title="Event Added"
                description="Event was successfully added to your events! Would you like to view events?"
                style={[styles.column, styles.padding_xlarge]}
                headerTitleStyle={[styles.muted_text_2_colour]}
                descriptionStyle={[styles.padding_vertical_large]}
                underlineStyle={[styles.hidden]}>

            <Icon name='check-circle-o' style={[styles.center,{fontSize:100},styles.bold,styles.theme_complement_colour, styles.padding_bottom_xlarge]}/>
            <ProjectButton title='View Your Events' style={[styles.margin_bottom_xlarge]} onPress={() => {navigation.navigate("MyEvents")}}/>
            <ProjectButton title='Continue Searching' type='info' style={[styles.margin_bottom_medium]} onPress={() => {closeRegisterResultModal()}}/>

        </Paper>
      </View>
    </Modal>
  )
}

export default ConfirmEventRegistration