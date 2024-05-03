import {
  View,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, {  forwardRef, useCallback, useMemo, useState } from "react";
import {
  responsiveWidth as rw,
  responsiveFontSize as rf,
  responsiveScreenHeight as rh,
} from "react-native-responsive-dimensions";
import Comment from "./Comment";
import {
  BottomSheetTextInput,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetBackdrop
} from "@gorhom/bottom-sheet";
import Icons from "../../../assets/icons";
import { useCreateCommentMutation } from "@/context/exploreContext/ExploreContext";
import { Debounce } from "@/helper/Debounce";
import Colors from "@/constants/Colors";
export type Ref = BottomSheetModal;

const CommentModel = forwardRef<Ref>((props , ref) => {
  
  CommentModel.displayName = 'CommentModel';
  const colorScheme = useColorScheme(); // Move inside the component
  const [commentInput, setCommentInput] = useState("");
  const snapPoints = useMemo(() => [ "60%"], []);
  const CommentData = [
    {
      imgurl: "https://randomuser.me/api/portraits/men/42.jpg",
      username: "martini_rond",
      desc: "How neatly I write the date in my book",
      duration: "1s",
      likeCount: "1000",
      repies: [
        {
          imgurl: "https://randomuser.me/api/portraits/men/91.jpg",
          username: "tom_25",
          desc: "Wow!!",
          duration: "1m",
          likeCount: "0",
        },
        {
          imgurl: "https://randomuser.me/api/portraits/men/3.jpg",
          username: "David",
          desc: "Motivating",
          duration: "1m",
          likeCount: "0",
        },
        {
          imgurl: "https://randomuser.me/api/portraits/men/3.jpg",
          username: "Ramsom_3",
          desc: "What's up my nigg !!",
          duration: "1m",
          likeCount: "0",
        },
      ],
    },
    {
      imgurl: "https://randomuser.me/api/portraits/men/64.jpg",
      username: "maxjacobson",
      desc: "Now that’s a skill very talented",
      duration: "2h",
      likeCount: "100",
    },
    {
      imgurl: "https://randomuser.me/api/portraits/men/15.jpg",
      username: "zackjohn",
      desc: "Doing this would make me so anxious",
      duration: "1h",
      likeCount: "256",
    },
    {
      imgurl: "https://randomuser.me/api/portraits/women/72.jpg",
      username: "kiero_d",
      desc: "Use that on r air forces to whiten them",
      duration: "1m",
      likeCount: "3000",
    },
    {
      imgurl: "https://randomuser.me/api/portraits/women/49.jpg",
      username: "mis_potter",
      desc: "Should’ve used that on his forces 😷😷",
      duration: "5h",
      likeCount: "1",
    },
  ];

   const renderBackdrop = useCallback(
     (props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
    []
  )

  const debouncedHandleCommentSubmit = useCallback(Debounce(handleCommentSubmit, 1000), []);
  const handleCommentSubmit = () => {
    // Call the create comment function with the input value
    //createCommentMutation(commentInput);
    // Clear the input field after submission
    //setCommentInput("");
    console.log("done")
    console.log(commentInput)
  };
  const handleInputChange = (text: string) => {
    setCommentInput(text);
 
  };
  return (
    <>
      <BottomSheetModal
        backdropComponent={renderBackdrop }
        ref={ref}
        handleIndicatorStyle={{
          backgroundColor: colorScheme === "dark" ? "white" : "black",
        }}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: colorScheme === "dark" ? "black" : "white",
        }}
      >
        <BottomSheetFlatList
          showsVerticalScrollIndicator={false}
          data={CommentData}
          keyExtractor={(item) => item.username}
          renderItem={({ item }) => (
            <View>
              <Comment
                userName={item.username}
                userComment={item.desc}
                Duration={item.duration}
                userProfile={item.imgurl}
                LikeCounter={item.likeCount}
              />
            </View>
          )}
          contentContainerStyle={styles.commentContainer}
          refreshing={false}
        />
        <View style={styles.commentInputContainer}>
          <View style={styles.commentInputWrapper}>
            <BottomSheetTextInput
              
              placeholderTextColor={Colors.commentgrey}
              placeholder="Add comment..."
              style={styles.commentInput}
              value={commentInput} // Bind the input value to the state
              onChangeText={handleInputChange}
              onSubmitEditing={handleCommentSubmit}
            />

<View style={styles.commentIconsWrapper}>
              {commentInput ? (
                <View
                  style={{
                    backgroundColor: "#03fc0b",
                    borderRadius: 20,
                    padding: 8,
                  }}
                >
                  <Icons.Ionicon name="send" size={20} />
                </View>
              ) : (
                <View  style={{
                  backgroundColor: "#0198fd",
                  borderRadius: 20,
                  padding: 8,
                  flexDirection: "row",
                  gap: 10,
                }}>
                  <Icons.OctI name="mention" size={22} />
                  <Icons.EntypoIcon name="emoji-happy" size={22} />
                </View>
              )}
            </View>
            
           
          </View>
        </View>
      </BottomSheetModal>
    </>
  );
});

const styles = StyleSheet.create({
  commentContainer: {
    width: rw(100),
    height: rh(100),
    position: "relative",
    zIndex: 50,
  },
  commentInputContainer: {
    position: "absolute",
    bottom: 20, // Adjust the top value as needed
    width: rw(90),
    backgroundColor: "#272727",
    paddingVertical: 10,
    zIndex: 50,
    left:20,
    borderRadius:35
  },
  commentInputWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems:"center"
  },
  commentInput: {
    color: "white",
    textAlignVertical: "top", // Start input from top
    flex:1,
    
  },
  
  commentIconsWrapper: {
    flexDirection: "row",
    gap: 10,
  },
});

export default CommentModel;
