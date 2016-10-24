'use strict';

import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SplashPage extends Component {

  componentWillMount() {
    let navigator = this.props.navigator;
    let routeId = this.props.logStatus ? 'ChatPage' : 'LoginPage';
    setTimeout(() => {
      navigator.replace({id: 'ChatPage'});
    }, 2000);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#246dd5', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 32,}}>VIRGIL:{"\n"}</Text>
        <Text style={{color: 'white', fontSize: 24, textAlign: 'center',}}>VIRGIL is the Restaurant Guide In Limbo</Text>
      </View>
    );
  }
}

module.exports = SplashPage;
