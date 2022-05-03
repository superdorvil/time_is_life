import React, {Component} from 'react';
import {Animated, TouchableOpacity, Text, View, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Swipeable} from 'react-native-gesture-handler';
import {
  ViewVisibleWrapper,
  DateSelector,
  Completion,
  Divider,
  Subtask,
  SubtaskModal,
  SwipeButton,
} from '_components';
import projectDB from '_data';
import {COLORS} from '_resources';
import {DateUtils} from '_utils';
import {ICONS, UTILS} from '_constants';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateModalVisible: false,
      dueDate: new Date(),
      showSubtask: false,
      swipeOpen: false,
      subtaskModalVisible: false,
      subtaskDescription: '',
    };

    this.taskPressed = this.taskPressed.bind(this);
    this.taskLongPressed = this.taskLongPressed.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openDueDateModal = this.openDueDateModal.bind(this);
    this.updateTaskDueDate = this.updateTaskDueDate.bind(this);
    this.showSubtask = this.showSubtask.bind(this);
    this.completeSubtask = this.completeSubtask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.addSubtask = this.addSubtask.bind(this);
    this.updateSubtaskDescription = this.updateSubtaskDescription.bind(this);
  }

  taskPressed() {
    if (this.props.subtasks.length > 0) {
      this.setState({showSubtask: !this.state.showSubtask});
    } else {
      projectDB.completeTask({
        realm: this.props.realm,
        taskID: this.props.taskID,
      });
    }
  }

  taskLongPressed() {
    Actions.manageTask({
      realm: this.props.realm,
      taskID: this.props.taskID,
      projectID: this.props.projectID,
    });
  }

  showSubtask() {
    this.setState({showSubtask: !this.state.showSubtask});
  }

  openSubtaskModal() {
    this.setState({subtaskModalVisible: true});
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
    });
  }

  swipeOpen() {
    this.setState({swipeOpen: true});
  }

  swipeClose() {
    this.setState({swipeOpen: false});
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

    this.props.subtasks.forEach((subtask, i) => {
      subtasks.push({
        description: subtask.description,
        completed: subtask.completed
      });
    });
    [subtasks[0], subtasks[index]] = [subtasks[index], subtasks[0]];

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
        index={index}
        description={subtask.description}
        completed={subtask.completed}
        completeSubtask={completeSubtask}
        deleteSubtask={deleteSubtask}
        topSubtask={topSubtask}
      />
    );
  }

  renderEditTaskSwipeButtons(
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
    topTask,
    manageTask,
    openDueDateModal,
    addSubtask,
    deleteTask
  ) {
    const opacity = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={swipeContainerStyle()}>
        <View style={swipeInnerContainer()}>
          <Animated.View style={[swipeButtonStyle(), {opacity}]}>
            <SwipeButton
              displayName="Top"
              iconName={ICONS.up_arrow}
              onPress={topTask}
            />
            <SwipeButton
              displayName="Edit"
              iconName={ICONS.edit}
              onPress={manageTask}
            />
            <SwipeButton
              displayName="Date"
              iconName={ICONS.calendar}
              onPress={openDueDateModal}
            />
            <SwipeButton
              displayName="Subtask"
              iconName={ICONS.checkmark}
              onPress={addSubtask}
            />
            <SwipeButton
              displayName="Delete"
              iconName={ICONS.trash}
              onPress={deleteTask}
            />
          </Animated.View>
        </View>
      </View>
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
          <View style={containerStyle()}>
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
                !dueDateToText
              }
            />
            <Swipeable
              key={this.props.taskID}
              renderRightActions={(
                progress,
                dragX,
                topTask,
                manageTask,
                openDueDateModal,
                openSubtaskModal,
                deleteTask,
              ) => this.renderEditTaskSwipeButtons(
                progress,
                dragX,
                () => this.topTask(),
                () => this.taskLongPressed(),
                () => this.openDueDateModal(),
                () => this.openSubtaskModal(),
                () => this.deleteTask(),
              )}
              onSwipeableOpen={() => this.swipeOpen()}
              onSwipeableClose={() => this.swipeClose()}>
              <ViewVisibleWrapper active={project && !this.state.swipeOpen}>
                <Text style={projectStyle()}>Project: {project}</Text>
              </ViewVisibleWrapper>
              <TouchableOpacity
                style={innerContainerStyle(this.state.swipeOpen, this.state.showSubtask)}
                onPress={this.taskPressed}
                onLongPress={this.taskLongPressed}>
              <Completion completed={this.props.completed} />
              <View style={descriptionContainerStyle()}>
                <Text style={descriptionStyle(this.props.completed)}>{this.props.description}</Text>
                <ViewVisibleWrapper active={this.props.hoursWorked > 0 ? true : false}>
                  <Text style={hoursWorkedStyle()}>{this.props.hoursWorked} hours worked</Text>
                </ViewVisibleWrapper>
              </View>
              <ViewVisibleWrapper
                active={this.props.subtasks.length > 0}
                style={subtaskMarkerStyle()}
              />
              </TouchableOpacity>
            </Swipeable>
          </View>
          <ViewVisibleWrapper
            active={this.state.showSubtask}
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
        </View>
    );
  }
}

const containerStyle = () => {
  return {
    flex: 1,
  };
};

const innerContainerStyle = (swipeOpen, subtaskVisible) => {
  return {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: swipeOpen ? 24 : 16,
    paddingBottom: subtaskVisible ? 8 : 16,
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

const descriptionStyle = completed => {
  if (completed) {
    return {
      fontWeight: 'bold',
      fontSize: 16,
      textDecorationLine: 'line-through',
      color: COLORS.tertiary[global.colorScheme],
    };
  } else {
    return {
      fontWeight: 'bold',
      fontSize: 16,
      color: COLORS.tertiary[global.colorScheme],
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

const swipeButtonStyle = () => {
  return {
    flex: 1,
    flexDirection: 'row',
  };
};

const subtaskMarkerStyle = () => {
    return {
      height: 4,
      width: 4,
      borderRadius: 4,
      backgroundColor: COLORS.primary[global.colorScheme],
    };
};

export default Task;
