import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-android';

export default class ChartPage extends Component {
  handlePress() {
    this.props.chatStarts();
    this.props.getNewRoute(() => {
      this.props.navigator.replace({id: this.props.routeName})
    })
  }

  render() {
    const colors = ['#E4CC37','#D0FFD6', '#FF9505', '#0496FF', '#0EAD69']
    const ydata = this.props.surveyData.map((element, index) => {
      return({data:[element[1]], label: element[0], config: {color:colors[index]}})
    })
    return(
      <View style={{flex: 1}}>
        <View style={styles.chatbot}>
          <Text style={styles.bottitle}>Virgil</Text>
        </View>
        <BarChart
          style={{flex: 8}}
          data={{xValues:['My graph!'],
                yValues: ydata
              }}
          description={""}
        />
        <TouchableHighlight style={styles.button} onPress={this.handlePress.bind(this)} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableHighlight>
      </View>
    )
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
  bottitle: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 10,
    color: 'white',
    fontFamily: 'serif',
    fontStyle: 'italic',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#395B50',
    borderColor: '#395B50',
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
  }
});
module.exports = ChartPage;
