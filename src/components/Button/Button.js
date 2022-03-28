import React from 'react';
import {Text, TouchableOpacity, Dimensions} from 'react-native';
import {COLORS} from '_resources';

const Button = ({description, buttonPressed}) => {
  return (
    <TouchableOpacity style={containerStyle()} onPress={buttonPressed}>
      <Text style={descriptionStyle()}>{description}</Text>
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 16,
    width: Dimensions.get('window').width - 32,
    backgroundColor: COLORS.primary[global.colorScheme],
  };
};

const descriptionStyle = () => {
  return {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.secondary[global.colorScheme],
  };
};

export default Button;
