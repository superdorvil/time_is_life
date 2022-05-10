import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer, Task} from '_components';
import projectDB from '_data';
import {ICONS} from '_constants';
import {HoursUtils, DateUtils} from '_utils';

class TaskList extends Component {
  constructor(props) {
    super(props);
    const tasks = projectDB.getTasks({
      realm: this.props.realm,
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
      tasks,
      dueDatesToRender: [],
      completeButtonActive,
      showCompleted,
    };

    this.showCompleted = this.showCompleted.bind(this);
  }

  componentDidMount() {
    this.state.tasks.addListener(() => {
      const tasks = projectDB.getTasks({
        realm: this.props.realm,
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
        showCompleted
      });
      this.dueDatesToRender();
    });
    this.dueDatesToRender();
  }

  componentWillUnmount() {
    if (this.state.tasks) {
      this.state.tasks.removeAllListeners();
    }

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
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
        realm={extraData.realm}
        taskID={listData.id}
        taskPressed={() => {
          projectDB.completeTask({
            realm: extraData.realm,
            taskID: listData.id,
          });
        }}
        projectID={listData.projectID}
        important={listData.important}
        showProject
        dueDateIndex={listData.dueDateIndex}
        renderDueDate={renderDueDate}
        subtasks={listData.subtasks}
      />
    );
  }

  render() {
    const actionScreenData = {
      centerIconName: ICONS.checkmark,
      actionDescription: 'Your Task',
      topRightButtonActive: false,
    };

    return (
      <View style={containerStyle()}>
        <ActionContainer
        extraData={{
          realm: this.props.realm,
          dueDatesToRender: this.state.dueDatesToRender,
        }}
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          listData={this.state.tasks}
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
            "Hide Deleted Task" :
            "Show Deleted Task"
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

export default TaskList;
