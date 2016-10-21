import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
const Contacts = require('react-native-contacts')
let contactlist;

Contacts.getAll((err, contacts) => {
  if(err && err.type === 'permissionDenied'){
    // x.x
  } else {
    contactlist = contacts
  }
})

export default class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text style={{width: 100, height: 30, backgroundColor: 'red'}}>Forward</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text style={{width: 100, height: 30, backgroundColor: 'green'}}>Back</Text>
        </TouchableHighlight>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <View style={{width: 100, height: 100, backgroundColor: 'steelblue', borderRadius: 50}} />

        </View>
        <View style={{flex: 2, flexDirection: 'column'}}>

          <Text style={{
           color: 'blue',
           fontSize: 30,
           backgroundColor: 'teal',
           textAlign: 'center'}}>
           {contactlist[0].phoneNumbers[0].number}
          </Text>
        </View>

      </View>
    )
  }
}
