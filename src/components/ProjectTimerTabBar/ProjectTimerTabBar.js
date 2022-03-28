import React from 'react';
import {View} from 'react-native';
import TabBarIcon from './TabBarIcon';
import {Icons} from '_constants';
import {Colors} from '_resources';

const ProjectTimerTabBar = ({
  subTaskPressed,
  hoursWorkedPressed,
  goalsPressed,
}) => {
  return (
    <View style={containerStyle()}>
      <TabBarIcon
        description="Task"
        iconName={Icons.checkmark}
        onPress={subTaskPressed}
      />
      <TabBarIcon
        description="Hrs Worked"
        iconName={Icons.clock}
        onPress={hoursWorkedPressed}
      />
      <TabBarIcon
        description="Goals"
        iconName={Icons.goals}
        onPress={goalsPressed}
      />
    </View>
  );
};

const containerStyle = () => {
  return {
    flexDirection: 'row',
    backgroundColor: Colors.secondary[global.colorScheme],
  };
};

export default ProjectTimerTabBar;
