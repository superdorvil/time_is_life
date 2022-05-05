import React, {Component} from 'react';
import {TouchableOpacity, View, ScrollView, Text} from 'react-native';
import {ViewVisibleWrapper} from '_components';
import Modal from 'react-native-modal';
import Item from './Item';
import {COLORS} from '_resources';

class SelectItemModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCompleted: false,
    }

    this.showCompleted = this.showCompleted.bind(this);
  }

  showCompleted() {
    this.setState({showCompleted: !this.state.showCompleted});
  }

  render() {
    const maxLength = 15;
    const itemList = [];
    let skip = false;

    this.props.items.forEach((item, i) => {
      if (this.props.completeButton) {
        if (this.props.items.length > maxLength) {
          if (!this.state.showCompleted) {
            skip = true;
          }
        }
      }

      if (!skip) {
        itemList.push(
          <View key={i}>
            <Item
              item={item.description}
              itemPressed={() => this.props.itemPressed(item.id)}
              selected={item.id === this.props.selectedItemID}
            />
            <View style={dividerStyle()} />
          </View>
        );
      } else {
        if (!item.completed) {
          itemList.push(
            <View key={i}>
              <Item
                item={item.description}
                itemPressed={() => this.props.itemPressed(item.id)}
                selected={item.id === this.props.selectedItemID}
              />
              <View style={dividerStyle()} />
            </View>
          );
        }
      }
    });

    if (this.props.completeButton) {
      if (this.props.items.length > maxLength || this.state.showCompleted) {
          itemList.push(
            <TouchableOpacity
              style={completedButtonStyle()}
              onPress={this.showCompleted}
              key={itemList.length}>
              <Text style={completedStyle()}>
                {this.state.showCompleted ?
                  'Dont Show Completed Task' :
                  'Show Completed Task'}
              </Text>
            </TouchableOpacity>
          );
      }
    }

    return (
      <Modal
        animationType="slide"
        isVisible={this.props.visible}
        backdropColor="#000000"
        backdropOpacity={0.5}
        onBackdropPress={this.props.closeModal}>
        <View style={containerStyle()}>
          <Text style={headerStyle()}>{this.props.header}</Text>
          <ScrollView>{itemList}</ScrollView>
        </View>
      </Modal>
    );
  }
}

const containerStyle = () => {
  return {
    paddingBottom: 16,
    borderRadius: 16,
    maxHeight: '75%',
    backgroundColor: COLORS.tertiary[global.colorScheme],
  };
};

const headerStyle = () => {
  return {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary[global.colorScheme],
    backgroundColor: COLORS.primary[global.colorScheme],
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  };
};

const dividerStyle = () => {
  return {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.secondary[global.colorScheme],
  };
};

const completedButtonStyle = () => {
  return {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary[global.colorScheme],
    marginTop: 16,
    marginStart: 16,
    marginEnd: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
  };
};

const completedStyle = () => {
  return {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary[global.colorScheme],
  };
};

export default SelectItemModal;
