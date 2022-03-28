import React from 'react';
import {View} from 'react-native';
import {Icon} from '_components';
import {Icons} from '_constants';
import {Colors} from '_resources';

const Completion = ({completed}) => {
  if (completed) {
    return (
      <View style={checkmarkContainerStyle()}>
        <Icon size={32} style={checkmarkStyle()} name={Icons.checkmark} />
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
    borderColor: Colors.primary[global.colorScheme],
  };
};

const checkmarkContainerStyle = () => {
  return {marginEnd: 16};
};

const checkmarkStyle = () => {
  return {color: Colors.primary[global.colorScheme]};
};

export default Completion;
