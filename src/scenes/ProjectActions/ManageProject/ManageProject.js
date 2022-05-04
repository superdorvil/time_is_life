import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import projectDB from '_data';
import {ActionContainer} from '_components';
import {Button, ProjectInput} from '_components';
import {ICONS} from '_constants';

class ManageProject extends Component {
  constructor(props) {
    super(props);

    const editMode = this.props.project ? true : false;

    this.state = {
      editMode,
      description: editMode ? this.props.project.description : '',
      deleteButtonActive: editMode,
      actionDescription: editMode ? 'Edit Project' : 'Create New Project',
      topRightButtonActive: editMode,
      buttonDescription: editMode ? "Edit Project" : "+ Add Project",
    };

    this.createProject = this.createProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.editProject = this.editProject.bind(this);
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

  deleteProject() {
    projectDB.deleteProject({
      realm: this.props.realm,
      projectID: this.props.project.id,
    });

    Actions.pop();
    Actions.pop();
  }

  editProject() {
    if (this.state.description !== '') {
      projectDB.editProject({
        realm: this.props.realm,
        projectID: this.props.project.id,
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
      deleteButtonActive: this.state.deleteButtonActive,
      centerIconName: ICONS.checkmark,
      actionDescription: this.state.actionDescription,
      subDescription: 'Time is Life',
      topRightButtonActive: this.state.topRightButtonActive,
      topRightButtonDescription: 'Delete Project',
      topRightButtonPressed: this.deleteProject,
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
            description={this.state.buttonDescription}
            buttonPressed={this.state.editMode ?  this.editProject : this.createProject}
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

export default ManageProject;
