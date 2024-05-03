import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { MediumText, RegularText, SemiboldText } from "../StyledText";
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import Colors from "@/constants/Colors";
import { MapPinIcon } from "react-native-heroicons/solid";
import Followbtn from "./Followbtn";
import { GlobalCSS } from "@/constants/GlobalCSS";
import { UserProfileTypes} from '@/types/Explore.types'
const UserProfile: React.FC<UserProfileTypes> = ({ Profile, name, Description , location , following , UUID}) => {
 
   return (
    <>
      {/* User name , profile and  follow button  */}
      <View style={styles.userProfile}>
        <View>
          <View style={{ flexDirection: "row" , alignItems:"center" , gap:10 }}>
        <Image style={styles.userImage} source={{ uri: Profile }} />
            <SemiboldText style={{ fontSize: rf(2), color: Colors.white }}>
              {name}
            </SemiboldText>
            <Followbtn following={following} followUUID={UUID} />
          </View>
          <View style={{width:280, paddingVertical:5 }}>
          <RegularText style={GlobalCSS.SmallFontsize}>
            {Description}
          </RegularText>
          </View>
          <View style={styles.mapiconcontainer} >
          <MapPinIcon size={13} color="white" />
          <MediumText style={GlobalCSS.ExtraSmallFontsize}>
            {location}
          </MediumText>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  userProfile: {
    zIndex: 1,
    position: "absolute",
    bottom: rw(20),
    paddingLeft: rw(2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    
  },
  userImage: {
    width: 33,
    height: 33,
    borderRadius: 100,
  },
  mapiconcontainer:{
    flexDirection:"row" , 
    gap:5, 
    alignItems:"center", 
    paddingVertical:5
  }
});

export default UserProfile;
