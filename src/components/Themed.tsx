import { Text as DefaultText, useColorScheme, View as DefaultView, TextInput as DefaultTextInput } from 'react-native';
import Icons from '@/assets/icons';
import PhoneInput from "react-native-phone-number-input";
import { GestureResponderEvent, ViewStyle } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props']; 
export type ViewProps = ThemeProps & DefaultView['props'];
//export type IconProps = ThemeProps & { type: keyof typeof Icons }; 
export type PhoneProps = ThemeProps & PhoneInput['props'];

export type IconProps = ThemeProps & {
  type: keyof typeof Icons | string;
  style?: ViewStyle;
  name: string;  // Name of the icon
  size?: number; // Size of the icon
  onPress?: (event: GestureResponderEvent) => void;
  testID?: string;
};

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  return props[theme] ?? Colors[theme][colorName];
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function TextInput(props: TextInputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');
  return <DefaultTextInput style={[{ color, borderColor }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Icon(props: IconProps) {
  const { type, style, lightColor, darkColor, name, size, ...otherProps } = props;
  const iconColor = useThemeColor({ light: lightColor, dark: darkColor }, 'Iconcolor');
  
  const IconComponent = Icons[type];
  if (!IconComponent) {
    console.warn(`Icon type "${type}" not found`);
    return null;
  }

  return <IconComponent style={[{ color: iconColor }, style]} name={name} size={size} {...otherProps} />;
}

export function Phone(props: PhoneProps) {
  const { textContainerStyle, textInputStyle, codeTextStyle, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return (
    <PhoneInput 
      textContainerStyle={[{ backgroundColor }, textContainerStyle]} 
      textInputStyle={[{ color }, textInputStyle]} 
      codeTextStyle={[{ color }, codeTextStyle]} 
      {...otherProps} 
    />
  );
}