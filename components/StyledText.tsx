import React from 'react';
import { Text, TextProps , } from './Themed';


export function MediumText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins_500Medium' }]} />;
}
export function RegularText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins_400Regular' }]} />;
}
export function SemiboldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins_600SemiBold' }]} />;
}
export function BoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins_700Bold' }]} />;
}
export function ExtraLightText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins_200ExtraLight' }]} />;
}
export function LightText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins_300Light' }]} />;
}
export function ThinText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins_100Thin' }]} />;
}
export function ExtraBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: ' Poppins_800ExtraBold' }]} />;
}

