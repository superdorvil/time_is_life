import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import Icon from '_components/Icon';
import {COLORS} from '_resources';
import  {ICONS} from '_constants';
import store from '_reducers';
import Realm from 'realm';
import TimeIsLife from '_scenes';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Icon name={ICONS.plus} size={60} style={styles.icon} />
        <TimeIsLife />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: COLORS.orangeDarkPrimary,
  },
});

export default App;
