/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { Alert, AppRegistry, ScrollView, AsyncStorage, Text, TextInput, Image, View, StyleSheet, Navigator, TouchableHighlight } from 'react-native';
 import t from 'tcomb-form-native';
 import MyScene from './pages/MyScene';
 import MyContacts from './pages/MyContacts';
 const Contacts = require('react-native-contacts');

 const STORAGE_KEY = 'id_token';
 const Form = t.form.Form;
 const User = t.struct({
   first_name: t.String,
   last_name: t.String,
   password: t.String,
   email: t.String,
   remember_me: t.Boolean
 });
 const NewNumber = t.struct({
   number: t.String,
 });

 let options = {};

 class Pictures extends Component {
   render() {
     return (
       <Image source={this.props.pics} style={{width: 150, height: 150}}/>
     );
   }
 }
 //
 // class JWTStore extends Component {
 //   constructor(props) {
 //     super(props)
 //   }
 //
 //
 //
 // }

 class VirgilApp extends Component {
   constructor(props) {
     super(props);
     this.state = {
       blue: 'blue',
       text: '',
       contactList: [],
       grouplist: []
     };
     this.userSignup = this.userSignup.bind(this);
     this.addContacts = this.addContacts.bind(this);
     this.userLogin = this.userLogin.bind(this);
     this.addNumber = this.addNumber.bind(this);
   }
   componentWillMount() {
     Contacts.getAll((err, contacts) => {
       if(err && err.type === 'permissionDenied'){
         // x.x
       } else {
         let contactlist = contacts.map(function(contact, index) {
           if(contact.phoneNumbers.length > 0) {
             return({
               phoneNumber: contact.phoneNumbers[0].number,
               givenName: contact.givenName,
               press: false,
               empty: 1,
               index: index
             });
           } else {
             return {empty: 0};
           }
         })
        this.setState({contactList: contactlist})
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
           first_name: value.first_name,
           last_name: value.last_name,
           password: value.password,
           email: value.email,
           phone_number: '123456789',
           remember_me: value.remember
         })
       })
       .then((res) => res.json())
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
   addContacts(phoneNum, name, index) {
     let list = this.state.grouplist;
     let newcontact = true;
     let duplicate = null;
     list.forEach(function(element, index) {
       if (element.number === phoneNum) {
        newcontact = false
        duplicate = index
      }
    })

     if(newcontact === true) {
       list.push({name: name, number: phoneNum})
       this.state.contactList[index].press = true;
       this.setState(this.state);
       Alert.alert('Added: ' + name);
     } else if (newcontact === false) {
       list = list.splice(duplicate, 1);
        this.state.contactList[index].press = false;
       this.setState(this.state);
       Alert.alert('Deleted: ' + name);
     }
   }

   addNumber() {
     let value = this.refs.form.getValue();
     if(value) {
       value.name = "";
       this.state.grouplist.push(value)
       this.setState(this.state);
       console.log(value)
     }
   }
  render() {
    return (
      <ScrollView>
        <View  style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Signup/Login</Text>
          </View>
          <View style={styles.row}>
            <Form
              ref="form"
              type={User}
              options={options}
            />
          </View>
          <View style={styles.row}>
            <TouchableHighlight style={styles.button} onPress={this.userSignup} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={this.userLogin} underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.row}>
            <TouchableHighlight onPress={this._getProtectedQuote} style={styles.button}>
              <Text style={styles.buttonText}>Filler Text</Text>
            </TouchableHighlight>
          </View>
          <View  style={styles.container}>
            <View style={styles.row}>
              <Form
                ref="form"
                type={NewNumber}
                options={options}
              />
            </View>
            <View style={styles.row}>
              <TouchableHighlight style={styles.button} onPress={this.addNumber} underlayColor='#99d9f4'>
                <Text style={styles.buttonText}>Add Number</Text>
              </TouchableHighlight>
            </View>
          </View>
          <MyContacts
          contactList = {this.state.contactList}
          addContacts = {this.addContacts}
          grouplist = {this.state.grouplist}
          />
        </View>
      </ScrollView>
    );
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
