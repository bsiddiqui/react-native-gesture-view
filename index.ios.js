/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import Swiper from './swiper'

export default class sweeper extends Component {
  constructor (props) {
    super(props)

    this.state = { direction: null, clicks: 0, distance: 0, angle: 0 }
  }

  renderContent () {
    return <View>
      <Text style={styles.welcome}>
        Direction: {this.state.direction ? this.state.direction : 'none'}{'\n'}
        Angle: {this.state.angle}{'\n'}
        Distance: {this.state.distance}{'\n'}
      </Text>
      <Text style={styles.welcome}>
        Clicks: {this.state.clicks}
      </Text>
      <TouchableHighlight onPress={() => this.setState({ clicks: this.state.clicks + 1 })}>
        <View style={styles.button}>
          <Text>Click me</Text>
        </View>
      </TouchableHighlight>
    </View>
  }

  render() {
    return <Swiper
      content={this.renderContent()}
      style={styles.container}
      onSwipeRight={(distance, angle) => this.setState({ direction: 'right', distance, angle })}
      onSwipeLeft={(distance, angle) => this.setState({ direction: 'left' })}
      onSwipeUp={(distance, angle) => this.setState({ direction: 'up', distance, angle })}
      onSwipeDown={(distance, angle) => this.setState({ direction: 'down', distance, angle })}
      onUnhanledSwipe={(distance, angle) => this.setState({ direction: 'none', distance, angle })} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    width: 60,
    height: 40,
    backgroundColor: 'green'
  }
});

AppRegistry.registerComponent('sweeper', () => sweeper);
