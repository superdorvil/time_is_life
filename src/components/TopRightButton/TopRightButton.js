import React from 'react';
import {Text} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {COLORS} from '_resources';

const TopRightButton = ({
  topRightButtonActive,
  topRightButtonDescription,
  topRightButtonPressed,
}) => {
  return (
    <ViewVisibleWrapper
      active={topRightButtonActive}
      style={containerStyle()}
      onPress={topRightButtonPressed}>
      <Text style={topRightStyle()}>{topRightButtonDescription}</Text>
    </ViewVisibleWrapper>
  );
};

const containerStyle = () => {
  return {
    alignSelf: 'baseline',
  };
};

const topRightStyle = topRightDeleteModeActive => {
  return {
    fontSize: 20,
    color: COLORS.primary[global.colorScheme],
    borderColor: COLORS.primary[global.colorScheme],
    borderWidth: 1,
    padding: 6,
    borderRadius: 8,
  };
};

export default TopRightButton;
