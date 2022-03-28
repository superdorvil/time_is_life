import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from '_components';
import {ICONS} from '_constants';
import {COLORS} from '_resources';

const BackArrow = ({backArrowPressed}) => {
  return (
    <TouchableOpacity onPress={backArrowPressed} style={containerStyle()}>
      <Icon name={ICONS.leftArrow} size={24} style={arrowStyle()} />
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {alignItems: 'baseline'};
};

const arrowStyle = () => {
  return {
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 16,
    paddingBottom: 16,
    color: COLORS.primary[global.colorScheme],
  };
};

export default BackArrow;
