'use strict';

import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Navigator, TouchableHighlight, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;
const LoginForm = t.struct({
  email: t.String,
  password: t.String,
});
const options = {
  auto: 'placeholders',
  underlineColorAndroid: 'transparent',
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  handleLogin() {
    let navigator = this.props.navigator;
    let value = this.refs.form.getValue();
    this.props.userLogin(value, () => {
      this.props.getNewRoute(() => {
        console.log(this.props.routeName)
        navigator.replace({id: this.props.routeName});
      });
    });
  }

  sendToSignUp() {
    this.props.navigator.replace({id: 'SignupPage'});
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#A3C4BC'}}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Login</Text>
          </View>
          <View style={styles.row}>
            <Form
              ref="form"
              type={LoginForm}
              options={options}
            />
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={styles.button2} onPress={this.handleLogin.bind(this)} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this.sendToSignUp.bind(this)} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>New User?</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#A3C4BC'
  },
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#A3C4BC',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 50,
    color: 'white',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button2: {
    height: 36,
    backgroundColor: '#395B50',
    borderColor: '#395B50',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#395B50',
    borderColor: '#395B50',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

module.exports = LoginPage;
