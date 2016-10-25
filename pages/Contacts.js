import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import MyContact from './MyContact';
const uuid = require('react-native-uuid');
import t from 'tcomb-form-native';

const Form = t.form.Form;
const NewNumber = t.struct({
  number: t.String,
});
const options = {
  auto: 'placeholders',
  underlineColorAndroid: 'white',
};


export default class ContactsPage extends Component {
  static propTypes = {
    contactList: PropTypes.array.isRequired,
    addContacts: PropTypes.func.isRequired,
    grouplist: PropTypes.array.isRequired,
  }
  handlePress() {
    let value = this.refs.form.getValue();
    this.props.addNumber(value);
  }

  render() {
    let addcontacts = this.props.addContacts
    return (
      <ScrollView>
        <View  style={styles.container}>
            <View style={styles.row}>
              <Form
                ref="form"
                type={NewNumber}
                options={options}
              />
            </View>
            <View style={styles.row}>
              <TouchableHighlight style={styles.button} onPress={this.handlePress.bind(this)} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Add Number</Text>
              </TouchableHighlight>
            </View>

          <View style={styles.group}>
            {this.props.grouplist.map(function(element,index) {
              return
              (<Text key = {index}>
                {element.name}
                {element.name? element.name + "" + element.number: element.number}
              </Text>)
            })}
          </View>

          <View style={styles.contacts}>
            {this.props.contactList.map(function(contact) {
              return (<MyContact
                contact = {contact}
                key = {contact.id}
                addContacts = {addcontacts}
              />)
            })}
          </View>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#e3e6e0',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#e3e6e0',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  group: {
    borderColor: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 5,
  },
  contacts: {
    marginTop: 5,
    flex: 2,
    backgroundColor: 'white',
  },
});

module.exports = ContactsPage;
