import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import Realm from 'realm';
import {
  ProjectSchema,
  SecondsWorkedSchema,
  SettingsSchema,
  TaskSchema,
  WeeklyGoalSchema,
} from '_schemas';
import projectDB from '_data';

function TimeIsLife() {
  const project = useSelector((state) => state.project);
  const [realm, openRealm] = useState(null);
  const [settings, setSettings] = useState(null);
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
      // I think this should work
      openRealm(null);
      //this.setState = (state, callback) => {
        //return;
      //};
    };
  }, [])

  return (
    <View style={styles.container}>
      <Text>{project.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TimeIsLife;
