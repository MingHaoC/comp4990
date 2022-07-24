import { View, Text } from 'react-native'
import React from 'react'
import { ProjectHeader } from '../../components'

const Profile = ({navigation}) => {
  return (
    <View>
      <ProjectHeader navigation={navigation} />
      <Text>TODO: Link to Rebecca's Profile</Text>
    </View>
  )
}

export default Profile