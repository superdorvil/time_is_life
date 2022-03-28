import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import {Colors} from '_resources';
import {LineChart} from 'react-native-chart-kit';

const HoursChart = ({labels, hours, dataWidth, yAxisSuffix}) => {
  let datasets;
  const screenWidth = Dimensions.get('window').width;
  let width = hours.length * dataWidth;

  if (width < screenWidth) {
    width = screenWidth;
  }

  if (hours.length === 0) {
    datasets = [{data: [0]}];
  } else {
    datasets = [{data: hours}];
  }
  //datasets.color = (opacity = 1) => `rgba(134, 65, 244, ${opacity})`;
  //datasets.strokeWidth = 2;

  return (
    <View style={containerStyle()}>
      <ScrollView horizontal>
        <LineChart
          data={{labels, datasets}}
          width={width} // from react-native
          height={180}
          yAxisSuffix={yAxisSuffix}
          yAxisInterval={1} // optional, defaults to 1
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: Colors.primary[global.colorScheme],
            backgroundGradientTo: Colors.primary[global.colorScheme],
            backgroundGradientFromOpacity: 0.5,
            backgroundGradientToOpacity: 0.5,
            fillShadowGradient: Colors.tertiary[global.colorScheme],
            fillShadowGradientOpacity: 0.5,
            decimalPlaces: 0,
            //color: (opacity = 1) => Colors.secondary[global.colorScheme], // `rgba(0, 0, 0, ${opacity})`,
            //labelColor: (opacity = 1) => Colors.tertiary[global.colorScheme], //`rgba(0, 0, 0, ${opacity})`,
            color: (opacity = 1) => Colors.secondary[global.colorScheme], //`rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 2,
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: Colors.primary[global.colorScheme],
            },
          }}
          style={chartStyle()}
        />
      </ScrollView>
      <View style={invisibleChartStyle()}>
        <LineChart
          data={{labels: [], datasets}}
          width={65} // from react-native
          height={180}
          yAxisSuffix={yAxisSuffix}
          yAxisInterval={1} // optional, defaults to 1
          withDots={false}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={false}
          fromZero={true}
          chartConfig={{
            backgroundGradientFrom: Colors.primary[global.colorScheme],
            backgroundGradientTo: Colors.primary[global.colorScheme],
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            fillShadowGradient: 'rgba(0, 0, 0, 0)',
            fillShadowGradientOpacity: 0.5,
            decimalPlaces: 0,
            color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 0) => Colors.tertiary[global.colorScheme], //`rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 1,
            propsForDots: {
              r: '0',
              strokeWidth: '0',
              stroke: 'rgba(0, 0, 0, 0)',
            },
          }}
          style={chartStyle()}
        />
      </View>
    </View>
  );
};

const containerStyle = () => {
  return {};
};

const chartStyle = () => {
  return {};
};

const invisibleChartStyle = () => {
  return {position: 'absolute'};
};

export default HoursChart;
