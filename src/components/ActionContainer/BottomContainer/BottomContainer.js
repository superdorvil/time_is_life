import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {COLORS} from '_resources';
import {ViewVisibleWrapper, Divider} from '_components';
import ActionButton from './ActionButton';
import LoadMoreButton from './LoadMoreButton';

class BottomContainer extends Component {
  renderDivider(dividerColorPrimary) {
    return <Divider primary={dividerColorPrimary} />;
  }

  render() {
    return (
      <View style={containerStyle()}>
        <View style={childrenContainerStyle()}>{this.props.children}</View>
        <View style={innerContainerStyle()}>
          <ViewVisibleWrapper active={this.props.actionButtonActive}>
            <ActionButton
              actionButtonDescription={this.props.actionButtonDescription}
              actionButtonPressed={this.props.actionButtonPressed}
            />
          </ViewVisibleWrapper>
          <ViewVisibleWrapper
            active={this.props.listDataActive}
            style={listStyle()}>
            <FlatList
              data={this.props.listData}
              renderItem={({item, index}) =>
                this.props.renderListItem(item, this.props.extraData, index)
              }
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={
                <LoadMoreButton
                  loadMorePressed={this.props.loadPreviousPressed}
                  previous={true}
                  active={this.props.loadPreviousActive}
                />
              }
              ListFooterComponent={
                <LoadMoreButton
                  loadMoreText={this.props.loadMoreText}
                  loadMorePressed={this.props.loadMorePressed}
                  previous={false}
                  active={this.props.loadMoreActive}
                />
              }
              ItemSeparatorComponent={() => this.renderDivider(this.props.dividerColorPrimary)}
              contentContainerStyle={listPaddingStyle()}
            />
          </ViewVisibleWrapper>
        </View>
      </View>
    );
  }
}

const containerStyle = () => {
  return {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.primary[global.colorScheme],
  };
};

const innerContainerStyle = () => {
  return {
    flex: 1,
    paddingTop: 12,
    paddingStart: 16,
    paddingEnd: 16,
    paddingBottom: 16,
  };
};

const childrenContainerStyle = () => {
  return {};
};

const listStyle = () => {
  return {flex: 1};
};

const listPaddingStyle = () => {
  return {paddingBottom: 16};
};

export default BottomContainer;
