import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import SensorExample from './SensorExample';


class AccelerometerScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Accelerometer</Text>
        <SensorExample sensor='Accelerometer' />
      </View>
    );
  }
}

class BarometerScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Barometer</Text>
        <SensorExample sensor='Barometer' />
      </View>
    );
  }
}

class GyroscopeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Gyroscope</Text>
        <SensorExample sensor='Gyroscope' />
      </View>
    );
  }
}

class MagnetometerScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Magnetometer</Text>
        <SensorExample sensor='Magnetometer' />
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Barometer: BarometerScreen,
  Accelerometer: AccelerometerScreen,
  Gyroscope: GyroscopeScreen,
  Magnetometer: MagnetometerScreen
});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});