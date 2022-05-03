import React, {Component} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import projectDB from '_data';
import {ActionContainer} from '_components';
import {Button, ProjectInput} from '_components';
import {ICONS} from '_constants';

class ManageSubtask extends Component {
  constructor(props) {
    super(props);

    const editMode = this.props.subtask ? true : false;

    this.state = {
      editMode,
      description: editMode ? this.props.subtask.description : '',
      deleteButtonActive: editMode,
      actionDescription: editMode ? 'Edit Subtask' : 'Create New Subtask',
      topRightButtonActive: editMode,
      buttonDescription: editMode ? "Edit Subtask" : "+ Add Subtask",
    };

    this.createSubtask = this.createSubtask.bind(this);
    this.deleteSubtask = this.deleteSubtask.bind(this);
    this.editSubtask = this.editSubtask.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
  }

  createSubtask() {
    if (this.state.description !== '') {
      projectDB.createSubtask({
        realm: this.props.realm,
        description: this.state.description,
      });

      Actions.pop();
    }
  }

  deleteSubtask() {
    projectDB.deleteSubtask({
      realm: this.props.realm,
      subtaskID: this.props.subtask.id,
    });

    Actions.pop();
  }

  editSubtask() {
    if (this.state.description !== '') {
      projectDB.editSubtask({
        realm: this.props.realm,
        subtaskID: this.props.subtask.id,
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
      topRightButtonDescription: 'Delete Subtask',
      topRightButtonPressed: this.deleteSubtask,
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
            header="Subtask Name"
            value={this.state.description}
            onChangeText={this.updateDescription}
            placeholder="enter subtask name ..."
          />
        </ActionContainer>
        <View style={buttonStyle()}>
          <Button
            description={this.state.buttonDescription}
            buttonPressed={this.state.editMode ?  this.editSubtask : this.createSubtask}
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

export default ManageSubtask;
