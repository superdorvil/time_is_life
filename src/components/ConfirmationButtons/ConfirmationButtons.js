import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '_resources';

const ConfirmationButtons = ({okayPressed, cancelPressed}) => {
  return (
    <View style={containerStyle()}>
      <TouchableOpacity onPress={cancelPressed} style={buttonContainerStyle()}>
        <Text style={textStyle()}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={okayPressed} style={buttonContainerStyle()}>
        <Text style={textStyle()}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const containerStyle = () => {
  return {
    flexDirection: 'row',
    backgroundColor: Colors.tertiary[global.colorScheme],
    position: 'absolute',
    bottom: 0,
    right: 8,
  };
};

const buttonContainerStyle = () => {
  return {
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 16,
    paddingBottom: 24,
  };
};

const textStyle = () => {
  return {
    color: Colors.primary[global.colorScheme],
    fontWeight: 'bold',
    fontSize: 16,
  };
};

export default ConfirmationButtons;
