'use strict';

import React, { Component } from 'react';
import { ScrollView, StyleSheet, View,TextInput, Text, Navigator, TouchableHighlight } from 'react-native';
import AutoScroll from 'react-native-auto-scroll';
import KeyboardSpacer from './KeyboardSpacer';
import * as Animatable from 'react-native-animatable';

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
    this.props.socket.on('contacts', (data) => {
      if (data === 'gotocontacts') {
        this.props.chatEnds();
        this.props.getNewRoute(() => {
          this.props.navigator.replace({id: this.props.routeName});
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

  handleLogout() {
    this.props.userLogout(() => {
      this.props.getNewRoute(() => {
        this.props.navigator.replace({id: 'LoginPage'});
      })
    });
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
        <View style={this.state.keyboardstatus ? styles.chatbotSmall : styles.chatbot}>
          <Text style={this.state.keyboardstatus ? styles.botsmall : styles.bottitle}>Virgil</Text>
          <TouchableHighlight style={this.state.keyboardstatus ? styles.buttonSmall : styles.button} onPress={this.handleLogout.bind(this)} underlayColor={'#99d9f4'}>
              <Text style={this.state.keyboardstatus ? styles.buttonTextSmall : styles.buttonText}>Logout</Text>
          </TouchableHighlight>
        </View>
        <AutoScroll style={{flex:8, backgroundColor: 'white'}}>
          <View style={styles.container}>
            {this.props.chatMessages.map(function(element, index) {
              return (
                <Animatable.Text animation={element.type === 'client' ? "fadeInLeft" : "fadeInRight"} style={element.type === 'client' ? styles.message : styles.botmessage} key = {index}>
                  {element.text}
                </Animatable.Text>
              )
            })}
          </View>
        </AutoScroll>
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
    backgroundColor: '#395B50',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  chatbotSmall: {
    flex: 1,
    backgroundColor: '#395B50',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
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
    width: 300,
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
    backgroundColor: '#A3C4BC',
  },
  messageboxsmall:{
    flex: 1,
    marginBottom: 12,
  },
  bottitle: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 10,
    color: 'white',
    fontFamily: 'serif',
    fontStyle: 'italic',
  },
  botsmall: {
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 5,
    color: 'white',
    fontFamily: 'serif',
    fontStyle: 'italic',
  },
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: 'serif',
    fontStyle: 'italic',
  },
  buttonTextSmall: {
    fontSize: 0,
  },
  button: {
    height: 32,
    backgroundColor: '#395B50',
    borderColor: '#ffffff',
    borderWidth: 0.5,
    borderRadius: 8,
    marginBottom: 6,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  buttonSmall: {
    height: 0,
  }
});

module.exports = ChatPage;
