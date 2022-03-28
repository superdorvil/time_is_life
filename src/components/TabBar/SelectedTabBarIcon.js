import React from 'react';
import {View, Text} from 'react-native';
import {Colors} from '_resources';
import {Icon} from '_components';

const SelectedTabBarIcon = ({name}) => {
  return (
    <View style={containerStyle()}>
      <Text style={textStyle()}>{name}</Text>
      <Icon name={name} size={30} style={iconStyle()} />
    </View>
  );
};

const containerStyle = () => {
  return {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
  };
};

const iconStyle = () => {
  return {color: Colors.primary[global.colorScheme]};
};

const textStyle = () => {
  return {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary[global.colorScheme],
  };
};

export default SelectedTabBarIcon;
