import React, {Component} from 'react';
import {TouchableOpacity, Text, View, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import projectDB from '_data';
import {
  ActionContainer,
  EditItemButton,
  DateSelector,
  ViewVisibleWrapper,
  Button,
  ProjectInput,
  Divider,
  Subtask,
  SubtaskModal,
} from '_components';
import {DateUtils, HoursUtils} from '_utils';
import {ICONS, UTILS} from '_constants';
import {COLORS} from '_resources';

class ManageTask extends Component {
  constructor(props) {
    super(props);

    const editMode = this.props.taskID ? true : false;

    if (editMode) {
      const task = projectDB.getTasks({
        realm: this.props.realm,
        taskID: this.props.taskID,
      });
      const subtasks = [];
      task.subtasks.forEach((st, i) => {
        subtasks.push({
          description: st.description,
          position: st.position,
          completed: st.completed
        });
      });

      this.state = {
        editMode,
        editSubtask: true,
        description: task.description,
        deleteButtonActive: editMode,
        actionDescription:'Edit Task',
        topRightButtonActive: editMode,
        buttonDescription: "Edit Task",
        dueDateIndex: task.dueDateIndex, // replace me with constant
        subtasks,
        completed: task.completed,
        deleted: task.deleted,
        repeatType: task.repeatType,
        repeatValue: task.repeatValue,
        important: task.important,
        dateModalVisible: false,
        repeatModalVisible: false,
        subtaskModalVisible: false,
        subtaskDescription: '',
      };
    } else {
      this.state = {
        editMode,
        editSubtask: true,
        description: '',
        deleteButtonActive: editMode,
        actionDescription: 'Create New Task',
        topRightButtonActive: editMode,
        buttonDescription: "+ Add Task",
        dueDateIndex: 9999999999999, // replace me with constant
        subtasks: [],
        completed: false,
        deleted: false,
        repeatType: 'none',
        repeatValue: 0,
        important: false,
        dateModalVisible: false,
        repeatModalVisible: false,
        subtaskModalVisible: false,
        subtaskDescription: '',
      };
    }

    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.markImportant = this.markImportant.bind(this);
    this.updateTaskDueDate = this.updateTaskDueDate.bind(this);
    this.updateRepeatType = this.updateRepeatType.bind(this);
    this.editTask = this.editTask.bind(this);

    this.subtaskMode = this.subtaskMode.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openRepeatModal = this.openRepeatModal.bind(this);
    this.openDueDateModal = this.openDueDateModal.bind(this);
    this.addSubtask = this.addSubtask.bind(this);
    this.updateSubtaskDescription = this.updateSubtaskDescription.bind(this);
  }

  openSubtaskModal() {
    this.setState({subtaskModalVisible: true});
  }

  openDueDateModal() {
    this.setState({dateModalVisible: true});
  }

  openRepeatModal() {
    this.setState({repeatModalVisible: true});
  }

  subtaskMode() {
    this.setState({editSubtask: !this.state.editSubtask});
  }

  closeModal() {
    this.setState({
      dateModalVisible: false,
      repeatModalVisible: false,
      subtaskModalVisible: false,
      subtaskDescription: '',
    });
  }

  createTask() {
    if (this.state.description !== '') {
      projectDB.createTask({
        realm: this.props.realm,
        projectID: this.props.projectID,
        description: this.state.description,
        dueDateIndex: this.state.dueDateIndex, // replace me with constant
        subtasks: this.state.subtasks,
        completed: this.state.completed,
        deleted: this.state.deleted,
        repeatType: this.state.repeatType,
        repeatValue: this.state.repeatValue,
        important: this.state.important,
      });

      Actions.pop();
    }
  }

  deleteTask() {
    projectDB.deleteTask({
      realm: this.props.realm,
      taskID: this.props.taskID,
    });

    Actions.pop();
  }

  updateDescription(description) {
    this.setState({description});
  }

  updateSubtaskDescription(description) {
    this.setState({subtaskDescription: description});
  }

  addSubtask() {
    const subtasks = this.state.subtasks;
    subtasks.push({
      description: this.state.subtaskDescription,
      position: 0,
      completed: false,
    });

    this.setState({subtasks, completeted: false});

    this.closeModal();
  }

  deleteSubtask(index) {
    const subtasks = this.state.subtasks;
    subtasks.splice(index, 1);

    this.setState({subtasks});
  }

  completeTask() {
    this.setState({completed: !this.state.completed});
  }

  markImportant() {
    this.setState({important: !this.state.important});
  }

  updateTaskDueDate(dateObject) {
    const date = new Date(
      dateObject.year,
      dateObject.month - 1,
      dateObject.day,
    );
    const dueDateIndex = DateUtils.getDateIndex({date});

    this.setState({dueDateIndex});

    this.closeModal();
  }

  updateRepeatType() {

  }

  editTask() {
    if (this.state.description !== '') {
      projectDB.editTask({
        realm: this.props.realm,
        taskID: this.props.taskID,
        description: this.state.description,
        dueDateIndex: this.state.dueDateIndex, // replace me with constant
        subtasks: this.state.subtasks,
        completed: this.state.completed,
        deleted: this.state.deleted,
        repeatType: this.state.repeatType,
        repeatValue: this.state.repeatValue,
        important: this.state.important,
      });

      Actions.pop();
    }
  }

  renderDivider(dividerColorPrimary) {
    return <Divider primary={dividerColorPrimary} />;
  }

  renderSubtask(subtask, index, deleteSubtask) {
    return (
      <Subtask
        description={subtask.description}
        completed={subtask.completed}
        deleteSubtask={deleteSubtask}
        index
        edit
      />
    );
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: false,
      deleteButtonActive: this.state.deleteButtonActive,
      centerIconName: ICONS.checkmark,
      actionDescription: this.state.actionDescription,
      subDescription: 'Time is Life',
      topRightButtonActive: this.state.topRightButtonActive,
      topRightButtonDescription: 'Delete Task',
      topRightButtonPressed: this.deleteTask,
    };

    const date = this.state.dueDateIndex === 9999999999999 ?
      new Date():
      DateUtils.getDateFromDateIndex({
        dateIndex: this.state.dueDateIndex,
      });
    const dateSelectorString = DateUtils.convertDateToString({
      date,
      format: UTILS.dateFormat.yyyy_mm_dd,
    });

    return (
      <View style={containerStyle()}>
        <ActionContainer
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionNavBarActive={false}
          actionNavBarData={false}
          actionButtonActive={false}
          actionButtonPressed={false}
          listDataActive={false}
          listData={false}
          renderListItem={false}>
          <ProjectInput
            header="Task Name"
            value={this.state.description}
            onChangeText={this.updateDescription}
            placeholder="enter task name ..."
          />
          <ViewVisibleWrapper active={this.state.editSubtask}>
            <View style={innerContainerStyle()}>
              <View style={buttonContainerStyle()}>
              <EditItemButton
                header="Repeat Task"
                description={this.state.repeatType}
                icon={ICONS.repeat}
                editPressed={this.openRepeatModal}
              />
              </View>
              <View style={spacingStyle()} />
              <View style={buttonContainerStyle()}>
              <EditItemButton
                header="Due Date"
                description={
                  this.state.dueDateIndex === 9999999999999 ?
                  'none' :
                  DateUtils.convertDateToString({
                    date: DateUtils.getDateFromDateIndex({
                      dateIndex: this.state.dueDateIndex
                    }),
                    format: UTILS.dateFormat.monthDateYear,
                  })
                }
                icon={ICONS.calendar}
                editPressed={this.openDueDateModal}
              />
              </View>
              <View style={spacingStyle()} />
              <View style={buttonContainerStyle()}>
                <EditItemButton
                  header="Mark Important"
                  description={this.state.important ? 'Important' : 'Normal'}
                  icon={ICONS.important}
                  editPressed={this.markImportant}
                  iconColorInactive={!this.state.important}
                />
              </View>
            </View>
            <View style={innerContainerStyle()}>
              {/*<View style={spacingStyle()} />
              <View style={buttonContainerStyle()}>
                <EditItemButton
                  header="Task Completed"
                  description={this.state.completed ? 'Completed' : 'Incomplete'}
                  icon={ICONS.checkmark}
                  editPressed={this.completeTask}
                  iconColorInactive={!this.state.completed}
                />
              </View>*/}
            </View>
          </ViewVisibleWrapper>
          <ViewVisibleWrapper
            active={!this.state.editSubtask}
            style={subtaskStyle()}>
            <View style={subtaskContainerStyle()}>
              <TouchableOpacity onPress={() => this.openSubtaskModal()}>
                <Text style={addSubtaskStyle()}>+ Tap to Add Subtask</Text>
              </TouchableOpacity>
              <FlatList
                data={this.state.subtasks}
                renderItem={({item, index}) => this.renderSubtask(item, index, () => this.deleteSubtask(index))}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => this.renderDivider()}
                contentContainerStyle={listPaddingStyle()}
              />
            </View>
          </ViewVisibleWrapper>
          <View style={innerContainerStyle()}>
            <View style={buttonContainerStyle()}>
              <EditItemButton
                header={
                  this.state.editSubtask ?
                    "Add/Edit Subtask" :
                    "Edit Task"
                }
                description={
                  this.state.editSubtask ?
                    "Tap to Add / Edit Subtask" :
                    "Tap to Edit Task"
                }
                icon={ICONS.checkmark}
                editPressed={this.subtaskMode}
              />
            </View>
          </View>
        </ActionContainer>
        <View style={buttonStyle()}>
          <Button
            description={this.state.buttonDescription}
            buttonPressed={this.state.editMode ?  this.editTask : this.createTask}
          />
        </View>
        <DateSelector
          dateString={dateSelectorString}
          date={date}
          updateDate={this.updateTaskDueDate}
          visible={this.state.dateModalVisible}
          closeModal={this.closeModal}
          taskDueDate
          notSelected={this.state.dueDateIndex == 9999999999999}
        />
        <SubtaskModal
          visible={this.state.subtaskModalVisible}
          closeModal={this.closeModal}
          description={this.state.subtaskDescription}
          updateDescription={this.updateSubtaskDescription}
          addSubtask={this.addSubtask}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

const innerContainerStyle = () => {
  return {
    flexDirection: 'row',
    marginStart: 16,
    marginEnd: 16,
    marginBottom: 8,
  };
};

const buttonContainerStyle = () => {
  return {
    flex: 1,
  };
};

const buttonStyle = () => {
  return {
    position: 'absolute',
    left: 16,
    bottom: 32,
  };
};

const spacingStyle = () => {
  return {padding: 4};
};

const subtaskStyle = () => {
  return {
    height: 225,
  };
};

const listPaddingStyle = () => {
  return {paddingBottom: 16};
};

const subtaskContainerStyle = () => {
  return {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.primary[global.colorScheme],
    marginBottom: 16,
  };
};

const addSubtaskStyle = () => {
  return {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: COLORS.secondary[global.colorScheme],
    backgroundColor: COLORS.primary[global.colorScheme],
    padding: 10,
    margin: 8,
    borderRadius: 8,
  };
};

export default ManageTask;
