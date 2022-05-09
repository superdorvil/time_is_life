import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  ActionContainer,
  Button,
  EditHoursWorked,
  TimeSelector,
  DateSelector,
  SelectItemModal,
} from '_components';
import {ICONS, UTILS} from '_constants';
import {COLORS} from '_resources';
import {STATES, SCHEMAS} from '_constants';
import {DateUtils, HoursUtils, InputUtils} from '_utils';
import projectDB from '_data';

class ManageProjectHours extends Component {
  constructor(props) {
    super(props);

    const project = projectDB.getProjects({
      realm: this.props.realm,
      projectID: this.props.projectID,
    });
    const projects = projectDB.getProjects({
      realm: this.props.realm,
    });
    const tasks = projectDB.getTasks({
      realm: this.props.realm,
      projectID: this.props.projectID,
    });

    if (this.props.secondsWorkedID) { // edit mode
      const secondsWorked = projectDB.getSecondsWorked({
        realm: this.props.realm,
        secondsWorkedID: this.props.secondsWorkedID,
      });
      let task = 0;
      if (secondsWorked.taskID) {
        task = projectDB.getTasks({
          realm: this.props.realm,
          taskID: secondsWorked.taskID,
        });
      }
      const startTime = new Date(secondsWorked.startTime);
      const endTime = new Date(secondsWorked.endTime);

      this.state = {
        actionDescription: 'Edit Hours',
        buttonDescription: 'Edit Hours',
        topRightButtonActive: true,
        startTime,
        endTime,
        project,
        projects,
        task,
        tasks,
        editTaskModalVisible: false,
        editProjectModalVisible: false,
        editStartTimeModalVisible: false,
        editEndTimeModalVisible: false,
        editStartDateModalVisible: false,
        editEndDateModalVisible: false,
        startTimeHours: startTime.getHours(),
        endTimeHours: endTime.getHours(),
        startTimeMinutes: startTime.getMinutes(),
        endTimeMinutes: endTime.getMinutes(),
        startTimeSeconds: startTime.getSeconds(),
        endTimeSeconds: endTime.getSeconds(),
        startTimeAMPM: startTime.getHours() >= 12 ? STATES.pm : STATES.am,
        endTimeAMPM: endTime.getHours() >= 12 ? STATES.pm : STATES.am,
      };
    } else {
      const currentDate = new Date();
      currentDate.setSeconds(0);

      this.state = {
        actionDescription: 'Add Hours',
        buttonDescription: '+ Add Hours',
        startTime: new Date(currentDate),
        endTime: new Date(currentDate),
        project,
        projects,
        task: null,
        tasks,
        editTaskModalVisible: false,
        editProjectModalVisible: false,
        editStartTimeModalVisible: false,
        editEndTimeModalVisible: false,
        editStartDateModalVisible: false,
        editEndDateModalVisible: false,
        startTimeHours: currentDate.getHours(),
        endTimeHours: currentDate.getHours(),
        startTimeMinutes: currentDate.getMinutes(),
        endTimeMinutes: currentDate.getMinutes(),
        startTimeSeconds: 0,
        endTimeSeconds: 0,
        startTimeAMPM: currentDate.getHours() >= 12 ? STATES.pm : STATES.am,
        endTimeAMPM: currentDate.getHours() >= 12 ? STATES.pm : STATES.am,
      };
    }

    this.deleteHours = this.deleteHours.bind(this);
    this.manageHours = this.manageHours.bind(this);

    this.projectPressed = this.projectPressed.bind(this);
    this.taskPressed = this.taskPressed.bind(this);

    this.openEditTaskModal = this.openEditTaskModal.bind(this);
    this.openEditProjectModal = this.openEditProjectModal.bind(this);
    this.openEditStartTimeModal = this.openEditStartTimeModal.bind(this);
    this.openEditEndTimeModal = this.openEditEndTimeModal.bind(this);
    this.openEditStartDateModal = this.openEditStartDateModal.bind(this);
    this.openEditEndDateModal = this.openEditEndDateModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.updateStartTimeHours = this.updateStartTimeHours.bind(this);
    this.updateEndTimeHours = this.updateEndTimeHours.bind(this);
    this.updateStartTimeMinutes = this.updateStartTimeMinutes.bind(this);
    this.updateEndTimeMinutes = this.updateEndTimeMinutes.bind(this);
    this.updateStartTimeSeconds = this.updateStartTimeSeconds.bind(this);
    this.updateEndTimeSeconds = this.updateEndTimeSeconds.bind(this);
    this.updateStartTimeAMPM = this.updateStartTimeAMPM.bind(this);
    this.updateEndTimeAMPM = this.updateEndTimeAMPM.bind(this);
    this.confirmStartTimeChange = this.confirmStartTimeChange.bind(this);
    this.confirmEndTimeChange = this.confirmEndTimeChange.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
  }

  openEditTaskModal() {
    this.setState({editTaskModalVisible: true});
  }

  openEditProjectModal() {
    this.setState({editProjectModalVisible: true});
  }

  openEditStartTimeModal() {
    this.setState({editStartTimeModalVisible: true});
  }

  openEditEndTimeModal() {
    this.setState({editEndTimeModalVisible: true});
  }

  openEditStartDateModal() {
    this.setState({editStartDateModalVisible: true});
  }

  openEditEndDateModal() {
    this.setState({editEndDateModalVisible: true});
  }

  closeModal() {
    this.setState({
      editTaskModalVisible: false,
      editProjectModalVisible: false,
      editStartTimeModalVisible: false,
      editEndTimeModalVisible: false,
      editStartDateModalVisible: false,
      editEndDateModalVisible: false,
    });
  }

  updateStartTimeHours(value) {
    this.setState({
      startTimeHours: InputUtils.numberRangeInput({min: 0, max: 23, value}),
    });
  }

  updateEndTimeHours(value) {
    this.setState({
      endTimeHours: InputUtils.numberRangeInput({min: 0, max: 23, value}),
    });
  }

  updateStartTimeMinutes(value) {
    this.setState({
      startTimeMinutes: InputUtils.numberRangeInput({min: 0, max: 59, value}),
    });
  }

  updateEndTimeMinutes(value) {
    this.setState({
      endTimeMinutes: InputUtils.numberRangeInput({min: 0, max: 59, value}),
    });
  }

  updateStartTimeSeconds(value) {
    this.setState({
      startTimeSeconds: InputUtils.numberRangeInput({min: 0, max: 59, value}),
    });
  }

  updateEndTimeSeconds(value) {
    this.setState({
      endTimeSeconds: InputUtils.numberRangeInput({min: 0, max: 59, value}),
    });
  }

  updateStartTimeAMPM() {
    this.setState({startTimeAMPM: !this.state.startTimeAMPM});
  }

  updateEndTimeAMPM() {
    this.setState({endTimeAMPM: !this.state.endTimeAMPM});
  }

  confirmStartTimeChange() {
    const startTime = new Date(this.state.startTime);
    startTime.setHours(this.state.startTimeHours);
    startTime.setMinutes(this.state.startTimeMinutes);
    startTime.setSeconds(this.state.startTimeSeconds);

    this.setState({startTime});
    this.closeModal();
  }

  confirmEndTimeChange() {
    const endTime = new Date(this.state.endTime);
    endTime.setHours(this.state.endTimeHours);
    endTime.setMinutes(this.state.endTimeMinutes);
    endTime.setSeconds(this.state.endTimeSeconds);

    this.setState({endTime});
    this.closeModal();
  }

  updateStartDate(dateObject) {
    const startTime = new Date(this.state.startTime);
    startTime.setFullYear(dateObject.year);
    startTime.setMonth(dateObject.month - 1);
    startTime.setDate(dateObject.day);

    this.setState({startTime});

    this.closeModal();
  }

  updateEndDate(dateObject) {
    const endTime = new Date(this.state.endTime);
    endTime.setFullYear(dateObject.year);
    endTime.setMonth(dateObject.month - 1);
    endTime.setDate(dateObject.day);

    this.setState({endTime});

    this.closeModal();
  }

  projectPressed(projectID) {
    if (projectID !== this.state.project.id) {
      const project = projectDB.getProjects({
        realm: this.props.realm,
        projectID
      });
      const tasks = projectDB.getTasks({
        realm: this.props.realm,
        projectID,
      });

      this.setState({
        project,
        task: null,
        tasks,
        editProjectModalVisible: false
      });
    } else {
      this.setState({editProjectModalVisible: false});
    }
  }

  taskPressed(taskID) {
    let task;

    if (!this.state.task) {
      task = projectDB.getTasks({realm: this.props.realm, taskID});
    } else if (taskID !== this.state.task.id) {
      task = projectDB.getTasks({realm: this.props.realm, taskID});
    } else {
      task = null;
    }

    this.setState({task, editTaskModalVisible: false});
  }

  deleteHours() {
    projectDB.deleteSecondsWorked({
      realm: this.props.realm,
      secondsWorkedID: this.props.secondsWorkedID,
    });

    Actions.pop();
  }

  manageHours() {
    if (this.state.endTime > this.state.startTime) {
      if (this.props.secondsWorkedID) {
        projectDB.updateSecondsWorked({
          realm: this.props.realm,
          secondsWorkedID: this.props.secondsWorkedID,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          projectID: this.state.project.id,
          taskID: this.state.task ? this.state.task.id : 0,
        });
      } else {
        projectDB.createSecondsWorked({
          realm: this.props.realm,
          projectID: this.state.project.id,
          taskID: this.state.task ? this.state.task.id : 0,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
        });
      }

      Actions.pop();
    } else {
      console.log('fix me, add proper error checking for this');
    }
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: false,
      topRightButtonActive: this.state.topRightButtonActive,
      topRightButtonDescription: 'Delete Hours',
      topRightButtonPressed: this.deleteHours,
      centerIconName: ICONS.checkmark,
      actionDescription: this.state.actionDescription,

    };

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
          <View style={innerContainerStyle()}>
            <EditHoursWorked
              startTime={this.state.startTime}
              endTime={this.state.endTime}
              startTimePressed={this.openEditStartTimeModal}
              endTimePressed={this.openEditEndTimeModal}
              startDatePressed={this.openEditStartDateModal}
              endDatePressed={this.openEditEndDateModal}
              projectPressed={this.openEditProjectModal}
              taskPressed={this.openEditTaskModal}
              project={this.state.project.description}
              task={this.state.task ? this.state.task.description : ''}
            />
          </View>
        </ActionContainer>
        <View style={buttonStyle()}>
          <Button
            description={this.state.buttonDescription}
            buttonPressed={this.manageHours}
          />
        </View>
        <SelectItemModal
          items={this.state.projects}
          selectedItemID={this.state.project.id}
          visible={this.state.editProjectModalVisible}
          closeModal={this.closeModal}
          itemPressed={this.projectPressed}
          header="Select Project"
          completeButton
          schema={SCHEMAS.project}
        />
        <SelectItemModal
          items={this.state.tasks}
          selectedItemID={this.state.task ? this.state.task.id : null}
          visible={this.state.editTaskModalVisible}
          closeModal={this.closeModal}
          itemPressed={this.taskPressed}
          header="Select Task"
          completeButton
          schema={SCHEMAS.task}
        />
        <TimeSelector
          visible={this.state.editStartTimeModalVisible}
          setTimeDescription='Set Start Time'
          hours={this.state.startTimeHours}
          minutes={this.state.startTimeMinutes}
          seconds={this.state.startTimeSeconds}
          updateHours={this.updateStartTimeHours}
          updateMinutes={this.updateStartTimeMinutes}
          updateSeconds={this.updateStartTimeSeconds}
          ampmPressed={() => this.updateStartTimeAMPM()}
          ampm={this.state.startTimeAMPM}
          okayPressed={this.confirmStartTimeChange}
          cancelPressed={this.closeModal}
        />
        <TimeSelector
          visible={this.state.editEndTimeModalVisible}
          setTimeDescription='Set End Time'
          hours={this.state.endTimeHours}
          minutes={this.state.endTimeMinutes}
          seconds={this.state.endTimeSeconds}
          updateHours={this.updateEndTimeHours}
          updateMinutes={this.updateEndTimeMinutes}
          updateSeconds={this.updateEndTimeSeconds}
          ampmPressed={() => this.updateEndTimeAMPM()}
          ampm={this.state.endTimeAMPM}
          okayPressed={this.confirmEndTimeChange}
          cancelPressed={this.closeModal}
        />
        <DateSelector
          dateString={DateUtils.convertDateToString({
            date: this.state.startTime,
            format: UTILS.dateFormat.yyyy_mm_dd,
          })}
          date={this.state.startTime}
          updateDate={this.updateStartDate}
          visible={this.state.editStartDateModalVisible}
          closeModal={this.closeModal}
        />
        <DateSelector
          dateString={DateUtils.convertDateToString({
            date: this.state.endTime,
            format: UTILS.dateFormat.yyyy_mm_dd,
          })}
          date={this.state.endTime}
          updateDate={this.updateEndDate}
          visible={this.state.editEndDateModalVisible}
          closeModal={this.closeModal}
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
    marginTop: 24,
    marginStart: 16,
    marginEnd: 16,
  };
};

const buttonStyle = () => {
  return {
    position: 'absolute',
    left: 16,
    bottom: 32,
  };
};

export default ManageProjectHours;
