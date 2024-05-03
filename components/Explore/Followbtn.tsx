import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useBulkFollowMutation , useBulkUnfollowMutation } from "@/context/exploreContext/ExploreContext";
import { Following as followingcontext , UnFollowing as unfollowingcontext } from "@/context/exploreContext/StoreUUId";
import { useAppDispatch ,useAppSelector } from '@/context/hooks';
import Colors from "@/constants/Colors";
import { GlobalCSS } from "@/constants/GlobalCSS";
import {  RegularText } from "../StyledText";

interface FollowbtnProps {
  following: boolean;
  followUUID:string
}

const Followbtn: React.FC<FollowbtnProps> = ({ following , followUUID}) => {
  const dispatch = useAppDispatch()
  const [isFollowing, setIsFollowing] = useState(following);
  const [bulkFollowMutation] = useBulkFollowMutation();
  const [bulkunFollowMutation] = useBulkUnfollowMutation();
  const FollowUUIDs = useAppSelector(state => state.UUID.FollowUUID)
  const UnfolllowUUIDs = useAppSelector(state => state.UUID.unfollowUUID)
  const handleFollow = () => {
     bulkFollowMutation({ targetUserIds:FollowUUIDs })
      .unwrap()
      .then(response => {
        console.log("Followed:", response);
      })
      .catch(error => {
        console.error("Error following:", error);
      });
  };
  
  const handleUnfollow = () => {
    bulkunFollowMutation({ targetUserIds:UnfolllowUUIDs })
      .unwrap()
      .then(response => {
        console.log("Unfollowed:", response);
      })
      .catch(error => {
        console.error("Error unfollowing:", error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFollow()
      handleUnfollow()
    }, 6000);
    return () => clearTimeout(timer);
  },[FollowUUIDs , UnfolllowUUIDs]);
  

  const handleFollowToggle = () => {
    if (!isFollowing) {
      setIsFollowing(prevFollowing => !prevFollowing);
      dispatch(followingcontext(followUUID))
    } else {
      handleUnfollow();
      dispatch(unfollowingcontext(followUUID))
    }
  };
  
 

  return (
    <Pressable onPress={handleFollowToggle} style={styles.btnContainer}>
      <RegularText style={[GlobalCSS.ExtraSmallFontsize, { color: Colors.white }]}>
        {isFollowing ? "Following" : "Follow"}
      </RegularText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginLeft: 4,
    borderWidth: 1,
    borderColor: "#fff",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 4,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default Followbtn;
