import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import ColorScheme from './ColorScheme';
import {COLORS} from '_resources';

const ColorSchemeModal = ({
  visible,
  orangeLightPressed,
  orangeDarkPressed,
  blueLightPressed,
  blueDarkPressed,
  cancelPressed,
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={visible}
      backdropColor="#000000"
      backdropOpacity={0.5}
      onBackdropPress={cancelPressed}>
      <View style={containerStyle()}>
        <Text style={selectColorStyle()}>Select Color Scheme</Text>
        <View style={colorSchemeContainerStyle()}>
          <ColorScheme
            active={COLORS.orangeLight === global.colorScheme}
            colorPressed={orangeLightPressed}
            color1={COLORS.orangeLightPrimary}
            color2={COLORS.orangeLightSecondary}
            color3={COLORS.orangeLightTertiary}
          />
          <ColorScheme
            active={COLORS.orangeDark === global.colorScheme}
            colorPressed={orangeDarkPressed}
            color1={COLORS.orangeDarkPrimary}
            color2={COLORS.orangeDarkSecondary}
            color3={COLORS.orangeDarkTertiary}
          />
          <ColorScheme
            active={COLORS.blueLight === global.colorScheme}
            colorPressed={blueLightPressed}
            color1={COLORS.blueLightPrimary}
            color2={COLORS.blueLightSecondary}
            color3={COLORS.blueLightTertiary}
          />
          <ColorScheme
            active={COLORS.blueDark === global.colorScheme}
            colorPressed={blueDarkPressed}
            color1={COLORS.blueDarkPrimary}
            color2={COLORS.blueDarkSecondary}
            color3={COLORS.blueDarkTertiary}
          />
        </View>
      </View>
    </Modal>
  );
};

const containerStyle = () => {
  return {
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: COLORS.colorSchemeModal[global.colorScheme],
  };
};

const selectColorStyle = () => {
  return {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    textAlign: 'center',
    color: COLORS.secondary[global.colorScheme],
    backgroundColor: COLORS.primary[global.colorScheme],
  };
};

const colorSchemeContainerStyle = () => {
  return {margin: 24};
};

export default ColorSchemeModal;
