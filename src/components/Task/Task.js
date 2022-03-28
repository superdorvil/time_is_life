import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';
import Completion from './Completion';

const Task = ({description, completed, taskPressed, hoursWorked}) => {
  return (
    <TouchableOpacity style={containerStyle()} onPress={taskPressed}>
      <Completion completed={completed} />
      <View>
        <Text style={descriptionStyle(completed)}>{description}</Text>
        <ViewVisibleWrapper active={hoursWorked > 0 ? true : false}>
          <Text style={hoursWorkedStyle()}>{hoursWorked} hours worked</Text>
        </ViewVisibleWrapper>
      </View>
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    flexDirection: 'row',
    alignItems: 'center',
  };
};

const descriptionStyle = completed => {
  if (completed) {
    return {
      fontWeight: 'bold',
      fontSize: 16,
      textDecorationLine: 'line-through',
      color: Colors.tertiary[global.colorScheme],
    };
  } else {
    return {
      fontWeight: 'bold',
      fontSize: 16,
      color: Colors.tertiary[global.colorScheme],
    };
  }
};

const hoursWorkedStyle = () => {
  return {
    fontSize: 12,
    color: Colors.tertiary[global.colorScheme],
  };
};

export default Task;
