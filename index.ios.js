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
  View
} from 'react-native';

import Swiper from './swiper'

export default class sweeper extends Component {
  constructor (props) {
    super(props)

    this.state = { direction: null }
  }

  renderContent () {
    return <View
      style={{
        height: 30,
        width: 30,
        backgroundColor: 'blue'
      }} />
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Swipe direction: {this.state.direction ? this.state.direction : 'none'}
        </Text>
        <Swiper
          content={this.renderContent()}
          onSwipeRight={() => this.setState({ direction: 'right' })}
          onSwipeLeft={() => this.setState({ direction: 'left' })} />
      </View>
    );
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
});

AppRegistry.registerComponent('sweeper', () => sweeper);
