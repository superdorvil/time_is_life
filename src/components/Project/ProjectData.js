import React from 'react';
import {Text, View} from 'react-native';
import {HoursProgressBar} from '_components';
import {Colors} from '_resources';

const ProjectData = ({description, deleted, secondsWorked, goalSeconds}) => {
  return (
    <View style={containerStyle()}>
      <Text style={descriptionStyle(deleted)}>{description}</Text>
      <HoursProgressBar
        secondsWorked={secondsWorked}
        goalSeconds={goalSeconds}
      />
    </View>
  );
};

const containerStyle = () => {
  return {flex: 1};
};

const descriptionStyle = deleted => {
  return deleted
    ? {
        color: Colors.tertiary[global.colorScheme],
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 6,
        textDecorationLine: 'line-through',
      }
    : {
        color: Colors.tertiary[global.colorScheme],
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 6,
      };
};

export default ProjectData;
