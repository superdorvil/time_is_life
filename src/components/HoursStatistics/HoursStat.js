import React from 'react';
import {View, Text} from 'react-native';
import {Divider} from '_components';
import {Colors} from '_resources';

const HoursStat = ({statistic, hours}) => {
  return (
    <View>
      <View style={containerStyle()}>
        <Text style={statisticStyle()}>{statistic}</Text>
        <View style={hoursContainerStyle()}>
          <Text style={hoursStyle()}>{hours} h</Text>
        </View>
      </View>
      <Divider />
    </View>
  );
};

const containerStyle = () => {
  return {
    flexDirection: 'row',
    marginStart: 32,
    marginEnd: 32,
    alignItems: 'center',
  };
};

const statisticStyle = () => {
  return {
    fontSize: 12,
    color: Colors.tertiary[global.colorScheme],
    fontWeight: 'bold',
  };
};

const hoursStyle = () => {
  return {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary[global.colorScheme],
  };
};

const hoursContainerStyle = () => {
  return {
    flex: 1,
    alignItems: 'flex-end',
  };
};

export default HoursStat;
