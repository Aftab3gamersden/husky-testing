import { View, Text, Image } from 'react-native'
import React from 'react'
import { MediumText } from '../StyledText'
import Colors from '@/constants/Colors'
import { responsiveHeight as rh , responsiveScreenFontSize as rf , responsiveScreenWidth as rw } from 'react-native-responsive-dimensions'
import { EntypoIcon, TickitIcon } from '../../assets/icons'

const Tickitlogo = () => {
  return (
    <View style={{ flexDirection: "row", gap:5  , justifyContent:"center", alignItems:"center" , padding:rw(10), }} >
      <Image source={TickitIcon}  style={{ width:rw(15),height:rh(8), resizeMode:"contain" }} />
      <MediumText style={{ fontSize: rf(5), textAlign: "center" }} >Tickit</MediumText>
    </View>
  )
}

export default Tickitlogo