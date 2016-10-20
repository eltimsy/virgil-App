/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { AppRegistry, Text, TextInput, Image, View, StyleSheet} from 'react-native';


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
     let stuff = this.state.blue ? 'blue' : 'red' ;
     let pic = {
       uri: 'http://static1.1.sqspcdn.com/static/f/157301/9552810/1290590721240/1467551-9552809-thumbnail.jpg?token=1ca5iFS9emKfwTIwI5AI%2FoJRbl4%3D'
     };
     return (
       <View style={{flex: 1}}>
         <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <View style={{width: 100, height: 100, backgroundColor: 'steelblue', borderRadius: 50}} />
          <Pictures pics={pic} />

         </View>
         <View style={{flex: 2, flexDirection: 'column'}}>
           <TextInput
             style={{height:80}}
             placeholder="type something"
             onChangeText={(text) => this.setState({text})}
             onKeyPress={this.handlePress.bind(this)}
            value={this.state.text}

           />
           <Text style={{padding: 10, fontSize: 42}}>
            {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
           </Text>

           <Text style={{
             color: stuff,
             fontSize: 30,
             backgroundColor: 'teal',
             textAlign: 'center'
           }}>alsdkfj</Text>
           <Text style={styles.hello}>Hello world!</Text>
         </View>
         {/* <View style={{flex: 2, flexDirection: 'row'}}>

         </View> */}
       </View>
     );
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
