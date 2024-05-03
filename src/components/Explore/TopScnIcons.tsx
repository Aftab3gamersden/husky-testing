import { View, StyleSheet , Pressable, Image} from "react-native";
import React, { useState } from "react";
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { SearchIcon ,FilterIcon } from "@/assets/icons/customicons";

const TopScnIcons = () => {
   
  return (
    <>
      {/* Top Icons for search and notification */}
      <View style={styles.reelheader}>  
         <Image source={SearchIcon} style={styles.imageSize}/> 
         <Image source={FilterIcon} style={styles.imageSize}/> 
      </View>

     
    </>
  );
};
const styles = StyleSheet.create({
  reelheader: {
    flexDirection: "row",
    width: rw(100),
    justifyContent: "flex-end",
    alignItems:"center",
    padding: 20,
    paddingTop: rw(15),
    position: "absolute",
    gap: 20,
    paddingRight: rw(7),
    zIndex:1
  },
  imageSize:{
    width:25, 
    height:25
  }
});
export default TopScnIcons;
