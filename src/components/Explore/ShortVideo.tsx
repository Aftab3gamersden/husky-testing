import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, KeyboardAvoidingView, Pressable, ActivityIndicator } from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { responsiveScreenHeight as rh, responsiveWidth as rw } from "react-native-responsive-dimensions";
import Icons from "../../assets/icons";
import LeftIcons from "./LeftIcons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect
import Colors from "@/constants/Colors";
import { useAppSelector } from "@/context/hooks";
import UserProfile from "./UserProfile";
import * as Progress from 'react-native-progress';
import {ExploreProps} from '@/types/Explore.types'
const ShortVideo: React.FC<ExploreProps> = ({
 UUID, 
 Post,
 id,
 Like,
 Comment,
 Share,
 Profile,
 name,
 Description,
 location,
 following
}) => {
 const video = useRef<Video>(null);
 const [status, setStatus] = useState<AVPlaybackStatus>();
 const [loading, setLoading] = useState(true);
 const [progress, setProgress] = useState<number>(0);
 const isPlaying = status?.isLoaded && status.isPlaying;
 const activeId = useAppSelector((state) => state.activeid.activeId);

 useEffect(() => {
    if (activeId === id) {
      video.current?.playAsync();
    } else {
      video.current?.pauseAsync();
    }
 }, [activeId, id]);

 // Effect to pause the video when navigating away from the screen
 useFocusEffect(
    React.useCallback(() => {
      if (activeId === id) {
        video.current?.playAsync();
      }
      return () => {
        if (video.current) {
          video.current.pauseAsync();
        }
      };
    }, [activeId, id])
 );

 const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setStatus(status);
    if (status.isLoaded) {
      setLoading(false); // Hide loading indicator when video is loaded
    }
    if (status.durationMillis && status.positionMillis) {
      const newProgress = status.positionMillis / status.durationMillis;
      setProgress(newProgress); // Update the progress
    }
 };

 const Playpausehandler = () => {
    if (!video.current) {
      return;
    }
    if (isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
 };

 return (
    <KeyboardAvoidingView style={styles.container}>
      <Pressable onPress={Playpausehandler} style={styles.content}>
        {loading && (
          <ActivityIndicator
            size="large"
            color={Colors.Primary}
            style={styles.loadingIndicator}
          />
        )}
        <Video
          ref={video}
          style={[styles.video, styles.videoOverlay]}
          source={Post ? { uri: Post } : undefined}
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          isLooping
          onLoadStart={() => setLoading(true)}
        />
        {!isPlaying && !loading && (
          <Icons.Ionicon
            color="rgba(255, 255, 255, 0.6)"
            name="play"
            size={70}
            style={styles.IconStyle}
          />
        )}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />
        <LeftIcons UUID={UUID} Like={Like} Share={Share} Comment={Comment} id={id} />
        <UserProfile
         Profile={Profile}
         name={name}
         Description={Description}
         location={location}  following={following} UUID={UUID}    />
      </Pressable>
         {/* Add ProgressBar here */}
         <Progress.Bar animationType="timing" width={rw(100)} progress={progress} color="white" style={styles.progressBar} />
    </KeyboardAvoidingView>
 );
};

const styles = StyleSheet.create({
 container: {
    width: rw(100),
    height: rh(100),
    position: "relative",
 },
 video: {
    width: rw(100),
    height: rh(100),
 },
 videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
 },
 content: {
    ...StyleSheet.absoluteFillObject,
    padding: 5,
 },
 overlay: {
    top: "50%",
 },
 loadingIndicator: {
    position: "absolute",
    alignSelf: "center",
    top: "50%",
 },
 IconStyle: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    top: "50%",
 },
 progressBar: {
  position: 'absolute',
  bottom:73,
  left: 0,
  right: 0,
  height: 2,  
  backgroundColor: 'transparent',
  borderWidth:0,
  
},
});

export default ShortVideo;