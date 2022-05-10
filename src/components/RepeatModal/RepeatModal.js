import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import Item from './Item';
import {UTILS} from '_constants';
import {COLORS} from '_resources';

const RepeatModal = ({
  visible,
  closeModal,
  selected,
  repeatValue,
  updateRepeatValue,
  sundayPressed,
  mondayPressed,
  tuesdayPressed,
  wednesdayPressed,
  thursdayPressed,
  fridayPressed,
  saturdayPressed,
  fomPressed,
  lomPressed,
  dfnPressed,
  yearPressed,
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={visible}
      backdropColor="#000000"
      backdropOpacity={0.5}
      onBackdropPress={closeModal}>
      <View style={containerStyle()}>
        <Text style={headerStyle()}>Repeat Task Upon Completion</Text>
        <Item
          description={UTILS.repeatType.sun}
          selected={selected}
          onPress={sundayPressed}
        />
        <Item
          description={UTILS.repeatType.mon}
          selected={selected}
          onPress={mondayPressed}
        />
        <Item
          description={UTILS.repeatType.tue}
          selected={selected}
          onPress={tuesdayPressed}
        />
        <Item
          description={UTILS.repeatType.wed}
          selected={selected}
          onPress={wednesdayPressed}
        />
        <Item
          description={UTILS.repeatType.thu}
          selected={selected}
          onPress={thursdayPressed}
        />
        <Item
          description={UTILS.repeatType.fri}
          selected={selected}
          onPress={fridayPressed}
        />
        <Item
          description={UTILS.repeatType.sat}
          selected={selected}
          onPress={saturdayPressed}
        />
        <Item
          description={UTILS.repeatType.fom}
          selected={selected}
          onPress={fomPressed}
        />
        <Item
          description={UTILS.repeatType.lom}
          selected={selected}
          onPress={lomPressed}
        />
        <Item
          description={UTILS.repeatType.dfn}
          repeatValue={repeatValue}
          updateRepeatValue={updateRepeatValue}
          selected={selected}
          onPress={dfnPressed}
        />
        <Item
          description={UTILS.repeatType.year}
          selected={selected}
          onPress={yearPressed}
        />
      </View>
    </Modal>
  );
};

const containerStyle = () => {
  return {
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: COLORS.tertiary[global.colorScheme],
    paddingBottom: 16,
  };
};

const headerStyle = () => {
  return {
    color: COLORS.secondary[global.colorScheme],
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: COLORS.primary[global.colorScheme],
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  };
};

export default RepeatModal;
