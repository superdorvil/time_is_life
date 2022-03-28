import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from '_components';
import {Icons} from '_constants';
import {Colors} from '_resources';

const BackArrow = ({backArrowPressed}) => {
  return (
    <TouchableOpacity onPress={backArrowPressed} style={containerStyle()}>
      <Icon name={Icons.leftArrow} size={24} style={arrowStyle()} />
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
    color: Colors.primary[global.colorScheme],
  };
};

export default BackArrow;
