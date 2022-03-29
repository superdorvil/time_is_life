import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import projectDB from '_data';
import {ActionContainer} from '_components';
import {Button, ProjectInput} from '_components';
import {ICONS} from '_constants';

class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
    };

    this.createProject = this.createProject.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  createProject() {
    if (this.state.description !== '') {
      projectDB.createProject({
        realm: this.props.realm,
        description: this.state.description,
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
      actionDescription: 'Create New Project',
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
            header="Project Name"
            value={this.state.description}
            onChangeText={this.updateDescription}
            placeholder="enter project name ..."
          />
        </ActionContainer>
        <View style={buttonStyle()}>
          <Button
            description="+ Add Project"
            buttonPressed={this.createProject}
          />
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

export default CreateProject;
