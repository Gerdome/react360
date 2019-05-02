import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrHeadModel,
  VrButton,
} from 'react-360';

export default class react360 extends React.Component {

  state = {
    counter : 0,
    console: '',
    aov: null,
    isLoading:true
  };

  _incrementCounter = () => {
    
    this.setState({
      console.log('test');
      counter : (this.state.counter += 1),
      aov: VrHeadModel.rotation(),
      isLoading: false
    });
    
    
  };
  
  render() {
  
    //const xRotRounded =  this.state.aov;
	  //const yRotRounded =  20;
     
    return (
       <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <VrButton onClick={this._incrementCounter}>
            <Text style={styles.greeting}>You've clicked me {this.state.counter} times.</Text>
          </VrButton>
          
          <Text style = {styles.greeting}>
           {this.state.aov}
          </Text>
          
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});

AppRegistry.registerComponent('react360', () => react360);
