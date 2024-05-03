import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
  responsiveFontSize as rf,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import { GlobalCSS } from '@/constants/GlobalCSS';
import { RegularText } from '@/components/StyledText';

// Define prop types
interface ButtonProps {
  name: string;
  link: () => void; // Adjust the type based on the actual type of link
}

const Button: React.FC<ButtonProps> = ({ name, link }) => {
  return (
    <View style={[styles.Viewstyle, { paddingVertical: rw(6), gap: rw(8) }]}>
      <Pressable onPress={link} style={GlobalCSS.buttoncss}>
        <RegularText style={{ textAlign: 'center', fontSize: rf(2) }}>
          {name}
        </RegularText>
      </Pressable>
    </View>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  Viewstyle: {
    paddingHorizontal: rw(5),
    padding: 10,
  },
});

export default Button;
