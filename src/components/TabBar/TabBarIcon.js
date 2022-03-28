import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {COLORS} from '_resources';
import {Icon} from '_components';
import SelectedTabBarIcon from './SelectedTabBarIcon';

const TabBarIcon = ({name, selectedName, onPress}) => {
  if (name === selectedName) {
    return <SelectedTabBarIcon name={name} />;
  }

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle()}>
      <Text style={textStyle()}>{name}</Text>
      <Icon name={name} size={22} style={iconStyle()} />
    </TouchableOpacity>
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
  return {color: COLORS.tertiary[global.colorScheme]};
};

const textStyle = () => {
  return {color: COLORS.tertiary[global.colorScheme]};
};

export default TabBarIcon;
