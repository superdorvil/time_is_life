import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {COLORS} from '_resources';

const Item = ({item, selected, itemPressed}) => {
  return (
    <TouchableOpacity onPress={itemPressed} style={containerStyle()}>
      <Text style={itemStyle()}>{item}</Text>
      <View style={selected ? selectedStyle() : unselectedStyle()} />
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    backgroundColor: COLORS.tertiary[global.colorScheme],
    flexDirection: 'row',
    alignItems: 'center',
  };
};

const itemStyle = () => {
  return {
    padding: 16,
    fontSize: 16,
    color: COLORS.secondary[global.colorScheme],
    flex: 1,
  };
};

const selectedStyle = () => {
  return {
    borderRadius: 32,
    width: 32,
    height: 32,
    backgroundColor: COLORS.primary[global.colorScheme],
    marginEnd: 16,
  };
};

const unselectedStyle = () => {
  return {
    borderRadius: 32,
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: COLORS.primary[global.colorScheme],
    marginEnd: 16,
  };
};

export default Item;
