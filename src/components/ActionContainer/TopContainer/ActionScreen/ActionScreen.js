import React from 'react';
import {View, Text} from 'react-native';
import {ViewVisibleWrapper, BackArrow, TopRightButton} from '_components';
import CenterIcon from './CenterIcon';
import {COLORS} from '_resources';

const ActionScreen = ({
  topRightItem,
  backArrowActive,
  backArrowPressed,
  centerIconName,
  actionDescription,
  subDescription,
  subDescription2,
  topRightButtonActive,
  topRightButtonDescription,
  topRightButtonPressed,
}) => {
  return (
    <View style={containerStyle()}>
      <ViewVisibleWrapper
        active={backArrowActive}
        style={backArrowContainerStyle()}>
        <BackArrow backArrowPressed={backArrowPressed} />
      </ViewVisibleWrapper>
      <View style={topRightStyle()}>
        {topRightItem}
      </View>
      <View style={topRightButtonStyle()}>
        <TopRightButton
          topRightButtonActive={topRightButtonActive}
          topRightButtonDescription={topRightButtonDescription}
          topRightButtonPressed={topRightButtonPressed}
        />
      </View>
      <CenterIcon centerIconName={centerIconName} />
      <Text style={actionDescriptionStyle()}>{actionDescription}</Text>
      <ViewVisibleWrapper
        active={subDescription || subDescription2}
        style={subDescriptionContainerStyle()}>
        <Text style={subDescriptionStyle()}>{subDescription}</Text>
        <Text style={subDescription2Style()}>{subDescription2}</Text>
      </ViewVisibleWrapper>
    </View>
  );
};

const containerStyle = () => {
  return {};
};

const subDescriptionContainerStyle = () => {
  return {
    flexDirection: 'row',
    alignSelf: 'center',
  };
};

const backArrowContainerStyle = () => {
  return {alignSelf: 'baseline'};
};

const actionDescriptionStyle = () => {
  return {
    marginTop: 16,
    fontSize: 24,
    textAlign: 'center',
    color: COLORS.primary[global.colorScheme],
  };
};

const subDescriptionStyle = () => {
  return {
    fontSize: 12,
    color: COLORS.tertiary[global.colorScheme],
  };
};

const subDescription2Style = () => {
  return {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary[global.colorScheme],
  };
};

const topRightButtonStyle = () => {
  return {
    paddingEnd: 8,
    paddingTop: 16,
    paddingBottom: 16,
    position: 'absolute',
    top: 0,
    right: 0,
  };
};
const topRightStyle = () => {
  return {
    top: 0,
    right: 0,
    position: 'absolute',
  };
};

export default ActionScreen;
