import React from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import {HoursUtils, DateUtils} from '_utils';
import {Utils} from '_constants';
import {Colors} from '_resources';

const WeeklyGoal = ({
  thisWeeksSecondsWorked,
  thisWeeksSecondsGoal,
  updateWeeklyGoal,
  updateWeeklyGoalSlider,
  weekIndex,
}) => {
  const thisWeeksHoursWorked = HoursUtils.convertSecondsToHrs({
    totalSeconds: thisWeeksSecondsWorked,
    decimalMinutes: true,
  });
  const thisWeeksHoursGoal = HoursUtils.convertSecondsToHrs({
    totalSeconds: thisWeeksSecondsGoal,
  });
  const progress =
    thisWeeksHoursGoal > 0
      ? Math.round((thisWeeksSecondsWorked / thisWeeksSecondsGoal) * 100)
      : 0;
  const sunday = DateUtils.convertDateToString({
    date: DateUtils.getDateFromWeekIndex({weekIndex: weekIndex, weekday: 0}),
    format: Utils.dateFormat.monDateYear,
  });
  const saturday = DateUtils.convertDateToString({
    date: DateUtils.getDateFromWeekIndex({weekIndex, weekday: 6}),
    format: Utils.dateFormat.monDateYear,
  });

  return (
    <View style={containerStyle()}>
      <View style={innerContainerStyle()}>
        <Text style={textStyle()}>{sunday + ' - ' + saturday + ': '}</Text>
        <Text style={hoursStyle()}>{thisWeeksHoursWorked} h</Text>
        <View style={alignEndStyle()}>
          <View style={percentContainerStyle()}>
            <Text style={percentStyle()}>{progress} %</Text>
          </View>
        </View>
      </View>
      <View style={innerContainerStyle()}>
        <Text style={textStyle()}>Goal for the week</Text>
        <View style={alignEndStyle()}>
          <Text style={hoursStyle()}>{thisWeeksHoursGoal} h</Text>
        </View>
      </View>
      <View style={sliderContainerStyle()}>
        <Slider
          style={sliderStyle()}
          minimumValue={0}
          maximumValue={100}
          value={thisWeeksHoursGoal}
          minimumTrackTintColor={Colors.secondary[global.colorScheme]}
          maximumTrackTintColor={Colors.secondary[global.colorScheme]}
          onSlidingComplete={updateWeeklyGoal}
          onValueChange={updateWeeklyGoalSlider}
        />
      </View>
    </View>
  );
};

const containerStyle = () => {
  return {};
};

const innerContainerStyle = () => {
  return {
    flexDirection: 'row',
    alignItems: 'center',
  };
};

const sliderStyle = () => {
  return {flex: 1};
};

const sliderContainerStyle = () => {
  return {
    borderRadius: 15,
    borderWidth: 1,
    flex: 1,
    height: 20,
    marginTop: 8,
    borderColor: Colors.primary[global.colorScheme],
    backgroundColor: Colors.tertiary[global.colorScheme],
  };
};

const textStyle = () => {
  return {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.tertiary[global.colorScheme],
  };
};

const hoursStyle = () => {
  return {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary[global.colorScheme],
  };
};

const percentContainerStyle = () => {
  return {
    height: 50,
    width: 50,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary[global.colorScheme],
  };
};

const percentStyle = () => {
  return {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary[global.colorScheme],
  };
};

const alignEndStyle = () => {
  return {
    flex: 1,
    alignItems: 'flex-end',
  };
};

export default WeeklyGoal;
