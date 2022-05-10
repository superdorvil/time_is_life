import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer, ArrowIncrementer, HoursWorked} from '_components';
import projectDB from '_data';
import {ICONS, UTILS} from '_constants';
import {InputUtils, DateUtils} from '_utils';

class ProjectHoursWorked extends Component {
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

    this.state = {
      project,
      secondsWorked,
      secondsWorkedDisplay,
      weekIndex,
      currentWeeksDescription: 'This Weeks Hours',
    };

    this.addHoursPressed = this.addHoursPressed.bind(this);
    this.editHoursPressed = this.editHoursPressed.bind(this);
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
  }

  componentWillUnmount() {
    if (this.state.secondsWorked) {
      this.state.secondsWorked.removeAllListeners();
    }
    if (this.state.project) {
      this.state.project.removeAllListeners();
    }

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
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

  addHoursPressed() {
    Actions.manageProjectHours({
      realm: this.props.realm,
      projectID: this.state.project.id,
    });
  }

  editHoursPressed(realm, secondsWorkedID, projectID) {
    Actions.manageProjectHours({
      realm,
      secondsWorkedID,
      projectID,
    });
  }

  renderHoursWorked(listData, extraData) {
    return (
      <HoursWorked
        key={listData.id}
        realm={extraData.realm}
        date={listData.date}
        projectID={extraData.project.id}
        secondsWorkedList={listData.secondsWorkedList}
        editStartTime={secondsWorkedID =>
          extraData.openStartTimeModal(secondsWorkedID)
        }
        editEndTime={secondsWorkedID =>
          extraData.openEndTimeModal(secondsWorkedID)
        }
        editHoursPressed={extraData.editHoursPressed}
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
      topRightButtonPressed: this.addHoursPressed,
    };

    return (
      <View style={containerStyle()}>
        <ActionContainer
          extraData={{
            realm: this.props.realm,
            project: this.state.project,
            editHoursPressed: this.editHoursPressed,
          }}
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          listData={this.state.secondsWorkedDisplay}
          listDataActive={true}
          renderListItem={this.renderHoursWorked}
          topBottomContainerDivider
          dividerColorPrimary={true}>
          <ArrowIncrementer
            dateInfo={this.state.currentWeeksDescription}
            incrementIndex={this.loadNextWeeksSeconds}
            decrementIndex={this.loadPreviousWeeksSeconds}
          />
        </ActionContainer>
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

export default ProjectHoursWorked;
