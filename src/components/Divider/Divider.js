import React from 'react';
import {View} from 'react-native';
import {COLORS} from '_resources';

const Divider = ({primary}) => {
  return <View style={containerStyle(primary)} />;
};

const containerStyle = (primary) => {
  return {
    width: '90%',
    height: 1,
    backgroundColor: primary ?
      COLORS.primary[global.colorScheme] :
      COLORS.tertiary[global.colorScheme],
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
  };
};

export default Divider;
