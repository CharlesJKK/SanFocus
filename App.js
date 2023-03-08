import React, {useState, useEffect} from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';

export default function App(){

  const timeMinutes = 0.2 * 60 * 1000;

  const [timer, setTimer] = useState(timeMinutes)
  const [isRunning, setIsRunning] = useState(null)

  function timerStart(){
    const res = setInterval(() => setTimer(prev => prev - 1000), 1000)
    setIsRunning(res)
    console.log(timeMinutes)
  }

  function timerStop(){
    clearInterval(isRunning)
  }

  const timerDate = new Date(timer)
  
  return(
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#642d8a'}}>
      <Image source={require('./assets/logoimg.png')} style={{ width: 250, height: 250 }} resizeMode="cover"/>
      <View style={{backgroundColor: '#214C9B', width: '40%', height: '20%', borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 700}}>{timerDate.getMinutes().toString().padStart(2, "0")}:{timerDate.getSeconds().toString().padStart(2, "0")}</Text>
      </View>
      <TouchableOpacity onPress={timerStart} style={{backgroundColor: '#6495ED', borderRadius: 5, marginTop: 40, height: 40, width: 80, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#214C9B', fontWeight: 700}}>Iniciar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={timerStop} style={{backgroundColor: '#6495ED', borderRadius: 5, marginTop: 20, height: 40, width: 80, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#214C9B', fontWeight: 700}}>Parar</Text>
      </TouchableOpacity>
    </View>
  )
}


/*


  function timerReset(){
    clearInterval(timerInterval)
    setUserMinutes(0.2)
  }

      <TouchableOpacity onPress={timerReset} style={{backgroundColor: '#6495ED', borderRadius: 5, marginTop: 20, height: 40, width: 80, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#214C9B', fontWeight: 700}}>Resetar</Text>
      </TouchableOpacity>

      */


