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
  underlineColorAndroid: 'white',
};

class LoginPage extends Component {

  sendToSignUp() {
    this.props.navigator.replace({id: 'SignupPage'});
  }

  render() {
    return (
      <ScrollView>
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
            <TouchableHighlight style={styles.button} onPress={this.props.userLogin.bind(this)} underlayColor='#99d9f4'>
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
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

module.exports = LoginPage;
