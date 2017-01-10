# GestureView

Detects swipes in any `<View>` element including the swipe direction.

### Usage

You should use GestureView as a normal `<View>` element:

```jsx
render () {
  return (
    <GestureView onSwipeUp={this.onSwipeUp}>
      <Text>Swipe up for awesomeness</Text>
    </GestureView>
  )
}
```

### Props

* __`onSwipeUp`__ an optional function that's triggered when the view detects a swipe
to the `up` direction
* __`onSwipeDown`__ an optional function that's triggered when the view detects a swipe
to the `down` direction
* __`onSwipeLeft`__ an optional function that's triggered when the view detects a swipe
to the `left` direction
* __`onSwipeRight`__ an optional function that's triggered when the view detects a swipe
to the `right` direction
* __`onUnhandleSwipe`__ an optional function that's triggered when the swipe was
inside the threshold
* __`swipeThreshold`__ the amount of pixels that the swipe needs to have before
being interpreted as a swipe. Defaults to `120`
* __`quadrantThreshold`__ an angle that's computed into each quadrant, use it to
make wider/narrowed quadrants. Defaults to `30`
