import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from '_reducers';
import Router from '_scenes';

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <Router />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
