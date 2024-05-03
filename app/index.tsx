import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import React from "react";
import { useAuth } from "@/context/auth/AuthContext";
const Index: React.FC = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" testID="loading-indicator"/></View>;
  }
  return (
  <View>
    {isLoggedIn ? (
      //<Redirect href="/screens/Login&Register/login" />
      <Redirect href="/(auth)/(tabs)/Explore" />
    ) : (
      <Redirect href="/screens/Login&Register/login" />
    )}
  </View>
  );
};

export default Index;