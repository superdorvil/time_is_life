import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Colors} from '_resources';

const Task = ({task, selected, taskPressed}) => {
  return (
    <TouchableOpacity onPress={taskPressed} style={containerStyle()}>
      <Text style={taskStyle()}>{task}</Text>
      <View style={selected ? selectedStyle() : unselectedStyle()} />
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    backgroundColor: Colors.tertiary[global.colorScheme],
    flexDirection: 'row',
    alignItems: 'center',
  };
};

const taskStyle = () => {
  return {
    padding: 16,
    fontSize: 16,
    color: Colors.secondary[global.colorScheme],
    flex: 1,
  };
};

const selectedStyle = () => {
  return {
    borderRadius: 32,
    width: 32,
    height: 32,
    backgroundColor: Colors.primary[global.colorScheme],
    marginEnd: 16,
  };
};

const unselectedStyle = () => {
  return {
    borderRadius: 32,
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: Colors.primary[global.colorScheme],
    marginEnd: 16,
  };
};

export default Task;
