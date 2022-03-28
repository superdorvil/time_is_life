import React from 'react';
import {View, Text} from 'react-native';
import {ViewVisibleWrapper, BackArrow, TopRightButton} from '_components';
import CenterIcon from './CenterIcon';
import {Colors} from '_resources';

const ActionScreen = ({
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
    color: Colors.primary[global.colorScheme],
  };
};

const subDescriptionStyle = () => {
  return {
    fontSize: 12,
    color: Colors.tertiary[global.colorScheme],
  };
};

const subDescription2Style = () => {
  return {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary[global.colorScheme],
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

export default ActionScreen;
