import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Colors} from '_resources';

const ColorScheme = ({active, colorPressed, color1, color2, color3}) => {
  return (
    <TouchableOpacity style={containerStyle()} onPress={colorPressed}>
      <View style={[colorSchemeStyle(), {backgroundColor: color1}]} />
      <View style={[colorSchemeStyle(), {backgroundColor: color2}]} />
      <View style={[colorSchemeStyle(), {backgroundColor: color3}]} />
      <CheckBox
        value={active}
        tintColors={Colors.primary[global.colorScheme]}
        disabled
      />
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

const colorSchemeStyle = () => {
  return {
    width: 80,
    height: 60,
    borderWidth: 6,
    borderRadius: 10,
    borderColor: Colors.colorSchemeModal[global.colorScheme],
  };
};

export default ColorScheme;
