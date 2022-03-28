import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {Icon} from '_components';
import {Colors} from '_resources';

const EditTimeButton = ({editDescription, time, icon, editPressed}) => {
  return (
    <View style={containerStyle()}>
      <Text style={editDescriptionStyle()}>{editDescription}</Text>
      <TouchableOpacity style={buttonContainerStyle()} onPress={editPressed}>
        <Text style={timeStyle()}>{time}</Text>
        <View style={clockContainerStyle()}>
          <Icon name={icon} size={20} style={clockStyle()} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const containerStyle = () => {
  return {};
};

const buttonContainerStyle = () => {
  return {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.primary[global.colorScheme],
    flexDirection: 'row',
    padding: 12,
  };
};

const timeStyle = () => {
  return {
    fontSize: 12,
    color: Colors.tertiary[global.colorScheme],
    fontWeight: 'bold',
  };
};

const editDescriptionStyle = () => {
  return {
    fontSize: 12,
    color: Colors.tertiary[global.colorScheme],
    fontWeight: 'bold',
    marginBottom: 4,
  };
};

const clockStyle = () => {
  return {color: Colors.primary[global.colorScheme]};
};

const clockContainerStyle = () => {
  return {
    alignItems: 'flex-end',
    flex: 1,
  };
};

export default EditTimeButton;
