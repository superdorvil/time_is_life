import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {COLORS} from '_resources';

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
      backgroundColor: COLORS.primary[global.colorScheme],
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
      backgroundColor: COLORS.secondary[global.colorScheme],
    };
  }
};

const descriptionStyle = selected => {
  if (selected) {
    return {
      fontSize: 12,
      fontWeight: 'bold',
      backgroundColor: COLORS.primary[global.colorScheme],
      color: COLORS.secondary[global.colorScheme],
    };
  } else {
    return {
      fontSize: 12,
      fontWeight: 'bold',
      borderRadius: 20,
      backgroundColor: COLORS.secondary[global.colorScheme],
      color: COLORS.primary[global.colorScheme],
    };
  }
};

export default ChartNavButton;
