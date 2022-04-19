import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer, Task} from '_components';
import projectDB from '_data';
import {ICONS} from '_constants';
import {HoursUtils} from '_utils';

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

    this.state = {
      project,
      tasks,
      dueDatesToRender: [],
    };

    this.addPressed = this.addPressed.bind(this);
    this.maxims = this.maxims.bind(this);
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
      this.setState({
        task: projectDB.getProjects({
          realm: this.props.realm,
          projectID: this.props.project.id,
        }),
      });
      this.dueDatesToRender();
    });
    this.dueDatesToRender();
  }

  componentWillUnmount() {
    this.state.tasks.removeAllListeners();
    this.state.project.removeAllListeners();

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  maxims() {
    Actions.maxims({realm: this.props.realm});
  }

  addPressed() {
    Actions.createTask({
      realm: this.props.realm,
      project: this.state.project,
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
        dueDateIndex={listData.dueDateIndex}
        renderDueDate={renderDueDate}
      />
    );
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      centerIconName: ICONS.checkmark,
      actionDescription: this.state.project.description,
      topRightButtonActive: true,
      topRightButtonDescription: 'maxims',
      topRightButtonPressed: this.maxims,
    };

    return (
      <View style={containerStyle()}>
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

export default ProjectTask;
