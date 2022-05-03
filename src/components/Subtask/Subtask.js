import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Completion} from '_components';
import {COLORS} from '_resources';

const Subtask = ({description, completed, edit, deleteSubtask, completeSubtask}) => {
  if (edit) {
    return (
      <View style={containerStyle()}>
        <TouchableOpacity onPress={deleteSubtask}>
          <Text style={deleteStyle()}>
            Delete
          </Text>
        </TouchableOpacity>
        <Text style={descriptionStyle()}>{description}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={containerStyle()} onPress={completeSubtask}>
      <Completion completed={completed} subtask />
      <Text style={descriptionStyle(completed)}>{description}</Text>
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    flexDirection: 'row',
    paddingStart: 24,
    paddingEnd: 24,
    alignItems: 'center',
  };
};

const descriptionStyle = completed => {
  if (completed) {
    return {
      fontWeight: 'bold',
      fontSize: 16,
      textDecorationLine: 'line-through',
      color: COLORS.tertiary[global.colorScheme],
    };
  } else {
    return {
      fontWeight: 'bold',
      fontSize: 16,
      color: COLORS.tertiary[global.colorScheme],
    };
  }
};

const deleteStyle  = () => {
  return {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.secondary[global.colorScheme],
    backgroundColor: COLORS.primary[global.colorScheme],
    padding: 8,
    marginEnd: 16,
    borderRadius: 8,
  };
};

export default Subtask;
