import { View, Text } from 'react-native'
import React from 'react'
import { MediumText } from '@/components/StyledText'

const Profile = () => {
  return (
    <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MediumText>Profile</MediumText>
    </View>
  )
}

export default Profile