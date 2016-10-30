'use strict';

import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Navigator, TouchableHighlight, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';

const Email = t.refinement(t.String, (str) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegEx.test(str);
});

const PhoneNumber = t.refinement(t.Number, (num) => {
  const digits = num.toString().length
  return digits >= 10 && digits <= 15;
});

const Password = t.refinement(t.String, (str) => {
  return str.length >= 5;
})

const Form = t.form.Form;
const UserForm = t.struct({
  password: Password,
  confirm_password: Password,
  first_name: t.String,
  last_name: t.String,
  email: Email,
  phone_number: PhoneNumber,
});

function samePassword(object) {
  return object.password === object.confirm_password;
}

UserForm.getValidationErrorMessage = (value) => {
  if (!samePassword(value)) {
    return 'Passwords do not match'
  }
}

const options = {
  auto: 'placeholders',
  underlineColorAndroid: 'transparent',
  fields: {
    email: {
      error: 'Invalid email',
    },
    password: {
      type: 'password',
      error: 'Invalid password',
    },
    confirm_password: {
      type: 'password',
      error: 'Invalid password',
    },
  },
};

class SignupPage extends Component {

  handleSignup() {
    let navigator = this.props.navigator;
    let value = this.refs.form.getValue();
    this.props.userSignup(value, () => {
      this.props.getNewRoute(() => {
        console.log(this.props.routeName)
        navigator.replace({id: this.props.routeName});
      });
    });
  }

  sendToLogin() {
    this.props.navigator.replace({id: 'LoginPage'});
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#A3C4BC'}}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Create New Account:</Text>
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
