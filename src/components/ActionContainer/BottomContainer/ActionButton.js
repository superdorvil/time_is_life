import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Colors} from '_resources';
import {Icons} from '_constants';
import {Icon} from '_components';

const ActionButton = ({actionButtonDescription, actionButtonPressed}) => {
  return (
    <View style={containerStyle()}>
      <Text style={actionTextStyle()}>{actionButtonDescription}</Text>
      <View style={outerButtonContainerStyle()}>
        <TouchableOpacity
          style={buttonContainerStyle()}
          onPress={actionButtonPressed}>
          <Icon name={Icons.plus} size={16} style={plusStyle()} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const containerStyle = () => {
  return {flexDirection: 'row'};
};

const outerButtonContainerStyle = () => {
  return {
    flex: 1,
    alignItems: 'flex-end',
  };
};

const buttonContainerStyle = () => {
  return {
    height: 48,
    width: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary[global.colorScheme],
  };
};

const plusStyle = () => {
  return {color: Colors.tertiary[global.colorScheme]};
};

const actionTextStyle = () => {
  return {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    color: Colors.tertiary[global.colorScheme],
  };
};

export default ActionButton;
