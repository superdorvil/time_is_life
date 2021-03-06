import React from 'react';
import {View, Text} from 'react-native';
import {COLORS} from '_resources';
import {Icon} from '_components';
import {ICONS} from '_constants';

const SelectedTabBarIcon = ({name}) => {
  let displayName = (name == ICONS.checkmark) ? 'todo' : name;
  displayName = (name == ICONS.projects) ? 'projects' : displayName;

  return (
    <View style={containerStyle()}>
      <Text style={textStyle()}>{displayName}</Text>
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
  return {color: COLORS.primary[global.colorScheme]};
};

const textStyle = () => {
  return {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary[global.colorScheme],
  };
};

export default SelectedTabBarIcon;
