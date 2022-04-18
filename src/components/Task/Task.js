import React, {Component} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {ViewVisibleWrapper, DateSelector} from '_components';
import Completion from './Completion';
import projectDB from '_data';
import {COLORS} from '_resources';
import {DateUtils} from '_utils';
import {UTILS} from '_constants';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateModalVisible: false,
      tempDate: new Date(),
    };

    this.taskPressed = this.taskPressed.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openDueDateModal = this.openDueDateModal.bind(this);
    this.updateTaskDueDate = this.updateTaskDueDate.bind(this);
  }

  taskPressed() {
    projectDB.completeTask({
      realm: this.props.realm,
      taskID: this.props.taskID,
    });
  }

  openDueDateModal() {
    let tempDate;
    if (this.props.dueDateIndex == 9999999999999) {
      const today = new Date();
      const todayIndex = DateUtils.getDateIndex({date: today});

      tempDate = DateUtils.getDateFromDateIndex({dateIndex: todayIndex});
    } else {
      tempDate = DateUtils.getDateFromDateIndex({dateIndex: this.props.dueDateIndex});
    }

    this.setState({
      tempDate,
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
        dateText = DateUtils.convertDateToString({
          date: dueDate,
          format: UTILS.dateFormat.monthDateYear,
        });
    }

    return dateText;
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
          onLongPress={this.openDueDateModal}>
        <Completion completed={this.props.completed} />
        <View style={descriptionContainerStyle()}>
          <Text style={descriptionStyle(this.props.completed)}>{this.props.description}</Text>
          <ViewVisibleWrapper active={this.props.hoursWorked > 0 ? true : false}>
            <Text style={hoursWorkedStyle()}>{this.props.hoursWorked} hours worked</Text>
          </ViewVisibleWrapper>
        </View>
        <DateSelector
          dateString={DateUtils.convertDateToString({
            date: this.state.tempDate,
            format: UTILS.dateFormat.yyyy_mm_dd,
          })}
          date={this.state.tempDate}
          updateDate={this.updateTaskDueDate}
          visible={this.state.dateModalVisible}
          closeModal={this.closeModal}
          taskDueDate
          notSelected={this.props.dueDateIndex == 9999999999999}
        />
        </TouchableOpacity>
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

export default Task;
