import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import ProjectNavigator from './ProjectNavigator';
import TimeIsLife from './TimeIsLife';
import {
  ManageProject,
  ManageProjectHours,
  ManageSettings,
  ManageTask,
  ManageWeeklyGoals,
  ProjectGoals,
  ProjectHoursWorked,
  ProjectList,
  ProjectTask,
  ProjectTimer,
  TaskList,
  ViewProjectCharts,
} from './ProjectActions';

const RouterComponent = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="manageProject"
        component={ManageProject}
        title="ManageProject"
        hideNavBar
      />
      <Scene
        key="manageProjectHours"
        component={ManageProjectHours}
        title="ManageProjectHours"
        hideNavBar
      />
      <Scene
        key="manageSettings"
        component={ManageSettings}
        title="ManageSettings"
        hideNavBar
      />
      <Scene
        key="manageTask"
        component={ManageTask}
        title="ManageTask"
        hideNavBar
      />
      <Scene
        key="manageWeeklyGoals"
        component={ManageWeeklyGoals}
        title="ManageWeeklyGoals"
        hideNavBar
      />
      <Scene
        key="projectGoals"
        component={ProjectGoals}
        title="ProjectGoals"
        hideNavBar
      />
      <Scene
        key="projectHoursWorked"
        component={ProjectHoursWorked}
        title="ProjectHoursWorked"
        hideNavBar
      />
      <Scene
        key="projectList"
        component={ProjectList}
        title="ProjectList"
        hideNavBar
      />
      <Scene
        key="projectNavigator"
        component={ProjectNavigator}
        title="ProjectNavigator"
        hideNavBar
      />
      <Scene
        key="projectTask"
        component={ProjectTask}
        title="ProjectTask"
        hideNavBar
      />
      <Scene
        key="projectTimer"
        component={ProjectTimer}
        title="ProjectTimer"
        hideNavBar
      />
      <Scene
        key="taskList"
        component={TaskList}
        title="TaskList"
        hideNavBar
      />
      <Scene
        key="timeIsLife"
        component={TimeIsLife}
        title="TimeIsLife"
        hideNavBar
        initial
      />
      <Scene
        key="viewProjectCharts"
        component={ViewProjectCharts}
        title="ViewProjectCharts"
        hideNavBar
      />
    </Scene>
  </Router>
);

export default RouterComponent;
