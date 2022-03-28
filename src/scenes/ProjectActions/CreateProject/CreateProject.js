import React, {useState} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import projectDB from '_data';
import {ActionContainer} from '_components';
import {Button, ProjectInput} from '_components';
import {ICONS} from '_constants';

function CreateProject({realm}) {
  const actionScreenData = {
    backArrowActive: true,
    editButtonActive: false,
    topRightButtonActive: false,
    centerIconName: ICONS.checkmark,
    actionDescription: 'Create New Project',
  };
  const [description, updateDescription] = useState();

  const createProject = () => {
    if (description !== '') {
      projectDB.createProject({
        realm,
        description,
      });

      Actions.pop();
    }
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
          value={description}
          onChangeText={updateDescription}
          placeholder="enter project name ..."
        />
      </ActionContainer>
      <View style={buttonStyle()}>
        <Button
          description="+ Add Project"
          buttonPressed={createProject}
        />
      </View>
    </View>
  );
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
