import React from 'react';
import {View, Text} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import {HoursUtils} from '_utils';
import {Colors} from '_resources';

const HoursProgressBar = ({
  secondsWorked,
  goalSeconds,
  weeklyHoursFontSizeBig,
}) => {
  const progress = goalSeconds > 0 ? secondsWorked / goalSeconds : 0;
  const hoursWorked = HoursUtils.convertSecondsToHrs({
    totalSeconds: secondsWorked,
    decimalMinutes: true,
  });
  const hoursGoal = HoursUtils.convertSecondsToHrs({
    totalSeconds: goalSeconds,
  });
  const weeklyHours = weeklyHoursFontSizeBig ? (
    <Text style={weeklyHours16Style()}>This Weeks Hours</Text>
  ) : (
    <Text style={weeklyHours12Style()}>This Weeks Hours</Text>
  );

  return (
    <View style={containerStyle()}>
      <View style={weeklyHoursContainerStyle()}>
        {weeklyHours}
        <View style={hoursWorkedContainerStyle()}>
          <Text style={hoursWorkedStyle()}>{hoursWorked} h</Text>
          <Text style={hoursGoalStyle()}>
            {'  /  '}
            {hoursGoal} h
          </Text>
        </View>
      </View>
      <View style={progressBarStyle()}>
        <ProgressBar
          animated
          progress={progress}
          color={Colors.primary[global.colorScheme]}
          unfilledColor={Colors.tertiary[global.colorScheme]}
          borderWidth={1}
          height={6}
          width={null}
          borderTopLeftRadius={4}
          borderTopRightRadius={4}
          borderBottomLeftRadius={4}
          borderBottomRightRadius={4}
        />
      </View>
    </View>
  );
};

const containerStyle = () => {
  return {};
};

const weeklyHoursContainerStyle = () => {
  return {flexDirection: 'row'};
};

const hoursWorkedContainerStyle = () => {
  return {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
  };
};

const weeklyHours12Style = () => {
  return {
    fontSize: 12,
    color: Colors.tertiary[global.colorScheme],
  };
};

const weeklyHours16Style = () => {
  return {
    fontSize: 16,
    color: Colors.tertiary[global.colorScheme],
  };
};

const hoursWorkedStyle = () => {
  return {
    fontSize: 16,
    color: Colors.primary[global.colorScheme],
    alignSelf: 'flex-end',
    fontWeight: 'bold',
  };
};

const hoursGoalStyle = () => {
  return {
    fontSize: 12,
    color: Colors.tertiary[global.colorScheme],
    alignSelf: 'flex-end',
  };
};

const progressBarStyle = () => {
  return {paddingTop: 12};
};

export default HoursProgressBar;
