import React from 'react';
import {View} from 'react-native';
import EditTimeButton from './EditTimeButton';
import {DateUtils, HoursUtils} from '_utils';
import {ICONS, UTILS} from '_constants';

const EditHours = ({
  startTime,
  startDate,
  endTime,
  endDate,
  startTimePressed,
  endTimePressed,
  startDatePressed,
  endDatePressed,
}) => {
  return (
    <View style={containerStyle()}>
      <View style={topContainerStyle()}>
        <View style={endTimeContainerStyle()}>
          <EditTimeButton
            editDescription="Start Time"
            time={HoursUtils.dateToTimeAMPM({date: startTime})}
            icon={ICONS.clock}
            editPressed={startTimePressed}
          />
        </View>
        <View style={spacingStyle()} />
        <View style={endTimeContainerStyle()}>
          <EditTimeButton
            editDescription="Start Date"
            time={DateUtils.convertDateToString({
              date: startDate,
              format: UTILS.dateFormat.monthDateYear,
            })}
            icon={ICONS.calendar}
            editPressed={startDatePressed}
          />
        </View>
      </View>
      <View style={bottomContainerStyle()}>
        <View style={endTimeContainerStyle()}>
          <EditTimeButton
            editDescription="End Time"
            time={HoursUtils.dateToTimeAMPM({date: endTime})}
            icon={ICONS.clock}
            editPressed={endTimePressed}
          />
        </View>
        <View style={spacingStyle()} />
        <View style={endTimeContainerStyle()}>
          <EditTimeButton
            editDescription="End Date"
            time={DateUtils.convertDateToString({
              date: endDate,
              format: UTILS.dateFormat.monthDateYear,
            })}
            icon={ICONS.calendar}
            editPressed={endDatePressed}
          />
        </View>
      </View>
    </View>
  );
};

const containerStyle = () => {
  return {};
};

const topContainerStyle = () => {
  return {flexDirection: 'row'};
};

const bottomContainerStyle = () => {
  return {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
  };
};

const spacingStyle = () => {
  return {padding: 16};
};

const endTimeContainerStyle = () => {
  return {flex: 1};
};

export default EditHours;
