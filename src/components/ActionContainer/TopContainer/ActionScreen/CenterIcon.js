import React from 'react';
import {View} from 'react-native';
import {Icon} from '_components';
import {Icons} from '_constants';
import {Colors} from '_resources';

const centerIcon = ({centerIconName}) => {
  if (centerIconName === Icons.goals) {
    return (
      <View style={goalContainerStyle()}>
        <Icon size={60} name={centerIconName} style={goalIconStyle()} />
      </View>
    );
  } else {
    return (
      <View style={centerContainerStyle()}>
        <Icon size={70} name={centerIconName} style={centerIconStyle()} />
      </View>
    );
  }
};

const centerContainerStyle = () => {
  return {
    alignSelf: 'center',
    marginTop: 16,
  };
};

const goalContainerStyle = () => {
  return {
    width: 80,
    height: 80,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.primary[global.colorScheme],
  };
};

const goalIconStyle = () => {
  return {color: Colors.secondary[global.colorScheme]};
};

const centerIconStyle = () => {
  return {color: Colors.primary[global.colorScheme]};
};

export default centerIcon;
