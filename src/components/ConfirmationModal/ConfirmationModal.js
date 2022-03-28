import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {ConfirmationButtons, ViewVisibleWrapper} from '_components';
import {Icon} from '_components';
import {Colors} from '_resources';

const ConfirmationModal = ({
  visible,
  closeModal,
  header,
  description,
  iconName,
  okayPressed,
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
        <Text style={headerStyle()}>{header}</Text>
        <Text style={descriptionStyle()}>{description}</Text>
        <ConfirmationButtons
          okayPressed={okayPressed}
          cancelPressed={cancelPressed}
        />
        <ViewVisibleWrapper visible={iconName}>
          <Icon name={iconName} size={24} style={iconStyle()} />
        </ViewVisibleWrapper>
      </View>
    </Modal>
  );
};

const containerStyle = () => {
  return {
    borderRadius: 6,
    width: '75%',
    alignSelf: 'center',
    backgroundColor: Colors.tertiary[global.colorScheme],
    paddingBottom: 70,
  };
};

const headerStyle = () => {
  return {
    color: Colors.secondary[global.colorScheme],
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: Colors.primary[global.colorScheme],
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  };
};

const descriptionStyle = () => {
  return {
    color: Colors.secondary[global.colorScheme],
    fontSize: 20,
    marginStart: 16,
    marginEnd: 16,
    marginTop: 16,
  };
};

const iconStyle = () => {
  return {
    color: Colors.primary[global.colorScheme],
    position: 'absolute',
    bottom: 24,
    left: 24,
  };
};

export default ConfirmationModal;
