import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import MyContact from './MyContact';


export default class ContactsPage extends Component {
  static propTypes = {
    contactList: PropTypes.array.isRequired,
    addContacts: PropTypes.func.isRequired,
  }

  render() {
    let addcontacts = this.props.addContacts
    return (
      <View style={{flex: 1}}>

        <View style={{flex: 2, flexDirection: 'column'}}>
          {this.props.contactList.map(function(contact, index) {
            return (<MyContact
              contact = {contact}
              key = {index}
              addContacts = {addcontacts}
            />)
          })}
        </View>

      </View>
    )
  }
}
