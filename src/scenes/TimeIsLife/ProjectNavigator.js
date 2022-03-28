import React, {useState} from 'react';
import {View} from 'react-native';
import {TabBar} from '_components';
import {ICONS} from '_constants';
import SceneSelector from './SceneSelector';

function ProjectNavigator({realm, colorScheme}) {
  const [navigationState, updateNavigationState] = useState(ICONS.projects);

  return (
    <View style={containerStyle()}>
      <SceneSelector
        scene={navigationState}
        realm={realm}
      />
      <TabBar
        navigationState={navigationState}
        projectsPressed={() => updateNavigationState(ICONS.projects)}
        goalsPressed={() => updateNavigationState(ICONS.goals)}
        chartsPressed={() => updateNavigationState(ICONS.charts)}
        settingsPressed={() => updateNavigationState(ICONS.settings)}
      />
    </View>
  );
}

const containerStyle = () => {
  return {flex: 1};
};

export default ProjectNavigator;
