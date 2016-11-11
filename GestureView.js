import React, { Component } from 'react'
import { PanResponder, View } from 'react-native'
import omit from 'lodash.omit'

export default class GestureView extends Component {
  constructor (props) {
    super(props)

    this.state = { quadrants: this.calculateQuadrants(props.quadrantThreshold) }
  }

  static get propTypes () {
    return {
      children: React.PropTypes.element.isRequired,
      onSwipeLeft: React.PropTypes.func,
      onSwipeRight: React.PropTypes.func,
      onSwipeUp: React.PropTypes.func,
      onSwipeDown: React.PropTypes.func,
      onUnhandledSwipe: React.PropTypes.func,
      onPanStart: React.PropTypes.func,
      onPan: React.PropTypes.func,
      onPanEnd: React.PropTypes.func,
      swipeThreshold: React.PropTypes.number,
      quadrantThreshold: React.PropTypes.number
    }
  }

  static get defaultProps () {
    return {
      swipeThreshold: 120,
      quadrantThreshold: 30
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.quadrantThreshold !== this.props.quadrantThreshold) {
      this.setState({ quadrants: this.calculateQuadrants(newProps.quadrantThreshold) })
    }
  }

  componentWillMount () {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        gestureState.dx !== 0 || gestureState.dy !== 0,
      onPanResponderRelease: (...args) => {
        this.handleSwipe(...args)
        this.handlePanEnd(...args)
      },
      onPanResponderMove: (...args) => this.handlePan(...args),
      onPanResponderGrant: (...args) => this.handlePanStart(...args)
    })
  }

  calculateQuadrants (threshold) {
    return {
      right: [0 + threshold, 0 - threshold],
      up: [-90 + threshold, -90 - threshold],
      down: [90 + threshold, 90 - threshold],
      topLeft: [-180 + threshold, -180],
      bottomLeft: [180, 180 - threshold]
    }
  }

  isInsideQuadrant (quadrants, direction, angle) {
    return angle >= quadrants[direction][1] && angle <= quadrants[direction][0]
  }

  handlePanEnd (...args) {
    return this.props.onPanEnd && this.props.onPanEnd(...args)
  }

  handlePanStart (...args) {
    return this.props.onPanStart && this.props.onPanStart(...args)
  }

  handlePan (...args) {
    return this.props.onPan && this.props.onPan(...args)
  }

  handleSwipe (object, gesture) {
    const angle = Math.atan2(gesture.dy, gesture.dx) * (180 / Math.PI)
    const distance = Math.sqrt(Math.pow(gesture.dx, 2) + Math.pow(gesture.dy, 2))

    if (distance > this.props.swipeThreshold) {
      if (this.props.onSwipeUp && this.isInsideQuadrant(this.state.quadrants, 'up', angle)) {
        this.props.onSwipeUp(distance, angle)
      } else if (this.props.onSwipeDown && this.isInsideQuadrant(this.state.quadrants, 'down', angle)) {
        this.props.onSwipeDown(distance, angle)
      } else if (this.props.onSwipeRight && this.isInsideQuadrant(this.state.quadrants, 'right', angle)) {
        this.props.onSwipeRight(distance, angle)
      } else if (this.props.onSwipeLeft && this.isInsideQuadrant(this.state.quadrants, 'topLeft', angle)) {
        this.props.onSwipeLeft(distance, angle)
      } else if (this.props.onSwipeLeft && this.isInsideQuadrant(this.state.quadrants, 'bottomLeft', angle)) {
        this.props.onSwipeLeft(distance, angle)
      } else if (this.props.onUnhandledSwipe) {
        this.props.onUnhandledSwipe(distance, angle)
      }
    } else if (this.props.onUnhandledSwipe) {
      this.props.onUnhandledSwipe(distance, angle)
    }
  }

  render () {
    return (
      <View
        {...this._panResponder.panHandlers}
        {...omit(this.props, Object.keys(GestureView.propTypes))}>
        {this.props.children}
      </View>
    )
  }
}
