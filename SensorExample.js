import React, { Fragment } from 'react';
import { Magnetometer, Accelerometer, Barometer, Gyroscope } from 'expo-sensors';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class MagnetometerSensor extends React.Component {
  constructor (props) {
    super(props);
    this.sensor = null;
    let sensorText = 'My cool sensor .... ';
    if (this.props.sensor === 'Magnetometer') {
      this.sensor = Magnetometer;
      sensorText = 'Magnetometer:';
    } else if (this.props.sensor === 'Accelerometer') {
      this.sensor = Accelerometer;
      sensorText = 'Accelerometer: (in Gs where 1 G = 9.81 m s^-2)';
    } else if (this.props.sensor === 'Barometer') {
      this.sensor = Barometer;
      sensorText = 'Barometer:';
    } else if (this.props.sensor === 'Gyroscope') {
      this.sensor = Gyroscope;
      sensorText = 'Gyroscope:';
    }

    this.state = {
      sensorData: {},
      sensorText,
      isSensorOn: true
    };
  }

  componentDidMount () {
    this._toggle();
  }

  componentWillUnmount () {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this.setState({
        isSensorOn: false
      }, this._unsubscribe());
    } else {
      this.setState({
        isSensorOn: true
      }, this._subscribe());
    }
  };

  _slow = () => {
    this.sensor.setUpdateInterval(1000);
  };

  _fast = () => {
    this.sensor.setUpdateInterval(16);
  };

  _subscribe = () => {
    this._subscription = this.sensor.addListener(sensorData => {
      this.setState({ sensorData });
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render () {
    let { x, y, z, pressure } = this.state.sensorData;
    console.log('state', this.state);

    const toggleButtonStyles = {
      backgroundColor: this.state.isSensorOn ? 'red' : 'green'
    }

    return (
      <Fragment>
        {
          this.props.sensor === 'Barometer' ? <Fragment>
            <Text>Barometer:</Text>
            <Text>{pressure * 100} Pa</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this._toggle} style={{...styles.button, ...toggleButtonStyles}}>
                <Text>Toggle</Text>
              </TouchableOpacity>
            </View>
          </Fragment> : <View style={styles.sensor}>
            <Text>{ this.state.sensorText }</Text>
            <Text>
              x: {round(x)} y: {round(y)} z: {round(z)}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this._toggle} style={{...styles.button, ...toggleButtonStyles}}>
                <Text>Toggle</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
                <Text>Slow</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._fast} style={styles.button}>
                <Text>Fast</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </Fragment>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
    width: '90%',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});