import {DateUtils} from '_utils';
import {SCHEMAS, UTILS} from '_constants';
import * as ProjectMigrations from './ProjectMigrations';

class ProjectDB {
  runMigrations({oldRealm, newRealm}) {
    /*if (oldRealm.schemaVersion < 1) {
      // ProjectMigrations.realmUpdate1({oldRealm, newRealm});
    }*/
  }

  stringifyDB({realm}) {
    const projects = realm.objects(SCHEMAS.project);
    const tasks = realm.objects(SCHEMAS.task);
    const settings = realm.objects(SCHEMAS.settings);
    const secondsWorked = realm.objects(SCHEMAS.secondsWorked);
    const weeklyGoals = realm.objects(SCHEMAS.weeklyGoal);

    return JSON.stringify([
      {projects},
      {tasks},
      {settings},
      {secondsWorked},
      {weeklyGoals}
    ]);
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
        if (task.dueDateIndex != UTILS.nullDueDate) {
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
  getTasks({realm, taskID, projectID, notSorted, getDeleted}) {
    if (getDeleted) {
      return realm.objects(SCHEMAS.task)
        .filtered('deleted == $0', true);
    }

    if (taskID) {
      return realm.objectForPrimaryKey(SCHEMAS.task, taskID);
    }

    if (projectID) {
      if (notSorted) {
        return realm
          .objects(SCHEMAS.task)
          .filtered('projectID == $0', projectID)
          .filtered('deleted == $0', false)
          .sorted('important', true)
          .sorted('position', true)
          .sorted('dueDateIndex', false);
      }

      return realm
        .objects(SCHEMAS.task)
        .filtered('projectID == $0', projectID)
        .filtered('deleted == $0', false)
        .sorted('position', true)
        .sorted('important', true)
        .sorted('dueDateIndex', false)
        .sorted('completed', false);
    }

    if (notSorted) {
      return realm.objects(SCHEMAS.task).filtered('deleted == $0', false);
    }

    return realm.objects(SCHEMAS.task)
      .filtered('deleted == $0', false)
      .sorted('position', true)
      .sorted('important', true)
      .sorted('dueDateIndex', false)
      .sorted('completed', false);
  }

  getProjects({realm, projectID, notSorted, getDeleted}) {
    if (getDeleted) {
      return realm.objects(SCHEMAS.project)
        .filtered('deleted == $0', true);
    }

    if (projectID) {
      return realm.objectForPrimaryKey(SCHEMAS.project, projectID);
    }

    if (notSorted) {
      return realm.objects(SCHEMAS.project).filtered('deleted == $0', false);
    }

    return realm
      .objects(SCHEMAS.project)
      .filtered('deleted == $0', false)
      .sorted('position', true)
      .sorted('thisWeeksSecondsWorked', true)
      .sorted('thisWeeksSecondsGoal', true)
      .sorted('completed', false)
      .sorted('timerActive', true);
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
    showDeleted,
  }) {
    let secondsWorked = realm
      .objects(SCHEMAS.secondsWorked)
      .sorted('startTime', true);

    // FIXME:: I think
    if (showDeleted) {
      secondsWorked = secondsWorked.filtered('deleted == $0', showDeleted);
    }

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

  createTask({
    realm,
    projectID,
    description,
    dueDateIndex,
    subtasks,
    completed,
    deleted,
    repeatType,
    repeatValue,
    important,
  }) {
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
          dueDateIndex,
          subtasks,
          completed,
          deleted,
          repeatType,
          repeatValue,
          important,
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
    taskID,
    startTime,
    endTime,
  }) {
    let secondsWorked;

    realm.write(() => {
      secondsWorked = realm.create(SCHEMAS.secondsWorked, {
        id: realm.objects(SCHEMAS.secondsWorked).length + 1,
        projectID,
        taskID,
        dateIndex: DateUtils.getDateIndex({date: startTime}),
        weekIndex: DateUtils.getWeekIndex({date: startTime}),
        monthIndex: DateUtils.getMonthIndex({date: startTime}),
        yearIndex: DateUtils.getYearIndex({date: startTime}),
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
      project.position = this.getTopPosition(realm.objects(SCHEMAS.project));
    });
  }

  completeProject({realm, projectID}) {
    const project = realm.objectForPrimaryKey(SCHEMAS.project, projectID);

    realm.write(() => {
      project.completed = !project.completed;
      project.position = this.getTopPosition(realm.objects(SCHEMAS.project));
    });
  }

  editTask({
    realm,
    taskID,
    description,
    dueDateIndex,
    subtasks,
    completed,
    deleted,
    repeatType,
    repeatValue,
    important,
    passive
  }) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      task.description = description;
      task.dueDateIndex = dueDateIndex;
      realm.delete(task.subtasks);
      task.subtasks = subtasks;
      task.completed = completed;
      task.deleted = deleted;
      task.repeatType = repeatType;
      task.repeatValue = repeatValue;
      task.important = important;
      task.passive = passive;
      task.position = this.getTopPosition(realm.objects(SCHEMAS.task));
    });
  }

  addSubtask({
    realm,
    taskID,
    subtasks,
  }) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      realm.delete(task.subtasks);
      task.subtasks = subtasks;
      task.completed = false;
    });
  }

  completeSubtask({
    realm,
    taskID,
    subtasks,
    completed,
  }) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      realm.delete(task.subtasks);
      task.subtasks = subtasks;
      task.completed = completed;
      task.position = this.getTopPosition(realm.objects(SCHEMAS.task));
    });
  }

  deleteSubtask({
    realm,
    taskID,
    subtasks,
    completed,
  }) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      realm.delete(task.subtasks);
      task.subtasks = subtasks;
      task.completed = completed;
    });
  }

  topSubtask({
    realm,
    taskID,
    subtasks,
  }) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      realm.delete(task.subtasks);
      task.subtasks = subtasks;
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
    startTime,
    endTime,
    projectID,
    taskID,
  }) {
    const secondsWorked = realm.objectForPrimaryKey(
      SCHEMAS.secondsWorked,
      secondsWorkedID,
    );

    realm.write(() => {
      secondsWorked.projectID = projectID;
      secondsWorked.taskID = taskID;
      secondsWorked.startTime = new Date(startTime);
      secondsWorked.endTime = new Date(endTime);
      secondsWorked.dateIndex = DateUtils.getDateIndex({date: startTime});
      secondsWorked.weekIndex = DateUtils.getWeekIndex({date: startTime});
      secondsWorked.monthIndex = DateUtils.getMonthIndex({date: startTime});
      secondsWorked.yearIndex = DateUtils.getYearIndex({date: startTime});
    });

    this.updateProjectSecondsData({realm, projectID: secondsWorked.projectID});
  }

  deleteSecondsWorked({realm, secondsWorkedID}) {
    const secondsWorked = realm.objectForPrimaryKey(
      SCHEMAS.secondsWorked,
      secondsWorkedID,
    );
    const date = new Date(1994, 10, 9, 0, 0, 0, 0);

    realm.write(() => {
      secondsWorked.startTime = new Date(date);
      secondsWorked.endTime = new Date(date);
      secondsWorked.dateIndex = DateUtils.getDateIndex({date});
      secondsWorked.weekIndex = DateUtils.getWeekIndex({date});
      secondsWorked.monthIndex = DateUtils.getMonthIndex({date});
      secondsWorked.yearIndex = DateUtils.getYearIndex({date});
      secondsWorked.deleted = true;
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

  topTaskPosition({realm, taskID}) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      task.position = this.getTopPosition(realm.objects(SCHEMAS.task));
    });
  }

  startTimer({realm, projectID}) {
    const project = realm.objectForPrimaryKey(SCHEMAS.project, projectID);
    const projects = realm.objects(SCHEMAS.project);

    // shut any active projects
    projects.forEach((p, i) => {
      if (p.timerActive) {
        this.stopTimer({realm, projectID: p.id});
      }
    });

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

  markTaskImportant({realm, taskID}) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      task.important = !task.important;
    });
  }

  completeTask({realm, taskID}) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);
    let repeatDate;
    let repeatIndex;

    if (task.dueDateIndex !== UTILS.nullDueDate) {
      repeatIndex = task.dueDateIndex;
      repeatDate = DateUtils.getDateFromDateIndex({dateIndex: repeatIndex});
    } else {
      repeatDate = new Date();
      repeatIndex = DateUtils.getDateIndex({date: repeatDate});
    }

    realm.write(() => {
      task.position = this.getTopPosition(realm.objects(SCHEMAS.task));

      if (task.completed) {
        task.completed = false;
      } else {
        let dayDiff;
        switch (task.repeatType) {
          case UTILS.repeatType.sun:
            dayDiff = 0 - repeatDate.getDay();

            if (dayDiff > 0) {
              task.dueDateIndex = dayDiff + repeatIndex;
            } else {
              task.dueDateIndex = dayDiff + repeatIndex + 7;
            }
            break;
          case UTILS.repeatType.mon:
            dayDiff = 1 - repeatDate.getDay();

            if (dayDiff > 0) {
              task.dueDateIndex = dayDiff + repeatIndex;
            } else {
              task.dueDateIndex = dayDiff + repeatIndex + 7;
            }
            break;
          case UTILS.repeatType.tue:
            dayDiff = 2 - repeatDate.getDay();

            if (dayDiff > 0) {
              task.dueDateIndex = dayDiff + repeatIndex;
            } else {
              task.dueDateIndex = dayDiff + repeatIndex + 7;
            }
            break;
          case UTILS.repeatType.wed:
            dayDiff = 3 - repeatDate.getDay();

            if (dayDiff > 0) {
              task.dueDateIndex = dayDiff + repeatIndex;
            } else {
              task.dueDateIndex = dayDiff + repeatIndex + 7;
            }
            break;
          case UTILS.repeatType.thu:
            dayDiff = 4 - repeatDate.getDay();

            if (dayDiff > 0) {
              task.dueDateIndex = dayDiff + repeatIndex;
            } else {
              task.dueDateIndex = dayDiff + repeatIndex + 7;
            }
            break;
          case UTILS.repeatType.fri:
            dayDiff = 5 - repeatDate.getDay();

            if (dayDiff > 0) {
              task.dueDateIndex = dayDiff + repeatIndex;
            } else {
              task.dueDateIndex = dayDiff + repeatIndex + 7;
            }
            break;
          case UTILS.repeatType.sat:
            dayDiff = 6 - repeatDate.getDay();

            if (dayDiff > 0) {
              task.dueDateIndex = dayDiff + repeatIndex;
            } else {
              task.dueDateIndex = dayDiff + repeatIndex + 7;
            }
            break;
          case UTILS.repeatType.fom:
            task.dueDateIndex = DateUtils.getDateIndex({
              date: DateUtils.getFirstDayOfNextMonth({date: repeatDate})
            });
            break;
          case UTILS.repeatType.lom:
            task.dueDateIndex = DateUtils.getDateIndex({
              date: DateUtils.getLastDayOfNextMonth({date: repeatDate})
            });
            break;
          case UTILS.repeatType.dfn:
            task.dueDateIndex = repeatIndex + task.repeatValue;
            break;
          case UTILS.repeatType.year:
            task.dueDateIndex = repeatIndex + 365;
            break;
          default:
            task.completed = true;
        }
      }
    });
  }

  updateTaskRepeatType({realm, taskID, repeatType}) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      task.repeatType = repeatType;
    });
  }

  updateTaskRepeatValue({realm, taskID, repeatValue}) {
    const task = realm.objectForPrimaryKey(SCHEMAS.task, taskID);

    realm.write(() => {
      task.repeatValue = repeatValue;
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

    if (project.timerActive) {
      this.stopTimer({realm, projectID});
    }

    realm.write(() => {
      project.deleted = true;
      project.position = this.getTopPosition(realm.objects(SCHEMAS.project));
    });
  }

  // deleted boolean
  restoreProject({realm, projectID}) {
    const project = this.getProjects({realm, projectID});

    realm.write(() => {
      project.deleted = false;
      project.position = this.getTopPosition(realm.objects(SCHEMAS.project));
    });
  }

  restoreTask({realm, taskID}) {
    const task = this.getTasks({realm, taskID});

    realm.write(() => {
      task.deleted = false;
      task.position = this.getTopPosition(realm.objects(SCHEMAS.task));
    });
  }

  // deleted boolean
  deleteTask({realm, taskID}) {
    const task = this.getTasks({realm, taskID});

    realm.write(() => {
      task.deleted = true;
      task.position = this.getTopPosition(realm.objects(SCHEMAS.task));
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
