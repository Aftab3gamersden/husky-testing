import { View, Pressable , StyleSheet , Image  } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MediumText } from '../StyledText'
import Icons from "@/assets/icons";
import {
    responsiveScreenHeight as rh,
    responsiveWidth as rw,
    responsiveFontSize as rf
  } from "react-native-responsive-dimensions";
import { HandThumbUpIcon } from "react-native-heroicons/solid";
import { SwipeIcon , AddBucket } from '@/assets/icons/customicons';
import { Link } from 'expo-router';
import { LeftProps} from '@/types/Explore.types'
import {  BottomSheetModal } from '@gorhom/bottom-sheet';
import CommentModel from './CommentSection/CommentModal';
import ShareModal from './ShareModal';
import { useBulkLikeMutation , useBulkunLikeMutation } from '@/context/exploreContext/ExploreContext';
import { useAppDispatch ,useAppSelector } from '@/context/hooks';
import { addUUID , removeUUID  } from '@/context/exploreContext/StoreUUId';
import Colors from '@/constants/Colors';
import { GlobalCSS } from '@/constants/GlobalCSS';
const LeftIcons: React.FC<LeftProps> = ({ Like, Share, Comment , id , UUID }) => {
  const BottomSheetRef = useRef<BottomSheetModal>(null)
  const ShareModalRef = useRef<BottomSheetModal>(null)
  const [likes, setLikes] = useState(0);
  const [color, setColor] = useState('white');
  const [isLiked, setIsLiked] = useState(false);
  const [bulkLikeMutation] = useBulkLikeMutation();
  const [bulkunLikeMutation ,] = useBulkunLikeMutation();
  const dispatch = useAppDispatch();
  
  const LikedUUIDs = useAppSelector(state => state.UUID.UUIDs)
  const unLikedUUIDs = useAppSelector(state => state.UUID.removedUUIDs)
  
  
  const handlelikePress = () => {
    bulkLikeMutation({ experienceUuids: LikedUUIDs })
      .unwrap()
      .then(response => {
        console.log("Response:", response);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  
  const handleunlikePress = () => {
    bulkunLikeMutation({ experienceUuids: unLikedUUIDs })
    .unwrap()
    .then(response => {
      console.log("Response:", response);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handlelikePress();
      handleunlikePress();
    }, 60000);
    return () => clearTimeout(timer);
  },[LikedUUIDs , unLikedUUIDs]);
  
  const handleOpenModal = (modalRef: React.RefObject<BottomSheetModal>) => {
    modalRef.current?.present();
  };
  //const { dismiss } = useBottomSheetModal(); // this is used to close the modal

  const handlePress = () => {
    if (isLiked ) {
      setLikes(likes - 1);
      setColor('white');
      dispatch(removeUUID(UUID))

    } else {
      setLikes(likes + 1);
      setColor(Colors.Primary);
      dispatch(addUUID(UUID));
    }
    setIsLiked(!isLiked);
 };
  
  
  return (
    <> 
    <View style={styles.IconContainer}>
      <View style={{alignItems:"center", gap:25}}>
        <Link href={`/(auth)/(Explorecomp)/(Itinerary)/${id}`} >
        <View style={styles.Icon}>
         <Image source={SwipeIcon} style={{ width:25 , height:16.91}} />
         <MediumText style={styles.IconText}>Details</MediumText> 
        </View>
        </Link>
        <View style={styles.Icon}>
          <Pressable onPress={handlePress} >
           <HandThumbUpIcon  size={29} color={color} />
          </Pressable>
          <MediumText style={styles.IconText}>{likes}</MediumText>
        </View>
          <Pressable onPress={() => handleOpenModal(BottomSheetRef)} >
          <View style={styles.Icon}>
          <Icons.Ionicon
            name="chatbubble-ellipses-sharp"
            style={GlobalCSS.iconSize}
            color="white"
          />
          <MediumText style={styles.IconText}>{Comment}</MediumText>
        </View>
          </Pressable>
        <View style={styles.Icon}>
          <Pressable onPress={() => handleOpenModal(ShareModalRef)}>
          <Icons.MaterialCommunityIcon name="share" style={GlobalCSS.iconSize} color="white" />
          </Pressable>
          <MediumText style={styles.IconText}>{Share}</MediumText>
        </View>
       
        <Pressable>
         <Image source={AddBucket} style={{ width:29, height:32}}  /> 
        </Pressable>
      
      </View>
       
      </View>
        <CommentModel ref={BottomSheetRef}  />
        <ShareModal ref={ShareModalRef} />
    </>
  )
}
const styles = StyleSheet.create({
    Icon: {
      alignItems: "center",
      gap: 2,
    },
    IconContainer: {
      width: rw(100),
      height: rh(100),
      gap: 30,
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      paddingBottom: rw(28),
      paddingRight: rw(7),
    },
    IconText:{
      fontSize:11,
      color: Colors.white 
    }
  });
  

export default LeftIcons