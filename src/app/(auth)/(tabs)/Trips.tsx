import React from 'react'
import { MediumText } from '@/components/StyledText'
import { View } from 'react-native'


const Bucketlist = () => {
  return (
    <>
    <View  style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <MediumText>Trips</MediumText>
    </View>
    </>
  )
}

export default Bucketlist