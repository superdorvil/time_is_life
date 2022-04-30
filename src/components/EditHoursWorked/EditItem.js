import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {COLORS} from '_resources';

const EditItem = ({item, itemDescription, itemPressed}) => {
  return (
    <View>
      <Text style={descriptionStyle()}>{itemDescription}</Text>
      <TouchableOpacity style={containerStyle()} onPress={itemPressed}>
        <Text style={itemStyle()}>{item ? item : '+ add task'}</Text>
      </TouchableOpacity>
    </View>
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

const itemStyle = () => {
  return {
    fontSize: 16,
    color: COLORS.tertiary[global.colorScheme],
  };
};

const descriptionStyle = () => {
  return {
    fontSize: 12,
    color: COLORS.tertiary[global.colorScheme],
    fontWeight: 'bold',
  };
};

export default EditItem;
