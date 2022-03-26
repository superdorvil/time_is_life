import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import Icon from '_components/Icon';
import {COLORS} from '_resources';
import  {ICONS} from '_constants';

function App() {
  return (
    <SafeAreaView>
      <Icon name={ICONS.plus} size={60} style={styles.icon} />
      <Icon name={ICONS.projects} size={60} style={styles.icon} />
      <Icon name={ICONS.goals} size={60} style={styles.icon} />
      <Icon name={ICONS.charts} size={60} style={styles.icon} />
      <Icon name={ICONS.settings} size={60} style={styles.icon} />
      <Icon name={ICONS.leftArrow} size={60} style={styles.icon} />
      <Icon name={ICONS.rightArrow} size={60} style={styles.icon} />
      <Icon name={ICONS.checkmark} size={60} style={styles.icon} />
      <Icon name={ICONS.clock} size={60} style={styles.icon} />
      <Icon name={ICONS.calendar} size={60} style={styles.icon} />
      <Icon name={ICONS.playButton} size={60} style={styles.icon} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: COLORS.orangeDarkPrimary,
  },
});

export default App;
