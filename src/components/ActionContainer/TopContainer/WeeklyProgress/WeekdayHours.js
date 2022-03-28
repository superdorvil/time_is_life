import React from 'react';
import {View, Text} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {COLORS} from '_resources';
import {DateUtils, HoursUtils} from '_utils';
import {UTILS} from '_constants';

const WeekdayHours = ({secondsWorked, weekday}) => {
  const hoursWorked = HoursUtils.convertSecondsToHrs({
    totalSeconds: secondsWorked,
    decimalMinutes: true,
  });
  const todayString = DateUtils.convertDayToString({
    date: new Date(),
    format: UTILS.weekdayFormat.abbreviation_capital,
  });
  let todayActive = false;
  if (weekday === todayString) {
    todayActive = true;
  }

  return (
    <View style={containerStyle()}>
      <Text style={textStyle(todayActive)}>{hoursWorked} h</Text>
      <View style={dividerStyle(todayActive)} />
      <Text style={textStyle(todayActive)}>{weekday}</Text>
      <ViewVisibleWrapper active={todayActive} style={todayHighlightStyle()} />
    </View>
  );
};

const containerStyle = () => {
  return {
    flex: 1,
    alignItems: 'center',
  };
};

const textStyle = todayActive => {
  if (todayActive) {
    return {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLORS.primary[global.colorScheme],
    };
  } else {
    return {
      fontSize: 12,
      fontWeight: 'bold',
      color: COLORS.tertiary[global.colorScheme],
    };
  }
};

const dividerStyle = todayActive => {
  if (todayActive) {
    return {
      width: 1,
      height: 12,
      backgroundColor: COLORS.primary[global.colorScheme],
    };
  } else {
    return {
      width: 1,
      height: 12,
      backgroundColor: COLORS.tertiary[global.colorScheme],
    };
  }
};

const todayHighlightStyle = () => {
  return {
    width: 28,
    height: 1,
    position: 'absolute',
    bottom: -2,
    backgroundColor: COLORS.primary[global.colorScheme],
  };
};

export default WeekdayHours;
