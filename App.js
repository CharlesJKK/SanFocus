import React from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';

export default function App(){
  
  return(
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#642d8a'}}>
      <Image source={require('./assets/logoimg.png')} style={{ width: 250, height: 250 }} resizeMode="cover"/>
      <View style={{backgroundColor: '#214C9B', width: '40%', height: '20%', borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 700}}>25:00</Text>
      </View>
      <TouchableOpacity style={{backgroundColor: '#6495ED', borderRadius: 5, marginTop: 40, height: 40, width: 80, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#214C9B', fontWeight: 700}}>Iniciar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor: '#6495ED', borderRadius: 5, marginTop: 20, height: 40, width: 80, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#214C9B', fontWeight: 700}}>Parar</Text>
      </TouchableOpacity>
    </View>
  )
}


