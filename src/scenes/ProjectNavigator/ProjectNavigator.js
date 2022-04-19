import React, {Component} from 'react';
import {View} from 'react-native';
import {TabBar} from '_components';
import {ICONS} from '_constants';
import SceneSelector from './SceneSelector';

class ProjectNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigationState: ICONS.projects,
    };

    this.tabBarPressed = this.tabBarPressed.bind(this);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  tabBarPressed(navigationState) {
    this.setState({navigationState: navigationState});
  }

  render() {
    return (
      <View style={containerStyle()}>
        <SceneSelector
          scene={this.state.navigationState}
          realm={this.props.realm}
        />
        <TabBar
          navigationState={this.state.navigationState}
          projectsPressed={() => this.tabBarPressed(ICONS.projects)}
          goalsPressed={() => this.tabBarPressed(ICONS.goals)}
          chartsPressed={() => this.tabBarPressed(ICONS.charts)}
          todoPressed={() => this.tabBarPressed(ICONS.checkmark)}
          settingsPressed={() => this.tabBarPressed(ICONS.settings)}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {flex: 1};
};

export default ProjectNavigator;
