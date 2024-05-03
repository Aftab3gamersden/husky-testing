import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { KeyboardAvoidingView, View, StyleSheet, ActivityIndicator } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import axios from "axios";

import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { useRouter } from "expo-router";
import Button from "./button/Button";
import SuperTokens from 'supertokens-react-native';
import { GlobalCSS } from "@/constants/GlobalCSS";
import Colors from "@/constants/Colors";
import { RegularText } from "@/components/StyledText";
import Tickitlogo from "@/components/tickitLogo/Tickitlogo";
import { setUserDevice } from "@/context/loginFeatures/loginSlice";
import { Icon , TextInput } from "@/components/Themed";

SuperTokens.addAxiosInterceptors(axios);

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


const Login: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [deviceId, setDeviceId] = useState("");
  const [preAuthSessionId, setPreAuthSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const phoneInput = useRef<PhoneInput>(null);
  const router = useRouter();
  const Otpscreenhandle = () => router.replace("/screens/Login&Register/OTPScreen");

  const handleLogin = async () => {
    setFormError(""); // Reset any previous error messages
    if (!inputValue) {
      setFormError("Phone number or email is required");
      //console.error("Input cannot be empty");
      return; // Return early if the input is empty
    }

    // Basic length check for phone numbers
    if (isPhoneNumber && inputValue.replace(/[^0-9]/g, "").length <= 10) {
      setFormError("Invalid Phone number");
      //console.error("Phone number should have more than 10 digits");
      return; // Return or handle error as you wish
    }

    // Check for email:
    if (!isPhoneNumber && !validateEmail(inputValue)) {
      setFormError("Invalid Email");
      return;
    }

    setIsLoading(true);
    try {
      const requestData = isPhoneNumber
        ? JSON.stringify({ phoneNumber: `${phoneInput.current?.getCountryCode()}${inputValue}` })
        : JSON.stringify({ email: inputValue });
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.tickitapp.xyz/auth/public/signinup/code/?apiBasePath=auth',
        headers: { 
          'Content-Type': 'application/json'
        },
        data: requestData
      };
  
      const response = await axios.request(config);
      const { deviceId, preAuthSessionId } = response.data;
  
      // Dispatch the setUserDevice action with the payload
      dispatch(setUserDevice({ deviceId, preAuthSessionId }));
      Otpscreenhandle();
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false)
  };

  const toggleInputType = (text: string) => {
    /*
    setIsPhoneNumber(/^\d+$/.test(text));
    setInputValue(text);
    */
   // Trim leading and trailing whitespace
   const trimmedText = text.trim();

   let processedText = trimmedText
   // Check if the input starts with '+' and does not contain '@', treat it as phone
   if (trimmedText.startsWith("+") && !trimmedText.includes("@")) {
     processedText = trimmedText.slice(1);
     setIsPhoneNumber(true);
   } else {
     //setIsPhoneNumber(trimmedText.includes("@"));
     setIsPhoneNumber(/^\d+$/.test(text));
     processedText = text;
   }

   setInputValue(processedText);
  };

  return (
    <KeyboardAvoidingView style={{ width: rw(100), height: rh(100), paddingTop: rw(20) }}>
      <Tickitlogo />
      <View style={styles.Viewstyle}>
        <RegularText>Email or Phone number</RegularText>
        <View style={{ position: 'relative' }}>
          {isPhoneNumber ? (
            <>
              <PhoneInput
                containerStyle={GlobalCSS.Phoneinput}
                defaultValue={inputValue}
                defaultCode="IN"
                layout="first"
                onChangeText={toggleInputType}
                withDarkTheme
                withShadow
                autoFocus
                onChangeFormattedText={setInputValue}
                ref={phoneInput}
              />
              {isLoading && <View style={styles.overlay} />}
            </>
          ) : (
            <TextInput
              testID="email-input"
              style={GlobalCSS.Textinput}
              value={inputValue}
              onChangeText={(text) => toggleInputType(text)}
              editable={!isLoading}  // Disable editing when loading
            />
          )}
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color={Colors.Primary} style={styles.activityIndicator} />
        ) : (
          <>
            <Button name="Continue" link={handleLogin} /> 
            {formError && 
              <View style={styles.errorContainer}>
                <RegularText style={styles.errorText}>{formError}</RegularText>
              </View>}
          </>
          
        )}
        <RegularText style={{ alignSelf: "center" }}>OR</RegularText>
        <RegularText style={styles.continueWithStyle}>Continue with</RegularText>
        <View style={styles.iconcontainer}>
          <Icon style={styles.icon} type="AntIcons" size={30} name="google" />
          <Icon style={styles.icon} type="MaterialIcons" size={30} name="facebook" />
          <Icon style={styles.icon} type="AntIcons" size={30} name="apple1" />
        </View>
        <RegularText style={styles.skipStyle}>Skip for now</RegularText>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Viewstyle: {
    paddingHorizontal: rw(5),
    padding: 10,
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
  continueWithStyle: {
    alignSelf: "center",
    fontSize: rf(1.9),
    paddingVertical: rw(5),
  },
  skipStyle: {
    alignSelf: "center",
    fontSize: rf(1.8),
    textDecorationLine: "underline",
    paddingTop: rw(9),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  activityIndicator: {
    marginVertical: 20, // Adjust as needed
    // Other styling for the loader if needed
  },
  errorContainer: {
    padding: rw(4),
    marginHorizontal: rw(5),
    backgroundColor: "#ffcccb", // Light red background for error
    borderRadius: 4,
    marginTop: rw(5),
  },
  errorText: {
    color: "#b22222", // Darker red for text
    textAlign: 'center',
    fontSize: rf(2),
  },
});

export default Login;