import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import Icon from '_components/Icon';
import {COLORS} from '_resources';
import {ICONS} from '_constants';

function TimeIsLife() {
  const reducers = useSelector((state) => state);
  const realm = reducers.realm;
  const project = reducers.project;

  return (
    <View style={styles.container}>
      <Text>{realm.realm}</Text>
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
