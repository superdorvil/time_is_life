import React from 'react';
import {View} from 'react-native';
import TabBarIcon from './TabBarIcon';
import {ICONS} from '_constants';
import {COLORS} from '_resources';

const TabBar = ({
  navigationState,
  projectsPressed,
  goalsPressed,
  chartsPressed,
  todoPressed,
  settingsPressed,
}) => {
  return (
    <View style={containerStyle()}>
      <TabBarIcon
        name={ICONS.projects}
        selectedName={navigationState}
        onPress={projectsPressed}
      />
      <TabBarIcon
        name={ICONS.goals}
        selectedName={navigationState}
        onPress={goalsPressed}
      />
      <TabBarIcon
        name={ICONS.charts}
        selectedName={navigationState}
        onPress={chartsPressed}
      />
      <TabBarIcon
        name={ICONS.checkmark}
        selectedName={navigationState}
        onPress={todoPressed}
      />
      <TabBarIcon
        name={ICONS.settings}
        selectedName={navigationState}
        onPress={settingsPressed}
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

export default TabBar;
