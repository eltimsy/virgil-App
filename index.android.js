/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { AppRegistry, Text, TextInput, Image, View, StyleSheet, Navigator} from 'react-native';
 import MyScene from './pages/MyScene';
 import MyLogin from './pages/MyLogin';

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
       email: '',
       password: ''
     };
   }
   updateEmail = (text) => {
    this.setState({email: text})
   }
   updatePassword = (text) => {
      this.setState({password: text})
   }
   login = () => {
      alert('email: ' + this.state.email + ' password: ' + this.state.password)
   }

   render() {
     let stuff = this.state.blue ? 'blue' : 'red' ;
     let pic = {
       uri: 'http://static1.1.sqspcdn.com/static/f/157301/9552810/1290590721240/1467551-9552809-thumbnail.jpg?token=1ca5iFS9emKfwTIwI5AI%2FoJRbl4%3D'
     };
     return (
       <View>
           <MyLogin
              updateEmail = {this.updateEmail}
              updatePassword = {this.updatePassword}
              login = {this.login}
           />
      </View>

    //   <Navigator
    //    initialRoute={{ title: 'My Initial Scene', index: 0 }}
    //    renderScene={(route, navigator) =>
    //    <MyScene
    //      title={route.title}
     //
    //      // Function to call when a new scene should be displayed
    //      onForward={ () => {
    //        const nextIndex = route.index + 1;
    //        navigator.push({
    //          title: 'Scene ' + nextIndex,
    //          index: nextIndex,
    //        });
    //      }}
     //
    //      // Function to call to go back to the previous scene
    //      onBack={() => {
    //        if (route.index > 0) {
    //          navigator.pop();
    //        }
    //       }}
    //      />
    //    }
    //    configureScene={(route, routeStack) =>
    //     Navigator.SceneConfigs.FadeAndroid}
    //  />
     )
   }
 }

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
