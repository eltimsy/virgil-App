'use strict';

import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Keyboard } from 'react-native';
import { DeviceEventEmitter,ScrollView, StyleSheet, View,TextInput, Text, Navigator, TouchableHighlight, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';
import KeyboardSpacer from './KeyboardSpacer';

const Form = t.form.Form;
const User = t.struct({
  first_name: t.String,
  last_name: t.String,
  email: t.String,
  password: t.String,
  confirm_pass: t.String,
});
const Message = t.struct({
  message: t.String,
})
const options = {};


class ChatPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
      messages: [],
      keyboardstatus: false,
    };
    this.handleText = this.handleText.bind(this)
    this.handlekeystate = this.handlekeystate.bind(this)
  }

  handleText(){
    this.state.messages.push(this.state.text);
    this.setState(this.state);
  }
  handlekeystate(value){
    console.log(value)
    if(value === true) {
      this.setState({
        keyboardstatus: true
      })
    } else {
      this.setState({
        keyboardstatus: false
      })
    }
  }
  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>

        <KeyboardSpacer handlekey = {this.handlekeystate}/>
        <View style={styles.chatbot}>
          <Text style={this.state.keyboardstatus? styles.botsmall : styles.bottitle}>ChatBot</Text>
        </View>
        <ScrollView style={{flex:8, backgroundColor: 'white'}}>
          <View style={styles.container}>
            {this.state.messages.map(function(element, index) {
              return (<Text key = {index}>
                {element}
              </Text>)
            })}
          </View>
        </ScrollView>
        <View style={this.state.keyboardstatus? styles.messageboxsmall : styles.messagebox}>
          <TextInput
            style={styles.textinputbox}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={this.handleText}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  chatbot: {
    flex: 1,
    backgroundColor: 'gray',
  },
  messagebox: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: -19,
  },
  textinputbox: {
    height: 40,
    borderRadius: 5,
    backgroundColor: '#e4e4e4',
  },
  messageboxsmall:{
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 12,
  },
  bottitle: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 10,
  },
  botsmall: {
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 5,
  },
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

module.exports = ChatPage;
