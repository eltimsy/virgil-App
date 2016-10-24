'use strict';

import React, { Component } from 'react';
import { ScrollView, StyleSheet, View,TextInput, Text, Navigator, TouchableHighlight, TouchableOpacity } from 'react-native';
import t from 'tcomb-form-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

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
    };
    this.handleText = this.handleText.bind(this)
  }
  handleText(){
    this.state.messages.push(this.state.text);
    this.setState(this.state);
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

        <KeyboardSpacer />
        <View style={styles.chatbot}><Text style={styles.bottitle}>ChatBot</Text></View>
        <ScrollView style={{flex:8, backgroundColor: 'white'}}>
          <View style={styles.container}>
            {this.state.messages.map(function(element, index) {
              return (<Text key = {index}>
                {element}
              </Text>)
            })}
          </View>
        </ScrollView>
        <View style={styles.messagebox}>
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
    marginBottom: -15,
    marginRight: 5,
    marginLeft: 5,
  },
  textinputbox: {
    height: 40,
    borderRadius: 5,
    backgroundColor: '#e4e4e4',
  },
  bottitle: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 10,
  },
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
});

module.exports = ChatPage;
