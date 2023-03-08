import React, {useState, useEffect} from 'react';
import {Image, View, TouchableOpacity, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
var Sound = require('react-native-sound');
import alertSong from './assets/endAlert.mp3'

export default function App(){

  const [focusMinutes, setFocusMinutes] = useState('')
  const [breakMinutes, setbreakMinutes] = useState('')

  const focusIsEmpty = focusMinutes === '' ? 25 : Number(focusMinutes)
  const breakIsEmpty = breakMinutes === '' ? 5 : Number(breakMinutes)
  const focusTime = focusIsEmpty * 60 * 1000;
  const breakTime = breakIsEmpty * 60 * 1000;

  const [timer, setTimer] = useState(focusTime)
  const [handleStart, setHandleStart] = useState(false)
  const [timerMode, setTimerMode] = useState('Focus')
  const [isRunning, setIsRunning] = useState(null)

  const [pomodoroCount, setPomodoroCount] = useState(0)

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@pomodoro_countDay', value)
    } catch (e) {
        console.log(e)
    }
  }

  const getCounts = async () => {
    try{
      const value = await AsyncStorage.getItem('@pomodoro_countDay')
      if(value !== null){ 
        setPomodoroCount(Number(value))
      }
    }catch(e){
        console.log(e)
    }
  }

  Sound.setCategory('Alarm');

  const sound = new Sound(alertSong, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Erro ao carregar o arquivo de som', error);
      return;
    }
  });

  useEffect(() => {
    getCounts()
    if(timer === 0){

      setTimeout(() => {
        sound.setVolume(0.1)
        sound.play()
      }, 100)

      if(timerMode === 'Focus'){
        storeData((pomodoroCount + 1).toString())
        setTimerMode('Break')
        setTimer(breakTime)
      }else{
        sound.play()
        setTimerMode('Focus')
        setTimer(focusTime)
      }
      timerStop()
    }
  }, [timer, focusMinutes])

  function timerStart(){
    const res = setInterval(() => setTimer(prev => prev - 1000), 1000)
    setIsRunning(res)
    setHandleStart(true)
  }

  function timerStop(){
    clearInterval(isRunning)
    setHandleStart(false)
  }

  function timerReset(){
    timerStop()
    setFocusMinutes(25)
    setbreakMinutes(5)
    setTimer(focusTime)
    setTimerMode('Focus')
  }

  function applyChanges(){
      if(focusMinutes === '' || focusMinutes < 0.1){
        return
      }else{
        timerStop()
        setTimer(focusTime)
        setTimerMode('Focus')
      }
  }

  const timerDate = new Date(timer)
  
  return(
    <KeyboardAvoidingView style={{flex: 1, alignItems: 'center', backgroundColor: '#642d8a', justifyContent: 'center', width: '100%', height: '100%'}} behavior= 'position' keyboardVerticalOffset={28}>
      <Image source={require('./assets/logoimg.png')} style={{ width: 250, height: 250, alignSelf: 'center' }} resizeMode="cover"/>
      {pomodoroCount == 4 ? <Text style={{alignSelf: 'center', position: 'absolute'}}>Você já fez 4 sessões, hora de descansar pelo menos {breakMinutes * 2}m</Text> : <></>}
      <Text style={{fontSize: 30, textAlign: 'center', color: timerMode === 'Focus' ? '#cb0e00' : '#49b8a5'}}>{timerMode === 'Focus' ? 'Hora de focar!!!' : 'Hora do descanso!!!'}</Text>
      <View style={{backgroundColor: timerMode === 'Focus' ? '#cb0e00' : '#49b8a5', width: 150, height: '20%', borderRadius: 100, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 700}}>{timerDate.getMinutes().toString().padStart(2, "0")}:{timerDate.getSeconds().toString().padStart(2, "0")}</Text>
      </View>
      <TouchableOpacity onPress={handleStart === true ? timerStop : timerStart} style={{backgroundColor: '#6495ED', alignSelf: 'center', borderRadius: 5, marginTop: 20, height: 40, width: 150, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#214C9B', fontWeight: 700}}>{handleStart === true ? 'Pausar' : 'Iniciar'}</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', gap: 10, padding: 10}}>
        <TextInput style={{alignSelf: 'center', height: '100%', textAlignVertical: 'center', textAlign: 'center', backgroundColor: '#000', opacity: 0.8, borderRadius: 5}}
          placeholderTextColor="#969696"
          placeholder="Tempo do pomodoro"
          keyboardType='numeric'
          color= '#fff'
          onChangeText={value => setFocusMinutes(value)}/>
        <TextInput style={{alignSelf: 'center', height: '100%', textAlignVertical: 'center', textAlign: 'center', backgroundColor: '#000', opacity: 0.8, borderRadius: 5}}
          placeholderTextColor="#969696"
          placeholder="Tempo da pausa"
          keyboardType='numeric'
          color= '#fff'
          onChangeText={value => setbreakMinutes(value)}/>
      </View>
      <TouchableOpacity onPress={applyChanges} style={{backgroundColor: '#6495ED', alignSelf: 'center', borderRadius: 5, height: 40, width: 150, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#214C9B', fontWeight: 700}}>Aplicar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={timerReset} style={{backgroundColor: '#6495ED', alignSelf: 'center', borderRadius: 5, marginTop: 20, height: 40, width: 150, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#214C9B', fontWeight: 700}}>Resetar</Text>
      </TouchableOpacity>
      <Text style={{alignSelf: 'center', paddingTop: 10, fontSize: 18}}>Quantidade de sessões concluídas: {pomodoroCount.toString()}</Text>
    </KeyboardAvoidingView>
  )
}
