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
    groupList: PropTypes.array.isRequired,
    clearGroup: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.socket.on('contacts', (data) => {
      if(data === 'done') {
        this.props.chatStarts();
        this.props.getNewRoute(() => {
          this.props.navigator.replace({id: this.props.routeName})
        })
      }
    })
  }
  handlePress() {
    let value = this.refs.form.getValue();
    this.props.addNumber(value);
  }
  handleSubmit() {
    let contacts = this.props.groupList
    if(contacts.length > 0) {
      this.props.socket.emit('contacts', contacts);
      this.props.clearGroup();
    }
  }
  render() {
    let addcontacts = this.props.addContacts
    return (
      <ScrollView style={{backgroundColor: '#BFD7B5'}}>
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

          <View style={this.props.groupList.length > 0? styles.group: styles.row}>
            {this.props.groupList.map(function(element,index) {
              return (<Text key = {index}>
                {element.name? element.name + "" + element.number: element.number}
              </Text>)
            })}
            <View style={{alignItems: 'center', marginTop: 5}}>
              <TouchableHighlight style={this.props.groupList.length > 0? styles.submit: styles.row} onPress={this.handleSubmit.bind(this)}>
                <Text style={this.props.groupList.length > 0? styles.textcolor: styles.hide}>Submit</Text>
              </TouchableHighlight>
            </View>
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
    backgroundColor: '#BFD7B5',
  },
  submit: {
    backgroundColor: '#395B50',
    width: 300,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  row: {
    marginTop: 5,
  },
  hide: {
    color: '#BFD7B5',
  },
  textcolor: {
    color: 'white',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#395B50',
    borderColor: '#395B50',
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
    marginTop: 15,
    flex: 2,
    backgroundColor: 'white',
  },
});

module.exports = ContactsPage;
