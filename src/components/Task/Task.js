import React, {Component} from 'react';
import {TouchableOpacity, Text, View, FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  ViewVisibleWrapper,
  DateSelector,
  Completion,
  Divider,
  Subtask,
} from '_components';
import projectDB from '_data';
import {COLORS} from '_resources';
import {DateUtils} from '_utils';
import {UTILS} from '_constants';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateModalVisible: false,
      dueDate: new Date(),
      showSubtask: false,
    };

    this.taskPressed = this.taskPressed.bind(this);
    this.taskLongPressed = this.taskLongPressed.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openDueDateModal = this.openDueDateModal.bind(this);
    this.updateTaskDueDate = this.updateTaskDueDate.bind(this);
    this.showSubtask = this.showSubtask.bind(this);
    this.completeSubtask = this.completeSubtask.bind(this);
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

  openDueDateModal() {
    let dueDate;
    if (this.props.dueDateIndex == 9999999999999) {
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
    this.setState({dateModalVisible: false});
  }

  updateTaskDueDate(dateObject) {
    const date = new Date(
      dateObject.year,
      dateObject.month - 1,
      dateObject.day,
    );
    const dueDateIndex = DateUtils.getDateIndex({date});

    projectDB.updateTaskDueDate({
      realm: this.props.realm,
      taskID: this.props.taskID,
      dueDateIndex
    });

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

  convertDueDateToText(dueDateIndex) {
    if (dueDateIndex == 9999999999999) {
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

  renderSubtask(subtask, index, completeSubtask) {
    return (
      <Subtask
        description={subtask.description}
        completed={subtask.completed}
        completeSubtask={completeSubtask}
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
          <ViewVisibleWrapper active={project}>
            <Text style={projectStyle()}>Project: {project}</Text>
          </ViewVisibleWrapper>
          <TouchableOpacity
            style={innerContainerStyle()}
            onPress={this.taskPressed}
            onLongPress={this.taskLongPressed}>
          <Completion completed={this.props.completed} />
          <View style={descriptionContainerStyle()}>
            <Text style={descriptionStyle(this.props.completed)}>{this.props.description}</Text>
            <ViewVisibleWrapper active={this.props.hoursWorked > 0 ? true : false}>
              <Text style={hoursWorkedStyle()}>{this.props.hoursWorked} hours worked</Text>
            </ViewVisibleWrapper>
          </View>
          </TouchableOpacity>
        </View>
        <ViewVisibleWrapper
          active={this.state.showSubtask}
          style={subtaskContainerStyle()}>
          <FlatList
            data={this.props.subtasks}
            renderItem={({item, index}) => this.renderSubtask(item, index, () => this.completeSubtask(index))}
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
          notSelected={this.props.dueDateIndex == 9999999999999}
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

const innerContainerStyle = () => {
  return {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 4,
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

const subtaskContainerStyle = () => {
  return {
    flex: 1,
    marginTop: 16,
    borderColor: COLORS.primary[global.colorScheme],
  };
};

export default Task;
