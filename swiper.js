import React, { Component } from 'react';
import { PanResponder, View } from 'react-native';

export default class Swiper extends Component {
  static get propTypes () {
    return {
      content: React.PropTypes.element.isRequired,
      onSwipeLeft: React.PropTypes.func.isRequired,
      onSwipeRight: React.PropTypes.func.isRequired,
      swipeThreshold: React.PropTypes.number
    }
  }

  static get defaultProps () {
    return {
      swipeThreshold: 120
    }
  }

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (...args) => this.handleSwipe(...args)
    })
  }

  handleSwipe (object, gesture) {
    if (Math.abs(gesture.dx) > this.props.swipeThreshold) {
      if (gesture.dx > 0) {
        this.props.onSwipeRight()
      } else {
        this.props.onSwipeLeft()
      }
    }
  }

  render () {
    return <View {...this._panResponder.panHandlers}>
      {this.props.content}
    </View>
  }
}
