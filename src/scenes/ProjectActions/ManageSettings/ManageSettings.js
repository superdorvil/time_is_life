import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {SettingsItem} from '_components';
import {Icon, ColorSchemeModal} from '_components';
import {ICONS, UTILS} from '_constants';
import {COLORS} from '_resources';
import projectDB from '_data';
import {EmailUtils, DateUtils} from '_utils';

class ManageSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colorSchemeModalVisible: false,
      settings: projectDB.getSettings({realm: this.props.realm}),
    };

    this.openColorSchemeModal = this.openColorSchemeModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updateColorScheme = this.updateColorScheme.bind(this);
    this.sendDataBackUp = this.sendDataBackUp.bind(this);
    this.deletedProjects = this.deletedProjects.bind(this);
    this.deletedTasks = this.deletedTasks.bind(this);
  }

  componentDidMount() {
    this.state.settings.addListener(() => {
      this.setState({
        settings: projectDB.getSettings({realm: this.props.realm}),
      });
      global.colorScheme = this.state.settings.colorScheme;
    });
  }

  componentWillUnmount() {
    if (this.state.settings) {
      this.state.settings.removeAllListeners();
    }
    // Nulls State removing memory leak error state update on unmounted comp
    this.setState = (state, callback) => {
      return;
    };
  }

  openColorSchemeModal() {
    this.setState({colorSchemeModalVisible: true});
  }

  closeModal() {
    this.setState({colorSchemeModalVisible: false});
  }

  updateColorScheme(colorScheme) {
        console.log(this.props.realm);
    projectDB.updateColorScheme({realm: this.props.realm, colorScheme});
  }

  sendDataBackUp() {
    const realmData = projectDB.stringifyDB({realm: this.props.realm});
    const to = 'dgabriel999@gmail.com';
    const subject = 'back up time is life ' + DateUtils.convertDateToString({
      date: new Date(),
      format: UTILS.dateFormat.monthDateYear,
    });
    const spaces = `





    `;
    let body = realmData;

    EmailUtils.sendEmail(to, subject, body).then(() => {
        console.log('Your message was successfully sent!');
    });
  }

  deletedProjects() {
    Actions.manageDeletedItem({realm: this.props.realm, projectMode: true});
  }

  deletedTasks() {
    Actions.manageDeletedItem({realm: this.props.realm, projectMode: false});
  }

  render() {
    return (
      <View style={containerStyle()}>
        <View style={settingsContainerStyle()}>
          <Text style={settingsTextStyle()}>Settings</Text>
          <View style={settingsIconContainerStyle()}>
            <Icon name={ICONS.settings} size={32} style={settingsStyle()} />
          </View>
        </View>
        <SettingsItem
          description="Color Scheme"
          settingsPressed={this.openColorSchemeModal}
        />
        <SettingsItem
          description="Back Up data"
          settingsPressed={this.sendDataBackUp}
        />
        <SettingsItem
          description="Deleted Projects"
          settingsPressed={this.deletedProjects}
        />
        <SettingsItem
          description="Deleted Tasks"
          settingsPressed={this.deletedTasks}
        />
        {/*<SettingsItem description="Notifications" />
        <SettingsItem description="About" />
        <SettingsItem description="Help / Tutorial" />
        <SettingsItem description="Rate App" />
        <SettingsItem description="Share with friends" />
        <SettingsItem description="Contact Us" />*/}
        <ColorSchemeModal
          visible={this.state.colorSchemeModalVisible}
          orangeLightPressed={() => this.updateColorScheme(COLORS.orangeLight)}
          orangeDarkPressed={() => this.updateColorScheme(COLORS.orangeDark)}
          blueLightPressed={() => this.updateColorScheme(COLORS.blueLight)}
          blueDarkPressed={() => this.updateColorScheme(COLORS.blueDark)}
          cancelPressed={this.closeModal}
        />
      </View>
    );
  }
}

const containerStyle = () => {
  return {
    flex: 1,
    borderBottomWidth: 1,
    backgroundColor: COLORS.secondary[global.colorScheme],
    borderColor: COLORS.primary[global.colorScheme],
  };
};

const settingsContainerStyle = () => {
  return {
    flexDirection: 'row',
    borderBottomWidth: 1,
    padding: 16,
    borderColor: COLORS.primary[global.colorScheme],
  };
};

const settingsStyle = () => {
  return {color: COLORS.primary[global.colorScheme]};
};

const settingsTextStyle = () => {
  return {
    fontSize: 32,
    color: COLORS.primary[global.colorScheme],
  };
};

const settingsIconContainerStyle = () => {
  return {
    flex: 1,
    alignItems: 'flex-end',
  };
};

export default ManageSettings;
