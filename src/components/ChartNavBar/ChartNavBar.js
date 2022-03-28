import React from 'react';
import {View} from 'react-native';
import ChartNavButton from './ChartNavButton';
import {Colors} from '_resources';

const ChartNavBar = ({
  dailySelected,
  dailyPressed,
  weeklySelected,
  weeklyPressed,
  monthlySelected,
  monthlyPressed,
}) => {
  return (
    <View style={outerContainerStyle()}>
      <View style={containerStyle()}>
        <ChartNavButton
          description="Daily"
          selected={dailySelected}
          navButtonPressed={dailyPressed}
        />
        <ChartNavButton
          description="Weekly"
          selected={weeklySelected}
          navButtonPressed={weeklyPressed}
        />
        <ChartNavButton
          description="Monthly"
          selected={monthlySelected}
          navButtonPressed={monthlyPressed}
        />
      </View>
    </View>
  );
};

const containerStyle = () => {
  return {
    flexDirection: 'row',
    borderRadius: 40,
    borderWidth: 1,
    paddingEnd: 4,
    paddingStart: 4,
    borderColor: Colors.primary[global.colorScheme],
  };
};

const outerContainerStyle = () => {
  return {
    marginTop: 8,
    marginBottom: 0,
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderStartWidth: 0,
    borderEndWidth: 0,
    borderColor: Colors.primary[global.colorScheme],
  };
};

export default ChartNavBar;
