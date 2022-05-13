import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ActionContainer} from '_components';
import projectDB from '_data';
import {ICONS} from '_constants';
import {COLORS} from '_resources';

class ManageDeletedItems extends Component {
  constructor(props) {
    super(props);
    const tasks = projectDB.getTasks({
      realm: this.props.realm,
      getDeleted: true,
    });
    const projects = projectDB.getProjects({
      realm: this.props.realm,
      getDeleted: true,
    });

    this.state = {
      tasks,
      projects,
      projectMode: this.props.projectMode,
    };

    this.switchMode = this.switchMode.bind(this);
  }

  componentDidMount() {
    this.state.projects.addListener(() => {
      const projects = projectDB.getProjects({
        realm: this.props.realm,
        getDeleted: true,
      });
      this.setState({projects});
    });
    this.state.tasks.addListener(() => {
      const tasks = projectDB.getTasks({
        realm: this.props.realm,
        getDeleted: true,
      });
      this.setState({tasks});
    });
  }

  componentWillUnmount() {
    if (this.state.tasks) {
      this.state.tasks.removeAllListeners();
    }
    if (this.state.projects) {
      this.state.projects.removeAllListeners();
    }

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  switchMode() {
    this.setState({projectMode: !this.state.projectMode});
  }

  renderItem(listData, extraData, index) {
    return (
      <TouchableOpacity
        onPress={
          () => {
            extraData.projectMode ?
              projectDB.restoreProject({
                realm: extraData.realm,
                projectID: listData.id,
              }) :
              projectDB.restoreTask({
                realm: extraData.realm,
                taskID: listData.id,
              });
          }
        }
        style={itemContainerStyle()}
        key={listData.id}>
        <View>
          <Text style={restoreStyle()}>
            restore
          </Text>
        </View>
        <Text style={descriptionStyle()}>{listData.description}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const actionScreenData = {
      centerIconName: ICONS.checkmark,
      actionDescription: this.state.projectMode ?
        'Your Deleted Projects' :
        'Your Deleted Task',
      topRightButtonActive: true,
      topRightButtonDescription: this.state.projectMode ?
        'Tasks' :
        'Projects',
      topRightButtonPressed: this.switchMode,
    };

    return (
      <View style={containerStyle()}>
        <ActionContainer
          extraData={{realm: this.props.realm, projectMode: this.state.projectMode}}
          weeklyProgressActive={false}
          weeklyProgressData={false}
          actionScreenActive={true}
          actionScreenData={actionScreenData}
          listData={this.state.tasks}
          listData={
            this.state.projectMode ?
            this.state.projects :
            this.state.tasks
          }
          listDataActive={true}
          renderListItem={this.renderItem}
          topBottomContainerDivider
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

const itemContainerStyle = () => {
  return {
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
  };
};

const descriptionStyle = () => {
  return {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.tertiary[global.colorScheme],
  };
};

const restoreStyle  = () => {
  return {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.secondary[global.colorScheme],
    backgroundColor: COLORS.primary[global.colorScheme],
    padding: 8,
    marginEnd: 16,
    borderRadius: 8,
  };
};

export default ManageDeletedItems;
