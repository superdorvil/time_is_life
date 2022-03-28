import React from 'react';
import {View, Text} from 'react-native';
import {HoursProgressBar} from '_components';
import DailyHours from './DailyHours';
import {Colors} from '_resources';

const WeeklyProgress = ({
  thisWeeksGoalSeconds,
  thisWeeksSecondsWorked,
  weeklyHoursFontSizeBig,
  dailySecondsWorked,
}) => {
  return (
    <View style={containerStyle()}>
      <Text style={timeIsLifeTextStyle()}>Time Is Life</Text>
      <HoursProgressBar
        goalSeconds={thisWeeksGoalSeconds}
        secondsWorked={thisWeeksSecondsWorked}
        weeklyHoursFontSizeBig={weeklyHoursFontSizeBig}
      />
      <Text style={dailyHoursTextStyle()}>Daily Hours</Text>
      <DailyHours dailySecondsWorked={dailySecondsWorked} />
    </View>
  );
};

const containerStyle = () => {
  return {marginTop: 16};
};

const timeIsLifeTextStyle = () => {
  return {
    fontSize: 30,
    paddingBottom: 16,
    color: Colors.tertiary[global.colorScheme],
  };
};

const dailyHoursTextStyle = () => {
  return {
    fontSize: 16,
    textAlign: 'center',
    margin: 16,
    color: Colors.tertiary[global.colorScheme],
  };
};

export default WeeklyProgress;
