import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Time from './Time';
import {Colors} from '_resources';
import {HoursUtils} from '_utils';

const ProjectClock = ({secondsWorked}) => {
  const timeWorked = HoursUtils.convertSecondsToHrsMinsSecs({
    totalSeconds: secondsWorked,
    doubleDigitHours: true,
    doubleDigitMinutes: true,
    doubleDigitSeconds: true,
  });

  return (
    <View style={containerStyle()}>
      <View style={circleStyle()}>
        <View style={timeContainerStyle()}>
          <Time time={timeWorked.hours} unit="h" />
          <Text style={colonStyle()}> : </Text>
          <Time time={timeWorked.minutes} unit="m" />
          <Text style={colonStyle()}> : </Text>
          <Time time={timeWorked.seconds} unit="s" />
        </View>
        <Text style={hoursTodayStyle()}>Hours Today</Text>
      </View>
    </View>
  );
};

const containerStyle = () => {
  return {justifyContent: 'center'};
};

const circleStyle = () => {
  return {
    borderColor: Colors.primary[global.colorScheme],
    borderWidth: 1,
    width: Dimensions.get('window').width * 0.75,
    height: Dimensions.get('window').width * 0.75,
    borderRadius: Dimensions.get('window').width * 0.75,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  };
};

const hoursTodayStyle = () => {
  return {
    fontSize: 16,
    color: Colors.primary[global.colorScheme],
    paddingTop: 8,
  };
};

const colonStyle = () => {
  return {
    fontSize: 32,
    color: Colors.primary[global.colorScheme],
  };
};

const timeContainerStyle = () => {
  return {flexDirection: 'row'};
};

export default ProjectClock;
