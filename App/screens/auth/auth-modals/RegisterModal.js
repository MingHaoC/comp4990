import React from 'react';
import { Text, View, Modal } from 'react-native';
import styles from '../../../styles'
import { Paper, ProjectButton} from '../../../components'
import { colours } from '../../../styles/globals';

//Shows outcome of registration attempt
const RegisterModal = (props) => {
    const {
      showModal,
      Response,
      closeModal,
    } = props
    return (
          <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            // setModalVisible(!modalVisible);
          }}
        >
          <View style={[
                        styles.container, 
                        {
                          alignItems: 'center',
                          justifyContent: 'center'
                        },
                        styles.muted_2_coloured_bg

                      ]}>
          <Paper style={{
                        marginTop: 33,
                        alignSelf: 'center',
                        width: '80%',
                        height: 300,
                        }}>
  
            <View style={[styles.form, {height: '100%', justifyContent:'space-evenly'}]}>
  
              <Text style={styles.h2}>{Response.text}</Text>
  
              <ProjectButton type='info' title='Dismiss' onPress={closeModal} />
  
            </View>
          </Paper>
          </View>
  
       
        </Modal>
      );
  }
  export default RegisterModal