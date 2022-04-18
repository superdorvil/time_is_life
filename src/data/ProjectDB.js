import {DateUtils} from '_utils';
import {SCHEMAS} from '_constants';
import * as ProjectMigrations from './ProjectMigrations';

class ProjectDB {
  runMigrations({oldRealm, newRealm}) {
    /*if (oldRealm.schemaVersion < 1) {
      // ProjectMigrations.realmUpdate1({oldRealm, newRealm});
    }*/
  }

  initSettings({realm}) {
    if (realm.objects(SCHEMAS.settings).length < 1) {
      realm.write(() => {
        realm.create(SCHEMAS.settings, {});
      });
    }
  }

  initTaskDueDates({realm}) {
    const tasks = realm.objects(SCHEMAS.task);
    const todayIndex = DateUtils.getDateIndex({date: new Date()});

    realm.write(() => {
      tasks.forEach((task, i) => {
        if (task.dueDateIndex != 9999999999999) {
          if (task.dueDateIndex < todayIndex) {
            if (!task.completed) { // if completeted the due date alone
              task.dueDateIndex = todayIndex;
            }
          }
        }
      });
    });
  }

  updateProjectSecondsData({realm, projectID}) {
    const projects = this.getProjects({realm});
    const weekIndex = DateUtils.getWeekIndex({date: new Date()});

    let updateProject = true;
    if (projectID) {
      updateProject = false;
    }

    realm.write(() => {
      projects.forEach((project, i) => {
        if (project.id === projectID) {
          updateProject = true;
        }

        if (updateProject) {
          project.totalSecondsWorked = this.getSecondsWorked({
            realm,
            projectID: project.id,
          });

          project.thisWeeksSecondsWorked = this.getSecondsWorked({
            realm,
            projectID: project.id,
            weekIndex,
          });

          project.thisWeeksSecondsGoal = this.getWeeklyGoals({
            realm,
            projectID: project.id,
            weekIndex,
          });
        }

        if (project.id === projectID) {
          updateProject = false;
        }
      });
    });
  }

  getSettings({realm}) {
    return realm.objects(SCHEMAS.settings)[0];
  }

  updateColorScheme({realm, colorScheme}) {
    const settings = this.getSettings({realm});

    realm.write(() => {
      settings.colorScheme = colorScheme;
    });
  }

  sumSecondsWorked({secondsWorked}) {
    let totalSecondsWorked = 0;

    secondsWorked.forEach((sw, i) => {
      totalSecondsWorked =
        totalSecondsWorked + (sw.endTime - sw.startTime) / 1000;
    });

    return totalSecondsWorked;
  }

  // FIXME: better due date sorting
  getTasks({realm, taskID, projectID, notSorted}) {
    if (taskID) {
      return realm.objectForPrimaryKey(SCHEMAS.task, taskID);
    }

    if (projectID) {
      if (notSorted) {
        return realm
          .objects(SCHEMAS.task)
          .filtered('projectID == $0', projectID)
          .sorted('dueDateIndex', false)
      }

      return realm
        .objects(SCHEMAS.task)
        .filtered('projectID == $0', projectID)
        .sorted('dueDateIndex', false)
        .sorted('completed', false);
    }

    if (notSorted) {
      return realm.objects(SCHEMAS.task);
    }

    return realm.objects(SCHEMAS.task)
      .sorted('dueDateIndex', false)
      .sorted('completed', false);
  }

  getProjects({realm, projectID, notSorted}) {
    if (projectID) {
      return realm.objectForPrimaryKey(SCHEMAS.project, projectID);
    }

    if (notSorted) {
      return realm.objects(SCHEMAS.project);
    }

    return realm
      .objects(SCHEMAS.project)
      .sorted('position', true)
      .sorted('thisWeeksSecondsGoal', true)
      .sorted('deleted', false);
  }

  getSecondsWorked({
    realm,
    projectID,
    taskID,
    secondsWorkedID,
    dateIndex,
    weekIndex,
    monthIndex,
    yearIndex,
    inverseSort,
    returnList,
  }) {
    let secondsWorked = realm
      .objects(SCHEMAS.secondsWorked)
      .sorted('startTime', true);

    if (projectID) {
      secondsWorked = secondsWorked.filtered('projectID == $0', projectID);
    }
    if (taskID) {
      secondsWorked = secondsWorked.filtered('taskID == $0', taskID);
    }
    if (dateIndex) {
      secondsWorked = secondsWorked.filtered('dateIndex == $0', dateIndex);
    }
    if (weekIndex) {
      secondsWorked = secondsWorked.filtered('weekIndex == $0', weekIndex);
    }
    if (monthIndex) {
      secondsWorked = secondsWorked.filtered('monthIndex == $0', monthIndex);
    }
    if (yearIndex) {
      secondsWorked = secondsWorked.filtered('yearIndex == $0', yearIndex);
    }

    if (secondsWorkedID) {
      secondsWorked = realm.objectForPrimaryKey(
        SCHEMAS.secondsWorked,
        secondsWorkedID,
      );

      return secondsWorked;
    }

    if (returnList) {
      let sort = true;
      if (inverseSort) {
        sort = false;
      }

      return secondsWorked.sorted('startTime', sort);
    }

    return this.sumSecondsWorked({secondsWorked});
  }

  getDailySecondsWorked({realm, sundayIndex, weekIndex}) {
    const dailySecondsWorked = {
      sun: {secondsWorked: 0, weekday: 'SUN'},
      mon: {secondsWorked: 0, weekday: 'MON'},
      tue: {secondsWorked: 0, weekday: 'TUE'},
      wed: {secondsWorked: 0, weekday: 'WED'},
      thu: {secondsWorked: 0, weekday: 'THU'},
      fri: {secondsWorked: 0, weekday: 'FRI'},
      sat: {secondsWorked: 0, weekday: 'SAT'},
    };

    const thisWeeksSecondsWorked = this.getSecondsWorked({
      realm,
      weekIndex,
      returnList: true,
    });

    thisWeeksSecondsWorked.forEach((sw, i) => {
      switch (sw.dateIndex) {
        case sundayIndex:
          dailySecondsWorked.sun.secondsWorked =
            dailySecondsWorked.sun.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 1:
          dailySecondsWorked.mon.secondsWorked =
            dailySecondsWorked.mon.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 2:
          dailySecondsWorked.tue.secondsWorked =
            dailySecondsWorked.tue.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 3:
          dailySecondsWorked.wed.secondsWorked =
            dailySecondsWorked.wed.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 4:
          dailySecondsWorked.thu.secondsWorked =
            dailySecondsWorked.thu.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 5:
          dailySecondsWorked.fri.secondsWorked =
            dailySecondsWorked.fri.secondsWorked + (sw.endTime - sw.startTime);
          break;
        case sundayIndex + 6:
          dailySecondsWorked.sat.secondsWorked =
            dailySecondsWorked.sat.secondsWorked + (sw.endTime - sw.startTime);
          break;
        default:
        // error checking
      }
    });

    dailySecondsWorked.sun.secondsWorked =
      dailySecondsWorked.sun.secondsWorked / 1000;
    dailySecondsWorked.mon.secondsWorked =
      dailySecondsWorked.mon.secondsWorked / 1000;
    dailySecondsWorked.tue.secondsWorked =
      dailySecondsWorked.tue.secondsWorked / 1000;
    dailySecondsWorked.wed.secondsWorked =
      dailySecondsWorked.wed.secondsWorked / 1000;
    dailySecondsWorked.thu.secondsWorked =
      dailySecondsWorked.thu.secondsWorked / 1000;
    dailySecondsWorked.fri.secondsWorked =
      dailySecondsWorked.fri.secondsWorked / 1000;
    dailySecondsWorked.sat.secondsWorked =
      dailySecondsWorked.sat.secondsWorked / 1000;

    return dailySecondsWorked;
  }

  // If no projectID than get totalWeekly goals which has a default projectID of 0
  getWeeklyGoals({realm, weekIndex, projectID = 0}) {
    let weeklyGoal = realm.objects(SCHEMAS.weeklyGoal);

    weeklyGoal = weeklyGoal.filtered(
      'projectID == $0 AND weekIndex == $1',
      projectID,
      weekIndex,
    );

    return weeklyGoal.length > 0 ? weeklyGoal[0].weeklyGoalSeconds : 0;
  }

  createProject({realm, description}) {
    const projects = realm.objects(SCHEMAS.project);
    let project;

    try {
      realm.write(() => {
        project = realm.create(SCHEMAS.project, {
          id: projects.length + 1,
          description: description,
          position: this.getTopPosition(projects),
        });
      });
    } catch (e) {
      console.log('failed to create project ' + description);
      console.log(e);
    }

    return project;
  }

  // id prexisiting objects id + 1
  // sort order to the top
  createTask({realm, projectID, description}) {
    const tasks = realm.objects(SCHEMAS.task);
    let position = 0;
    let task;

    tasks.forEach((t, i) => {
      if (t.position >= position) {
        position = t.position + 1;
      }
    });

    try {
      realm.write(() => {
        task = realm.create(SCHEMAS.task, {
          id: tasks.length + 1,
          projectID,
          description: description,
          position: this.getTopPosition(tasks),
        });
      });
    } catch (e) {
      console.log('failed to create task ' + description);
      console.log(e);
    }

    return task;
  }

  createWeeklyGoal({realm, projectID, weekIndex, weeklyGoalSeconds}) {
    let weeklyGoal;

    realm.write(() => {
      weeklyGoal = realm.create(SCHEMAS.weeklyGoal, {
        projectID,
        weekIndex,
        weeklyGoalSeconds,
      });
    });

    if (projectID > 0) {
      this.updateProjectSecondsData({realm, projectID});
    }

    return weeklyGoal;
  }

  createSecondsWorked({
    realm,
    projectID,
    dateIndex,
    weekIndex,
    monthIndex,
    yearIndex,
    startTime,
    endTime,
  }) {
    let secondsWorked;

    realm.write(() => {
      secondsWorked = realm.create(SCHEMAS.secondsWorked, {
        id: realm.objects(SCHEMAS.secondsWorked).length + 1,
        projectID,
        dateIndex,
        weekIndex,
        monthIndex,
        yearIndex,
        startTime,
        endTime,
      });
    });

    this.updateProjectSecondsData({realm, projectID});

    return secondsWorked;
  }

  editProject({realm, projectID, description}) {
    const project = realm.objectForPrimaryKey(SCHEMAS.project, projectID);

    realm.write(() => {
      project.description = description;
    });
  }

  editTask({realm, taskID, description}) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      task.description = description;
    });
  }

  updateWeeklyGoal({realm, projectID = 0, weekIndex, weeklyGoalSeconds}) {
    let weeklyGoal = realm
      .objects(SCHEMAS.weeklyGoal)
      .filtered('projectID == $0 AND weekIndex == $1', projectID, weekIndex);

    if (weeklyGoal.length === 0) {
      weeklyGoal = this.createWeeklyGoal({
        realm,
        projectID,
        weekIndex,
        weeklyGoalSeconds,
      });
    } else {
      realm.write(() => {
        if (weeklyGoal.length > 0) {
          weeklyGoal[0].weeklyGoalSeconds = weeklyGoalSeconds;
        }
      });
    }

    if (projectID > 0) {
      this.updateProjectSecondsData({realm, projectID});
    }

    return weeklyGoal;
  }

  updateSecondsWorked({
    realm,
    secondsWorkedID,
    hours,
    minutes,
    date,
    updateStartTime,
  }) {
    const secondsWorked = realm.objectForPrimaryKey(
      SCHEMAS.secondsWorked,
      secondsWorkedID,
    );
    const startTime = secondsWorked.startTime;
    const endTime = secondsWorked.endTime;

    realm.write(() => {
      if (date) {
        if (updateStartTime) {
          startTime.setDate(date.getDate());
          startTime.setMonth(date.getMonth());
          startTime.setFullYear(date.getFullYear());
          secondsWorked.startTime = startTime;
          secondsWorked.dateIndex = DateUtils.getDateIndex({date});
          secondsWorked.weekIndex = DateUtils.getWeekIndex({date});
          secondsWorked.monthIndex = DateUtils.getMonthIndex({date});
          secondsWorked.yearIndex = DateUtils.getYearIndex({date});
        } else {
          endTime.setDate(date.getDate());
          endTime.setMonth(date.getMonth());
          endTime.setFullYear(date.getFullYear());
          secondsWorked.endTime = endTime;
        }
      } else {
        if (updateStartTime) {
          startTime.setHours(hours);
          startTime.setMinutes(minutes);
          secondsWorked.startTime = startTime;
        } else {
          endTime.setHours(hours);
          endTime.setMinutes(minutes);
          secondsWorked.endTime = endTime;
        }
      }
    });

    this.updateProjectSecondsData({realm, projectID: secondsWorked.projectID});
  }

  updateTaskDueDate({realm, taskID, dueDateIndex}) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      task.dueDateIndex = dueDateIndex;
    });
  }

  topProjectPosition({realm, projectID}) {
    const project = realm.objectForPrimaryKey(SCHEMAS.project, projectID);

    realm.write(() => {
      project.position = this.getTopPosition(realm.objects(SCHEMAS.project));
    });
  }

  startTimer({realm, projectID}) {
    const project = realm.objectForPrimaryKey(SCHEMAS.project, projectID);

    realm.write(() => {
      project.timerStartTime = new Date();
      project.timerActive = true;
    });
  }

  stopTimer({realm, projectID}) {
    const project = realm.objectForPrimaryKey(SCHEMAS.project, projectID);
    const endTime = new Date();
    const dateIndex = DateUtils.getDateIndex({date: project.timerStartTime});
    const weekIndex = DateUtils.getWeekIndex({date: project.timerStartTime});
    const monthIndex = DateUtils.getMonthIndex({date: project.timerStartTime});
    const yearIndex = DateUtils.getYearIndex({date: project.timerStartTime});

    realm.write(() => {
      project.timerActive = false;
    });

    this.createSecondsWorked({
      realm,
      projectID,
      dateIndex,
      weekIndex,
      monthIndex,
      yearIndex,
      startTime: project.timerStartTime,
      endTime,
    });
  }

  completeTask({realm, taskID}) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      task.position = this.getTopPosition(realm.objects(SCHEMAS.task));
      task.completed = !task.completed;
    });
  }

  setSecondsWorkedTask({realm, secondsWorkedID, taskID}) {
    const secondsWorked = this.getSecondsWorked({realm, secondsWorkedID});

    realm.write(() => {
      if (secondsWorked.taskID === 0) {
        secondsWorked.taskID = taskID;
      } else {
        if (secondsWorked.taskID === taskID) {
          secondsWorked.taskID = 0;
        } else {
          secondsWorked.taskID = taskID;
        }
      }
    });
  }

  deleteWeeklyGoal({realm, projectID, weekIndex}) {}

  // deleted boolean
  deleteProject({realm, projectID}) {
    const project = this.getProjects({realm, projectID});

    realm.write(() => {
      project.deleted = true;
    });
  }

  // deleted boolean
  restoreProject({realm, projectID}) {
    const project = this.getProjects({realm, projectID});

    realm.write(() => {
      project.deleted = false;
    });
  }

  getTopPosition(objects) {
    let position = 0;

    objects.forEach((o, i) => {
      if (o.position >= position) {
        position = o.position + 1;
      }
    });

    return position;
  }
}

const projectDB = new ProjectDB();

export default projectDB;
