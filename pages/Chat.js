'use strict';

import React, { Component } from 'react';
import { ScrollView, StyleSheet, View,TextInput, Text, Navigator, TouchableHighlight } from 'react-native';
import KeyboardSpacer from './KeyboardSpacer';

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      keyboardstatus: false,
    };
    this.handleText = this.handleText.bind(this)
    this.handlekeystate = this.handlekeystate.bind(this)
  }

  componentDidMount() {
    this.props.socket.on('message', (data) => {
      this.props.inputMessages(data);
      if(data.text === "Choose your contacts") {
        this.props.chatEnds();
        this.props.getNewRoute(() => {
          this.props.navigator.replace({id: this.props.routeName})
        })
      }
    })
  }

  handleText() {
    if(this.state.text) {
      let message = {text: this.state.text, type: 'client'};
      this.props.inputMessages(message);
      this.props.socket.emit('message', message)
      this.state.text = "";
      this.setState(this.state);
    }
  }
  handlekeystate(value) {
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
            {this.props.chatMessages.map(function(element, index) {
              return (<Text style={element.type === 'client'? styles.message : styles.botmessage} key = {index}>
                {element.text}
              </Text>)
            })}
          </View>
        </ScrollView>
        <View style={this.state.keyboardstatus? styles.messageboxsmall : styles.messagebox}>
          <TextInput
            underlineColorAndroid={'transparent'}
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
  message:{
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#a5f1b7',
    borderColor: '#a5f1b7',
    padding: 5,
    width: 200,
    fontSize: 20,
    marginBottom: 10,
  },
  botmessage:{
    alignSelf: 'flex-end',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#a1e3e4',
    borderColor: '#a1e3e4',
    padding: 5,
    width: 200,
    fontSize: 20,
    marginBottom: 10,
  },
  messagebox: {
    flex: 1,
    marginBottom: -19,
  },
  textinputbox: {
    paddingLeft: 10,
    height: 40,
    backgroundColor: '#e4e4e4',
  },
  messageboxsmall:{
    flex: 1,
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
