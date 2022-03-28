import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import Modal from 'react-native-modal';
//import {Colors} from '_resources';
import Task from './Task';
import {Colors} from '_resources';
import projectDB from '_data';

const SelectTaskModal = ({
  realm,
  tasks,
  visible,
  closeModal,
  secondsWorkedID,
  taskPressed,
}) => {
  const secondsWorked = projectDB.getSecondsWorked({
    realm,
    secondsWorkedID,
  });
  const taskList = [];

  tasks.forEach((task, i) => {
    taskList.push(
      <View key={i}>
        <Task
          task={task.description}
          taskPressed={() => taskPressed(realm, task.id, secondsWorked.id)}
          selected={secondsWorked.taskID === task.id}
        />
        <View style={dividerStyle()} />
      </View>,
    );
  });

  return (
    <Modal
      animationType="slide"
      isVisible={visible}
      backdropColor="#000000"
      backdropOpacity={0.5}
      onBackdropPress={closeModal}>
      <View style={containerStyle()}>
        <Text style={headerStyle()}>{'Select Task '}</Text>
        <ScrollView>{taskList}</ScrollView>
      </View>
    </Modal>
  );
};

const containerStyle = () => {
  return {
    paddingBottom: 16,
    borderRadius: 16,
    maxHeight: '75%',
    backgroundColor: Colors.tertiary[global.colorScheme],
  };
};

const headerStyle = () => {
  return {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary[global.colorScheme],
    backgroundColor: Colors.primary[global.colorScheme],
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  };
};

const dividerStyle = () => {
  return {
    height: 1,
    width: '100%',
    backgroundColor: Colors.secondary[global.colorScheme],
  };
};

export default SelectTaskModal;
