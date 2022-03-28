import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from '_components';
import {Icons} from '_constants';
import {Colors} from '_resources';

const ArrowIncrementer = ({dateInfo, incrementIndex, decrementIndex}) => {
  return (
    <View style={containerStyle()}>
      <TouchableOpacity
        onPress={incrementIndex}
        style={arrowLeftContainerStyle()}>
        <Icon name={Icons.leftArrow} size={35} style={arrowStyle()} />
      </TouchableOpacity>
      <Text style={dateInfoStyle()}>{dateInfo}</Text>
      <TouchableOpacity
        onPress={decrementIndex}
        style={arrowRightContainerStyle()}>
        <Icon name={Icons.rightArrow} size={35} style={arrowStyle()} />
      </TouchableOpacity>
    </View>
  );
};

const containerStyle = () => {
  return {
    borderWidth: 1,
    borderColor: Colors.primary[global.colorScheme],
    flexDirection: 'row',
  };
};

const arrowStyle = () => {
  return {color: Colors.primary[global.colorScheme]};
};

const arrowLeftContainerStyle = () => {
  return {
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 4,
    paddingBottom: 4,
    borderEndWidth: 1,
    borderColor: Colors.primary[global.colorScheme],
  };
};

const arrowRightContainerStyle = () => {
  return {
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 4,
    paddingBottom: 4,
    borderStartWidth: 1,
    borderColor: Colors.primary[global.colorScheme],
  };
};

const dateInfoStyle = () => {
  return {
    fontSize: 12,
    color: Colors.tertiary[global.colorScheme],
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
  };
};

export default ArrowIncrementer;
