import React from 'react';
import {
  View,
  Text,
  TextInput,
  // TouchableOpacity,
} from 'react-native';
import {Colors} from '_resources';

const TimeInput = ({
  hours,
  minutes,
  updateHours,
  updateMinutes,
  amPressed,
  pmPressed,
  ampm,
}) => {
  return (
    <View style={containerStyle()}>
      <Text style={typeInTimeStyle()}>Type in time</Text>
      <View style={innerContainerStyle()}>
        <View style={timeInputContainerStyle()}>
          <View style={timeInputInnerContainerStyle()}>
            <TextInput
              keyboardType="number-pad"
              style={inputStyle()}
              multiline
              value={hours.toString()}
              autoCorrect={false}
              onChangeText={updateHours}
              placeholder="0"
            />
            <Text style={timeStyle()}>hours</Text>
          </View>
          <Text style={colonStyle()}> : </Text>
          <View style={timeInputInnerContainerStyle()}>
            <TextInput
              keyboardType="number-pad"
              style={inputStyle()}
              multiline
              value={minutes.toString()}
              autoCorrect={false}
              onChangeText={updateMinutes}
              placeholder="0"
            />
            <Text style={timeStyle()}>minutes</Text>
          </View>
        </View>
        {/*
          <View style={ampmContainerStyle()}>
          <View style={ampmInnerContainerStyle()}>
            <TouchableOpacity
              style={circleContainerStyle()}
              onPress={amPressed}>
              <View
                style={
                  ampm === 'am' ? activeCircleStyle() : inactiveCircleStyle()
                }
              />
            </TouchableOpacity>
            <Text style={ampmStyle()}>PM</Text>
          </View>
          <View style={ampmInnerContainerStyle()}>
            <TouchableOpacity
              style={circleContainerStyle()}
              onPress={pmPressed}>
              <View
                style={
                  ampm === 'pm' ? activeCircleStyle() : inactiveCircleStyle()
                }
              />
            </TouchableOpacity>
            <Text style={ampmStyle()}>AM</Text>
          </View>
        </View>*/}
      </View>
    </View>
  );
};

const containerStyle = () => {
  return {};
};

const innerContainerStyle = () => {
  return {flexDirection: 'row'};
};

const typeInTimeStyle = () => {
  return {
    fontWeight: 'bold',
    fontSize: 16,
    marginStart: 16,
    marginTop: 16,
    color: Colors.secondary[global.colorScheme],
  };
};

const timeInputContainerStyle = () => {
  return {
    flexDirection: 'row',
    marginStart: 16,
    marginEnd: 16,
  };
};

const timeInputInnerContainerStyle = () => {
  return {alignItems: 'flex-start'};
};

const colonStyle = () => {
  return {
    fontSize: 24,
    alignSelf: 'center',
    marginStart: 6,
    marginEnd: 6,
    color: Colors.secondary[global.colorScheme],
  };
};

const inputStyle = () => {
  return {
    fontSize: 20,
    width: 40,
    paddingStart: 0,
    paddingBottom: 0,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondary[global.colorScheme],
    color: Colors.secondary[global.colorScheme],
  };
};

const timeStyle = () => {
  return {color: Colors.secondary[global.colorScheme]};
};

/*const ampmContainerStyle = () => {
  return {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginEnd: 16,
    flexDirection: 'row',
  };
};

const ampmInnerContainerStyle = () => {
  return {alignItems: 'center'};
};

const ampmStyle = () => {
  return {
    fontSize: 12,
    color: Colors.secondary[global.colorScheme],
  };
};

const circleContainerStyle = () => {
  return {
    borderWidth: 2,
    height: 32,
    width: 32,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: 8,
    marginEnd: 8,
    borderColor: Colors.primary[global.colorScheme],
  };
};

const activeCircleStyle = () => {
  return {
    margin: 2,
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: Colors.primary[global.colorScheme],
  };
};

const inactiveCircleStyle = () => {
  return {};
};*/

export default TimeInput;
