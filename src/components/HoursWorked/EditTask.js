import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {COLORS} from '_resources';

const EditTask = ({task, taskPressed}) => {
  return (
    <TouchableOpacity style={containerStyle()} onPress={taskPressed}>
      <Text style={taskStyle()}>{task ? task : '+ add task'}</Text>
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    marginTop: 8,
    marginBottom: 8,
    padding: 12,
    borderColor: COLORS.primary[global.colorScheme],
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
  };
};

const taskStyle = () => {
  return {
    fontSize: 16,
    color: COLORS.tertiary[global.colorScheme],
  };
};

export default EditTask;
