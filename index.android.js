/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { Alert, AppRegistry, AsyncStorage, Text, TextInput, Image, View, StyleSheet} from 'react-native';
 import t from 'tcomb-form-native';

 const STORAGE_KEY = 'id_token';
 const Form = t.form.Form;
 const User = t.struct({
   first_name: t.String,
   last_name: t.String,
   password: t.String,
   email: t.String,
   remember_me: t.Boolean
 });

 let options = {};

 class Pictures extends Component {
   render() {
     return (
       <Image source={this.props.pics} style={{width: 150, height: 150}}/>
     );
   }
 }

 class JWTStore extends Component {
   constructor(props) {
     super(props)
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
     let socket = io.connect('http://localhost:8080');
     socket.on('connect', () => {
       socket
        .emit('authenticate', {id_token: TOKEN})
        .on('authenticated', () => {
          // logic goes here (the main app stuff)
        })
        .on('unauthenticated', (message) => {
          console.log(`Could not authenticate: ${JSON.stringify(message.data)}.`);
          throw new Error(message.data.type);
        })
     });
   }

   userSignup() {
     let value = this.refs.form.getValue();
     if (value) {
       fetch('http://localhost:8080/users', {
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
           remember_me: value.remember
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
       fetch('http://localhost:8080/sessions/create', {
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

 }

 class VirgilApp extends Component {
   constructor(props) {
     super(props);
     this.state = {
       blue: 'blue',
       text: ''
     };

     setInterval(() => {
       this.setState({ blue: !this.state.blue});
     }, 1000);
   }

   handleKeyPress(e) {
     e.preventDefault();
     if(e.key=== "Enter"){
       this.setState({text: ""})
     }
   }

  render() {
    return (
      <View style={styles.container}>
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
          <TouchableHighlight style={styles.button} onPress={this._userSignup} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._userLogin} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <TouchableHighlight onPress={this._getProtectedQuote} style={styles.button}>
            <Text style={styles.buttonText}>Filler Text</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

 //   render() {
 //     let stuff = this.state.blue ? 'blue' : 'red' ;
 //     let pic = {
 //       uri: 'http://static1.1.sqspcdn.com/static/f/157301/9552810/1290590721240/1467551-9552809-thumbnail.jpg?token=1ca5iFS9emKfwTIwI5AI%2FoJRbl4%3D'
 //     };
 //     return (
 //       <View style={{flex: 1}}>
 //         <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
 //          <View style={{width: 100, height: 100, backgroundColor: 'steelblue', borderRadius: 50}} />
 //          <Pictures pics={pic} />
 //
 //         </View>
 //         <View style={{flex: 2, flexDirection: 'column'}}>
 //           <TextInput
 //             style={{height:80}}
 //             placeholder="type something"
 //             onChangeText={(text) => this.setState({text})}
 //             /* onKeyPress={this.handlePress.bind(this)} */
 //            value={this.state.text}
 //
 //           />
 //           <Text style={{padding: 10, fontSize: 42}}>
 //            {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
 //           </Text>
 //
 //           <Text style={{
 //             color: stuff,
 //             fontSize: 30,
 //             backgroundColor: 'teal',
 //             textAlign: 'center'
 //           }}>alsdkfj</Text>
 //           <Text style={styles.hello}>Hello world!</Text>
 //         </View>
 //         {/* <View style={{flex: 2, flexDirection: 'row'}}>
 //
 //         </View> */}
 //       </View>
 //     );
 //   }
 // }

 const styles = StyleSheet.create({
   hello: {
     flex: 1,
     justifyContent: 'center',
     textAlign: 'center',
     backgroundColor: 'green',
     fontSize: 50,
   },
 });

 AppRegistry.registerComponent('VirgilApp', () => VirgilApp);

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// export default class VirgilApp extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.android.js
//         </Text>
//         <Text style={styles.instructions}>
//           Double tap R on your keyboard to reload,{'\n'}
//           Shake or press menu button for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// AppRegistry.registerComponent('VirgilApp', () => VirgilApp);
