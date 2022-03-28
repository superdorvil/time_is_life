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
import Icon from '_components/Icon';
import {COLORS} from '_resources';
import {ICONS} from '_constants';

function TimeIsLife() {
  const project = useSelector((state) => state.project);
  const [realm, openRealm] = useState(null);

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
        openRealm(realm);
      });
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
  icon: {
    color: COLORS.orangeDarkPrimary,
  },
});

export default TimeIsLife;
