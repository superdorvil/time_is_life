import React, {Component} from 'react';
import Realm from 'realm';
import ProjectNavigator from './ProjectNavigator';
import {ViewVisibleWrapper} from '_components';
import {
  ProjectSchema,
  SecondsWorkedSchema,
  SettingsSchema,
  TaskSchema,
  WeeklyGoalSchema,
} from '_schemas';
import projectDB from '_data';

class TimeIsLife extends Component {
  constructor(props) {
    super(props);

    this.state = {
      realm: null,
      updateColorScheme: 0,
    };
  }

  componentDidMount() {
    Realm.open({
      schema: [
        ProjectSchema,
        SecondsWorkedSchema,
        SettingsSchema,
        TaskSchema,
        WeeklyGoalSchema,
      ],
      schemaVersion: 0,
      migration: (oldRealm, newRealm) => {
        projectDB.runMigrations({oldRealm, newRealm});
      },
    }).then(realm => {
      // projectDB.timeMasteryToTimeIsLife({realm});
      projectDB.initSettings({realm});
      const settings = projectDB.getSettings({realm});

      settings.addListener(() => {
        const s = projectDB.getSettings({realm});

        global.colorScheme = s.colorScheme;

        this.setState({
          settings: s,
          updateColorScheme: this.state.updateColorScheme + 1,
        });
      });

      this.setState({realm, settings});
    });
  }

  componentWillUnmount() {
    const {realm} = this.state;
    this.state.settings.removeAllListeners();

    if (realm !== null && !realm.isClosed) {
      realm.close();
    }

    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <ViewVisibleWrapper active={this.state.realm} style={containerStyle()}>
        <ProjectNavigator
          realm={this.state.realm}
          updateColorScheme={this.state.updateColorScheme}
        />
      </ViewVisibleWrapper>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

export default TimeIsLife;
