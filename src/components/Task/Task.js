import React, {Component} from 'react';
import {Animated, TouchableOpacity, Text, View, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  ViewVisibleWrapper,
  DateSelector,
  Completion,
  Divider,
  Subtask,
  SubtaskModal,
  SwipeButton,
  RepeatModal
} from '_components';
import projectDB from '_data';
import {COLORS} from '_resources';
import {DateUtils, InputUtils} from '_utils';
import {ICONS, UTILS} from '_constants';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateModalVisible: false,
      dueDate: new Date(),
      buttonsVisible: false,
      subtaskModalVisible: false,
      subtaskDescription: '',
      repeatModalVisible: false,
    };

    this.openButtons = this.openButtons.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openDueDateModal = this.openDueDateModal.bind(this);
    this.updateTaskDueDate = this.updateTaskDueDate.bind(this);
    this.completeSubtask = this.completeSubtask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addSubtask = this.addSubtask.bind(this);
    this.updateSubtaskDescription = this.updateSubtaskDescription.bind(this);
    this.markImportant = this.markImportant.bind(this);
    this.openSubtaskModal = this.openSubtaskModal.bind(this);
    this.topTask = this.topTask.bind(this);
    this.openRepeatModal = this.openRepeatModal.bind(this);
    this.updateRepeatValue = this.updateRepeatValue.bind(this);
    this.updateRepeatType = this.updateRepeatType.bind(this);
  }

  updateRepeatType(repeatType) {
    projectDB.updateTaskRepeatType({
      realm: this.props.realm,
      taskID: this.props.taskID,
      repeatType
    });
  }

  updateRepeatValue(repeatValue) {
    projectDB.updateTaskRepeatValue({
      realm: this.props.realm,
      taskID: this.props.taskID,
      repeatValue: InputUtils.numberRangeInput({
        min: 1,
        max: 3650,
        value: repeatValue
      })
    });
  }

  completeTask() {
    projectDB.completeTask({
      realm: this.props.realm,
      taskID: this.props.taskID,
    });
  }

  editTask() {
    Actions.manageTask({
      realm: this.props.realm,
      taskID: this.props.taskID,
      projectID: this.props.projectID,
    });
  }

  openSubtaskModal() {
    this.setState({subtaskModalVisible: true});
  }

  openRepeatModal() {
    this.setState({repeatModalVisible: true});
  }

  markImportant() {
    projectDB.markTaskImportant({
      realm: this.props.realm,
      taskID: this.props.taskID,
    });
  }

  openDueDateModal() {
    let dueDate;
    if (this.props.dueDateIndex == UTILS.nullDueDate) {
      const today = new Date();
      const todayIndex = DateUtils.getDateIndex({date: today});

      dueDate = DateUtils.getDateFromDateIndex({dateIndex: todayIndex});
    } else {
      dueDate = DateUtils.getDateFromDateIndex({dateIndex: this.props.dueDateIndex});
    }

    this.setState({
      dueDate,
      dateModalVisible: true,
    });
  }

  closeModal() {
    this.setState({
      dateModalVisible: false,
      subtaskModalVisible: false,
      subtaskDescription: '',
      repeatModalVisible: false,
    });
  }

  openButtons() {
    this.setState({buttonsVisible: !this.state.buttonsVisible});
  }

  topTask() {
    projectDB.topTaskPosition({
      realm: this.props.realm,
      taskID: this.props.taskID,
    });
  }

  addSubtask() {
    const subtasks = [];

    this.props.subtasks.forEach((subtask, i) => {
      subtasks.push({
        description: subtask.description,
        completed: subtask.completed,
      });
    });

    subtasks.push({
      description: this.state.subtaskDescription,
      completed: false,
    });

    projectDB.addSubtask({
      realm: this.props.realm,
      taskID: this.props.taskID,
      subtasks,
    });

    this.closeModal();
  }

  deleteTask() {
    projectDB.deleteTask({
      realm: this.props.realm,
      taskID: this.props.taskID,
    });
  }

  updateSubtaskDescription(description) {
    this.setState({subtaskDescription: description});
  }

  updateTaskDueDate(dateObject) {
    const date = new Date(
      dateObject.year,
      dateObject.month - 1,
      dateObject.day,
    );
    const dueDateIndex = DateUtils.getDateIndex({date});
    if (this.props.dueDateIndex === dueDateIndex) {
      projectDB.updateTaskDueDate({
        realm: this.props.realm,
        taskID: this.props.taskID,
        dueDateIndex: UTILS.nullDueDate,
      });
    } else {
      projectDB.updateTaskDueDate({
        realm: this.props.realm,
        taskID: this.props.taskID,
        dueDateIndex
      });
    }

    this.closeModal();
  }

  completeSubtask(index) {
    const subtasks = [];
    let completed = true;

    this.props.subtasks.forEach((subtask, i) => {
      subtasks.push({
        description: subtask.description,
        completed: subtask.completed
      });
    });
    subtasks[index].completed = !subtasks[index].completed;

    subtasks.forEach((subtask, i) => {
      if (!subtask.completed) {
        completed = false;
      }
    });

    projectDB.completeSubtask({
      realm: this.props.realm,
      taskID: this.props.taskID,
      subtasks,
      completed,
    });
  }

  deleteSubtask(index) {
    const subtasks = [];
    let completed = true;

    this.props.subtasks.forEach((subtask, i) => {
      if (i !== index) {
        subtasks.push({
          description: subtask.description,
          completed: subtask.completed
        });
      }
    });

    if (subtasks.length > 0) {
      subtasks.forEach((subtask, i) => {
        if (!subtask.completed) {
          completed = false;
        }
      });
    } else {
        completed = false;
    }

    projectDB.deleteSubtask({
      realm: this.props.realm,
      taskID: this.props.taskID,
      subtasks,
      completed,
    });
  }

  topSubtask(index) {
    const subtasks = [];

    if (this.props.subtasks.length > 0) {
      subtasks.push({
        description: this.props.subtasks[index].description,
        completed: this.props.subtasks[index].completed
      });
    }

    this.props.subtasks.forEach((subtask, i) => {
      if (i !== index) {
        subtasks.push({
          description: subtask.description,
          completed: subtask.completed
        });
      }
    });
//    [subtasks[0], subtasks[index]] = [subtasks[index], subtasks[0]];

    projectDB.topSubtask({
      realm: this.props.realm,
      taskID: this.props.taskID,
      subtasks,
    });
  }

  convertDueDateToText(dueDateIndex) {
    if (dueDateIndex == UTILS.nullDueDate) {
      return false;
    }

    const today = new Date();
    const todayIndex = DateUtils.getDateIndex({date: today});
    const dueDate = DateUtils.getDateFromDateIndex({dateIndex: dueDateIndex});
    let dateText = '';

    switch (dueDateIndex) {
      case todayIndex - 1:
        dateText = 'Yesterday';
        break;
      case todayIndex:
        dateText = 'Today';
        break;
      case todayIndex + 1:
        dateText = 'Tomorrow';
        break;
      default:
        if (dueDateIndex > todayIndex + 1 && dueDateIndex < todayIndex + 7) {
            dateText = DateUtils.convertDayToString({
              date: dueDate,
              format: UTILS.weekdayFormat.full,
            });
        } else {
          dateText = DateUtils.convertDateToString({
            date: dueDate,
            format: UTILS.dateFormat.monthDateYear,
          });
        }
    }

    return dateText;
  }

  renderDivider(dividerColorPrimary) {
    return <Divider primary={dividerColorPrimary} />;
  }

  renderSubtask(subtask, index, completeSubtask, deleteSubtask, topSubtask) {
    return (
      <Subtask
        key={subtask.description}
        index={index}
        description={subtask.description}
        completed={subtask.completed}
        completeSubtask={completeSubtask}
        deleteSubtask={deleteSubtask}
        topSubtask={topSubtask}
      />
    );
  }

  render() {
    const dueDateToText = this.convertDueDateToText(this.props.dueDateIndex);
    let project;
    if (this.props.showProject) {
      project = projectDB.getProjects({
        realm: this.props.realm,
        projectID: this.props.projectID,
      }).description;
    }

    return (
        <View>
          <ViewVisibleWrapper
            style={dueDateContainerStyle()}
            active={
              !this.props.completed &&
              this.props.renderDueDate &&
              dueDateToText
            }>
            <Text style={dueDateStyle()}>
              {dueDateToText}
            </Text>
          </ViewVisibleWrapper>
          <ViewVisibleWrapper
            style={unassignedDueDatesDivider()}
            active={
              !this.props.completed &&
              this.props.renderDueDate &&
              !dueDateToText &&
              this.props.index !== 0
            }
          />
          <View style={containerStyle(this.state.buttonsVisible)}>
            <ViewVisibleWrapper active={this.state.buttonsVisible} style={swipeButtonStyle()}>
              <SwipeButton
                displayName="Complete"
                iconName={ICONS.checkmark}
                onPress={this.completeTask}
              />
              <SwipeButton
                displayName="Top"
                iconName={ICONS.up_arrow}
                onPress={this.topTask}
              />
              <SwipeButton
                displayName="Subtask"
                iconName={ICONS.checkmark}
                onPress={this.openSubtaskModal}
              />
              <SwipeButton
                displayName="Delete"
                iconName={ICONS.trash}
                onPress={this.deleteTask}
              />
            </ViewVisibleWrapper>
            <ViewVisibleWrapper active={this.state.buttonsVisible} style={swipeButtonStyle(8)}>
              <SwipeButton
                displayName="Edit"
                iconName={ICONS.edit}
                onPress={this.editTask}
              />
              <SwipeButton
                displayName="Date"
                iconName={ICONS.calendar}
                onPress={this.openDueDateModal}
              />
              <SwipeButton
                displayName="Important"
                iconName={ICONS.important}
                onPress={this.markImportant}
              />
              <SwipeButton
                displayName="Repeat"
                iconName={ICONS.repeat}
                onPress={this.openRepeatModal}
              />
            </ViewVisibleWrapper>
            <ViewVisibleWrapper active={project}>
              <Text style={projectStyle()}>Project: {project}</Text>
            </ViewVisibleWrapper>
            <ViewVisibleWrapper active={this.props.repeatType !== UTILS.repeatType.none}>
              <Text style={projectStyle()}>
                {
                  this.props.repeatType === UTILS.repeatType.dfn ?
                    'Repeat ' + this.props.repeatValue + ' days from now' :
                    this.props.repeatType
                }
              </Text>
            </ViewVisibleWrapper>
            <TouchableOpacity
              style={innerContainerStyle()}
              onPress={this.openButtons}>
              <Completion completed={this.props.completed} />
              <View style={descriptionContainerStyle()}>
                <Text style={descriptionStyle(this.props.completed, this.props.important)}>{this.props.description}</Text>
                <ViewVisibleWrapper active={this.props.hoursWorked > 0 ? true : false}>
                  <Text style={hoursWorkedStyle()}>{this.props.hoursWorked} hours worked</Text>
                </ViewVisibleWrapper>
              </View>
              <ViewVisibleWrapper
                active={this.props.subtasks.length > 0}
                style={subtaskMarkerStyle()}
              />
            </TouchableOpacity>
            <ViewVisibleWrapper
              active={this.state.buttonsVisible}
              style={subtaskContainerStyle()}>
              <FlatList
                data={this.props.subtasks}
                renderItem={({item, index}) => this.renderSubtask(
                  item,
                  index,
                  () => this.completeSubtask(index),
                  () => this.deleteSubtask(index),
                  () => this.topSubtask(index),
                )}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => this.renderDivider()}
                contentContainerStyle={listPaddingStyle()}
              />
            </ViewVisibleWrapper>
          </View>
          <DateSelector
            dateString={DateUtils.convertDateToString({
              date: this.state.dueDate,
              format: UTILS.dateFormat.yyyy_mm_dd,
            })}
            date={this.state.dueDate}
            updateDate={this.updateTaskDueDate}
            visible={this.state.dateModalVisible}
            closeModal={this.closeModal}
            taskDueDate
            notSelected={this.props.dueDateIndex == UTILS.nullDueDate}
          />
          <SubtaskModal
            visible={this.state.subtaskModalVisible}
            closeModal={this.closeModal}
            description={this.state.subtaskDescription}
            updateDescription={this.updateSubtaskDescription}
            addSubtask={this.addSubtask}
          />
          <RepeatModal
            visible={this.state.repeatModalVisible}
            closeModal={this.closeModal}
            selected={this.props.repeatType}
            repeatValue={this.props.repeatValue}
            updateRepeatValue={this.updateRepeatValue}
            sundayPressed={() => this.updateRepeatType(UTILS.repeatType.sun)}
            mondayPressed={() => this.updateRepeatType(UTILS.repeatType.mon)}
            tuesdayPressed={() => this.updateRepeatType(UTILS.repeatType.tue)}
            wednesdayPressed={() => this.updateRepeatType(UTILS.repeatType.wed)}
            thursdayPressed={() => this.updateRepeatType(UTILS.repeatType.thu)}
            fridayPressed={() => this.updateRepeatType(UTILS.repeatType.fri)}
            saturdayPressed={() => this.updateRepeatType(UTILS.repeatType.sat)}
            fomPressed={() => this.updateRepeatType(UTILS.repeatType.fom)}
            lomPressed={() => this.updateRepeatType(UTILS.repeatType.lom)}
            dfnPressed={() => this.updateRepeatType(UTILS.repeatType.dfn)}
            yearPressed={() => this.updateRepeatType(UTILS.repeatType.year)}
          />
        </View>
    );
  }
}

const containerStyle = (buttonsOpen) => {
  return {
    flex: 1,
    borderWidth: buttonsOpen ? 1 : 0,
    borderRadius: buttonsOpen ? 8 : 0,
    padding: 0,
    paddingTop: buttonsOpen ? 8 : 0,
    borderColor: COLORS.primary[global.colorScheme],
    paddingLeft: 4,
    paddingRight: 4,
  };
};

const innerContainerStyle = () => {
  return {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  };
}

const descriptionContainerStyle = () => {
  return {
    flex: 1,
    flexDirection: 'column',
  };
}

const projectStyle = () => {
  return {
    fontSize: 14,
  }
}

const descriptionStyle = (completed, important) => {
  const color = important ?
    COLORS.primary[global.colorScheme] :
    COLORS.tertiary[global.colorScheme];

  if (completed) {
    return {
      fontWeight: 'bold',
      fontSize: 16,
      textDecorationLine: 'line-through',
      color,
    };
  } else {
    return {
      fontWeight: 'bold',
      fontSize: 16,
      color,
    };
  }
};

const hoursWorkedStyle = () => {
  return {
    fontSize: 12,
    color: COLORS.tertiary[global.colorScheme],
  };
};

const dueDateContainerStyle = () => {
  return {
    backgroundColor: COLORS.primary[global.colorScheme],
    borderRadius: 8,
    flex: 1,
    marginTop: 12,
    marginBottom: 12,
    padding: 6,
  };
};

const dueDateStyle = () => {
  return {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary[global.colorScheme],
  };
};

const unassignedDueDatesDivider = () => {
  return {
    height: 1,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: COLORS.primary[global.colorScheme],
  };
};

const listPaddingStyle = () => {
  return {paddingBottom: 16};
};

const editTextStyle = () => {
  return {
    fontSize: 10,
    color: COLORS.primary[global.colorScheme],
  };
};

const subtaskContainerStyle = () => {
  return {
    flex: 1,
    borderColor: COLORS.primary[global.colorScheme],
  };
};

const swipeInnerContainer = () => {
  return {
    flex: 1,
    alignItems: 'center',
  }
};

const swipeContainerStyle = () => {
  return {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  };
};

const swipeButtonStyle = (marginTop) => {
  return {
    flex: 1,
    flexDirection: 'row',
    marginTop,
  };
};

const subtaskMarkerStyle = () => {
    return {
      height: 8,
      width: 8,
      borderRadius: 8,
      backgroundColor: COLORS.primary[global.colorScheme],
      position: 'absolute',
      right: 0,
    };
};


export default Task;
