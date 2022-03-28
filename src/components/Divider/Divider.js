import React from 'react';
import {View} from 'react-native';
import {Colors} from '_resources';

const Divider = ({}) => {
  return <View style={containerStyle()} />;
};

const containerStyle = () => {
  return {
    width: '90%',
    height: 1,
    backgroundColor: Colors.tertiary[global.colorScheme],
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
  };
};

export default Divider;
