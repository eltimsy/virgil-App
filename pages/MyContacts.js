import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import MyContact from './MyContact';
const uuid = require('react-native-uuid');


export default class MyContacts extends Component {
  static propTypes = {
    contactList: PropTypes.array.isRequired,
    addContacts: PropTypes.func.isRequired,
    grouplist: PropTypes.array.isRequired,
  }

  render() {
    let addcontacts = this.props.addContacts
    return (
      <View style={{flex: 1}}>

        <View style={styles.group}>
          {this.props.grouplist.map(function(element) {
            return (<Text key = {uuid.v4()}>
              {element.name? element.name + "" + element.number: element.number}
            </Text>)
          })}
        </View>
        <View style={{flex: 2, flexDirection: 'column'}}>
          {this.props.contactList.map(function(contact) {
            return (<MyContact
              contact = {contact}
              key = {uuid.v4()}
              addContacts = {addcontacts}
            />)
          })}
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  group: {
    borderColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },
});
