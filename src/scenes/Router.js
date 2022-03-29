import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import ProjectNavigator from './ProjectNavigator';
import TimeIsLife from './TimeIsLife';
import {
  CreateProject,
  CreateTask,
  EditProject,
  EditProjectHours,
  AddProjectHours,
  ManageSettings,
  ManageWeeklyGoals,
  ProjectList,
  ProjectGoals,
  ProjectTask,
  ProjectTimer,
  ViewProjectCharts,
} from './ProjectActions';

const RouterComponent = () => (
  <Router>
    <Scene key="root">
      <Scene
        key="timeIsLife"
        component={TimeIsLife}
        title="TimeIsLife"
        hideNavBar
        initial
      />
      <Scene
        key="projectNavigator"
        component={ProjectNavigator}
        title="ProjectNavigator"
        hideNavBar
      />
      <Scene
        key="createProject"
        component={CreateProject}
        title="CreateProject"
        hideNavBar
      />
      <Scene
        key="createTask"
        component={CreateTask}
        title="CreateTask"
        hideNavBar
      />
      <Scene
        key="editProject"
        component={EditProject}
        title="EditProject"
        hideNavBar
      />
      <Scene
        key="editProjectHours"
        component={EditProjectHours}
        title="EditProjectHours"
        hideNavBar
      />
      <Scene
        key="projectGoals"
        component={ProjectGoals}
        title="ProjectGoals"
        hideNavBar
      />
      <Scene
        key="projectTask"
        component={ProjectTask}
        title="ProjectTask"
        hideNavBar
      />
      <Scene
        key="manageSettings"
        component={ManageSettings}
        title="ManageSettings"
        hideNavBar
      />
      <Scene
        key="manageWeeklyGoals"
        component={ManageWeeklyGoals}
        title="ManageWeeklyGoals"
        hideNavBar
      />
      <Scene
        key="projectList"
        component={ProjectList}
        title="ProjectList"
        hideNavBar
      />
      <Scene
        key="projectTimer"
        component={ProjectTimer}
        title="ProjectTimer"
        hideNavBar
      />
      <Scene
        key="viewProjectCharts"
        component={ViewProjectCharts}
        title="ViewProjectCharts"
        hideNavBar
      />
      <Scene
        key="addProjectHours"
        component={AddProjectHours}
        title="addProjectHours"
        hideNavBar
      />
    </Scene>
  </Router>
);

export default RouterComponent;
