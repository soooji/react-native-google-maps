/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View,Image,Dimensions,TouchableOpacity,Animated,Easing} from 'react-native';
const WIN = Dimensions.get('screen');
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
  
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pinHeight:new Animated.Value(70),
      region:{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    }
  }
  rebase() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
          }
        });
        this._map.animateToRegion({
          latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
        })
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }
  render() {
    return (
      <View style={styles.container}>
      <View style={{
        position: 'absolute',
        zIndex: 11111,
        left: (WIN.width - 100) / 2 ,
        top: WIN.height / 2 - 68,
        width:100,height:70,flexDirection:'column',justifyContent:'flex-end',alignItems:'center'}}>
        <Animated.Image source={require('./001-marker.png')}
          resizeMode={'contain'}
          style={{    
            width: this.state.pinHeight,
            height: this.state.pinHeight,
          }}
        />
      </View>
      <View style={{
        left: 0,right:0,bottom:0,position:'absolute',zIndex:111111,height:60,
        display: 'flex',justifyContent:'space-between',flexWrap:'wrap',flexDirection: 'column'
      }}>
      <TouchableOpacity activeOpacity={.8} style={{borderTopLeftRadius:20,width: WIN.width - 60,height:60,backgroundColor:'#FAE818',alignItems:'center',flexDirection:'row'}} onPress={()=>{this.rebase();}}>
        <Text style={{textAlign:'center',fontSize:17,color:'#4B2605',width:'100%'}}>
          تایید محل فروشگاه
        </Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.8} style={{borderTopRightRadius:20,width: 60,height:60,backgroundColor:'#1B77F1',flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={()=>{this.rebase();}}>
        <Image source={require('./gps.png')} resizeMode={'contain'} style={{width:35,height:35}}/>
      </TouchableOpacity>
      </View>

    <MapView
        provider={PROVIDER_GOOGLE}
        style={{width:'100%',height:'100%'}}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
        initialRegion={this.state.region}
        // showsMyLocationButton={true}
        showsUserLocation={true}
        loadingEnabled={true}
        ref={(map) => this._map = map}
        onRegionChange={(region)=>{
          Animated.timing(
            this.state.pinHeight,
            {
              toValue: 55,
              duration: 200,
              useNativeDriver:false,
              easing: Easing.elastic(1.5)
            },
          ).start();
          this.setState({region: region});
          // this.state.pinHeight.setValue(60);
        }}
        onRegionChangeComplete={()=>{
          Animated.timing(
            this.state.pinHeight,
            {
              toValue: 70,
              duration: 200,
              useNativeDriver:false,
              easing: Easing.elastic(1.5)
            },
          ).start();
          // this.state.pinHeight.setValue(70);
        }}
     >
     {/* <Marker
      draggable
      onDragEnd={(e) => {this.setState({ x: e.nativeEvent.coordinate })}}
      coordinate={this.state.x}
      /> */}
    </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
