import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer, WeeklyGoal} from '_components';
import projectDB from '_data';
import {ICONS} from '_constants';
import {HoursUtils, DateUtils} from '_utils';

class ProjectGoals extends Component {
  constructor(props) {
    super(props);
    const currentWeekIndex = DateUtils.getWeekIndex({date: new Date()});
    const weeklyGoalWeekIndexes = []; // 10 weeks
    for (let i = 0; i < 10; i++) {
      weeklyGoalWeekIndexes.push({
        index: i,
        weekIndex: currentWeekIndex - i,
        thisWeeksSecondsGoal: projectDB.getWeeklyGoals({
          realm: this.props.realm,
          weekIndex: currentWeekIndex - i,
          projectID: this.props.project.id,
        }),
      });
    }

    this.state = {
      currentSet: 0,
      loadMoreActive: true,
      weeklyGoalWeekIndexes,
    };

    this.updateWeeklyGoal = this.updateWeeklyGoal.bind(this);
    this.updateWeeklyGoalSlider = this.updateWeeklyGoalSlider.bind(this);
    this.loadMorePressed = this.loadMorePressed.bind(this);
    this.loadPreviousPressed = this.loadPreviousPressed.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  editProject() {
    Actions.editProject({realm: this.props.realm, project: this.props.project});
  }

  loadMorePressed() {
    const currentSet = this.state.currentSet - 1;

    this.loadWeeklyGoalIndexes(currentSet);
  }

  loadPreviousPressed() {
    const currentSet = this.state.currentSet + 1;
    if (currentSet > 0) {
      return;
    }

    this.loadWeeklyGoalIndexes(currentSet);
  }

  loadWeeklyGoalIndexes(currentSet) {
    const currentWeekIndex =
      DateUtils.getWeekIndex({date: new Date()}) + currentSet * 10;
    const weeklyGoalWeekIndexes = []; // 10 weeks

    for (let i = 0; i < 10; i++) {
      weeklyGoalWeekIndexes.push({
        index: i,
        weekIndex: currentWeekIndex - i,
        thisWeeksSecondsGoal: projectDB.getWeeklyGoals({
          realm: this.props.realm,
          weekIndex: currentWeekIndex - i,
        }),
      });
    }

    this.setState({currentSet, weeklyGoalWeekIndexes});
  }

  renderGoal(listData, extraData) {
    return (
      <WeeklyGoal
        thisWeeksSecondsWorked={projectDB.getSecondsWorked({
          realm: extraData.realm,
          weekIndex: listData.weekIndex,
          projectID: extraData.project.id,
        })}
        thisWeeksSecondsGoal={listData.thisWeeksSecondsGoal}
        updateWeeklyGoal={value => {
          extraData.updateWeeklyGoal(
            extraData.realm,
            listData.weekIndex,
            extraData.project.id,
            value,
          );
        }}
        updateWeeklyGoalSlider={value => {
          extraData.updateWeeklyGoalSlider(value, listData.index);
        }}
        weekIndex={listData.weekIndex}
      />
    );
  }

  updateWeeklyGoal(realm, weekIndex, projectID, value) {
    projectDB.updateWeeklyGoal({
      realm: realm,
      weekIndex: weekIndex,
      projectID: projectID,
      weeklyGoalSeconds: HoursUtils.convertHrsMinsSecsToSeconds({hours: value}),
    });

    this.setState({
      listData: this.state.weeklyGoalWeekIndexes,
      weeklyGoalWeekIndexes: this.state.weeklyGoalWeekIndexes,
    });
  }

  updateWeeklyGoalSlider(value, index) {
    const weeklyGoalWeekIndexes = this.state.weeklyGoalWeekIndexes;
    weeklyGoalWeekIndexes[index].thisWeeksSecondsGoal = value * 3600;

    this.setState({weeklyGoalWeekIndexes});
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      centerIconName: ICONS.goals,
      actionDescription: this.props.project.description,
    };

    return (
      <View style={containerStyle()}>
        <ActionContainer
          extraData={{
            realm: this.props.realm,
            project: this.props.project,
            updateWeeklyGoal: this.updateWeeklyGoal,
            updateWeeklyGoalSlider: this.updateWeeklyGoalSlider,
          }}
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          listData={this.state.weeklyGoalWeekIndexes}
          listDataActive={true}
          renderListItem={this.renderGoal}
          loadPreviousPressed={this.loadPreviousPressed}
          loadPreviousActive={this.state.currentSet !== 0}
          loadMorePressed={this.loadMorePressed}
          loadMoreActive={this.state.loadMoreActive}
          topBottomContainerDivider
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

export default ProjectGoals;
