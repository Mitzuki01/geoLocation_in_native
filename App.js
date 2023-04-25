import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Location from 'expo-location'
import { useEffect, useState } from 'react';

export default function App() {
  const [location , setLocation] = useState({})
  const [address, setAddress] = useState("")
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [addressTWo , setAddressTwo ] = useState()

    useEffect(()=>{
      const getPermission = async()=>{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
          console.log('Please grant location permission');
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setAddressTwo(currentLocation)
        console.log('location');
        console.log(currentLocation);
      };
      getPermission();
    },[]);

    const geocode = async()=>{
      if(address == ""){
        setAddress(location)
       }//else{
      //   setAddress(address)
      // }
      console.log('>>>>>>>>>>>>', address)
      const geocodedLocation = await Location.geocodeAsync(address);
      console.log("Geocoded Address:");
      console.log(geocodedLocation);
      // setLatitude(location.coords.latitude);
      // setLongitude(location.coords.longitude);
      // console.log(latitude);
      // console.log(longitude);
    }


  return (
    <View style={styles.container}>
      <TextInput placeholder = 'Address' value={address} onChangeText={setAddress}  required={true}/>
      <Button title="Geocode Address" onPress={geocode}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
