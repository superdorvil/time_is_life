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
    let deleted = 0;
    let active = 0;
    let deleteButtonActive;
    let showDeleted;

    projects.forEach((project, i) => {
      if (project.deleted) {
        deleted++;
      } else {
        active++;
      }
    });

    if (active + deleted > 7) {
      if (active > 3) {
        deleteButtonActive = true;
        showDeleted = false;
      } else {
        deleteButtonActive = false;
        showDeleted = true;
      }
    } else {
      deleteButtonActive = false;
      showDeleted = true;
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
      deleteButtonActive,
      showDeleted,
    };

    this.createProject = this.createProject.bind(this);
    this.selectProject = this.selectProject.bind(this);
    this.showDeleted = this.showDeleted.bind(this);
  }

  componentDidMount() {
    this.state.projects.addListener(() => {
      const projects = projectDB.getProjects({realm: this.props.realm});
      let deleted = 0;
      let active = 0;
      let deleteButtonActive;
      let showDeleted;

      projects.forEach((project, i) => {
        if (project.deleted) {
          deleted++;
        } else {
          active++;
        }
      });

      if (active + deleted > 7) {
        if (active > 3) {
          deleteButtonActive = true;
          showDeleted = false;
        } else {
          deleteButtonActive = false;
          showDeleted = true;
        }
      } else {
        deleteButtonActive = false;
        showDeleted = true;
      }

      this.setState({
        projects,
        dailySecondsWorked: projectDB.getDailySecondsWorked({
          realm: this.props.realm,
          sundayIndex: this.state.sundayIndex,
          weekIndex: this.state.currentWeekIndex,
        }),
        deleteButtonActive,
        showDeleted,
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
    if (project.deleted) {
      projectDB.restoreProject({realm, projectID: project.id});
    }

    projectDB.topProjectPosition({realm, projectID: project.id});

    Actions.projectTimer({realm, project});
  }

  showDeleted() {
    this.setState({showDeleted: !this.state.showDeleted});
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
        deleted={project.deleted}
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
            this.state.showDeleted ?
            this.state.projects :
            this.state.projects.filtered('deleted == $0', false)
          }
          listDataActive={true}
          renderListItem={this.renderProject}
          topBottomContainerDivider
          loadMorePressed={this.showDeleted}
          loadMoreText={
            this.state.showDeleted ?
            "Hide Deleted Projects" :
            "Show Deleted Projects"
          }
          loadMoreActive={this.state.deleteButtonActive}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

export default ProjectList;
