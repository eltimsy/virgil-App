import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Alert, StyleSheet } from 'react-native';


export default class MyContacts extends Component {
  static propTypes = {
    contact: PropTypes.object.isRequired,
    addContacts: PropTypes.func.isRequired,
  }


  onPressOne() {
    console.log("bye")
    console.log(this.props.addContacts)
    console.log(this.props.contact.phoneNumbers)
    if(this.props.contact.phoneNumbers.length > 0) {
      this.props.addContacts(this.props.contact.phoneNumbers[0].number)
    }
    Alert.alert('hello');
  }



  render() {

    return (
      <View>
        <Text>
          {this.props.contact.givenName}
        </Text>
        <TouchableHighlight style={styles.button} onPress={this.onPressOne.bind(this)} underlayColor='red'>
          <Text style={{
             color: 'blue',
             fontSize: 30,
             textAlign: 'center'}}>
             {this.props.contact.phoneNumbers.length > 0 ? this.props.contact.phoneNumbers[0].number : "NIL" }
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'teal',
    height: 40,
    borderColor: 'teal',
    justifyContent: 'center'
  }
});
