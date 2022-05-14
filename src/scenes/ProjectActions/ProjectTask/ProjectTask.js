import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer, Task} from '_components';
import projectDB from '_data';
import {ICONS} from '_constants';
import {HoursUtils} from '_utils';
import {COLORS} from '_resources';

class ProjectTask extends Component {
  constructor(props) {
    super(props);
    const tasks = projectDB.getTasks({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });
    const project = projectDB.getProjects({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });
    let completed = 0;
    let active = 0;
    let completeButtonActive;
    let showCompleted;

    tasks.forEach((task, i) => {
      if (!task.deleted) {
        if (task.completed) {
          completed++;
        } else {
          active++;
        }
      }
    });

    if (active + completed > 15) {
      if (active > 6) {
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
      project,
      tasks,
      dueDatesToRender: [],
      completeButtonActive,
      showCompleted,
      active,
      completed
    };

    this.showCompleted = this.showCompleted.bind(this);
    this.addPressed = this.addPressed.bind(this);
  }

  componentDidMount() {
    this.state.project.addListener(() => {
      this.setState({
        project: projectDB.getProjects({
          realm: this.props.realm,
          projectID: this.state.project.id,
        }),
      });
    });
    this.state.tasks.addListener(() => {
      const tasks = projectDB.getTasks({
        realm: this.props.realm,
        projectID: this.props.project.id,
      });
      let completed = 0;
      let active = 0;
      let completeButtonActive;
      let showCompleted;

      tasks.forEach((task, i) => {
        if (!task.deleted) {
          if (task.completed) {
            completed++;
          } else {
            active++;
          }
        }
      });

      if (active + completed > 15) {
        if (active > 6) {
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
        tasks,
        completeButtonActive,
        showCompleted,
        active,
        completed
      });
      this.dueDatesToRender();
    });
    this.dueDatesToRender();
  }

  componentWillUnmount() {
    if (this.state.tasks) {
      this.state.tasks.removeAllListeners();
    }

    if (this.state.project) {
      this.state.project.removeAllListeners();
    }

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  maxims() {
    Actions.maxims({realm: this.props.realm});
  }

  addPressed() {
    Actions.manageTask({
      realm: this.props.realm,
      projectID: this.state.project.id,
    });
  }

  dueDatesToRender() {
    if (!this.state.tasks) {
      return [];
    }

    const indexes = [];

    for (let i = 0; i < this.state.tasks.length; i++) {
      if (i == 0) {
        indexes.push(i);
      } else {
        if (this.state.tasks[i].dueDateIndex > this.state.tasks[i - 1].dueDateIndex) {
          indexes.push(i);
        }
      }
    }

    this.setState({dueDatesToRender: indexes});
  }

  showCompleted() {
    this.setState({showCompleted: !this.state.showCompleted});
  }

  renderTask(listData, extraData, index) {
    const hoursWorked = projectDB.getSecondsWorked({
      realm: extraData.realm,
      taskID: listData.id,
    });
    let renderDueDate = false;

    extraData.dueDatesToRender.forEach((id, i) => {
      if (id == index) {
        renderDueDate = true;
      }
    });

    return (
      <Task
        key={listData.id}
        index={index}
        hoursWorked={HoursUtils.convertSecondsToHrs({
          totalSeconds: hoursWorked,
          decimalMinutes: true,
        })}
        description={listData.description}
        completed={listData.completed}
        important={listData.important}
        realm={extraData.realm}
        taskID={listData.id}
        taskPressed={() => {
          projectDB.completeTask({
            realm: extraData.realm,
            taskID: listData.id,
          });
        }}
        dueDateIndex={listData.dueDateIndex}
        renderDueDate={renderDueDate}
        subtasks={listData.subtasks}
        repeatType={listData.repeatType}
        repeatValue={listData.repeatValue}
      />
    );
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      centerIconName: ICONS.checkmark,
      actionDescription: this.state.project.description,
      topRightButtonActive: false,
    };

    return (
      <View style={containerStyle()}>
        <View style={taskStatusStyle()}>
          <Text>Active Task: {this.state.active}</Text>
          <Text>Completed Task: {this.state.completed}</Text>
        </View>
        <ActionContainer
          extraData={{
            realm: this.props.realm,
            project: this.state.project,
            dueDatesToRender: this.state.dueDatesToRender,
          }}
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionButtonActive={true}
          actionButtonPressed={this.addPressed}
          actionButtonDescription="Your Task"
          listData={
            this.state.showCompleted ?
            this.state.tasks :
            this.state.tasks.filtered('completed == $0', false)
          }
          listDataActive={true}
          renderListItem={this.renderTask}
          topBottomContainerDivider
          loadMorePressed={this.showCompleted}
          loadMoreText={
            this.state.showCompleted ?
            "Hide Completed Task" :
            "Show Completed Task"
          }
          loadMoreActive={this.state.completeButtonActive}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {
    flex: 1,
    backgroundColor: COLORS.secondary[global.colorScheme],
  };
};

const taskStatusStyle = () => {
  return {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.secondary[global.colorScheme],
    marginRight: 16,
    marginTop: 16,
  };
};

export default ProjectTask;
