import React from 'react';
import {View} from 'react-native';
import {EditItemButton} from '_components';
import {DateUtils, HoursUtils} from '_utils';
import {ICONS, UTILS} from '_constants';

const EditHours = ({
  startTime,
  endTime,
  startTimePressed,
  endTimePressed,
  startDatePressed,
  endDatePressed,
}) => {
  return (
    <View style={containerStyle()}>
      <View style={topContainerStyle()}>
        <View style={endTimeContainerStyle()}>
          <EditItemButton
            header="Edit Start Time"
            description={HoursUtils.dateToTimeAMPM({date: startTime})}
            icon={ICONS.clock}
            editPressed={startTimePressed}
          />
        </View>
        <View style={spacingStyle()} />
        <View style={endTimeContainerStyle()}>
          <EditItemButton
            header="Edit Start Date"
            description={DateUtils.convertDateToString({
              date: startTime,
              format: UTILS.dateFormat.monthDateYear,
            })}
            icon={ICONS.calendar}
            editPressed={startDatePressed}
          />
        </View>
      </View>
      <View style={bottomContainerStyle()}>
        <View style={endTimeContainerStyle()}>
          <EditItemButton
            header="Edit End Time"
            description={HoursUtils.dateToTimeAMPM({date: endTime})}
            icon={ICONS.clock}
            editPressed={endTimePressed}
          />
        </View>
        <View style={spacingStyle()} />
        <View style={endTimeContainerStyle()}>
          <EditItemButton
            header="Edit End Date"
            description={DateUtils.convertDateToString({
              date: endTime,
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
