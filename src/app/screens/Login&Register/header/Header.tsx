import React, { FC } from 'react';
import { View, GestureResponderEvent } from 'react-native';
import { responsiveWidth as rw } from 'react-native-responsive-dimensions';
import { GlobalCSS } from '@/constants/GlobalCSS';
import { Icon } from '@/components/Themed';
import { SemiboldText } from '@/components/StyledText';

interface HeaderProps {
  headerTitle: string;
  onIconPress: (event: GestureResponderEvent) => void;
}

const Header: FC<HeaderProps> = ({ headerTitle, onIconPress }) => {
  return (
    <View style={GlobalCSS.Headercss}>
      <Icon
        type="AntIcons" // Ensure this is a valid key in your Icons object
        onPress={onIconPress}
        size={30}
        name="arrowleft" // Ensure this icon name exists in your Icons object
        style={{ position: "absolute", left: rw(3), paddingTop: rw(10) }}
      />
      <SemiboldText style={{ fontSize: 20, lineHeight: 30, textAlign: "center" }}>
        {headerTitle}
      </SemiboldText>
    </View>
  );
};

export default Header;