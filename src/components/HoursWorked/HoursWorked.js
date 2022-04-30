import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  EditTimeButton,
  TotalHours,
  ViewVisibleWrapper,
  Divider
} from '_components';
import {DateUtils, HoursUtils} from '_utils';
import {ICONS, UTILS} from '_constants';
import {COLORS} from '_resources';

const HoursWorked = ({
  realm,
  date,
  projectID,
  secondsWorkedList,
  editStartTime,
  editEndTime,
  editHoursPressed
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
      format: UTILS.dateFormat.monthDateYear,
    });
  }
  let totalSeconds = 0;
  const startEndTimeButtons = [];

  secondsWorkedList.forEach((secondsWorked, i) => {
    startEndTimeButtons.push(
      <TouchableOpacity
        key={i}
        onPress={() => editHoursPressed(realm, secondsWorked.id, projectID)}>
        <ViewVisibleWrapper active={i == 0}>
          <Divider primary={true} />
        </ViewVisibleWrapper>
        <Text style={editStyle()}>tap to edit hours</Text>
        <View style={startEndTimeButtonsContainerStyle()}>
          <TotalHours
            totalSecondsWorked={(secondsWorked.endTime - secondsWorked.startTime) / 1000}
          />
          <View style={endTimeContainerStyle()}>
            <EditTimeButton
              editDescription='Start Time'
              time={HoursUtils.dateToTimeAMPM({date: secondsWorked.startTime})}
              icon={ICONS.clock}
              disabled={true}
            />
          </View>
          <View style={spacingStyle()} />
          <View style={endTimeContainerStyle()}>
            <EditTimeButton
              editDescription='End Time'
              time={HoursUtils.dateToTimeAMPM({date: secondsWorked.endTime})}
              icon={ICONS.clock}
              disabled={true}
            />
          </View>
        </View>
        <ViewVisibleWrapper style={taskContainerStyle()} active={secondsWorked.task}>
          <Text style={taskStyle(true)}>Task</Text>
          <Text style={taskStyle()}>
            {secondsWorked.task}
          </Text>
        </ViewVisibleWrapper>
        <ViewVisibleWrapper active={i != secondsWorkedList.length - 1}>
          <Divider primary={true} />
        </ViewVisibleWrapper>
      </TouchableOpacity>
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
  return {justifyContent: 'center'};
};

const innerContainerStyle = () => {
  return {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.primary[global.colorScheme],
    borderRadius: 12,
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 8,
    paddingBottom: 8,
  };
};

const dateStyle = () => {
  return {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary[global.colorScheme],
  };
};

const hoursStyle = () => {
  return {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary[global.colorScheme],
    flex: 1,
    textAlign: 'right',
  };
};

const startEndTimeButtonsContainerStyle = () => {
  return {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
  };
};

const endTimeContainerStyle = () => {
  return {flex: 1};
};

const dataContainerStyle = () => {
  return {flexDirection: 'row'};
};

const spacingStyle = () => {
  return {padding: 8};
};

const taskStyle = (bold) => {
  return {
    fontSize: 14,
    fontWeight: bold ? 'bold' : 'normal',
    color: bold ? '#000000' : COLORS.primary[global.colorScheme],
    alignSelf: 'center',
  };
};

const taskContainerStyle = () => {
  return {
    borderWidth: 1,
    borderColor: COLORS.primary[global.colorScheme],
    borderRadius: 8,
    padding: 4,
  };
}

const editStyle = () => {
  return {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.secondary[global.colorScheme],
    backgroundColor: COLORS.primary[global.colorScheme],
    alignSelf: 'center',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 6,
    marginBottom: 6,
  };
};

export default HoursWorked;
