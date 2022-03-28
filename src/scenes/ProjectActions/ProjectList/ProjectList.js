import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import projectDB from '_data';
import {DateUtils} from '_utils';
import {ActionContainer} from '_components';
import {Project} from '_components';
import {ICONS} from '_constants';

function ProjectList({realm}) {
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

  const today = new Date();
  const weekIndex = DateUtils.getWeekIndex({date: today});
  const dateIndex = DateUtils.getDateIndex({date: today});
  const sundayIndex = dateIndex - today.getDay();

  projectDB.updateProjectSecondsData({realm});

  [projects, updateProjects] = useState(
    projectDB.getProjects({realm})
  );
  [dailySecondsWorked, updateDailySecondsWorked] = useState(
    projectDB.getDailySecondsWorked({
      realm,
      sundayIndex,
      weekIndex,
    })
  );

  [thisWeeksSecondsWorked, updateThisWeeksSecondsWorked] = useState(
    projectDB.getSecondsWorked({
      realm,
      weekIndex,
    })
  );
  [thisWeeksGoalSeconds, updateThisWeeksGoalSeconds] = useState(
    projectDB.getWeeklyGoals({
      realm,
      weekIndex,
    })
  );

  useEffect(() => {
    let thisProjectIsRecordingHours;
    projects.addListener(() => {
      updateProjects(projectDB.getProjects({realm}));
      updateDailySecondsWorked(
        projectDB.getDailySecondsWorked({
          realm,
          sundayIndex,
          weekIndex,
        })
      );
      updateDailySecondsWorked(
        projectDB.getDailySecondsWorked({
          realm,
          sundayIndex,
          weekIndex,
        })
      );
      updateThisWeeksSecondsWorked(
        projectDB.getSecondsWorked({
          realm,
          weekIndex,
        })
      );
      updateThisWeeksGoalSeconds(
        projectDB.getWeeklyGoals({
          realm,
          weekIndex,
        })
      );
    });

    projects.forEach((p, i) => {
      if (p.timerActive) {
        thisProjectIsRecordingHours = p;
      }
    });

    if (thisProjectIsRecordingHours) {
      Actions.projectTimer({
        realm,
        project: thisProjectIsRecordingHours,
      });
    }

    return function cleanup() {
      projects.removeAllListeners();
      updateProjects(null);
    };
  }, []);

  const createProject = () => {
    Actions.createProject({realm});
  };

  const selectProject = (realm, project) => {
    if (project.deleted) {
      projectDB.restoreProject({realm, projectID: project.id});
    }

    projectDB.topProjectPosition({realm, projectID: project.id});

    Actions.projectTimer({realm, project});
  };

  const renderProject = (project, extraData) => {
    return (
      <Project
        projectPressed={() => extraData.selectProject(extraData.realm, project)}
        deleted={project.deleted}
        description={project.description}
        totalSecondsWorked={project.totalSecondsWorked}
        thisWeeksSecondsWorked={project.thisWeeksSecondsWorked}
        thisWeeksSecondsGoal={project.thisWeeksSecondsGoal}
      />
    );
  };

  return (
    <View style={containerStyle()}>
      <ActionContainer
        extraData={{
          realm,
          currentWeekIndex: weekIndex,
          selectProject,
        }}
        weeklyProgressActive
        thisWeeksGoalSeconds={thisWeeksGoalSeconds}
        thisWeeksSecondsWorked={thisWeeksSecondsWorked}
        dailySecondsWorked={dailySecondsWorked}
        actionScreenActive={false}
        actionScreenData={actionScreenData}
        actionNavBarActive={false}
        actionNavBarData={actionNavBarData}
        topChildActive={false}
        topChild={false}
        bottomChildActive={false}
        bottomChild={false}
        actionButtonActive={true}
        actionButtonPressed={createProject}
        actionButtonDescription="Your Projects"
        listData={projects}
        listDataActive={true}
        renderListItem={renderProject}
        topBottomContainerDivider
      />
    </View>
  );
}

const containerStyle = () => {
  return {flex: 1};
};

export default ProjectList;
