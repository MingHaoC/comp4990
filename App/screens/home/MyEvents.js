import { View, Text } from 'react-native'
import React from 'react'
import { ProjectHeader } from '../../components'
const MyEvents = ({navigation}) => {
  return (
    <View>
      <ProjectHeader navigation={navigation} />
      <Text>MyEvents</Text>
    </View>
  )
}

export default MyEvents