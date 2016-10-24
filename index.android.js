import React, { Component } from 'react';
import { Alert, AppRegistry, ScrollView, AsyncStorage, Text, TextInput, Image, View, StyleSheet, Navigator, TouchableHighlight } from 'react-native';

import SplashPage from './pages/SplashPage';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ChatPage from './pages/Chat';
import ContactsPage from './pages/Contacts';

const Contacts = require('react-native-contacts');
const STORAGE_KEY = 'id_token';

let options = {};

class Pictures extends Component {
  render() {
    return (
      <Image source={this.props.pics} style={{width: 150, height: 150}}/>
    );
  }
}

class VirgilApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blue: 'blue',
      text: '',
      contactList: [],
      grouplist: [],
      logStatus: false,
    };
    this.userSignup = this.userSignup.bind(this);
    this.addContacts = this.addContacts.bind(this);
  }
  componentWillMount() {
    // set logStatus here
    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        // x.x
      } else {
        this.setState({contactList: contacts})
      }
    })
  }
  async onValueChange(item, value) {
    try {
      await AsyncStorage.setItem(item, value);
    } catch (err) {
      console.log(`AsyncStorage error: ${err.message}`);
    }
  }

  async onLogAttempt() {
    let TOKEN = await AsyncStorage.getItem(STORAGE_KEY);
    let socket = io.connect('wss://virgil-is-the-restaurant-guide.herokuapp.com/');
    socket.on('connect', () => {
      socket
        .emit('authenticate', {id_token: TOKEN})
        .on('authenticated', () => {
          // logic goes here (the main app stuff)
        })
        .on('unauthenticated', (message) => {
          console.log(`Could not authenticate: ${JSON.stringify(message.data)}.`);
          Alert.alert(message.data.type);
        })
    });
  }

  userSignup() {
    let value = this.refs.form.getValue();
    Alert.alert(value.first_name)
    if (value) {
      fetch('https://virgil-is-the-restaurant-guide.herokuapp.com/users', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: value.first,
          last_name: value.last,
          password: value.password,
          email: value.email,
        })
      })
      .then((res) => response.json())
      .then((res) => {
        this.onValueChange(STORAGE_KEY, res.id_token)})
      .done();
    }
  }

  userLogin() {
    let value = this.refs.form.getValue();
    if (value) {
      fetch('https://virgil-is-the-restaurant-guide.herokuapp.com/sessions/create', {
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
      .then((res) => res.json())
      .then((res) => {
        this.onValueChange(STORAGE_KEY, res.id_token)
      })
      .done();
    }
  }

  async userLogout() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      Alert.alert("Logout succeeded.")
    } catch (err) {
      console.log(`AsyncStorage error: ${err}.`)
    }
  }
  addContacts(phoneNum) {
    this.state.grouplist.push(phoneNum)
    this.setState(this.state)
    // console.log(this.state.grouplist)
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
        initialRoute={{id: 'SplashPage'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    let routeId = route.id;
    if (routeId === 'SplashPage') {
      return (
        <SplashPage
          logStatus={this.state.logStatus}
          navigator={navigator} />
      );
    }
    if (routeId === 'LoginPage') {
      return (
        <LoginPage
          navigator={navigator} />
      );
    }
    if (routeId === 'SignupPage') {
      return (
        <SignupPage
          navigator={navigator} />
      );
    }
    if (routeId === 'ChatPage') {
      return (
        <ChatPage
          navigator={navigator} />
      );
    }
    if (routeId === 'ContactsPage') {
      return (
        <ContactsPage
          navigator={navigator} />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
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
