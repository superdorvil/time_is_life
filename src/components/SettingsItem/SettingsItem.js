import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Icon} from '_components';
import {ICONS} from '_constants';
import {COLORS} from '_resources';

const SettingsItem = ({description, settingsPressed}) => {
  return (
    <TouchableOpacity style={containerStyle()} onPress={settingsPressed}>
      <Text style={descriptionStyle()}>{description}</Text>
      <View style={arrowContainerStyle()}>
        <Icon name={ICONS.rightArrow} size={24} style={arrowStyle()} />
      </View>
    </TouchableOpacity>
  );
};

const containerStyle = () => {
  return {
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLORS.primary[global.colorScheme],
  };
};

const arrowStyle = () => {
  return {color: COLORS.primary[global.colorScheme]};
};

const arrowContainerStyle = () => {
  return {
    flex: 1,
    alignItems: 'flex-end',
  };
};

const descriptionStyle = () => {
  return {
    fontSize: 16,
    color: COLORS.tertiary[global.colorScheme],
  };
};

export default SettingsItem;
