import React, { Component } from 'react';
import { Alert, AppRegistry, ScrollView, AsyncStorage, Text, TextInput, Image, View, StyleSheet, Navigator, TouchableHighlight } from 'react-native';
import socketConfig from './utils/SocketUtil';
import io from './utils/SocketUtil';
import ConfigFile from './config.json';

import SplashPage from './pages/SplashPage';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ChatPage from './pages/Chat';
import ContactsPage from './pages/Contacts';

const uuid = require('react-native-uuid');

const Contacts = require('react-native-contacts');
const STORAGE_KEY = 'id_token';
const Configs = ConfigFile.development;

const options = {};

class VirgilApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [],
      groupList: [],
      routeName: 'SplashPage',
      chatMessages: [],
      logStatus: false,
      chatOn: true,
      socket: null,
    };
    this.configureSocket = this.configureSocket.bind(this);
    this.addContacts = this.addContacts.bind(this);
    this.addNumber = this.addNumber.bind(this);
    this.getNewRoute = this.getNewRoute.bind(this);
    this.chatEnds = this.chatEnds.bind(this);
    this.chatStarts = this.chatStarts.bind(this);
    this.clearGroup = this.clearGroup.bind(this);
    this.inputMessages = this.inputMessages.bind(this);
  }

  async configureSocket(_done) {
    this.state.socket = null;
    const TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
    if (TOKEN) {
      socketConfig.query = `token=${TOKEN}`;
    }
    const socket = io.connect(Configs.host, socketConfig);
    socket.on('connect', () => {
      socket.emit('authenticate', {token: TOKEN})
        .on('authenticated', () => {
          this.setState({logStatus: true});
        })
        .on('unauthorized', (message) => {
          console.log(`Could not authenticate: ${JSON.stringify(message.data)}.`);
          this.setState({logStatus: false});
        })
    })
    socket.on('message', (data) => {
      this.inputMessages(data);
    });
    this.setState({socket: socket});
    _done();
  }

  componentDidMount() {

    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        Alert.alert('Contacts', 'Could not retrieve contacts.')
      } else {
        let contactlist = contacts.filter(function(contact){
          return contact.phoneNumbers.length > 0;
        })
        let contactlistmapped = contactlist.map(function(contact, index) {
           let wordOneLetter = contact.givenName.charAt(0).toUpperCase();
           let wordTwoletter = 0
           if(index > 0) {
             wordTwoletter = contactlist[index - 1].givenName.charAt(0).toUpperCase();
           }
           if (wordOneLetter !== wordTwoletter) {
             return({
               phoneNumber: contact.phoneNumbers[0].number,
               givenName: contact.givenName,
               press: false,
               index: index,
               letter: wordOneLetter,
               id: uuid.v4()
             });
           } else {
            return({
              phoneNumber: contact.phoneNumbers[0].number,
              givenName: contact.givenName,
              press: false,
              index: index,
              id: uuid.v4(),
            });
          }
        })
        this.setState({contactList: contactlistmapped})
      }
    })
  }

  componentWillUnmount() {
    if (this.state.socket) {
      this.state.socket.emit('disconnect');
      this.setState({socket: null});
    }
  }

  getNewRoute(_done) {
    if (this.state.logStatus === true) {
      if (this.state.chatOn) {
        this.state.routeName = 'ChatPage';
      } else {
        this.state.routeName = 'ContactsPage';
      }
    } else {
      this.state.routeName = 'LoginPage';
    }
    this.setState(this.state);
    _done();
  }

  async onValueChange(item, value, _done) {
    try {
      await AsyncStorage.setItem(item, value);
      _done();
    } catch (err) {
      console.log(`AsyncStorage error: ${err.message}`);
      _done();
    }
  }

  userSignup(value, _done) {
    if (value) {
      fetch(`${Configs.host}/users`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: value.first_name,
          last_name: value.last_name,
          phone_number: value.phone_number,
          password: value.password,
          email: value.email,
        })
      })
      .then((res) => {
        if (JSON.parse(res._bodyText).id_token) {
          let token = JSON.parse(res._bodyText).id_token;
          this.onValueChange(STORAGE_KEY, token, () => {
            this.configureSocket(_done);
          });
        } else {
          throw new Error(JSON.parse(res._bodyText).error)
        }
      })
      .catch((err) => {
        Alert.alert(
          'Sign Up Failure:',
          err.message);
      })
      .done()
    }
  }

  userLogin(value, _done) {
    if (value) {
      fetch(`${Configs.host}/users/sessions/create`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: value.email,
          password: value.password
        })
      })
      .then((res) => {
        if (JSON.parse(res._bodyText).id_token) {
          let token = JSON.parse(res._bodyText).id_token;
          this.onValueChange(STORAGE_KEY, token, () => {
            this.configureSocket(_done);
          });
        } else {
          throw new Error(JSON.parse(res._bodyText).error)
        }
      })
      .catch((err) => {
        console.log(err)
        Alert.alert(
          'Login Failure:',
          err.message);
      })
      .done()
    }
  }

  async userLogout(_done) {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      Alert.alert("Logout succeeded.")
      _done();
    } catch (err) {
      console.log(`AsyncStorage error: ${err}.`)
      _done();
    }
  }

  chatEnds() {
    this.state.chatOn = false;
    this.setState(this.state);
  }

  chatStarts() {
    this.state.chatOn = true;
    this.setState(this.state);
  }

  addContacts(phoneNum, name, index) {
    let list = this.state.groupList;
    let newcontact = true;
    let duplicate = null;
    list.forEach(function(element, index) {
      if (element.number === phoneNum) {
        newcontact = false
        duplicate = index
      }
    })

    if (newcontact === true) {
       list.push({name: name, number: phoneNum})
       this.state.contactList[index].press = true;
       this.setState(this.state);
     } else if (newcontact === false) {
       list = list.splice(duplicate, 1);
       this.state.contactList[index].press = false;
       this.setState(this.state);
     }
   }

   addNumber(value) {
     if(value) {
       value.name = "";
       this.state.groupList.push(value)
       this.setState(this.state);
     }
   }

   clearGroup() {
     this.state.contactList.forEach((contact) => {
       return contact.press = false;
     })
     this.setState(this.state)
     this.setState({groupList: []})
   }

   inputMessages(message) {
     if (message.text !== 'gotocontacts') {
       this.state.chatMessages.push(message);
       this.setState(this.state);
     }
   }

  render() {
    const routes = [
      {id: 'SplashPage', index: 0},
      {id: 'LoginPage', index: 1},
      {id: 'SignupPage', index: 2},
      {id: 'ChatPage', index: 3},
      {id: 'ContactsPage', index: 4}
    ];
    return (
      <Navigator
        initialRoute={{id: this.state.routeName}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
  renderScene(route, navigator) {
    let routeId = route.id;
    if (routeId === 'SplashPage') {
      return (
        <SplashPage
          configureSocket = {this.configureSocket}
          getNewRoute = {this.getNewRoute}
          routeName = {this.state.routeName}
          navigator = {navigator} />
      );
    }
    if (routeId === 'LoginPage') {
      return (
        <LoginPage
          userLogin = {this.userLogin}
          getNewRoute = {this.getNewRoute}
          configureSocket = {this.configureSocket}
          onValueChange = {this.onValueChange}
          routeName = {this.state.routeName}
          navigator = {navigator} />
      );
    }
    if (routeId === 'SignupPage') {
      return (
        <SignupPage
          userSignup={this.userSignup}
          onValueChange={this.onValueChange}
          getNewRoute={this.getNewRoute}
          configureSocket={this.configureSocket}
          routeName={this.state.routeName}
          navigator={navigator} />
      );
    }
    if (routeId === 'ChatPage') {
      return (
        <ChatPage
          inputMessages = {this.inputMessages}
          getNewRoute = {this.getNewRoute}
          routeName = {this.state.routeName}
          socket = {this.state.socket}
          chatEnds = {this.chatEnds}
          chatMessages = {this.state.chatMessages}
          chatOn = {this.state.chatOn}
          userLogout = {this.userLogout}
          navigator = {navigator} />
      );
    }
    if (routeId === 'ContactsPage') {
      return (
        <ContactsPage
          contactList = {this.state.contactList}
          addContacts = {this.addContacts}
          getNewRoute = {this.getNewRoute}
          routeName = {this.state.routeName}
          socket = {this.state.socket}
          chatStarts = {this.chatStarts}
          groupList = {this.state.groupList}
          addNumber = {this.addNumber}
          clearGroup = {this.clearGroup}
          navigator = {navigator} />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#e3e6e0',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30,
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

AppRegistry.registerComponent('VirgilApp', () => VirgilApp);
