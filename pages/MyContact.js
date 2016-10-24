import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Alert, StyleSheet, TouchableOpacity } from 'react-native';

export default class MyContacts extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
    addContacts: PropTypes.func.isRequired,
  }

  onPressOne() {
    this.props.addContacts(this.props.contact.phoneNumber, this.props.contact.givenName, this.props.contact.index)
  }

  componentWillMount() {
    console.log(this.props.contact.givenName)
  }

  render() {

    return (

      <TouchableHighlight onPress={this.onPressOne.bind(this)} underlayColor='red'>
        <Text style={this.props.contact.press === true? styles.buttonPress: styles.button}> {this.props.contact.givenName} </Text>
      </TouchableHighlight>

    )
  }
}

const styles = StyleSheet.create({
  button: {
    color: 'black',
    borderColor: '#e3e6e0',
    borderBottomWidth: 2,
    justifyContent: 'center',
    fontSize: 20,
    padding: 5,
  },
  buttonPress: {
    color: 'black',
    backgroundColor: 'lightblue',
    borderColor: '#e3e6e0',
    borderBottomWidth: 2,
    justifyContent: 'center',
    fontSize: 20,
    padding: 5,
  },
});
