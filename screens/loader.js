import React from 'react';
import {StyleSheet, View, rgba} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {visible: true};
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        visible: false,
      });
    }, 10000);
  }

  render() {
    const {visible} = this.state;
    return (
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(0,0,0,0.5)"
        source={require('../resource/toast.json')}
        animationStyle={styles.lottie}
        speed={1}
      />
    );
  }
}
const styles = StyleSheet.create({
  lottie: {
    width: 280,
    height: 280,
  },
});
