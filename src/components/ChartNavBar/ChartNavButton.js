import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Colors} from '_resources';

const ChartNavButton = ({description, selected, navButtonPressed}) => {
  return (
    <TouchableOpacity
      style={containerStyle(selected)}
      onPress={navButtonPressed}>
      <Text style={descriptionStyle(selected)}>{description}</Text>
    </TouchableOpacity>
  );
};

const containerStyle = selected => {
  if (selected) {
    return {
      marginTop: 4,
      marginBottom: 4,
      paddingTop: 6,
      paddingBottom: 6,
      flex: 1,
      alignItems: 'center',
      borderRadius: 30,
      backgroundColor: Colors.primary[global.colorScheme],
    };
  } else {
    return {
      marginTop: 4,
      marginBottom: 4,
      paddingTop: 6,
      paddingBottom: 6,
      flex: 1,
      alignItems: 'center',
      borderRadius: 30,
      backgroundColor: Colors.secondary[global.colorScheme],
    };
  }
};

const descriptionStyle = selected => {
  if (selected) {
    return {
      fontSize: 12,
      fontWeight: 'bold',
      backgroundColor: Colors.primary[global.colorScheme],
      color: Colors.secondary[global.colorScheme],
    };
  } else {
    return {
      fontSize: 12,
      fontWeight: 'bold',
      borderRadius: 20,
      backgroundColor: Colors.secondary[global.colorScheme],
      color: Colors.primary[global.colorScheme],
    };
  }
};

export default ChartNavButton;
