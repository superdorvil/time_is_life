import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import ColorScheme from './ColorScheme';
import {Colors} from '_resources';

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
            active={Colors.orangeLight === global.colorScheme}
            colorPressed={orangeLightPressed}
            color1={Colors.orangeLightPrimary}
            color2={Colors.orangeLightSecondary}
            color3={Colors.orangeLightTertiary}
          />
          <ColorScheme
            active={Colors.orangeDark === global.colorScheme}
            colorPressed={orangeDarkPressed}
            color1={Colors.orangeDarkPrimary}
            color2={Colors.orangeDarkSecondary}
            color3={Colors.orangeDarkTertiary}
          />
          <ColorScheme
            active={Colors.blueLight === global.colorScheme}
            colorPressed={blueLightPressed}
            color1={Colors.blueLightPrimary}
            color2={Colors.blueLightSecondary}
            color3={Colors.blueLightTertiary}
          />
          <ColorScheme
            active={Colors.blueDark === global.colorScheme}
            colorPressed={blueDarkPressed}
            color1={Colors.blueDarkPrimary}
            color2={Colors.blueDarkSecondary}
            color3={Colors.blueDarkTertiary}
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
    backgroundColor: Colors.colorSchemeModal[global.colorScheme],
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
    color: Colors.secondary[global.colorScheme],
    backgroundColor: Colors.primary[global.colorScheme],
  };
};

const colorSchemeContainerStyle = () => {
  return {margin: 24};
};

export default ColorSchemeModal;
