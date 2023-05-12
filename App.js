import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Location from 'expo-location'
import { useEffect, useState } from 'react';

export default function App() {
  const [location , setLocation] = useState({})
  const [address, setAddress] = useState("")
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [addressTWo , setAddressTwo ] = useState()

try{
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
  },[location]);
}catch(err){
  Alert.alert(`erro ${err}`)
}
    useEffect(()=>{
      console.log('latitude: ',latitude);
      console.log('longitude: ',longitude);
    },[latitude,longitude])

    const geocode = async()=>{
    try{
        if(address === ""){
                   setLatitude(location.coords.latitude);
                   setLongitude(location.coords.longitude);
                   console.log('>>>>>>>>>>>>>>>>>> location atual >>>>>>>>>>>>>>>>>>>>')
               console.log("     ");
              }else{
                   const geocodedLocation = await Location.geocodeAsync(address);
                   console.log('>>>>>>>>>>>>', address)
                   console.log('>>>>>>>>>>>>>>>>>> location >>>>>>>>>>>>>>>>>>>>');
                   setLatitude(geocodedLocation[0].latitude);
                   setLongitude(geocodedLocation[0].longitude);
                   console.log("     ");
             }
            }catch(err){
              Alert.alert(`error 404: ${err}`)
            }
          }


  return (
    <View style={styles.container}>
      <Text>{"latitude: "+latitude}</Text>
      <Text>{"longitude: "+longitude}</Text>
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
