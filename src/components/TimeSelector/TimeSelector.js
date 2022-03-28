import React from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {ConfirmationButtons} from '_components';
import TimeInput from './TimeInput';
import {Icons} from '_constants';
import {Icon} from '_components';
import {Colors} from '_resources';

const TimeSelector = ({
  visible,
  closeModal,
  setTimeDescription,
  hours,
  minutes,
  updateHours,
  updateMinutes,
  amPressed,
  pmPressed,
  ampm,
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
        <View>
          <Text style={setTimeDescriptionStyle()}>{setTimeDescription}</Text>
          <TimeInput
            hours={hours}
            minutes={minutes}
            updateHours={updateHours}
            updateMinutes={updateMinutes}
            amPressed={amPressed}
            pmPressed={pmPressed}
            ampm={ampm}
          />
        </View>
        <ConfirmationButtons
          okayPressed={okayPressed}
          cancelPressed={cancelPressed}
        />
        <Icon name={Icons.clock} size={24} style={clockStyle()} />
      </View>
    </Modal>
  );
};

const containerStyle = () => {
  return {
    borderRadius: 6,
    width: '75%',
    alignSelf: 'center',
    paddingBottom: 70,
    backgroundColor: Colors.tertiary[global.colorScheme],
  };
};

const setTimeDescriptionStyle = () => {
  return {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    color: Colors.secondary[global.colorScheme],
    backgroundColor: Colors.primary[global.colorScheme],
  };
};

const clockStyle = () => {
  return {
    position: 'absolute',
    bottom: 24,
    left: 24,
    color: Colors.primary[global.colorScheme],
  };
};

export default TimeSelector;
