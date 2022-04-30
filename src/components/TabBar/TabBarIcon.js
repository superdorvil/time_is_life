import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {COLORS} from '_resources';
import {Icon} from '_components';
import {ICONS} from '_constants';
import SelectedTabBarIcon from './SelectedTabBarIcon';

const TabBarIcon = ({name, selectedName, onPress}) => {
  if (name === selectedName) {
    return <SelectedTabBarIcon name={name} />;
  }

  let displayName = (name == ICONS.checkmark) ? 'todo' : name;
  displayName = (name == ICONS.projects) ? 'projects' : displayName;

  return (
    <TouchableOpacity onPress={onPress} style={containerStyle()}>
      <Text style={textStyle()}>{displayName}</Text>
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
