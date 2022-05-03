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

    this.state = {
      tasks,
      dueDatesToRender: [],
    };

    this.maxims = this.maxims.bind(this);
  }

  componentDidMount() {
    this.state.tasks.addListener(() => {
      this.setState({
        task: projectDB.getTasks({
          realm: this.props.realm,
        }),
      });
      this.dueDatesToRender();
    });
    this.dueDatesToRender();
  }

  componentWillUnmount() {
    this.state.tasks.removeAllListeners();

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  maxims() {
    Actions.maxims({realm: this.props.realm});
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
      topRightButtonActive: true,
      topRightButtonDescription: 'maxims',
      topRightButtonPressed: this.maxims,
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
          listDataActive={true}
          renderListItem={this.renderTask}
          topBottomContainerDivider
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

export default TaskList;
