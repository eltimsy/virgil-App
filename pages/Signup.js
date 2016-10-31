'use strict';

import React, { Component } from 'react';
import { Alert, ScrollView, StyleSheet, View, Text, Navigator, TouchableHighlight, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const UserForm = t.struct({
  first_name: t.String,
  last_name: t.String,
  email: t.String,
  phone_number: t.Number,
  password: t.String,
  confirm_password: t.String,
});

const options = {
  auto: 'placeholders',
  fields: {
    password: {
      password: true,
      secureTextEntry: true,
    },
    confirm_password: {
      password: true,
      secureTextEntry: true,
    },
  },
};

class SignupPage extends Component {

  constructor(props) {
    super(props);
    this.handleValidation = this.handleValidation.bind(this)
  }

  handleValidation(value, _done) {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const digits = value.phone_number.toString().length;
    let pass = false;
    if (emailRegEx.test(value.email)) {
      if (digits >= 10 && digits <= 15) {
        if (value.password === value.confirm_password) {
          pass = true;
        } else {
          Alert.alert('Signup Validation Failure:', 'Password and password confirmation fields do not match. Please try again.')
        }
      } else {
        Alert.alert('Signup Validation Failure:', 'Please enter a valid phone number between 10 and 15 digits.')
      }
    } else {
      Alert.alert('Signup Validation Failure:', 'Please enter a valid email address.')
    }
    _done(pass);
  }

  handleSignup() {
    let navigator = this.props.navigator;
    let value = this.refs.form.getValue();
    if (value) {
      this.handleValidation(value, (pass) => {
        if (pass) {
          this.props.userSignup(value, () => {
            this.props.getNewRoute(() => {
              navigator.replace({id: this.props.routeName});
            });
          });
        }
      });
    } else {
      Alert.alert('Signup Validation Failure:', 'Please ensure all fields are filled out.');
    }
  }

  sendToLogin() {
    this.props.navigator.replace({id: 'LoginPage'});
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#A3C4BC'}}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Create New Account</Text>
          </View>
          <View style={styles.row}>
            <Form
              ref="form"
              type={UserForm}
              options={options}
            />
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={styles.button2} onPress={this.handleSignup.bind(this)} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this.sendToLogin.bind(this)} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Back to Login</Text>
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
    backgroundColor: '#A3C4BC',
  },
  row: {
    backgroundColor: '#A3C4BC',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
    color: 'white',
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

module.exports = SignupPage;
