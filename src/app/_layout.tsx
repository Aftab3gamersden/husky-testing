/* eslint-disable react/react-in-jsx-scope */
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useFonts , Poppins_500Medium , Poppins_400Regular , Poppins_700Bold , Poppins_600SemiBold , Poppins_100Thin , Poppins_200ExtraLight , Poppins_300Light ,Poppins_800ExtraBold } from '@expo-google-fonts/poppins';
import { Provider } from 'react-redux';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React from 'react';
import { AuthProvider } from '@/context/auth/AuthContext';
import { store } from '@/context/store';
import { ActivitiesProvider } from '@/context/loginFeatures/ActivitiesContext';

/*
import SuperTokens from 'supertokens-react-native';

SuperTokens.init({
    apiDomain: "https://api.tickitapp.xyz",
    apiBasePath: "/auth",
});
*/

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_500Medium,
    Poppins_400Regular , 
    Poppins_700Bold , 
    Poppins_600SemiBold , 
    Poppins_100Thin , 
    Poppins_200ExtraLight , 
    Poppins_300Light ,
    Poppins_800ExtraBold, 
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => { 
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <BottomSheetModalProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Provider store={store} >
          <ActivitiesProvider>
            <Stack screenOptions={{ headerShown: false , animation: "slide_from_right" }} >
              <Stack.Screen name="index" options={{ headerShown: false , animation:"none" }} />
            </Stack>
          </ActivitiesProvider>      
        </Provider>
      </ThemeProvider>
      </BottomSheetModalProvider>
    </AuthProvider>
  );
}
