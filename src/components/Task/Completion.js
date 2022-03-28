import React from 'react';
import {View} from 'react-native';
import {Icon} from '_components';
import {ICONS} from '_constants';
import {COLORS} from '_resources';

const Completion = ({completed}) => {
  if (completed) {
    return (
      <View style={checkmarkContainerStyle()}>
        <Icon size={32} style={checkmarkStyle()} name={ICONS.checkmark} />
      </View>
    );
  } else {
    return <View style={containerStyle()} />;
  }
};

const containerStyle = () => {
  return {
    borderWidth: 2,
    height: 32,
    width: 32,
    borderRadius: 32,
    marginEnd: 16,
    borderColor: COLORS.primary[global.colorScheme],
  };
};

const checkmarkContainerStyle = () => {
  return {marginEnd: 16};
};

const checkmarkStyle = () => {
  return {color: COLORS.primary[global.colorScheme]};
};

export default Completion;
