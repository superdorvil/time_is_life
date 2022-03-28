import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {COLORS} from '_resources';
import {Icon} from '_components';
import {ICONS} from '_constants';

const StartStopButton = ({stopMode, timerPressed}) => {
  return (
    <View style={containerStyle()}>
      <TouchableOpacity style={ovalStyle()} onPress={timerPressed}>
        <Icon name={ICONS.playButton} size={20} style={playButtonStyle()} />
        <Text style={textStyle()}>{stopMode ? 'Stop' : 'Start'} Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const containerStyle = () => {
  return {
    justifyContent: 'center',
    flex: 1,
  };
};

const ovalStyle = () => {
  return {
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    paddingStart: 20,
    paddingEnd: 16,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary[global.colorScheme],
  };
};

const textStyle = () => {
  return {
    marginStart: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary[global.colorScheme],
  };
};

const playButtonStyle = () => {
  return {
    color: COLORS.secondary[global.colorScheme],
  };
};

export default StartStopButton;
