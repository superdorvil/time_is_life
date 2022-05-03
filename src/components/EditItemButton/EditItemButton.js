import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {Icon} from '_components';
import {COLORS} from '_resources';

const EditItemButton = ({
  header,
  description,
  icon,
  editPressed,
  disabled,
  iconColorInactive
}) => {
  return (
    <View style={containerStyle()}>
      <Text style={headerStyle()}>{header}</Text>
      <TouchableOpacity
        disabled={disabled}
        style={buttonContainerStyle()}
        onPress={editPressed}>
        <Text style={descriptionStyle()}>{description}</Text>
        <View style={iconContainerStyle()}>
          <Icon name={icon} size={20} style={iconStyle(iconColorInactive)} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const containerStyle = () => {
  return {};
};

const buttonContainerStyle = () => {
  return {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.primary[global.colorScheme],
    flexDirection: 'row',
    padding: 12,
  };
};

const descriptionStyle = () => {
  return {
    fontSize: 12,
    color: COLORS.tertiary[global.colorScheme],
    fontWeight: 'bold',
  };
};

const headerStyle = () => {
  return {
    fontSize: 12,
    color: COLORS.tertiary[global.colorScheme],
    fontWeight: 'bold',
    marginBottom: 4,
  };
};

const iconStyle = (iconColorInactive) => {
  return {color: iconColorInactive ? '#000000' : COLORS.primary[global.colorScheme]};
};

const iconContainerStyle = () => {
  return {
    alignItems: 'flex-end',
    flex: 1,
  };
};

export default EditItemButton;
