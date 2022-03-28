import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Colors} from '_resources';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';

class ActionContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.backArrowPressed = this.backArrowPressed.bind(this);
  }

  backArrowPressed() {
    Actions.pop();
  }

  render() {
    return (
      <View style={containerStyle()}>
        <TopContainer
          weeklyProgressActive={this.props.weeklyProgressActive}
          thisWeeksSecondsWorked={this.props.thisWeeksSecondsWorked}
          thisWeeksGoalSeconds={this.props.thisWeeksGoalSeconds}
          dailySecondsWorked={this.props.dailySecondsWorked}
          backArrowActive={this.props.actionScreenData.backArrowActive}
          backArrowPressed={this.backArrowPressed}
          actionScreenActive={this.props.actionScreenActive}
          centerIconName={this.props.actionScreenData.centerIconName}
          actionDescription={this.props.actionScreenData.actionDescription}
          subDescription={this.props.actionScreenData.subDescription}
          subDescription2={this.props.actionScreenData.subDescription2}
          topRightButtonActive={
            this.props.actionScreenData.topRightButtonActive
          }
          topRightButtonDescription={
            this.props.actionScreenData.topRightButtonDescription
          }
          topRightButtonPressed={
            this.props.actionScreenData.topRightButtonPressed
          }
        />
        <View style={dividerStyle()} />
        <BottomContainer
          extraData={this.props.extraData}
          actionButtonActive={this.props.actionButtonActive}
          actionButtonPressed={this.props.actionButtonPressed}
          actionButtonDescription={this.props.actionButtonDescription}
          listData={this.props.listData}
          listDataActive={this.props.listDataActive}
          renderListItem={this.props.renderListItem}
          loadPreviousPressed={this.props.loadPreviousPressed}
          loadPreviousActive={this.props.loadPreviousActive}
          loadMorePressed={this.props.loadMorePressed}
          loadMoreActive={this.props.loadMoreActive}>
          {this.props.children}
        </BottomContainer>
      </View>
    );
  }
}

const containerStyle = () => {
  return {
    flex: 1,
    backgroundColor: Colors.secondary[global.colorScheme],
  };
};

const dividerStyle = topBottomContainerDivider => {
  return {
    height: 1,
    backgroundColor: Colors.primary[global.colorScheme],
    marginTop: 16,
  };
};

export default ActionContainer;
