import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {ViewVisibleWrapper, TotalHours} from '_components';
import ProjectData from './ProjectData';
import {COLORS} from '_resources';

const Project = ({
  projectPressed,
  description,
  deleted,
  totalSecondsWorked,
  thisWeeksSecondsWorked,
  thisWeeksSecondsGoal,
  timerActive,
}) => {
  return (
    <TouchableOpacity onPress={projectPressed} style={containerStyle()}>
      <ViewVisibleWrapper active={timerActive}>
        <Text style={projectActiveStyle()}>Project Timer Active</Text>
      </ViewVisibleWrapper>
      <View style={innerContainerStyle()}>
        <TotalHours totalSecondsWorked={totalSecondsWorked} />
        <ProjectData
          deleted={deleted}
          description={description}
          secondsWorked={thisWeeksSecondsWorked}
          goalSeconds={thisWeeksSecondsGoal}
        />
      </View>
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    flexDirection: 'column',
    paddingTop: 16,
    paddingBottom: 16,
  };
};

const innerContainerStyle = () => {
  return {
    flexDirection: 'row'
  };
};

const projectActiveStyle = () => {
  return {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 8,
    color: COLORS.secondary[global.colorScheme],
    backgroundColor: COLORS.primary[global.colorScheme],
    alignSelf: 'baseline',
    padding: 4,
    borderRadius: 8,
    fontWeight: 'bold',
  };
};

export default Project;
