import React from 'react';
import {View} from 'react-native';
import TabBarIcon from './TabBarIcon';
import {ICONS} from '_constants';
import {COLORS} from '_resources';

const ProjectTimerTabBar = ({
  subTaskPressed,
  hoursWorkedPressed,
  goalsPressed,
  editPressed,
}) => {
  return (
    <View style={containerStyle()}>
      <TabBarIcon
        description="Task"
        iconName={ICONS.checkmark}
        onPress={subTaskPressed}
      />
      <TabBarIcon
        description="Hrs Worked"
        iconName={ICONS.clock}
        onPress={hoursWorkedPressed}
      />
      <TabBarIcon
        description="Goals"
        iconName={ICONS.goals}
        onPress={goalsPressed}
      />
      <TabBarIcon
        description="Edit Project"
        iconName={ICONS.edit}
        onPress={editPressed}
      />
    </View>
  );
};

const containerStyle = () => {
  return {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary[global.colorScheme],
  };
};

export default ProjectTimerTabBar;
