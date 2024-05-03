import React from 'react';
import {
  AntDesign as AntDesignIcon,
  MaterialCommunityIcons as MaterialCommunityIconsI,
  SimpleLineIcons as SimpleLineIconsI,
  Feather as FeatherI,
  Entypo as EntypoI,
  EvilIcons as EvilIconsI,
  Ionicons as IoniconsI,
  MaterialIcons as MaterialI,
  Octicons as OctIcons
} from '@expo/vector-icons';
import { ComponentProps, JSXElementConstructor } from 'react';
import { ViewStyle } from 'react-native'; 

/**  https://icons.expo.fyi/Index  this is link for the vector icons */
export const TickitIcon = require('./logo.png');


// Define a general type for icon component props with a constraint
//type IconProps<T extends JSXElementConstructor<any>> = ComponentProps<T>;
type IconProps<T extends JSXElementConstructor<any>> = ComponentProps<T> & {
    style?: ViewStyle;
    name: string;  // Name of the icon
    size?: number; // Size of the icon
  };

export const MaterialCommunityIcon = (props: IconProps<typeof MaterialCommunityIconsI>) => (
  <MaterialCommunityIconsI {...props} />
);

// ... similarly for other icons
export const SimpleLineIcon = (props: IconProps<typeof SimpleLineIconsI>) => <SimpleLineIconsI {...props} />;
export const FeatherIcon = (props: IconProps<typeof FeatherI>) => <FeatherI {...props} />;
export const EntypoIcon = (props: IconProps<typeof EntypoI>) => <EntypoI {...props} />;
export const EvilIcon = (props: IconProps<typeof EvilIconsI>) => <EvilIconsI {...props} />;
export const Ionicon = (props: IconProps<typeof IoniconsI>) => <IoniconsI {...props} />;
export const MaterialIcons = (props: IconProps<typeof MaterialI>) => <MaterialI {...props} />;
export const AntIcons = (props: IconProps<typeof AntDesignIcon>) => <AntDesignIcon {...props} />;
export const OctI  = (props: IconProps<typeof OctIcons >) => <OctIcons  {...props} />;

const Icons = {
  MaterialCommunityIcon,
  SimpleLineIcon,
  FeatherIcon,
  EntypoIcon,
  EvilIcon,
  Ionicon,
  MaterialIcons,
  TickitIcon,
  AntIcons,
  OctI,

};

export default Icons;
