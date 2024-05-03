import { View, Modal , TouchableOpacity , StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {
    responsiveFontSize as rf,
    responsiveHeight as rh,
    responsiveWidth as rw,
  } from 'react-native-responsive-dimensions';
  import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch } from 'react-redux'
import { selectImage, setImage as setReduxImage } from '@/context/loginFeatures/imageSlice'
import Colors from '@/constants/Colors'
import { RegularText } from '@/components/StyledText';
import { Icon } from '@/components/Themed';


const UploadImgModal = ({ openModal, setOpenModal, onImageSelected }: { openModal: boolean; setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; onImageSelected: () => void }) => {
  const [camera, setCamera] = useState(false);
  const dispatch = useDispatch();
  const [type, setType] = useState(ImagePicker.CameraType.back);
  const [Image, setImage] = useState()
  const cameraRef = useRef<Camera | null>(null);

  /*
    useEffect(() => {
      // Request permission to access the camera and gallery
      (async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission denied');
        }
      })();
    }, []);
  */

  // Function to request permission
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
    }};

    // Regular async function for picking an image
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Choose what type of media to pick. For images only, use Images
            allowsEditing: true, // Allows the user to crop or rotate the image
            aspect: [4, 3], // Aspect ratio of the crop window
            quality: 1, // Quality of the selected image
        });

        // Check if the operation is not canceled and assets are available
        if (!result.canceled && result.assets) {
            // Dispatch the action to update the state with the selected image URI
            //dispatch(setReduxImage(result.assets[0].uri));
            const selectedImage = result.assets[0];
            //dispatch(setImage({ uri: selectedImage.uri, type: selectedImage.type }))
            dispatch(setReduxImage({
              uri: selectedImage.uri,
              storageURL: '',
              type: selectedImage.type || 'image' // provide a default type if not available
          }));
            onImageSelected(); // Close modal after image is selected
        }
    };
  
    const takePicture = async () => {
      if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync();
          // Ensure dispatch is called with an action object
          dispatch(setReduxImage({
              uri: photo.uri,
              storageURL: '',
              type: 'image' // Assuming photos are always JPEGs
          }));
          
          await MediaLibrary.saveToLibraryAsync(photo.uri);
          onImageSelected();
      }
    };
  
    const toggleCameraType = () => {
      setType((current: any) =>
        current === ImagePicker.CameraType.back 
          ? ImagePicker.CameraType.front 
          : ImagePicker.CameraType.back 
      );
    }
   
  return (
   <>
     <Modal visible={openModal} animationType="slide" transparent={true}>
        <View style={styles.ModerlContainer}>
          <View style={styles.ModelInner}>
            <TouchableOpacity onPress={() => setOpenModal(false)} testID="close-button">
              <Icon type="AntIcons" name="closecircle" size={18} />
            </TouchableOpacity>
            <View style={styles.IconContainer}>
              <TouchableOpacity onPress={() => { setCamera(true); requestPermissions(); }} style={styles.IconStyle}>
                <Icon type="MaterialCommunityIcon" name="camera-outline" size={40} />
                <RegularText>Camera</RegularText>
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImage} style={styles.IconStyle}>
                <Icon type="MaterialCommunityIcon" name="image-outline" size={40} />
                <RegularText>Gallery</RegularText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Camera model */}
      <Modal visible={camera} animationType="slide" transparent={true} >
        <Camera
          style={styles.camera}
          type={type}
          ratio="4:3"
          ref={(ref) => {
          cameraRef.current = ref;
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <RegularText style={styles.text}>Flip Camera</RegularText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <RegularText style={styles.text}>Take Picture</RegularText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setCamera(false)}>
              <RegularText style={styles.text}>Close</RegularText>
            </TouchableOpacity>
          </View>
        </Camera>
      </Modal>
   </>
  )
}
const styles = StyleSheet.create({
    ModerlContainer:{
        width:rw(100),
        height:rh(100),
        justifyContent:"center", 
        alignItems:"center" , 
        backgroundColor:"#00FFFFF" 
    },
    ModelInner:{
         backgroundColor:Colors.Primary, 
         padding:15, 
         width:rw(50), 
         borderRadius:10,

    },
    IconContainer:{
     flexDirection:"row",
     justifyContent:"space-evenly",
     alignItems:"center",
    },
    IconStyle:{
     alignItems:"center",
    },
    camera: {
      flex:1,
      aspectRatio:1.5/2,  
    },
    
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
    
      button: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 5,
      },
    
      text: {
        color: 'white',
      },
    

});
  

export default UploadImgModal