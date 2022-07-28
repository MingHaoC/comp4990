import { View, Text, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Paper from './Paper'
import styles from '../styles'
import PropTypes from 'prop-types';
import ProjectButton from './ProjectButton';

/**
 * 
 * @param {bool} visible Indicates if the modal is shown or hidden (hidden by default)
 * @param {node} body React node, the inner content of the modal
 * @param {string} title Modal title text
 * @param {string} close_text  Text that appears on the close button
 * @returns 
 */
const InfoModal = ({visible, body, title, close_text, onClose}) => {
    const [show,setShown] = useState(visible)
    const [content,setContent] = useState(body)
    const [modalTitle, setModalTitle] = useState(title)
    const [btnText, setBtnText] = useState(close_text)

    useEffect(() => {
        setShown(visible)
        setContent(body)
        setModalTitle(title)
        setBtnText(close_text)
    },[visible,body,title,close_text])
  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={show}>
    <View style={[styles.container, 
      styles.center,
      styles.modal_backdrop_bg,
      styles.full_container]}>
      
      <Paper  header={1}
              title={`${modalTitle}`}
              style={[styles.column, styles.padding_xlarge]}
              headerTitleStyle={[styles.muted_text_2_colour]}
              underlineStyle={[styles.hidden]}>
            <View style={[styles.padding_medium]}>
                {content}
            </View>
          <ProjectButton title={`${btnText}`} type='info' style={[styles.margin_bottom_medium]} 
          onPress={() => {setShown(false); onClose()}}/>
      </Paper>
    </View>
  </Modal>
  )
}

InfoModal.defaultProps = {
    title: "",
    close_text: "Close",
    visible: false,
    body: <></>,
    onClose: () => {}
}

InfoModal.propTypes = {
    title: PropTypes.string,
    close_text: PropTypes.string,
    visible: PropTypes.bool,
    body: PropTypes.node,
    onClose: PropTypes.func
}

export default InfoModal