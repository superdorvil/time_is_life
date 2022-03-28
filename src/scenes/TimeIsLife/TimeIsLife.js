import React, {useState, useEffect} from 'react';
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

function TimeIsLife() {
  const [realm, openRealm] = useState(null);
  const [settings, setSettings] = useState(null);
  // update root component color scheme to trigger global color scheme update
  const [colorScheme, updateColorScheme] = useState();

  useEffect(() => {
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
        projectDB.initSettings({realm});
        const settings = projectDB.getSettings({realm});

        settings.addListener(() => {
          const s = projectDB.getSettings({realm});

          global.colorScheme = s.colorScheme;

          setSettings(s);
          updateColorScheme(s.colorScheme)
        });

        openRealm(realm);
        setSettings(settings);
      });

    return function cleanup() {
      // const {realm} = this.state;
      // this.state.settings.removeAllListeners();
      if (realm !== null && !realm.isClosed) {
        realm.close();
      }

      // Nulls State removing memory leak error state update on unmounted comp
      // FIXME: double check
      openRealm(null);
      //this.setState = (state, callback) => {
        //return;
      //};
    };
  }, [])

  return (
    <ViewVisibleWrapper active={realm} style={containerStyle()}>
      <ProjectNavigator
        realm={realm}
        colorScheme={colorScheme}
      />
    </ViewVisibleWrapper>
  );
};

const containerStyle = () => {
  return {flex: 1};
};

export default TimeIsLife;
