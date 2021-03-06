import React from 'react';
import {TextInput, Text, View} from 'react-native';
import {COLORS} from '_resources';

const ProjectInput = ({header, value, onChangeText, placeholder}) => {
  return (
    <View style={containerStyle()}>
      <Text style={headerStyle()}>{header}</Text>
      <View style={textInputContainerStyle()}>
        <TextInput
          keyboardType="default"
          style={textInputStyle()}
          multiline
          value={value}
          autoCorrect={false}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.primary[global.colorScheme]}
        />
      </View>
    </View>
  );
};

const containerStyle = () => {
  return {margin: 16};
};

const headerStyle = () => {
  return {
    fontSize: 16,
    marginStart: 16,
    color: COLORS.tertiary[global.colorScheme],
  };
};

const textInputStyle = () => {
  return {
    paddingTop: 12,
    fontSize: 20,
    marginStart: 16,
    marginEnd: 16,
    paddingBottom: 12,
    marginBottom: 16,
    borderBottomColor: COLORS.tertiary[global.colorScheme],
    borderBottomWidth: 1,
    color: COLORS.tertiary[global.colorScheme],
  };
};

// make the vertical padding zero(0) and specify an height for the input.
// This will make the text input uniform on both platforms.

const textInputContainerStyle = () => {
  return {
    borderWidth: 1,
    borderColor: COLORS.primary[global.colorScheme],
    borderRadius: 12,
    backgroundColor: COLORS.secondary[global.colorScheme],
    marginTop: 16,
  };
};

export default ProjectInput;
