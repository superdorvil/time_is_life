import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  ActionContainer,
  ArrowIncrementer,
  HoursWorked,
  TimeSelector,
  SelectTaskModal,
  DateSelector,
} from '_components';
import projectDB from '_data';
import {ICONS, STATES, UTILS} from '_constants';
import {InputUtils, DateUtils} from '_utils';

class EditProjectHours extends Component {
  constructor(props) {
    super(props);
    const weekIndex = DateUtils.getWeekIndex({date: new Date()});
    const secondsWorked = projectDB.getSecondsWorked({
      realm: this.props.realm,
      projectID: this.props.project.id,
      weekIndex,
      returnList: true,
    });
    const secondsWorkedDisplay = this.formatSecondsWorked(secondsWorked);
    const project = projectDB.getProjects({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });
    const tasks = projectDB.getTasks({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });

    this.state = {
      project,
      secondsWorked,
      secondsWorkedDisplay,
      tasks,
      startTimeModalVisible: false,
      endTimeModalVisible: false,
      editTaskModalVisible: false,
      setTimeHours: 0,
      setTimeMinutes: 0,
      startDate: new Date(),
      endDate: new Date(),
      tempDate: new Date(),
      ampm: STATES.am,
      secondsWorkedID: 0,
      weekIndex,
      currentWeeksDescription: 'This Weeks Hours',
    };

    this.taskPressed = this.taskPressed.bind(this);
    this.addPressed = this.addPressed.bind(this);
    this.ampmPressed = this.ampmPressed.bind(this);
    this.openStartTimeModal = this.openStartTimeModal.bind(this);
    this.openEndTimeModal = this.openEndTimeModal.bind(this);
    this.openStartDateModal = this.openStartDateModal.bind(this);
    this.openEndDateModal = this.openEndDateModal.bind(this);
    this.openEditTaskModal = this.openEditTaskModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateSetTimeHours = this.updateSetTimeHours.bind(this);
    this.updateSetTimeMinutes = this.updateSetTimeMinutes.bind(this);
    this.updateDateWorked = this.updateDateWorked.bind(this);
    this.updateSecondsWorked = this.updateSecondsWorked.bind(this);
    this.loadNextWeeksSeconds = this.loadNextWeeksSeconds.bind(this);
    this.loadPreviousWeeksSeconds = this.loadPreviousWeeksSeconds.bind(this);
  }

  componentDidMount() {
    this.state.project.addListener(() => {
      this.setState({
        project: projectDB.getProjects({
          realm: this.props.realm,
          projectID: this.state.project.id,
        }),
      });
    });
    this.state.secondsWorked.addListener(() => {
      const secondsWorked = projectDB.getSecondsWorked({
        realm: this.props.realm,
        projectID: this.state.project.id,
        weekIndex: this.state.weekIndex,
        returnList: true,
      });
      const secondsWorkedDisplay = this.formatSecondsWorked(secondsWorked);
      this.setState({
        secondsWorked,
        secondsWorkedDisplay,
        listData: secondsWorkedDisplay,
      });
    });
    this.state.tasks.addListener(() => {
      this.setState({
        task: projectDB.getTasks({
          realm: this.props.realm,
          projectID: this.state.project.id,
        }),
      });
    });
  }

  componentWillUnmount() {
    this.state.secondsWorked.removeAllListeners();
    this.state.project.removeAllListeners();
    this.state.tasks.removeAllListeners();

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  openStartTimeModal(secondsWorkedID) {
    this.setState({startTimeModalVisible: true, secondsWorkedID});
  }

  openEndTimeModal(secondsWorkedID) {
    this.setState({endTimeModalVisible: true, secondsWorkedID});
  }

  openStartDateModal(secondsWorkedID) {
    const tempDate = new Date(
      projectDB
        .getSecondsWorked({realm: this.props.realm, secondsWorkedID})
        .startTime.getTime(),
    );

    this.setState({startDateModalVisible: true, secondsWorkedID, tempDate});
  }

  /*new Date(
    dateObject.year,
    dateObject.month - 1,
    dateObject.day,
  );
  var copiedDate = new Date(date.getTime());*/
  openEndDateModal(secondsWorkedID) {
    const tempDate = new Date(
      projectDB
        .getSecondsWorked({realm: this.props.realm, secondsWorkedID})
        .endTime.getTime(),
    );

    this.setState({endDateModalVisible: true, secondsWorkedID, tempDate});
  }

  openEditTaskModal(secondsWorkedID) {
    this.setState({editTaskModalVisible: true, secondsWorkedID});
  }

  closeModal() {
    this.setState({
      startTimeModalVisible: false,
      endTimeModalVisible: false,
      startDateModalVisible: false,
      endDateModalVisible: false,
      editTaskModalVisible: false,
    });
  }

  updateSetTimeHours(value) {
    this.setState({
      setTimeHours: InputUtils.numberRangeInput({min: 0, max: 23, value}),
    });
  }

  updateSetTimeMinutes(value) {
    this.setState({
      setTimeMinutes: InputUtils.numberRangeInput({min: 0, max: 59, value}),
    });
  }

  ampmPressed(ampm) {
    this.setState({ampm});
  }

  updateSecondsWorked() {
    projectDB.updateSecondsWorked({
      realm: this.props.realm,
      secondsWorkedID: this.state.secondsWorkedID,
      hours: this.state.setTimeHours,
      minutes: this.state.setTimeMinutes,
      updateStartTime: this.state.startTimeModalVisible,
    });

    this.closeModal();
  }

  updateDateWorked(dateObject) {
    const date = new Date(
      dateObject.year,
      dateObject.month - 1,
      dateObject.day,
    );

    projectDB.updateSecondsWorked({
      realm: this.props.realm,
      secondsWorkedID: this.state.secondsWorkedID,
      date,
      updateStartTime: this.state.startDateModalVisible,
    });

    this.closeModal();
  }

  formatSecondsWorked(secondsWorked) {
    const secondsWorkedDisplay = [];
    let swHelper = [];
    let currentDateIndex = 0;

    if (secondsWorked.length > 0) {
      currentDateIndex = secondsWorked[0].dateIndex;

      for (let i = 0; i < secondsWorked.length; i++) {
        if (currentDateIndex !== secondsWorked[i].dateIndex) {
          secondsWorkedDisplay.push({
            secondsWorkedList: swHelper,
            date: swHelper[0].startTime,
          });

          swHelper = [];
          currentDateIndex = secondsWorked[i].dateIndex;
        }

        swHelper.push({
          id: secondsWorked[i].id,
          startTime: secondsWorked[i].startTime,
          endTime: secondsWorked[i].endTime,
          task:
            secondsWorked[i].taskID > 0
              ? projectDB.getTasks({
                  realm: this.props.realm,
                  taskID: secondsWorked[i].taskID,
                }).description
              : null,
        });

        // last element
        if (i === secondsWorked.length - 1) {
          secondsWorkedDisplay.push({
            secondsWorkedList: swHelper,
            date: swHelper[0].startTime,
          });
        }
      }
    }

    return secondsWorkedDisplay;
  }

  addPressed() {
    Actions.addProjectHours({
      realm: this.props.realm,
      project: this.state.project,
    });
  }

  taskPressed(realm, taskID, secondsWorkedID) {
    projectDB.setSecondsWorkedTask({
      realm,
      taskID,
      secondsWorkedID,
    });
  }

  loadNextWeeksSeconds() {
    const weekIndex = this.state.weekIndex - 1;

    this.loadSecondsWorked(weekIndex);
  }

  loadPreviousWeeksSeconds() {
    const weekIndex = this.state.weekIndex + 1;

    this.loadSecondsWorked(weekIndex);
  }

  loadSecondsWorked(weekIndex) {
    const secondsWorked = projectDB.getSecondsWorked({
      realm: this.props.realm,
      projectID: this.state.project.id,
      weekIndex,
      returnList: true,
    });
    const secondsWorkedDisplay = this.formatSecondsWorked(secondsWorked);
    this.setState({
      weekIndex,
      secondsWorked,
      secondsWorkedDisplay,
      listData: secondsWorkedDisplay,
      currentWeeksDescription: this.getCurrentWeekDescription(weekIndex),
    });
  }

  getCurrentWeekDescription(weekIndex) {
    let description = '';
    const currentWeekIndex = DateUtils.getWeekIndex({date: new Date()});

    switch (weekIndex) {
      case currentWeekIndex:
        description = 'This Weeks Hours';
        break;
      case currentWeekIndex + 1:
        description = 'Next Weeks Hours';
        break;
      case currentWeekIndex - 1:
        description = 'Last Weeks Hours';
        break;
      default:
        description =
          DateUtils.convertDateToString({
            date: {
              d1: DateUtils.getDateFromWeekIndex({
                weekIndex,
                weekday: 0,
              }),
              d2: DateUtils.getDateFromWeekIndex({
                weekIndex,
                weekday: 6,
              }),
            },
            format: UTILS.dateFormat.monDate_monDate,
          }) + '   Hours';
    }

    return description;
  }

  renderHoursWorked(listData, extraData) {
    return (
      <HoursWorked
        date={listData.date}
        secondsWorkedList={listData.secondsWorkedList}
        editStartTime={secondsWorkedID =>
          extraData.openStartTimeModal(secondsWorkedID)
        }
        editEndTime={secondsWorkedID =>
          extraData.openEndTimeModal(secondsWorkedID)
        }
        editStartDate={secondsWorkedID =>
          extraData.openStartDateModal(secondsWorkedID)
        }
        editEndDate={secondsWorkedID =>
          extraData.openEndDateModal(secondsWorkedID)
        }
        editTask={secondsWorkedID =>
          extraData.openEditTaskModal(secondsWorkedID)
        }
      />
    );
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      centerIconName: ICONS.clock,
      actionDescription: this.state.project.description,
      topRightButtonActive: true,
      topRightButtonDescription: '+ add hours',
      topRightButtonPressed: this.addPressed,
    };

    return (
      <View style={containerStyle()}>
        <ActionContainer
          extraData={{
            realm: this.props.realm,
            project: this.state.project,
            openStartTimeModal: this.openStartTimeModal,
            openEndTimeModal: this.openEndTimeModal,
            openStartDateModal: this.openStartDateModal,
            openEndDateModal: this.openEndDateModal,
            openEditTaskModal: this.openEditTaskModal,
          }}
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          listData={this.state.secondsWorkedDisplay}
          listDataActive={true}
          renderListItem={this.renderHoursWorked}
          topBottomContainerDivider>
          <ArrowIncrementer
            dateInfo={this.state.currentWeeksDescription}
            incrementIndex={this.loadNextWeeksSeconds}
            decrementIndex={this.loadPreviousWeeksSeconds}
          />
        </ActionContainer>
        <TimeSelector
          visible={
            this.state.startTimeModalVisible || this.state.endTimeModalVisible
          }
          setTimeDescription={
            this.state.startTimeModalVisible ? 'Set Start Time' : 'Set End Time'
          }
          hours={this.state.setTimeHours}
          minutes={this.state.setTimeMinutes}
          updateHours={this.updateSetTimeHours}
          updateMinutes={this.updateSetTimeMinutes}
          amPressed={() => this.ampmPressed(STATES.am)}
          pmPressed={() => this.ampmPressed(STATES.pm)}
          ampm={this.state.ampm}
          okayPressed={this.updateSecondsWorked}
          cancelPressed={this.closeModal}
        />
        <SelectTaskModal
          realm={this.props.realm}
          tasks={this.state.tasks}
          secondsWorkedID={this.state.secondsWorkedID}
          visible={this.state.editTaskModalVisible}
          closeModal={this.closeModal}
          taskPressed={this.taskPressed}
        />
        <DateSelector
          dateString={DateUtils.convertDateToString({
            date: this.state.tempDate,
            format: UTILS.dateFormat.yyyy_mm_dd,
          })}
          date={this.state.tempDate}
          updateDate={this.updateDateWorked}
          visible={this.state.startDateModalVisible}
          closeModal={this.closeModal}
        />
        <DateSelector
          dateString={DateUtils.convertDateToString({
            date: this.state.tempDate,
            format: UTILS.dateFormat.yyyy_mm_dd,
          })}
          date={this.state.tempDate}
          updateDate={this.updateDateWorked}
          visible={this.state.endDateModalVisible}
          closeModal={this.closeModal}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

export default EditProjectHours;
