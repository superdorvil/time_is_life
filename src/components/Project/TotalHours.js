import React from 'react';
import {View, Text} from 'react-native';
import {HoursUtils} from '_utils';
import {Colors} from '_resources';

const TotalHours = ({totalSecondsWorked}) => {
  let totalHours = HoursUtils.convertSecondsToHrs({
    totalSeconds: totalSecondsWorked,
    decimalMinutes: true,
  });

  if (totalHours > 999) {
    totalHours = HoursUtils.convertSecondsToHrs({
      totalSeconds: totalSecondsWorked,
      decimalMinutes: false,
    });
  }

  return (
    <View style={containerStyle()}>
      <View style={totalHoursContainerStyle()}>
        <Text style={totalHoursStyle()}>{totalHours} h</Text>
      </View>
      <Text style={totalHoursTextStyle()}>total hrs</Text>
    </View>
  );
};

const containerStyle = () => {
  return {marginEnd: 16};
};

const totalHoursStyle = () => {
  return {
    color: Colors.primary[global.colorScheme],
    fontWeight: 'bold',
    fontSize: 12,
  };
};

const totalHoursTextStyle = () => {
  return {color: Colors.tertiary[global.colorScheme]};
};

const totalHoursContainerStyle = () => {
  return {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: Colors.primary[global.colorScheme],
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  };
};

export default TotalHours;
