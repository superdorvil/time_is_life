import React, {Component} from 'react';
import {View, ScrollView, Text} from 'react-native';
import Modal from 'react-native-modal';
import Item from './Item';
import {COLORS} from '_resources';

class SelectItemModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const itemList = [];

    this.props.items.forEach((item, i) => {
      itemList.push(
        <View key={i}>
          <Item
            item={item.description}
            itemPressed={() => this.props.itemPressed(item.id)}
            selected={item.id === this.props.selectedItemID}
          />
          <View style={dividerStyle()} />
        </View>,
      );
    });

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

export default SelectItemModal;
