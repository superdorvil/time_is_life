import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {ProjectInput, Button} from '_components';
import {COLORS} from '_resources';

const SubtaskModal = ({
  visible,
  closeModal,
  description,
  updateDescription,
  addSubtask
}) => {
  return (
    <Modal
      animationType="slide"
      isVisible={visible}
      backdropColor="#000000"
      backdropOpacity={0.5}
      onBackdropPress={closeModal}>
      <View style={containerStyle()}>
        <View style={headerStyle()}>
          <Text style={headerTextStyle()}>Add Subtask</Text>
        </View>
        <Text style={titleStyle()}>ProjectName</Text>
        <ProjectInput
          header="Subtask Name"
          value={description}
          onChangeText={updateDescription}
          placeholder="enter subtask name ..."
        />
        <TouchableOpacity style={buttonStyle()} onPress={addSubtask}>
          <Text style={buttonTextStyle()}>+ Add Subtask</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const containerStyle = () => {
  return {
    backgroundColor: '#000000',
    borderRadius: 8,
  };
};

const headerTextStyle = () => {
  return {
    fontSize: 20,
    color: COLORS.secondary[global.colorScheme],
    fontWeight: 'bold',
  };
};

const titleStyle = () => {
  return {
    fontSize: 16,
    color: COLORS.secondary[global.colorScheme],
    position: 'absolute',
    marginStart: 20,
    marginTop: 86,
  };
};

const headerStyle = () => {
  return {
    backgroundColor: COLORS.primary[global.colorScheme],
    padding: 16,
    borderTopStartRadius: 6,
    borderTopEndRadius: 6,
  };
};

const buttonStyle = () => {
  return {
    margin: 16,
    marginTop: 4,
    borderRadius: 32,
    alignItems: 'center',
    backgroundColor: COLORS.primary[global.colorScheme],
    padding: 16,
  };
};

const buttonTextStyle = () => {
  return {
    fontSize: 16,
    color: COLORS.secondary[global.colorScheme],
    fontWeight: 'bold',
  };
};

export default SubtaskModal;
