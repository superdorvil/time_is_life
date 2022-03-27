import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';

function TimeIsLife() {
  const reducers = useSelector((state) => state);
  const realm = reducers.realm;
  const project = reducers.project;

  return (
    <View>
      <Text>{realm.realm}</Text>
      <Text>{project.id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default TimeIsLife;
