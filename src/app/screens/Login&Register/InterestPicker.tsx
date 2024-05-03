import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Image, GestureResponderEvent, ActivityIndicator, } from "react-native";
import { responsiveHeight as rh, responsiveWidth as rw } from "react-native-responsive-dimensions";
import { FlashList } from "@shopify/flash-list";
import Header from "./header/Header";
import Button from "./button/Button";
import { useRouter } from "expo-router";
import { useActivities, Activity } from "@/context/loginFeatures/ActivitiesContext";
import axios from 'axios'; // Import axios
import SuperTokens from 'supertokens-react-native';
import Colors from "@/constants/Colors";
import { Icon } from "@/components/Themed";
import { MediumText , SemiboldText } from "@/components/StyledText";

SuperTokens.addAxiosInterceptors(axios);

const InterestPicker: React.FC = () => {
  const url = "https://api.tickitapp.xyz/api/v1/activities";

  const router = useRouter()
  const BackFn = () => router.replace("/screens/Login&Register/login");
  const Back = (event: GestureResponderEvent) => {
    BackFn()
  };

  //const signup = () => router.replace("/screens/Login&Register/Login");

  //const { setSelectedActivities } = useActivities();
  const { setSelectedActivities, setHasCalledUserActivitiesApi } = useActivities();
  //const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const [data, setData] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Activity[]>(url); // Use axios to make the GET request

        // With axios, response.data directly contains the desired data
        const activities = response.data;
        setData(activities.map(activity => ({ ...activity, isSelected: false }))); // Initialize isSelected to false for each activity
        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred: " + error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleItemPress = (ind: number) => {
    const tempData = data.map((item, index) => {
      if (index === ind) {
        return { ...item, isSelected: !item.isSelected }; // Toggle the isSelected state
      }
      return item;
    });
    setData(tempData); // Update the data with the new selection states
  };

  const handleSubmit = async () => {
    setIsSubmitLoading(true);
  
    // Filter out the selected activities
    const selectedActivities = data.filter(activity => activity.isSelected);
    //console.log(selectedActivities);

    // Set selected activities to global state
    setSelectedActivities(selectedActivities);

    // Navigate to the next screen with the data
    //signup();
    router.replace('/screens/Login&Register/Signup');
    setHasCalledUserActivitiesApi(false);
    setIsSubmitLoading(false);
  };

  return (
    <View style={{ width: rw(100), height: rh(100) }}>
      <Header headerTitle="Pick your interests" onIconPress={Back} />
      {!isLoading && (
        <FlashList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          estimatedItemSize={100}
          numColumns={3}
          contentContainerStyle={{ paddingLeft: rw(6), paddingTop: rw(5) }}
          renderItem={({ item, index }) => (
            <View>
              <Pressable
                onPress={() => handleItemPress(index)}
                style={{ borderRadius: 5, backgroundColor: item.isSelected ? Colors.Primary : undefined }}
              >
                <View
                  style={{
                    borderColor: item.isSelected ? Colors.Primary : "#ffffff",
                    borderWidth: 1,
                    margin: 1,
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Image
                    source={{ uri: item.ActivityIcon }}
                    style={{ height: 80, width: 80, position: "relative" }}
                  />
                  <Icon
                    type = "AntIcons"
                    name={item.isSelected ? "checkcircleo" : "pluscircleo"}
                    size={24}
                    style={{ position: "absolute", right: 5, top: 5 }}
                  />
                </View>
              </Pressable>
              <MediumText
                style={{ textAlign: "center", fontSize: rw(4), paddingTop: 3 }}
              >
                {item.ActivityName}
              </MediumText>
            </View>
          )}
        />
      )}
      {isSubmitLoading ? (
        <ActivityIndicator size="large" color={Colors.Primary} style={styles.activityIndicator} />
      ) : (
        <Button name="Submit" link={handleSubmit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    marginVertical: 20, // Adjust as needed
    // Other styling for the loader if needed
  },
  
});

export default InterestPicker;