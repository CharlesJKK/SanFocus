import React, {useState, useEffect} from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';

export default function App(){

  const focusTime = 0.2 * 60 * 1000;
  const breakTime = 0.1 * 60 * 1000;

  const [timer, setTimer] = useState(focusTime)
  const [handleStart, setHandleStart] = useState(false)
  const [timerMode, setTimerMode] = useState('Focus')
  const [isRunning, setIsRunning] = useState(null)


  useEffect(() => {
    if(timer === 0){
      if(timerMode === 'Focus'){
        setTimerMode('Break')
        setTimer(breakTime)
      }else{
        setTimerMode('Focus')
        setTimer(focusTime)
      }
      timerStop()
    }
  }, [timer])

  function timerStart(){
    const res = setInterval(() => setTimer(prev => prev - 1000), 1000)
    setIsRunning(res)
    setHandleStart(true)
  }

  function timerStop(){
    clearInterval(isRunning)
    setHandleStart(false)
  }

  const timerDate = new Date(timer)
  
  return(
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#642d8a'}}>
      <Image source={require('./assets/logoimg.png')} style={{ width: 250, height: 250 }} resizeMode="cover"/>
      <Text style={{fontSize: 30, textAlign: 'center', color: timerMode === 'Focus' ? '#cb0e00' : '#49b8a5'}}>{timerMode === 'Focus' ? 'Hora de focar!!!' : 'Hora do descanso!!!'}</Text>
      <View style={{backgroundColor: timerMode === 'Focus' ? '#cb0e00' : '#49b8a5', width: '40%', height: '20%', borderRadius: 100, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 700}}>{timerDate.getMinutes().toString().padStart(2, "0")}:{timerDate.getSeconds().toString().padStart(2, "0")}</Text>
      </View>
      <TouchableOpacity disabled={handleStart} onPress={timerStart} style={{backgroundColor: '#6495ED', borderRadius: 5, marginTop: 40, height: 40, width: 150, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#214C9B', fontWeight: 700}}>Iniciar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={timerStop} style={{backgroundColor: '#6495ED', borderRadius: 5, marginTop: 20, height: 40, width: 150, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#214C9B', fontWeight: 700}}>Parar</Text>
      </TouchableOpacity>
    </View>
  )
}
