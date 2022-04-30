import React from 'react';
import {View, Text} from 'react-native';
import EditHours from './EditHours';
import EditItem from './EditItem';
import {DateUtils, HoursUtils} from '_utils';
import {ICONS, UTILS} from '_constants';
import {COLORS} from '_resources';


const EditHoursWorked = ({
  startTime,
  endTime,
  startTimePressed,
  endTimePressed,
  startDatePressed,
  endDatePressed,
  project,
  projectPressed,
  task,
  taskPressed,
  editButtonPressed,
  editButtonDescription,
}) => {
  const timeWorked = HoursUtils.convertSecondsToHrsMinsSecs({
    totalSeconds: (endTime - startTime) / 1000,
    doubleDigitMinutes: true,
  });

  return (
    <View style={containerStyle()}>
      <EditItem
        itemDescription="Edit Project"
        item={project}
        itemPressed={projectPressed}
      />
      <EditItem
        itemDescription="Edit Task"
        item={task}
        itemPressed={taskPressed}
      />
      <EditHours
        startTime={startTime}
        endTime={endTime}
        startTimePressed={startTimePressed}
        endTimePressed={endTimePressed}
        startDatePressed={startDatePressed}
        endDatePressed={endDatePressed}
      />
      <Text style={hoursWorkedStyle()}>
        {timeWorked.hours} hrs : {timeWorked.minutes} mins : {timeWorked.seconds} secs
      </Text>
    </View>
  );
};

const containerStyle = () => {
  return {};
};

const hoursWorkedStyle = () => {
  return {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 16,
    color: COLORS.primary[global.colorScheme],
  };
};

export default EditHoursWorked;
