/* eslint-disable react/display-name */
import {
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, { forwardRef, useMemo } from "react";
import Icons from "@/assets/icons";
import { RegularText } from "../StyledText";
import { Icon } from "../Themed";
import { ScrollView } from "react-native-gesture-handler";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
export type Ref = BottomSheetModal;

const ShareModal = forwardRef<Ref>((props , ref) => {
  const socialmediaIcons = [
    {
      name: "logo-whatsapp",
      type: "Ionicon",
      Title: "Whatsapp",
    },
    {
      name: "logo-instagram",
      type: "Ionicon",
      Title: "Instagram",
    },
    {
      name: "logo-facebook",
      type: "Ionicon",
      Title: "Facebook",
    },
    {
      name: "facebook-messenger",
      type: "MaterialCommunityIcon",
      Title: "Facebook",
    },
    {
      name: "snapchat",
      type: "MaterialCommunityIcon",
      Title: "Snapchat",
    },
    {
      name: "message1",
      type: "AntIcons",
      Title: "SMS",
    },
    {
      name: "twitter",
      type: "FeatherIcon",
      Title: "Twitter",
    },
  ];
  const generalIcons = [
    {
      name: "warning",
      Title: "Report",
    },
    {
      name: "export",
      Title: "Share Profile",
    },
    {
      name: "download",
      Title: "Save video",
    },
    {
      name: "link",
      Title: "Copy URL",
    },
    {
      name: "minuscircleo",
      Title: "Block",
    },
  ];
  const colorScheme = useColorScheme(); // Move inside the component

  const snapPoints = useMemo(() => ["35%"], []);
  return (
    <BottomSheetModal ref={ref}   handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? 'white' : 'black'   }} enablePanDownToClose={true} snapPoints={snapPoints} backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? 'black' : 'white'   }} >
        <View style={{ paddingHorizontal: 10, gap: 10 , position:"absolute", zIndex:2 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {generalIcons.map((curr, index) => (
              <View
                key={index}
                style={styles.generalIconsContainer}
              >
                <View
                  style={{
                    backgroundColor: "#E8E8E7",
                    padding: 10,
                    borderRadius: 50,
                  }}
                >
                  <Icons.AntIcons name={curr.name} size={25} />
                </View>
                <RegularText>{curr.Title}</RegularText>
              </View>
            ))}
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {socialmediaIcons.map((curr, index) => (
              <View
                key={index}
                style={styles.SocialIconsContainer}
              >
                 
                  <View
                    style={{
                      backgroundColor: colorScheme === "dark" ? "black" : "white",
                      padding: 10,
                      borderRadius: 50,
                    }}
                  >
                  <Icon name={curr.name} size={30} type={curr.type} />
                
                </View>
                <RegularText>{curr.Title}</RegularText>
              </View>
            ))}
          </ScrollView>
        </View>
        </BottomSheetModal>
  );
});
const styles = StyleSheet.create({
  generalIconsContainer:{
    alignItems: "center",
    margin: 5,
    paddingHorizontal: 4,
    gap: 4,
  },
  SocialIconsContainer:{
    alignItems: "center",
    margin: 5,
    paddingHorizontal: 4,
    gap: 4,
  }
});
export default ShareModal;
