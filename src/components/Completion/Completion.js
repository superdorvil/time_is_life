import React from 'react';
import {View} from 'react-native';
import {Icon} from '_components';
import {ICONS} from '_constants';
import {COLORS} from '_resources';

const Completion = ({completed, subtask}) => {
  if (completed) {
    return (
      <View style={checkmarkContainerStyle(subtask)}>
        <Icon
          size={subtask ? 20 : 32}
          style={checkmarkStyle()}
          name={ICONS.checkmark}
        />
      </View>
    );
  } else {
    return <View style={containerStyle(subtask)} />;
  }
};

const containerStyle = (subtask) => {
  return {
    borderWidth: 2,
    height: subtask ? 20 : 32,
    width: subtask ? 20 : 32,
    borderRadius: subtask ? 20 : 32,
    marginEnd: 16,
    borderColor: COLORS.primary[global.colorScheme],
  };
};

const checkmarkContainerStyle = () => {
  return {marginEnd: 16};
};

const checkmarkStyle = () => {
  return {color: COLORS.primary[global.colorScheme]};
};

export default Completion;
