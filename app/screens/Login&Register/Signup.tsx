import React, { useState, useEffect } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
  BoldText,
  LightText,
  RegularText,
  SemiboldText,
} from "@/components/StyledText";
import { Icon, TextInput } from "@/components/Themed";
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  Platform,
  NativeSyntheticEvent,
  NativeTouchEvent,
  ScrollView,
  GestureResponderEvent, 
  ActivityIndicator,
} from "react-native";
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import { Picker  } from "@react-native-picker/picker";
import Button from "./button/Button";
import Header from "./header/Header";
import { useSelector } from "react-redux";
import ProfilePic from "./profilepic/ProfilePic";
import axios, { AxiosError } from "axios";
import SuperTokens from 'supertokens-react-native';
import { useLocalSearchParams } from 'expo-router';
import { useActivities, Activity } from "@/context/loginFeatures/ActivitiesContext";
import { selectUserDetails } from "@/context/loginFeatures/loginSlice";
import * as FileSystem from 'expo-file-system';
import { useDispatch } from 'react-redux'
import { selectImage, setImage as setReduxImage } from '@/context/loginFeatures/imageSlice'
import Colors from "@/constants/Colors";
import { GlobalCSS } from "@/constants/GlobalCSS";

// Define the expected structure of your error response
interface ErrorResponse {
  error: string;
  code?: string; // Assuming 'code' is an optional field
}

export const isLessThanTheMB = (fileSize: number, smallerThanSizeMB: number) => {
  const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
  return isOk
}

const getFileExtension = (uri: string) => {
  // Extract the file extension
  const extension = uri.split('.').pop();
  if (!extension)
    return 'unknown'

    return extension;
}

const getMimeType = (extension: string) => {
  // Infer the MIME type
  switch (extension?.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    // Add other cases as needed
    default:
      return 'unknown'; // or any default MIME type
  }
};

SuperTokens.addAxiosInterceptors(axios);

const Signup: React.FC = () => {

  const dispatch = useDispatch();
  //const home = () => router.replace("/screens/Login&Register/login");
  const home = () => router.replace("/(auth)/(tabs)/Explore");

  //const { selectedActivities } = useActivities();
  const {
    selectedActivities,
    hasCalledUserActivitiesApi,
    setHasCalledUserActivitiesApi
  } = useActivities();
  const userDetails = useSelector(selectUserDetails);
  //console.log(userDetails);
  
  const [createdNewUser, setCreatedNewUser] = useState(false);
  const [supertokensID, setSupertokensID] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [timeJoined, setTimeJoined] = useState(0);

  useEffect(() => {
    if (userDetails) {
      const { createdNewUser, supertokensID, email, phoneNumber, timeJoined } = userDetails;
      setCreatedNewUser(createdNewUser);
      setSupertokensID(supertokensID);
      setEmail(email);
      setPhoneNumber(phoneNumber);
      setTimeJoined(timeJoined);
    }
  }, [userDetails]);

  /*
  useEffect(() => {
    console.log("Retrieved Selected Activities in Signup:", selectedActivities);
  }, [selectedActivities]);
  */

  const router = useRouter();
  const dob = new Date(),
    day = dob.getDate(),
    month = dob.getMonth() + 1,
    year = dob.getFullYear();

  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [isGenderPickerVisible, setGenderPickerVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [preAuthSessionId, setPreAuthSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [date, setDate] = useState(`${day}/${month}/${year}`);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState("");
  const [geocode, setGeocode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formError, setFormError] = useState("");
  const [backendError, setBackendError] = useState<string>(""); // State to hold backend error messages
  const [profilepicError, setProfilepicError] = useState<string>(""); // State to hold backend error messages
  //const [Image, setprofilepicImage] = useState(useSelector(selectImage));
  // Additional state to control the flow of the sign-up process
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);

  const FormData = require('form-data');
  const Image = useSelector(selectImage);

  // useEffect hook to listen for image upload completion
  useEffect(() => {
    if (isImageUploaded) {
      callSignupAPI();
    }
  }, [isImageUploaded]);

  const showGenderPicker = () => {
    setGenderPickerVisible(true);
  };

  const closeGenderPicker = () => {
    setGenderPickerVisible(false);
  };

  const BackFn = () => router.replace("/screens/Login&Register/InterestPicker");
  const Back = (event: GestureResponderEvent) => {
    BackFn()
  };

  /*
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (geocode.length > 0) {
        setLocation(geocode[0].name || "");
        console.log(location);
      }
    })();
  }, []);
  */

  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
  
    let location = await Location.getCurrentPositionAsync({});
    let geocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  
    //console.log(location);
    //console.log(geocode);

    if (geocode.length > 0) {
      setGeocode(geocode[0].name || "");
      const formattedLocation = `${location.coords.latitude}, ${location.coords.longitude}`
      setLocation(formattedLocation);
      //console.log(location);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      const formattedDate = `${selectedDate.getDate()}/${
        selectedDate.getMonth() + 1
      }/${selectedDate.getFullYear()}`;
      setDate(formattedDate);
    }
  };

  const toggleGenderPicker = () => {
    setGenderPickerVisible(!isGenderPickerVisible);
  };

  const handleGenderChange = (
    _: NativeSyntheticEvent<NativeTouchEvent>,
    itemValue: string | null
  ) => {
    setSelectedGender(itemValue);
    toggleGenderPicker();
  };

  const callSignupAPI = async () => {
    try {
      const signupApi = 'https://api.tickitapp.xyz/api/v1/users/signup';
  
      // Prepare postData as an object first
      const postData: any = {
        supertokensID: supertokensID,
      };
  
      // Conditionally add fields based on user input
      if (inputValue.trim()) postData.username = inputValue;
      if (email) postData.email = email;
      if (phoneNumber) postData.phone = phoneNumber;
      //console.log(Image);
      if (Image?.storageURL) {
        //console.log(Image);
        postData.profilepic = Image?.storageURL;
      }
      if (selectedGender && selectedGender !== "Select gender") postData.gender = selectedGender;
      
      // Format and include date of birth only if it's changed from the default
      const defaultDate = `${day}/${month}/${year}`;
      if (date !== defaultDate) {
        // Ensure date is formatted as 'YYYY-MM-DD'
        const [day, month, year] = date.split("/");
        postData.dateOfBirth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
  
      // Include location only if it's valid
      if (location) {
        const [latitude, longitude] = location.split(",");
        if (!isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude))) {
          postData.latitude = parseFloat(latitude);
          postData.longitude = parseFloat(longitude);
        }
      }
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: signupApi,
        headers: {
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(postData)
      };
  
      const response = await axios.request(config);
      //console.log("Signup successful:", response.data);
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error("Handle Signup Error:", axiosError);
      // Check if response and data exist and are of the expected format
      if (axiosError.response && axiosError.response.data) {
        // Assuming error details are in 'error' key in the response's data
        // Now TypeScript knows the structure of response.data
        const errorData = axiosError.response.data;
        // Accessing 'error' field from the response
        const errorMessage = errorData.error;
        setBackendError(errorMessage);
      } else {
        // Fallback error message
        setBackendError(axiosError.message || "An unknown network error occurred");
      }

      return { success: false };
    }
  }

  const callUploadProfilepicAPI = async(dispatch: any) => {
    if (!Image) {
      setIsImageUploaded(true);
      return { success: true };
    }

    // Check if the file is an image
    if (Image?.type !== 'image') {
      setProfilepicError("Can't select this file as the type is not image.")
      return { success: false };
    }

    const fileInfo = await FileSystem.getInfoAsync(Image.uri);

    // Check if the file exists and has a known size before proceeding
    if (!fileInfo.exists || typeof fileInfo.size !== 'number') {
      setProfilepicError("Can't select this file as the size is unknown.")
      return { success: false };
    }

    if (Image.type === 'image') {
      const isLt = isLessThanTheMB(fileInfo.size, 2);
      if (!isLt) {
        setProfilepicError("Image size must be smaller than 2MB!")
        return {success: false};
      }
    }

    const extension = getFileExtension(Image.uri);
    const MimeType = getMimeType(extension);
    if(MimeType === 'unknown') {
      setProfilepicError("Can't select this file as the type is unknown.")
      return {success: false}
    }      

    // Create an instance of FormData
    const data = new FormData();
    data.append('profilepic', {
      uri: Image.uri,
      type: MimeType,
      name: inputValue + "." + extension, 
    });

    const uploadApi = 'https://api.tickitapp.xyz/api/v1/uploadprofilepic';
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: uploadApi,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data : data
    };

    try {
      const response = await axios.request(config);
      //console.log(response.data);
      //console.log("Upload successful:", response.data);
      const uri = Image.uri;
      const type = Image?.type;
      const url = response.data.url;
      
      dispatch(setReduxImage({
        uri: uri,
        storageURL: url,
        type: type || 'image' // provide a default type if not available
      }));
      setIsImageUploaded(true);
    } catch (error) {
      console.error("Upload failed:", error);
      setIsImageUploaded(false);
      setProfilepicError("Failed to upload image");
      return { success: false };
    }

    return { success: true };
  }

  const callUserInterestsAPI = async() => {
    if (selectedActivities.length === 0) {
      return {success: true};
    }
    const activityIDs = selectedActivities.map(activity => activity.ActivityID);
    //console.log(activityIDs)

    try {
      const interestsApi = 'http://api.tickitapp.xyz/api/v1/users/interests';
      const postData: any = {
        supertokensID: supertokensID,
        interests: activityIDs
      };

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: interestsApi,
        headers: {
          'Content-Type': 'application/json'
        },
        data : JSON.stringify(postData)
      };
  
      const response = await axios.request(config);
      return {success: true}

    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error("Handle Signup Error:", axiosError);
        return {success: false}
    }
  }

  const handleSignup = async () => {
    //console.log(Image);
    setIsLoading(true); // Show the loading indicator
    setFormError(""); // Reset any previous error messages

    // Check if the username is entered
    if (!inputValue.trim()) {
      setFormError("Username is required");
      setIsLoading(false); // Stop the loading indicator
      return; // Stop the signup process
    }

    // if image is not uploaded to s3, upload it
    if (!Image?.storageURL) {
      setIsImageUploaded(false); // Ensure this is reset before starting
      const uploadProfilepicResult = await callUploadProfilepicAPI(dispatch);
      if (!uploadProfilepicResult.success) {
        setBackendError('Profilepic upload failed')
        setIsLoading(false);
        return;
      }
    } else {
        const signupResult = await callSignupAPI();
        if (!signupResult.success) {
          setIsLoading(false);
          return; // Return early if signup failed
        }
    }

    // ☠️ Here be dragons... 🐉
    // The fates have allowed the user to sign up but denied them their interests!
    // Should the user interests API fail, we bravely proceed, leaving behind a trail of console logs and user feedback.
    // Future developer, should you gaze upon this desolate wasteland of uninterested users,
    // bear in mind the capricious whims of network requests and tread carefully.
    // Your quest, should you choose to accept it, involves ensuring users' interests reach the promised land.
    // Godspeed! 🚀
    // Check if user interests API has not been called and there are selected activities
    if (!hasCalledUserActivitiesApi && selectedActivities.length > 0) {
      const userInterestResult = await callUserInterestsAPI();
      if (!userInterestResult.success) {
        setHasCalledUserActivitiesApi(false);
        // Note: We're proceeding anyway! The user is signed up, just a bit less interesting...
        /*
        setBackendError('Error while updating interests. Please try again')
        setIsLoading(false);
        return;
        */
      } else {
        // Set the flag indicating the interests API has been called
        setHasCalledUserActivitiesApi(true);
      }
    }

    home();
    setIsLoading(false); // Hide the loading indicator
  };

  return (
    <ScrollView style={{ width: rw(100), height: rh(100) }}>
      <Header headerTitle="Sign Up" onIconPress={Back} />
      <View style={styles.Viewstyle}>
        <BoldText style={{ textAlign: "center", fontSize: rf(3), paddingTop: rw(2) }} >
          Wonderful !
        </BoldText>
        <LightText style={{ textAlign: "center", paddingHorizontal: rw(10) }}>
          You’re about to start exploring, so tell about yourself!
        </LightText>
      </View>
      <ProfilePic image={Image}/>
      {profilepicError && <RegularText style={styles.errorText}>{profilepicError}</RegularText>} 
      <View style={{ paddingTop: rw(3) }}>
        {/* username */}
        <View style={styles.Viewstyle}>
          <RegularText>
            Username
            <RegularText style={{ color: Colors.Primary }}>*</RegularText>
          </RegularText>
          <View style={{ position: 'relative' }}>
            <TextInput
              testID="username-input"
              style={GlobalCSS.Textinput}
              value={inputValue}
              onChangeText={text => setInputValue(text)} // Update inputValue state when text changes
              editable={!isLoading}  // Disable editing when loading
            />
          </View>   
          {formError && <RegularText style={styles.errorText}>{formError}</RegularText>}                
        </View>
        {/* Gender */}
        <View style={styles.Viewstyle}>
          <RegularText>Gender</RegularText>
          <Pressable onPress={showGenderPicker}>
            <TextInput
              style={GlobalCSS.Textinput}
              value={selectedGender || ""}
              editable={false}
            />
          </Pressable>
          {isGenderPickerVisible && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={isGenderPickerVisible}
              onRequestClose={closeGenderPicker}>
              <View style={styles.modalContainer}>
                <Pressable
                  style={{ flex: 1 }}
                  onPress={closeGenderPicker}></Pressable>
                <View style={styles.modalContent}>
                  <Picker
                    selectedValue={selectedGender}
                    onValueChange={(itemValue, itemIndex) =>
                      handleGenderChange(
                        {} as NativeSyntheticEvent<NativeTouchEvent>,
                        itemValue
                      )
                    }>
                    <Picker.Item label="Select gender" value="Select gender" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Prefer not to say" value="Prefer not to say" />
                  </Picker>
                </View>
              </View>
            </Modal>
          )}
        </View>
        {/* Date of birth */}
        <View style={[styles.Viewstyle, { flexDirection: "row", gap: rw(5) }]}>
          <View style={{ width: rw(42) }}>
            <RegularText>Date of birth</RegularText>
            <Pressable onPress={showDatepicker}>
              <TextInput
                style={GlobalCSS.Textinput}
                value={date}
                editable={false}
              />
              <Icon
                style={styles.smallinputicon}
                type="MaterialCommunityIcon"
                name="calendar-month"
                size={24}
              />
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={dob}
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) =>
                  handleDateChange(event, selectedDate)
                }
              />
            )}
          </View>
          {/* Location */}
          <View style={{ width: rw(42) }}>
            <RegularText>Location</RegularText>
            
              <TextInput
                style={GlobalCSS.Textinput}
                value={location} // Bind the location state to the TextInput
                editable={false}  // Make the field non-editable if you don't want users to modify it
              />
              <Pressable onPress={requestLocationPermission} style={styles.smallinputicon}>
                <Icon
                  type="MaterialCommunityIcon"
                  name="pin-outline"
                  size={24}
                />
              </Pressable>
            </View>

        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.Primary} style={styles.activityIndicator} />
        ) : (
          <>
            <Button name="Finish" link={handleSignup} /> 
            {backendError && <RegularText style={styles.errorText}>{backendError}</RegularText>}
          </> 
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Viewstyle: {
    paddingHorizontal: rw(5),
    padding: 10,
  },
  smallinputicon: {
    position: "absolute",
    bottom: 9,
    right: 5,
  },
  icon: {
    backgroundColor: Colors.Primary,
    padding: rw(3),
    borderRadius: 8,
  },
  iconcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: rw(5),
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.white,
  },
  activityIndicator: {
    marginVertical: 20, // Adjust as needed
    // Other styling for the loader if needed
  },
  errorText: {
    color: "#b22222", // Darker red for text
    textAlign: 'center',
    fontSize: rf(2),
  },
});

export default Signup;