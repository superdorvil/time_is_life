import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {COLORS} from '_resources';
import {Icon} from '_components';

const SwipeButton = ({displayName, iconName, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle()}>
      <Icon name={iconName} size={20} style={iconStyle()} />
      <Text style={textStyle()}>{displayName}</Text>
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.primary[global.colorScheme],
    borderRadius: 8,
    marginStart: 2,
    marginEnd: 2,
  };
};

const iconStyle = () => {
  return {color: COLORS.primary[global.colorScheme]};
};

const textStyle = () => {
  return {
    marginTop: 4,
    fontSize: 8,
    color: COLORS.primary[global.colorScheme],
  };
};

export default SwipeButton;
