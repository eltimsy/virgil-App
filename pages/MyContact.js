import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Alert, StyleSheet, TouchableOpacity } from 'react-native';

export default class MyContacts extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
    addContacts: PropTypes.func.isRequired,
  }

  onPressOne() {
    if(this.props.contact.phoneNumbers.length > 0) {
      this.props.addContacts(this.props.contact.phoneNumbers[0].number, this.props.contact.givenName)
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onPressOne.bind(this)} underlayColor='red'>
          {this.props.contact.phoneNumbers.length > 0 ?
            <Text style={styles.button}> {this.props.contact.givenName} </Text> :
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
  }
});
