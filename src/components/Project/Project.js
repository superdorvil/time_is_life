import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {ViewVisibleWrapper, TotalHours} from '_components';
import ProjectData from './ProjectData';
import projectDB from '_data';
import {DateUtils, HoursUtils} from '_utils';
import {COLORS} from '_resources';

class Project extends Component {
  constructor(props) {
    super(props);

    if (this.props.timerActive) {
      const project = projectDB.getProjects({
        realm: this.props.realm,
        projectID: this.props.projectID,
      });
      const secondsWorkedToday = this.convertSecondsWorkedToday(
        projectDB.getSecondsWorked({
          realm: this.props.realm,
          projectID: this.props.projectID,
          dateIndex: DateUtils.getDateIndex({date: new Date()}),
        }));
      let secondsWorkedTimer = setInterval(() => this.getSecondsWorked(), 1000);

      this.state = {
        project,
        secondsWorkedToday,
        secondsWorkedTimer,
      };
    } else {
      this.state = {secondsWorkedToday: 0};
    }
  }

  componentWillUnmount() {
    if (this.state.secondsWorkedTimer) {
      clearInterval(this.state.secondsWorkedTimer);
    }
  }

  shouldComponentUpdate(nextProps){
    if (nextProps.timerActive !== this.props.timerActive) {
      return true;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    if(this.props.timerActive !== prevProps.timerActive) {
      if (this.props.timerActive) {
        // overkill?
        if (this.state.secondsWorkedTimer) {
          clearInterval(this.state.secondsWorkedTimer);
        }
        let secondsWorkedTimer = setInterval(() => this.getSecondsWorked(), 1000);
        this.setState({secondsWorkedTimer});
      } else {
        if (this.state.secondsWorkedTimer) {
          clearInterval(this.state.secondsWorkedTimer);
        }
      }
    }
  }

  getSecondsWorked() {
    let secondsWorkedToday = this.convertSecondsWorkedToday(
      projectDB.getSecondsWorked({
        realm: this.props.realm,
        projectID: this.props.projectID,
        dateIndex: DateUtils.getDateIndex({date: new Date()}),
      }) +
      (new Date() - this.props.timerStartTime) / 1000);

    this.setState({secondsWorkedToday});

    if (this.state.secondsWorkedTimer && !this.props.timerActive) {
      clearInterval(this.state.secondsWorkedTimer);
    }
  }

  convertSecondsWorkedToday(seconds) {
    const timeWorked = HoursUtils.convertSecondsToHrsMinsSecs({
      totalSeconds: seconds,
      doubleDigitHours: false,
      doubleDigitMinutes: true,
      doubleDigitSeconds: true,
    });

    return (
      ' ' +
      (timeWorked.hours > 0 ? timeWorked.hours + ' hrs : ' : '') +
      (timeWorked.minutes > 0 ? timeWorked.minutes + ' mins : ' : '') +
      (timeWorked.seconds + ' secs')
    );
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.projectPressed} style={containerStyle()}>
        <View style={innerContainerStyle()}>
          <ViewVisibleWrapper active={this.props.timerActive}>
            <Text style={timerActiveStyle()}>{'Timer Active' + this.state.secondsWorkedToday}</Text>
          </ViewVisibleWrapper>
          <ViewVisibleWrapper active={this.props.deleted}>
            <Text style={deletedStyle()}>Project Deleted tap to restore</Text>
          </ViewVisibleWrapper>
          <ViewVisibleWrapper active={this.props.completed}>
            <Text style={completedStyle()}>Project Complete</Text>
          </ViewVisibleWrapper>
        </View>
        <View style={innerContainerStyle()}>
          <TotalHours totalSecondsWorked={this.props.totalSecondsWorked} />
          <ProjectData
            deleted={this.props.deleted}
            description={this.props.description}
            secondsWorked={this.props.thisWeeksSecondsWorked}
            goalSeconds={this.props.thisWeeksSecondsGoal}
          />
        </View>
      </TouchableOpacity>
    );
  }
};

const containerStyle = () => {
  return {
    flexDirection: 'column',
    paddingTop: 16,
    paddingBottom: 16,
  };
};

const innerContainerStyle = () => {
  return {
    flexDirection: 'row',
  };
};

const timerActiveStyle = () => {
  return {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 8,
    color: COLORS.primary[global.colorScheme],
    backgroundColor: COLORS.tertiary[global.colorScheme],
    alignSelf: 'baseline',
    paddingTop: 6,
    paddingBottom: 6,
    paddingStart: 16,
    paddingEnd: 16,
    borderRadius: 8,
    fontWeight: 'bold',
    marginRight: 16,
    borderWidth: 1.25,
    borderColor: COLORS.primary[global.colorScheme],
  };
};

const completedStyle = () => {
  return {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 8,
    color: COLORS.secondary[global.colorScheme],
    backgroundColor: COLORS.primary[global.colorScheme],
    paddingTop: 6,
    paddingBottom: 6,
    paddingStart: 16,
    paddingEnd: 16,
    borderRadius: 8,
    fontWeight: 'bold',
  };
};

const deletedStyle = () => {
  return {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 8,
    color: COLORS.primary[global.colorScheme],
    backgroundColor: COLORS.tertiary[global.colorScheme],
    alignSelf: 'baseline',
    paddingTop: 6,
    paddingBottom: 6,
    paddingStart: 16,
    paddingEnd: 16,
    borderRadius: 8,
    fontWeight: 'bold',
    marginRight: 16,
  };
};

export default Project;
