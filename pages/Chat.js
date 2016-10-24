'use strict';

import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Navigator, TouchableHighlight, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;
const User = t.struct({
  first_name: t.String,
  last_name: t.String,
  email: t.String,
  password: t.String,
  confirm_pass: t.String,
});
const options = {};


class ChatPage extends Component {
  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
  renderScene(route, navigator) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>New Account</Text>
          </View>
          <View style={styles.row}>
            <Form
              ref="form"
              type={User}
              options={options}
            />
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this.userSignup} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Sign Up</Text>
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

module.exports = ChatPage;
