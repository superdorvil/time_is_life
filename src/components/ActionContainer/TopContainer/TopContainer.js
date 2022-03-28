import React from 'react';
import {View} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import WeeklyProgress from './WeeklyProgress';
import ActionScreen from './ActionScreen';

const TopContainer = ({
  weeklyProgressActive,
  thisWeeksSecondsWorked,
  thisWeeksGoalSeconds,
  dailySecondsWorked,
  backArrowActive,
  backArrowPressed,
  actionScreenActive,
  centerIconName,
  actionDescription,
  subDescription,
  subDescription2,
  topRightButtonActive,
  topRightButtonDescription,
  topRightButtonPressed,
}) => {
  return (
    <View style={containerStyle()}>
      <ViewVisibleWrapper active={weeklyProgressActive}>
        <WeeklyProgress
          thisWeeksGoalSeconds={thisWeeksGoalSeconds}
          thisWeeksSecondsWorked={thisWeeksSecondsWorked}
          dailySecondsWorked={dailySecondsWorked}
          weeklyHoursFontSizeBig={true}
        />
      </ViewVisibleWrapper>
      <ViewVisibleWrapper active={actionScreenActive}>
        <ActionScreen
          backArrowActive={backArrowActive}
          backArrowPressed={backArrowPressed}
          centerIconName={centerIconName}
          actionDescription={actionDescription}
          subDescription={subDescription}
          subDescription2={subDescription2}
          topRightButtonActive={topRightButtonActive}
          topRightButtonDescription={topRightButtonDescription}
          //={deleteButtonActive}
          topRightButtonPressed={topRightButtonPressed}
        />
      </ViewVisibleWrapper>
    </View>
  );
};

const containerStyle = () => {
  return {
    marginStart: 16,
    marginEnd: 16,
  };
};

export default TopContainer;
