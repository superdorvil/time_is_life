import React from 'react';
import {View, TouchableOpacity} from 'react-native';

const ViewVisibleWrapper = ({active, style, children, onPress}) => {
  if (active) {
    if (onPress) {
      return (
        <TouchableOpacity style={style} onPress={onPress}>
          {children}
        </TouchableOpacity>
      );
    }
    return <View style={style}>{children}</View>;
  }

  return <View />;
};

export default ViewVisibleWrapper;
