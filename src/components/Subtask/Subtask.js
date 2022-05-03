import React, {Component} from 'react';
import {Animated, TouchableOpacity, View, Text} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {Completion, SwipeButton} from '_components';
import {COLORS} from '_resources';
import {ICONS} from '_constants';

class Subtask extends Component {
  constructor(props) {
    super(props);

    this.state = {swipeOpen: false,};
  }

  swipeOpen() {
    this.setState({swipeOpen: true});
  }

  swipeClose() {
    this.setState({swipeOpen: false});
  }

  renderEditSubtaskSwipeButtons(
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
    topSubtask,
    // editSubtask,
    deleteSubtask,
  ) {
    const opacity = dragX.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={swipeContainerStyle()}>
        <View style={swipeInnerContainer()}>
          <Animated.View style={[swipeButtonStyle(), {opacity}]}>
            <SwipeButton
              displayName="Top"
              iconName={ICONS.up_arrow}
              onPress={topSubtask}
            />
            {/*<SwipeButton
              displayName="Edit"
              iconName={ICONS.edit}
              onPress={editSubtask}
            />*/}
            <SwipeButton
              displayName="Delete"
              iconName={ICONS.trash}
              onPress={deleteSubtask}
            />
          </Animated.View>
        </View>
      </View>
    );
  }

  render() {
    if (this.props.edit) {
      return (
        <View style={containerStyle()}>
          <TouchableOpacity onPress={this.props.deleteSubtask}>
            <Text style={deleteStyle()}>
              Delete
            </Text>
          </TouchableOpacity>
          <Text style={descriptionStyle()}>{this.props.description}</Text>
        </View>
      );
    }

    return (
      <Swipeable
        renderRightActions={(
          progress,
          dragX,
          topSubtask,
          deleteSubtask,
        ) => this.renderEditSubtaskSwipeButtons(
          progress,
          dragX,
          this.props.topSubtask,
          this.props.deleteSubtask,
        )}
        onSwipeableOpen={() => this.swipeOpen()}
        onSwipeableClose={() => this.swipeClose()}>
        <TouchableOpacity
          style={containerStyle(this.state.swipeOpen)}
          onPress={this.props.completeSubtask}>
          <Completion completed={this.props.completed} subtask />
          <Text style={descriptionStyle(this.props.completed)}>{this.props.description}</Text>
        </TouchableOpacity>
      </Swipeable>
    );
  }
}

const containerStyle = (swipeOpen) => {
  return {
    flexDirection: 'row',
    paddingStart: 24,
    paddingEnd: 24,
    paddingTop: swipeOpen ? 36: 16,
    paddingBottom: 16,
    alignItems: 'center',
  };
};

const descriptionStyle = completed => {
  if (completed) {
    return {
      fontWeight: 'bold',
      fontSize: 16,
      textDecorationLine: 'line-through',
      color: COLORS.tertiary[global.colorScheme],
    };
  } else {
    return {
      fontWeight: 'bold',
      fontSize: 16,
      color: COLORS.tertiary[global.colorScheme],
    };
  }
};

const deleteStyle  = () => {
  return {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.secondary[global.colorScheme],
    backgroundColor: COLORS.primary[global.colorScheme],
    padding: 8,
    marginEnd: 16,
    borderRadius: 8,
  };
};

const swipeInnerContainer = () => {
  return {
    flex: 1,
    alignItems: 'center',
  }
};

const swipeContainerStyle = () => {
  return {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  };
};

const swipeButtonStyle = () => {
  return {
    flex: 1,
    flexDirection: 'row',
  };
};

export default Subtask;
