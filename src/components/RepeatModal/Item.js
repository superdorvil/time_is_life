import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Completion, Divider, ViewVisibleWrapper} from '_components';
import {COLORS} from '_resources';
import {UTILS} from '_constants';

const Item = ({description, repeatValue, updateRepeatValue, selected, onPress}) => {
  return (
    <TouchableOpacity style={containerStyle()} onPress={onPress}>
      <View style={innerContainerStyle()}>
        <Text style={descriptionStyle()}>{description}</Text>
        <ViewVisibleWrapper active={description === UTILS.repeatType.dfn}>
          <TextInput
            keyboardType="number-pad"
            style={inputStyle()}
            multiline
            value={repeatValue ? repeatValue.toString() : ''}
            autoCorrect={false}
            onChangeText={updateRepeatValue}
            placeholder="0"
          />
        </ViewVisibleWrapper>
        <Completion completed={description === selected} />
      </View>
      <Divider primary />
    </TouchableOpacity>
  );
}

const containerStyle = () => {
  return {
    justifyContent: 'center',
  };
};

const innerContainerStyle = () => {
  return {
    flexDirection: 'row',
    alignItems: 'center',
  };
};

const descriptionStyle = () => {
  return {
    color: COLORS.secondary[global.colorScheme],
    fontSize: 12,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    alignSelf: 'center',
    flex: 1,
  };
};

const inputStyle = () => {
  return {
    textAlign: 'center',
    fontSize: 20,
    width: 50,
    paddingStart: 0,
    paddingBottom: 0,
    marginBottom: 0,
    marginEnd: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary[global.colorScheme],
    color: COLORS.primary[global.colorScheme],
  };
};

export default Item;
