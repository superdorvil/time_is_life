import React, {Component} from 'react';
import {View} from 'react-native';
import {ActionContainer} from '_components';
import {WeeklyGoal} from '_components';
import {ICONS} from '_constants';
import {COLORS} from '_resources';
import projectDB from '_data';
import {HoursUtils, DateUtils} from '_utils';

class ManageWeeklyGoals extends Component {
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

  renderGoal(goalData, extraData) {
    return (
      <WeeklyGoal
        thisWeeksSecondsWorked={projectDB.getSecondsWorked({
          realm: extraData.realm,
          weekIndex: goalData.weekIndex,
        })}
        thisWeeksSecondsGoal={goalData.thisWeeksSecondsGoal}
        updateWeeklyGoal={value => {
          extraData.updateWeeklyGoal(
            extraData.realm,
            goalData.weekIndex,
            value,
          );
        }}
        updateWeeklyGoalSlider={value => {
          extraData.updateWeeklyGoalSlider(value, goalData.index);
        }}
        weekIndex={goalData.weekIndex}
      />
    );
  }

  updateWeeklyGoal(realm, weekIndex, value) {
    projectDB.updateWeeklyGoal({
      realm: realm,
      weekIndex: weekIndex,
      weeklyGoalSeconds: HoursUtils.convertHrsMinsSecsToSeconds({hours: value}),
    });

    this.setState({weeklyGoalWeekIndexes: this.state.weeklyGoalWeekIndexes});
  }

  updateWeeklyGoalSlider(value, index) {
    const weeklyGoalWeekIndexes = this.state.weeklyGoalWeekIndexes;
    weeklyGoalWeekIndexes[index].thisWeeksSecondsGoal = value * 3600;

    this.setState({weeklyGoalWeekIndexes});
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

  render() {
    const actionScreenData = {
      backArrowActive: false,
      editButtonActive: false,
      topRightButtonActive: false,
      centerIconName: ICONS.goals,
      actionDescription: 'Total Weekly Goals',
    };

    return (
      <View style={containerStyle()}>
        <ActionContainer
          extraData={{
            realm: this.props.realm,
            updateWeeklyGoal: this.updateWeeklyGoal,
            updateWeeklyGoalSlider: this.updateWeeklyGoalSlider,
          }}
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionNavBarActive={false}
          actionNavBarData={false}
          topChildActive={false}
          topChild={false}
          bottomChildActive={false}
          bottomChild={false}
          actionButtonActive={false}
          actionButtonPressed={false}
          listData={this.state.weeklyGoalWeekIndexes}
          listDataActive={true}
          renderListItem={this.renderGoal}
          loadPreviousPressed={this.loadPreviousPressed}
          loadPreviousActive={this.state.currentSet !== 0}
          loadMorePressed={this.loadMorePressed}
          loadMoreActive={this.state.loadMoreActive}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {
    flex: 1,
    paddingTop: 48,
    backgroundColor: COLORS.secondary[global.colorScheme],
  };
};

export default ManageWeeklyGoals;
