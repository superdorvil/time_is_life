import React from 'react';
import {View, Text} from 'react-native';
import {COLORS} from '_resources';

const Time = ({time, unit}) => {
  return (
    <View style={containerStyle()}>
      <Text style={timeStyle()}>{time}</Text>
      <Text style={unitStyle()}>{unit}</Text>
    </View>
  );
};

const containerStyle = () => {
  return {
    flexDirection: 'row',
    alignItems: 'flex-end',
  };
};

const timeStyle = () => {
  return {
    fontSize: 40,
    color: COLORS.primary[global.colorScheme],
  };
};

const unitStyle = () => {
  return {
    fontSize: 16,
    color: COLORS.primary[global.colorScheme],
    justifyContent: 'flex-end',
  };
};

export default Time;
