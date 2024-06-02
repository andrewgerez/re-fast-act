
// @ts-nocheck

import { Component } from 'react';
import {
  NavigableComponent,
  customRender,
  View as FiberView,
  Text as FiberText,
  StyleSheet,
} from '../../fiber';

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'blue',
    width: 1920,
    height: 1080,
    position: 'absolute',
  },
});

class Navigable extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  render() {
    return (
      <FiberView style={styles.background}>
        <FiberText>Teste</FiberText>
      </FiberView>
    );
  }
}

const RenderNavigableComponent = NavigableComponent(Navigable);

function FiberCanvasElement(): JSX.Element {
  // @ts-ignore
  return customRender(<RenderNavigableComponent />, document.getElementById('canvas-root'));
}

export default FiberCanvasElement;
