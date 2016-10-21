import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';


export default class MyScene extends Component {

  render() {
    return (
      <View style={{flex: 1}}>

        <View style={{flex: 2, flexDirection: 'column'}}>

          <Text style={{
           color: 'blue',
           fontSize: 30,
           backgroundColor: 'teal',
           textAlign: 'center'}}>
           {/* {contactlist[15].phoneNumbers[0].number} */}
           {this.props.contactList[15].phoneNumbers[0].number}
           hello
          </Text>
        </View>

      </View>
    )
  }
}
