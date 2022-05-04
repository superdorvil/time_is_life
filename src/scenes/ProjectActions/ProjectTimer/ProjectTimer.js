import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  ProjectClock,
  StartStopButton,
  BackArrow,
  ConfirmationModal,
  ProjectTimerTabBar,
  TopRightButton,
} from '_components';
import {COLORS} from '_resources';
import {ICONS} from '_constants';
import projectDB from '_data';
import {DateUtils, HoursUtils} from '_utils';

class ProjectTimer extends Component {
  constructor(props) {
    super(props);

    const project = projectDB.getProjects({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });
    const secondsWorkedToday = projectDB.getSecondsWorked({
      realm: this.props.realm,
      projectID: this.props.project.id,
      dateIndex: DateUtils.getDateIndex({date: new Date()}),
    });
    let secondsWorkedTimer = project.timerActive
      ? setInterval(() => this.getSecondsWorked(), 1000)
      : null;

    this.state = {
      project,
      secondsWorkedToday,
      thisWeeksHoursWorked: {hours: 0, minutes: 0, seconds: 0},
      totalHoursWorked: {hours: 0, minutes: 0, seconds: 0},
      secondsWorkedTimer,
    };

    this.timerPressed = this.timerPressed.bind(this);
    this.backArrowPressed = this.backArrowPressed.bind(this);
    //this.closeModal = this.closeModal.bind(this);
    this.tabBarPressed = this.tabBarPressed.bind(this);
    this.completePressed = this.completePressed.bind(this);
  }

  componentDidMount() {
    this.state.project.addListener(() => {
      this.setState({
        project: projectDB.getProjects({
          realm: this.props.realm,
          projectID: this.props.project.id,
          confirmExitModalVisible: false,
        }),
      });
    });
  }

  componentWillUnmount() {
    this.state.project.removeAllListeners();

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  closeModal() {
    this.setState({confirmExitModalVisible: false});
  }

  backArrowPressed() {
    /*if (this.state.project.timerActive) {
      this.setState({confirmExitModalVisible: true});
    } else {
      Actions.pop();
    }*/
    Actions.pop();
  }

  getSecondsWorked() {
    const secondsWorkedToday =
      projectDB.getSecondsWorked({
        realm: this.props.realm,
        projectID: this.props.project.id,
        dateIndex: DateUtils.getDateIndex({date: new Date()}),
      }) +
      (new Date() - this.state.project.timerStartTime) / 1000;
    const thisWeeksHoursWorked = HoursUtils.convertSecondsToHrsMinsSecs({
      totalSeconds: secondsWorkedToday + this.state.project.thisWeeksSecondsWorked,
      doubleDigitHours: false,
      doubleDigitMinutes: true,
      doubleDigitSeconds: true,
    });
    const totalHoursWorked = HoursUtils.convertSecondsToHrsMinsSecs({
      totalSeconds: secondsWorkedToday + this.state.project.totalSecondsWorked,
      doubleDigitHours: false,
      doubleDigitMinutes: true,
      doubleDigitSeconds: true,
    });

    this.setState({
      secondsWorkedToday,
      thisWeeksHoursWorked,
      totalHoursWorked,
    });
  }

  completePressed() {
    projectDB.completeProject({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });
  }

  timerPressed() {
    if (this.state.project.timerActive) {
      projectDB.stopTimer({
        realm: this.props.realm,
        projectID: this.props.project.id,
      });

      clearInterval(this.state.secondsWorkedTimer);
    } else {
      projectDB.startTimer({
        realm: this.props.realm,
        projectID: this.props.project.id,
      });

      const secondsWorkedTimer = setInterval(
        () => this.getSecondsWorked(),
        1000,
      );
      this.setState({secondsWorkedTimer});
    }
  }

  tabBarPressed(tabBar) {
    switch (tabBar) {
      case ICONS.checkmark:
        Actions.projectTask({
          realm: this.props.realm,
          project: this.state.project,
        });
        break;
      case ICONS.clock:
        Actions.projectHoursWorked({
          realm: this.props.realm,
          project: this.state.project,
        });
        break;
      case ICONS.goals:
        Actions.projectGoals({
          realm: this.props.realm,
          project: this.state.project,
        });
        break;
      case ICONS.edit:
        Actions.manageProject({
          realm: this.props.realm,
          project: this.props.project,
        });
        break;
      default:
      // fixme: error checking
    }
  }

  render() {
    return (
      <View style={containerStyle()}>
        <View style={backArrowContainerStyle()}>
          <BackArrow backArrowPressed={this.backArrowPressed} />
        </View>
        <View style={topRightButtonStyle()}>
          <TopRightButton
            topRightButtonActive={true}
            topRightButtonDescription={this.props.project.completed ? 'Mark Incomplete' : 'Mark Complete'}
            topRightButtonPressed={this.completePressed}
          />
        </View>
        <Text style={projectNameStyle()}>{this.props.project.description}</Text>
        <View style={timerContainerStyle()}>
          <ProjectClock secondsWorked={this.state.secondsWorkedToday} />
          <StartStopButton
            stopMode={this.state.project.timerActive}
            timerPressed={this.timerPressed}
          />
        </View>
        {/*<ConfirmationModal
          visible={this.state.confirmExitModalVisible}
          header="Stop Timer???"
          description="Press okay and the timer will record your time."
          iconName={ICONS.clock}
          okayPressed={() => {
            this.timerPressed();
            Actions.pop();
          }}
          cancelPressed={this.closeModal}
        />*/}
        <View style={projectDataContainerStyle()}>
          <Text>
            {this.props.project.completed ? 'Project Complete' : 'Project Incomplete'}
          </Text>
          <Text>
            {'This Weeks Hours ' +
            this.state.thisWeeksHoursWorked.hours + ' hrs : ' +
            this.state.thisWeeksHoursWorked.minutes + ' mins'}
          </Text>
          <Text>
            {'Total Hours ' +
            this.state.totalHoursWorked.hours + ' hrs : ' +
            this.state.totalHoursWorked.minutes + ' mins'}
          </Text>
        </View>
        <ProjectTimerTabBar
          subTaskPressed={() => this.tabBarPressed(ICONS.checkmark)}
          hoursWorkedPressed={() => this.tabBarPressed(ICONS.clock)}
          goalsPressed={() => this.tabBarPressed(ICONS.goals)}
          editPressed={() => this.tabBarPressed(ICONS.edit)}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {
    flex: 1,
    backgroundColor: COLORS.secondary[global.colorScheme],
  };
};

const timerContainerStyle = () => {
  return {
    paddingTop: 32,
    flex: 1,
  };
};

const projectDataContainerStyle = () => {
  return {
    borderWidth: 1,
    alignSelf: 'center',
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 24,
    borderRadius: 8,
    borderColor: COLORS.primary[global.colorScheme],
    alignItems: 'center',
  };
};

const projectNameStyle = () => {
  return {
    textAlign: 'center',
    fontSize: 24,
    color: COLORS.primary[global.colorScheme],
    marginStart: 32,
    marginEnd: 32,
    marginTop: 32,
  };
};

const backArrowContainerStyle = () => {
  return {alignSelf: 'baseline'};
};

const topRightButtonStyle = () => {
  return {
    paddingEnd: 16,
    paddingTop: 16,
    paddingBottom: 16,
    position: 'absolute',
    top: 0,
    right: 0,
  };
};

export default ProjectTimer;
