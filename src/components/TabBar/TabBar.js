import React from 'react';
import {View} from 'react-native';
import TabBarIcon from './TabBarIcon';
import {Icons} from '_constants';
import {Colors} from '_resources';

const TabBar = ({
  navigationState,
  projectsPressed,
  goalsPressed,
  chartsPressed,
  settingsPressed,
}) => {
  return (
    <View style={containerStyle()}>
      <TabBarIcon
        name={Icons.projects}
        selectedName={navigationState}
        onPress={projectsPressed}
      />
      <TabBarIcon
        name={Icons.goals}
        selectedName={navigationState}
        onPress={goalsPressed}
      />
      <TabBarIcon
        name={Icons.charts}
        selectedName={navigationState}
        onPress={chartsPressed}
      />
      <TabBarIcon
        name={Icons.settings}
        selectedName={navigationState}
        onPress={settingsPressed}
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

export default TabBar;
