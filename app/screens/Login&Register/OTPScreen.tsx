import React, { useEffect, useRef, useState } from "react";
import OTPTextInput from 'react-native-otp-textinput'
import {
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from "react-native-responsive-dimensions";
import { useRouter } from "expo-router";
import axios from "axios";
import SuperTokens from 'supertokens-react-native';
import Colors from "@/constants/Colors";
import { selectUserDevice, setUserDetails } from "@/context/loginFeatures/loginSlice";
import { BoldText , LightText ,  RegularText  } from "@/components/StyledText";
import { useAppDispatch , useAppSelector } from "@/context/hooks";
import Button from "./button/Button";
import Header from "./header/Header";
SuperTokens.addAxiosInterceptors(axios);

const OTPTimer = 900
const ResendTimer = 60

const OTPScreen = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()
  const BackFn = () => router.replace("/screens/Login&Register/login");
  const Back = (event: GestureResponderEvent) => {
    BackFn()
  };

  const interest = () => router.replace("/screens/Login&Register/InterestPicker");
  const home = () => router.replace("/(auth)/(tabs)/Explore");
  // Use the useSelector hook to get the userDevice data from the Redux store
  const userDevice = useAppSelector(selectUserDevice);
 

  // Create state variables to store deviceId and preAuthSessionId
  const [deviceId, setDeviceId] = useState("");
  const [preAuthSessionId, setPreAuthSessionId] = useState("");
  


  const [otp, setOtp] = useState<number | undefined>(undefined);
  const [otpError, setOtpError] = useState("");
  
  // Destructure the userDevice object and update the state variables
  useEffect(() => {
    if (userDevice) {
      const { deviceId, preAuthSessionId } = userDevice;
      setDeviceId(deviceId);
      setPreAuthSessionId(preAuthSessionId);
    }
  }, [userDevice]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setOtpError(""); // Reset error message before making a new request
    try {
      const consumeApi = 'https://api.tickitapp.xyz/auth/signinup/code/consume';
  
      const data = `{
        "preAuthSessionId": "${preAuthSessionId}",
        "deviceId": "${deviceId}",
        "userInputCode": "${otp}"
      }`; 
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: consumeApi,
        headers: {
          'Content-Type': 'text/plain'
        },
        data: data
      };
  
      const response = await axios.request(config);
  
      //console.log("Handle OTP Response:", response.data);
      // Check if the OTP is incorrect
      if (response.data.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
        const { failedCodeInputAttemptCount, maximumCodeInputAttempts } = response.data;
        setOtpError(`Incorrect OTP. Attempts remaining: ${maximumCodeInputAttempts - failedCodeInputAttemptCount}`);
      }
      else
      {
        if (response.data.status == "RESTART_FLOW_ERROR") {
          BackFn()
        }
        else {

          const { createdNewUser, user } = response.data;
          const { id: supertokensID, email, phoneNumber, timeJoined } = user;
          // Dispatch the setUserDevice action with the payload
          dispatch(setUserDetails({ createdNewUser, supertokensID, email, phoneNumber, timeJoined }));
          console.log(supertokensID);

          if (createdNewUser) {
            interest();
          }
          else {
            home();
          }
        }
      }
    } catch (error) {
      console.error("Handle OTP Error:", error);
      setOtpError("An error occurred while verifying the OTP.");
    }
    setIsLoading(false);
  };
  
  const ResendOtp = async () => {
    if (!canResend) return; // Prevent resend if timer is running
    setIsLoading(true);
    try {
      const ResentApi = 'https://api.tickitapp.xyz/auth/signinup/code/resend';
  
      const data = `{
        "deviceId": "${deviceId}",
        "preAuthSessionId": "${preAuthSessionId}"
      }`;
  
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: ResentApi,
        headers: {
          'Content-Type': 'text/plain'
        },
        data: data
      };
  
      const response = await axios.request(config);
  
      //console.log("Resend Response:", response.data);
    } catch (error) {
      console.error("Resend Error:", error);
    }
    setIsLoading(false);
    setCanResend(false);
    setResendTimer(ResendTimer); 
    setTimeLeft(OTPTimer); // Reset OTP timer to its original value
  };
  
  const [timeLeft, setTimeLeft] = useState(OTPTimer); 
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(ResendTimer);

  useEffect(() => {
    if (!timeLeft) return;
    
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    if (resendTimer <= 0) {
      setCanResend(true);
      return;
    }

    const intervalId = setInterval(() => {
      setResendTimer(resendTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [resendTimer]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <KeyboardAvoidingView style={{ width: rw(100), height: rh(100) }}>
    {/* Header  */}
      <Header headerTitle="Verification" onIconPress={Back} />
      <BoldText style={styles.otptext}>Enter OTP</BoldText>
      <LightText
        style={{ fontSize: 16, textAlign: "center", paddingHorizontal: rw(20) }}
      >
        Enter the code that we sent you
      </LightText>
    
      <RegularText style={{ textAlign:"center", paddingTop:rw(10), fontSize:20 }}>
        Expires in: {formatTime()}
      </RegularText>
  
      {otpError !== "" && (
        <View style={styles.errorContainer}>
          <RegularText style={styles.errorText}>{otpError}</RegularText>
        </View>
      )}

      <>
      <View style={{ position: 'relative' }}>
        <OTPTextInput
          containerStyle={{ paddingHorizontal: rw(7) }}
          textInputStyle={styles.Otpscn}
          handleTextChange={(code) => setOtp(Number(code))}
          inputCount={6}
          tintColor={Colors.Secondary}
          offTintColor={Colors.Primary}
          autoFocus={true}
        />
        {isLoading && <View style={styles.overlay} />}
      </View>          
      </>
         
      <View style={styles.resendContainer}>
        <LightText style={styles.resendText}>
          Didn't receive the code?
        </LightText>
        <Pressable onPress={ResendOtp} disabled={!canResend}>
          <BoldText style={{ color: Colors.Primary }}>
            {canResend ? "Resend" : `Resend in ${resendTimer}s`}
          </BoldText>
        </Pressable>
      </View>
      {isLoading ? (
          <ActivityIndicator size="large" color={Colors.Primary} style={styles.activityIndicator} />
        ) : (
          <Button name="Submit" link={handleSubmit} />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Viewstyle: {
    paddingHorizontal: rw(5),
    padding: 10,
  },
  otptext: {
    fontSize: 25,
    textAlign: "center",
    lineHeight: 30,
    paddingTop: rw(20),
    paddingBottom: rw(2),
  },

  Otptextinput: {
    fontSize:25,
    borderWidth: 1,
    padding: 12,
    borderRadius: 4,
    width:55
  },
  Otpscn:{
     color: Colors.Primary , 
     borderWidth: 1,
     borderColor:"#fff" , 
     borderRadius:4, 
     borderBottomWidth:1,
     width:rw(12), 
     height:rw(12),
     paddingHorizontal:rw(3)
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: rw(20),
    paddingTop: rw(10),
  },
  resendText: {
    fontSize: 16,
    textAlign: 'center',
    marginRight: 5, // Adjust as needed for spacing
  },
  activityIndicator: {
    marginVertical: 20, // Adjust as needed
    // Other styling for the loader if needed
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
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

export default OTPScreen;
