import { ScrollView ,View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { RegularText, BoldText } from "../../../components/StyledText";
import Icons from "../../../assets/icons";

interface CommentProps {
  userName: string;
  userComment: string;
  Duration: string;
  userProfile: string;
  LikeCounter: string;
}

const Comment: React.FC<CommentProps> = ({
  userName,
  userComment,
  Duration,
  userProfile,
  LikeCounter,
}) => {
  return (
    <>
      <View style={styles.Container1}>
        <View style={styles.Container}>
          {/* User Profile image */}
          <Image source={{ uri: userProfile }} style={styles.userProfileImage} />
          <View style={{ flexDirection: "column" }}>
            {/* User id */}
            <BoldText style={styles.usertext}>{userName}</BoldText>
            {/* User comment */}
            <RegularText style={styles.usertext}>{userComment}</RegularText>
            <View style={styles.smallContainer}>
              {/* time of comment */}
              <RegularText style={styles.commentText}>{Duration}</RegularText>
              {/* replies */}
              <RegularText style={styles.commentText}>
                View replies(4)
              </RegularText>
              <Icons.AntIcons name="down"  color="#626262" />
            </View>
          </View>
        </View>
          {/* Like and like count  */}
          <View style={{ alignItems: "center",}}>
            <Icons.EntypoIcon
              name="heart-outlined"
              size={20}
              color="#626262"
            />
            <RegularText style={styles.commentText}>
              {LikeCounter}
            </RegularText>
          </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
    gap:20,
  },
  Container1: {
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"space-between",
    marginHorizontal: 15, // Adjust the spacing between comments
    marginTop:20,
  },
  smallContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  commentText: {
    fontSize: 13,
    color: "#626262",
  },
  userProfileImage: {
    width: 30, // Adjust the width as needed
    height: 32, // Adjust the height as needed
    borderRadius: 25, // Assuming it's a circular profile image
  },
  usertext:{
    fontSize:13
  }
});

export default Comment;
