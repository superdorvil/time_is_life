import React from 'react';
import {View, Text} from 'react-native';
import {ICONS} from '_constants';
import {
  ManageSettings,
  ManageWeeklyGoals,
  ProjectList,
  TaskList,
  ViewProjectCharts,
} from '../ProjectActions';

const SceneSelector = ({scene, realm}) => {
  let selectedScene;

  switch (scene) {
    case ICONS.projects:
      selectedScene = <ProjectList realm={realm} />;
      break;
    case ICONS.goals:
      selectedScene = <ManageWeeklyGoals realm={realm} />;
      break;
    case ICONS.charts:
      selectedScene = <ViewProjectCharts realm={realm} />;
      break;
    case ICONS.checkmark:
      selectedScene = <TaskList realm={realm} />;
      break;
    case ICONS.settings:
      selectedScene = <ManageSettings realm={realm} />;
      break;
    default:
      selectedScene = (
        <Text>I should really figure out proper error handling react</Text>
      );
  }

  return <View style={containerStyle()}>{selectedScene}</View>;
};

const containerStyle = () => {
  return {flex: 1};
};

export default SceneSelector;
