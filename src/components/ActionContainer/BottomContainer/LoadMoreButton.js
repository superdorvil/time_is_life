import React from 'react';
import {Text} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import {Colors} from '_resources';

const LoadMoreButton = ({loadMorePressed, previous, active}) => {
  return (
    <ViewVisibleWrapper
      style={containerStyle()}
      active={active}
      onPress={loadMorePressed}>
      <Text style={textStyle()}>
        {previous ? 'load previous' : 'load more'}
      </Text>
    </ViewVisibleWrapper>
  );
};

const containerStyle = () => {
  return {
    flex: 1,
    backgroundColor: Colors.primary[global.colorScheme],
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 16,
  };
};

const textStyle = () => {
  return {
    fontSize: 20,
    color: Colors.secondary[global.colorScheme],
    margin: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  };
};

export default LoadMoreButton;
