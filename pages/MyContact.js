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

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPressOne.bind(this)} underlayColor='red'>
          {this.props.contact.empty !== 0 ?
            <Text style={this.props.contact.press === true? styles.buttonPress: styles.button}> {this.props.contact.givenName} {this.props.contact.index} </Text> :
            <View></View>
          }
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    color: '#8FBB99',
    backgroundColor: '#595A4A',
    borderColor: '#B0FE76',
    borderWidth: 2,
    justifyContent: 'center',
    borderRadius: 5,
    fontSize: 30,
    textAlign: 'center'
  },
  buttonPress: {
    color: 'black',
    backgroundColor: 'red',
    borderColor: '#B0FE76',
    borderWidth: 2,
    justifyContent: 'center',
    borderRadius: 5,
    fontSize: 30,
    textAlign: 'center'
  },
});
