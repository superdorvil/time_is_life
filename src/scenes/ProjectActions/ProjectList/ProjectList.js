import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import projectDB from '_data';
import {DateUtils} from '_utils';
import {ActionContainer} from '_components';
import {Project} from '_components';
import {ICONS} from '_constants';

class ProjectList extends Component {
  constructor(props) {
    super(props);

    const today = new Date();

    const currentWeekIndex = DateUtils.getWeekIndex({date: today});
    const currentDateIndex = DateUtils.getDateIndex({date: today});
    const sundayIndex = currentDateIndex - today.getDay();

    projectDB.updateProjectSecondsData({realm: this.props.realm});
    const projects = projectDB.getProjects({realm: this.props.realm});
    const dailySecondsWorked = projectDB.getDailySecondsWorked({
      realm: this.props.realm,
      sundayIndex,
      weekIndex: currentWeekIndex,
    });
    const thisWeeksSecondsWorked = projectDB.getSecondsWorked({
      realm: this.props.realm,
      weekIndex: currentWeekIndex,
    });
    const thisWeeksGoalSeconds = projectDB.getWeeklyGoals({
      realm: this.props.realm,
      weekIndex: currentWeekIndex,
    });
    let completed = 0;
    let active = 0;
    let completeButtonActive;
    let showCompleted;

    projects.forEach((project, i) => {
      if (project.completed) {
        completed++;
      } else {
        active++;
      }
    });

    if (active + completed > 7) {
      if (active > 3) {
        completeButtonActive = true;
        showCompleted = false;
      } else {
        completeButtonActive = false;
        showCompleted = true;
      }
    } else {
      completeButtonActive = false;
      showCompleted = true;
    }

    this.state = {
      projects,
      dailySecondsWorked,
      currentWeekIndex,
      currentDateIndex,
      sundayIndex,
      today,
      thisWeeksGoalSeconds,
      thisWeeksSecondsWorked,
      completeButtonActive,
      showCompleted,
    };

    this.createProject = this.createProject.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.showCompleted = this.showCompleted.bind(this);
  }

  componentDidMount() {
    this.state.projects.addListener(() => {
      const projects = projectDB.getProjects({realm: this.props.realm});
      let completed = 0;
      let active = 0;
      let completeButtonActive;
      let showCompleted;

      projects.forEach((project, i) => {
        if (project.completed) {
          completed++;
        } else {
          active++;
        }
      });

      if (active + completed > 7) {
        if (active > 3) {
          completeButtonActive = true;
          showCompleted = false;
        } else {
          completeButtonActive = false;
          showCompleted = true;
        }
      } else {
        completeButtonActive = false;
        showCompleted = true;
      }

      this.setState({
        projects,
        dailySecondsWorked: projectDB.getDailySecondsWorked({
          realm: this.props.realm,
          sundayIndex: this.state.sundayIndex,
          weekIndex: this.state.currentWeekIndex,
        }),
        completeButtonActive,
        showCompleted,
      });
    });
  }

  componentWillUnmount() {
    if (this.state.project) {
      this.state.projects.removeAllListeners();
    }

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  createProject() {
    Actions.manageProject({realm: this.props.realm});
  }

  selectProject(realm, project) {
    if (project.completed) {
      projectDB.restoreProject({realm, projectID: project.id});
    }

    projectDB.topProjectPosition({realm, projectID: project.id});

    Actions.projectTimer({realm, project});
  }

  showCompleted() {
    this.setState({showCompleted: !this.state.showCompleted});
  }

  renderProject(project, extraData) {
    return (
      <Project
        key={project.id}
        realm={extraData.realm}
        projectPressed={() => extraData.selectProject(extraData.realm, project)}
        projectID={project.id}
        deleted={project.deleted}
        description={project.description}
        totalSecondsWorked={project.totalSecondsWorked}
        thisWeeksSecondsWorked={project.thisWeeksSecondsWorked}
        thisWeeksSecondsGoal={project.thisWeeksSecondsGoal}
        timerActive={project.timerActive}
        timerStartTime={project.timerStartTime}
        completed={project.completed}
      />
    );
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: true,
      topRightButtonActive: true,
      centerIconName: ICONS.checkmark,
      actionDescription: 'Time is Life',
      subDescription: '',
      subDescription2: '',
    };

    const actionNavBarData = {
      taskNavButtonActive: false,
      taskNavButtonPressed: false,
      timerNavButtonActive: false,
      timerNavButtonPressed: false,
      goalsNavButtonActive: false,
      goalsNavButtonPressed: false,
    };

    return (
      <View style={containerStyle()}>
        <ActionContainer
          extraData={{
            realm: this.props.realm,
            currentWeekIndex: this.state.currentWeekIndex,
            selectProject: this.selectProject,
          }}
          weeklyProgressActive
          thisWeeksGoalSeconds={this.state.thisWeeksGoalSeconds}
          thisWeeksSecondsWorked={this.state.thisWeeksSecondsWorked}
          dailySecondsWorked={this.state.dailySecondsWorked}
          actionScreenActive={false}
          actionScreenData={actionScreenData}
          actionNavBarActive={false}
          actionNavBarData={actionNavBarData}
          topChildActive={false}
          topChild={false}
          bottomChildActive={false}
          bottomChild={false}
          actionButtonActive={true}
          actionButtonPressed={this.createProject}
          actionButtonDescription="Your Projects"
          listData={
            this.state.showCompleted ?
            this.state.projects :
            this.state.projects.filtered('completed == $0', false)
          }
          listDataActive={true}
          renderListItem={this.renderProject}
          topBottomContainerDivider
          loadMorePressed={this.showCompleted}
          loadMoreText={
            this.state.showCompleted ?
            "Hide Completed Projects" :
            "Show Completed Projects"
          }
          loadMoreActive={this.state.completeButtonActive}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

export default ProjectList;
