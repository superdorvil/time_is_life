import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer} from '_components';
import projectDB from '_data';
import {Button, ProjectInput} from '_components';
import {ICONS} from '_constants';

class CreateTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
    };

    this.createTask = this.createTask.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  createTask() {
    if (this.state.description !== '') {
      projectDB.createTask({
        realm: this.props.realm,
        description: this.state.description,
        projectID: this.props.project.id,
      });

      Actions.pop();
    }
  }

  updateDescription(description) {
    this.setState({description});
  }

  render() {
    const actionScreenData = {
      backArrowActive: true,
      editButtonActive: false,
      topRightButtonActive: false,
      centerIconName: ICONS.checkmark,
      actionDescription: 'Create New Task',
      subDescription: 'Time is Life',
    };

    return (
      <View style={containerStyle()}>
        <ActionContainer
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          actionNavBarActive={false}
          actionNavBarData={false}
          actionButtonActive={false}
          actionButtonPressed={false}
          listDataActive={false}
          listData={false}
          renderListItem={false}>
          <ProjectInput
            header="Task Name"
            value={this.state.description}
            onChangeText={this.updateDescription}
            placeholder="enter task name ..."
          />
        </ActionContainer>
        <View style={buttonStyle()}>
          <Button description="+ Add Task" buttonPressed={this.createTask} />
        </View>
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

const buttonStyle = () => {
  return {
    position: 'absolute',
    left: 16,
    bottom: 32,
  };
};

export default CreateTask;
