import React from 'react';
import {StyleSheet, AppRegistry, asset, Pano, Text, View, VrHeadModel, AsyncStorage, localStorage } from 'react-360';
const RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
import Cookies from 'universal-cookie';
import axios from 'axios';


//const fs = require('fs')


class react360 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			aov: [0,0,0],
			colorX: 255,
      colorY: 0,
      persons: [],
      data: 'test',
    }
   
    const cookies = new Cookies();
    
    // Log available listeners
		console.log('RCT Signals', RCTDeviceEventEmitter.addListener().subscriber._subscriptionsForType)
      
		RCTDeviceEventEmitter.addListener('onReceivedInputEvent', e => {
						this.setState({
        aov: VrHeadModel.rotation()
      })

      this.saveData();

        });
        
       
   //   window.setInterval(e =>{
   //     	this.setState({
   //     aov: VrHeadModel.rotation()
   //   })

   //   this.saveData();
   //   }, 500);  
        
        
      }

      componentDidMount() {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
          .then(res => {
            const persons = res.data;
            this.setState({ persons });
            console.log(this.state.persons);
          })
      }

      saveData() {
      
      var time = new Date().getTime();
      var date = new Date(time);
      
        const message = { 
          
          timestamp : date.toString(),
          x_axis:  Number((this.state.aov[0]).toFixed(0)),
          y_axis: Number((this.state.aov[1]).toFixed(0)),
          
          }  

        
        axios
          .post('http://ec2-18-197-31-208.eu-central-1.compute.amazonaws.com:8010/api/react/create/', message)
          .then(response => {  
          })
          .catch(error => console.log(error));  
      }
    

      async saveItem() {
        try {
          await AsyncStorage.setItem('storage_Key', 'stored value')
        } catch (error) {
          console.error('AsyncStorage error: ' + error.message);
        }
      }

      async getItem() {
        try {
          const value = await AsyncStorage.getItem('storage_Key');
          if (value !== null) {
            // We have data!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      }


  render() {

	const xRotRounded = Number((this.state.aov[0]).toFixed(0))
	const yRotRounded = Number((this.state.aov[1]).toFixed(0))
	
	return (
	  <View style={styles.panel}>
        <View style={styles.greetingBox}>          
          <Text style = {styles.greeting}>
          Air BnB VR Test
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
