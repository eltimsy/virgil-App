'use strict';

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

class SplashPage extends Component {

  componentDidMount() {
    let navigator = this.props.navigator;
    this.props.getNewRoute(() => {
      setTimeout(() => {
        navigator.replace({id: this.props.routeName});
      }, 300);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../resources/pictures/kebabpic.jpg')} style={styles.backgroundImage}>
          <Text style={styles.title}>VIRGIL{"\n"}</Text>
          <Text style={styles.body}>VIRGIL is the Restaurant Guide In Limbo</Text>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'serif',
    fontStyle: 'italic',
    padding: 5,
    backgroundColor: '#395B50',
    borderRadius: 50,
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 300,
  },
  body: {
    width: 300,
    borderRadius: 5,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#395B50',
    opacity: 0.75,
  },
})
module.exports = SplashPage;
