import { Tabs, usePathname } from "expo-router"
import Icons from "@/assets/icons"
import { View } from "@/components/Themed"
import { Image, Platform, useColorScheme } from "react-native"
import React from "react"
import { TripIcon , LogoIcon } from "@/assets/icons/customicons"
import Colors from "@/constants/Colors"
 const layout = () => {
  const colorScheme = useColorScheme();
  const paddingBottom = Platform.OS === 'ios' ? 18 : 10; 
    return(
        <Tabs screenOptions={{
            headerShown:false,
            tabBarStyle:{
                position:"absolute",
                bottom:0,
                right:0,
                left:0,
                height:74,
                elevation:0,
                paddingTop:10,
                paddingBottom: paddingBottom,
                backgroundColor: colorScheme === 'dark' ? 'black' : 'white', // Set background color based on color scheme
                zIndex:1,
            },
            tabBarActiveTintColor: Colors.Primary, // Set the active tab icon color
            tabBarInactiveTintColor: Colors.iconcolor, // Set the inactive tab icon color
          }}
           
          >
            <Tabs.Screen  name="Explore" 
            options={{
                tabBarIcon: ({ focused }: { focused: boolean }) => {
                    return (
                        <View>
                            <Icons.FeatherIcon name="compass" style={{ color: focused ? Colors.Primary : Colors.iconcolor }}  size={25} />
                        </View>
                    )
                  }
                }}
              />
            <Tabs.Screen name="Trips"
              options={{
                tabBarIcon: ({ focused }: { focused: boolean }) => {
                    return (
                      <Image source={TripIcon} style={{width:24, height:24,  tintColor: focused ? Colors.Primary : Colors.iconcolor}} />
                    )
                  }
                }}
              />
        <Tabs.Screen
    name="Ticklist"
    options={{
      tabBarStyle: {
        display: usePathname() === "Ticklist" ?  'flex' : 'none',
      }, 
        tabBarIcon: ({ focused }: { focused: boolean }) => {
            return (
              <Icons.AntIcons name="pluscircleo" style={{ color: focused ? Colors.Primary : "#fff", position:"absolute", paddingTop:13 }}  size={39} />
            )
        },
        tabBarLabel:'',
       
    }}
/>


             <Tabs.Screen name="Community"
             options={{         
                tabBarIcon: ({ focused }: { focused: boolean }) => {
                    return (
                      <Icons.OctI name="people" style={{ color: focused ? Colors.Primary : Colors.iconcolor }} size={25} />
                    )
                  }
                }}
             />
            <Tabs.Screen name="Profile"
             options={{
                tabBarIcon: ({ focused }: { focused: boolean }) => {
                    return (
                      <Icons.Ionicon name="person-circle-outline" style={{ color: focused ? Colors.Primary : Colors.iconcolor }} size={25} />
                    )
                  }
                }}
             />
        </Tabs>
    )
}

export default layout