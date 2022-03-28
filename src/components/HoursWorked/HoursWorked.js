import React from 'react';
import {View, Text} from 'react-native';
import {EditHours} from '_components';
import EditTask from './EditTask';
import {DateUtils, HoursUtils} from '_utils';
import {Utils} from '_constants';
import {Colors} from '_resources';

const HoursWorked = ({
  date,
  secondsWorkedList,
  editStartTime,
  editStartDate,
  editEndTime,
  editEndDate,
  task,
  editTask,
}) => {
  const today = new Date();
  let yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  let dayOfWeekText = '';
  let dateText = '';
  if (DateUtils.isDateEqual({date1: date, date2: today})) {
    dayOfWeekText = 'Today';
    dateText = '';
  } else if (DateUtils.isDateEqual({date1: date, date2: yesterday})) {
    dayOfWeekText = 'Yesterday';
    dateText = '';
  } else {
    dateText = DateUtils.convertDateToString({
      date,
      format: Utils.dateFormat.monthDateYear,
    });
  }
  let totalSeconds = 0;
  const startEndTimeButtons = [];

  secondsWorkedList.forEach((secondsWorked, i) => {
    startEndTimeButtons.push(
      <View style={startEndTimeButtonsContainerStyle()} key={i}>
        <EditHours
          startTime={secondsWorked.startTime}
          startDate={secondsWorked.startTime}
          endTime={secondsWorked.endTime}
          endDate={secondsWorked.endTime}
          startTimePressed={() => editStartTime(secondsWorked.id)}
          startDatePressed={() => editStartDate(secondsWorked.id)}
          endTimePressed={() => editEndTime(secondsWorked.id)}
          endDatePressed={() => editEndDate(secondsWorked.id)}
        />
        <EditTask
          task={secondsWorked.task}
          taskPressed={() => editTask(secondsWorked.id)}
        />
      </View>,
    );
    totalSeconds =
      totalSeconds + (secondsWorked.endTime - secondsWorked.startTime);
  });
  const totalHours = HoursUtils.convertSecondsToHrs({
    totalSeconds: totalSeconds / 1000,
    decimalMinutes: true,
  });

  return (
    <View style={containerStyle()}>
      <View style={innerContainerStyle()}>
        <Text style={dateStyle()}>
          Total Hours {dayOfWeekText}
          {dateText}:
        </Text>
        <Text style={hoursStyle()}>{totalHours} h</Text>
      </View>
      {startEndTimeButtons}
    </View>
  );
};

const containerStyle = () => {
  return {};
};

const innerContainerStyle = () => {
  return {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingBottom: 8,
  };
};

const dateStyle = () => {
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
    flex: 1,
    textAlign: 'right',
  };
};

const startEndTimeButtonsContainerStyle = () => {
  return {marginBottom: 8};
};

export default HoursWorked;
