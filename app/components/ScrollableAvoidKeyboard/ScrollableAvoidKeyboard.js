import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ScrollableAvoidKeyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { style, contentContainerStyle, onScroll } = this.props;
    return (
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        bouncesZoom={false}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        style={[s.container, style]}
        contentContainerStyle={[s.contentContainer, contentContainerStyle]}
        onScroll={onScroll}
        enableOnAndroid={true}
        {...this.props}
      />
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});

export default ScrollableAvoidKeyboard;
