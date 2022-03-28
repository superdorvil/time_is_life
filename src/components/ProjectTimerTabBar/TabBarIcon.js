import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Colors} from '_resources';
import {Icon} from '_components';

const TabBarIcon = ({description, iconName, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle()}>
      <Text style={textStyle()}>{description}</Text>
      <Icon name={iconName} size={32} style={iconStyle()} />
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    alignItems: 'center',
    flex: 1,
    paddingBottom: 16,
  };
};

const iconStyle = () => {
  return {color: Colors.primary[global.colorScheme]};
};

const textStyle = () => {
  return {
    color: Colors.primary[global.colorScheme],
    paddingBottom: 8,
  };
};

export default TabBarIcon;
