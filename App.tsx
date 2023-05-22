import  React,{useEffect} from 'react';
import {
  StyleSheet, Text, Button, View, StatusBar, Image, ImageBackground, TouchableOpacity, SafeAreaView,
  ScrollView, Easing
} from 'react-native'

import Splash from './src/screen/Splash';
import Login from './src/screen/login';
import Home from './src/screen/Home';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { items } from './src/database/database';





import { NavigationContainer,useIsFocused  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';




const Stack = createStackNavigator();


  

const SplashScreen = ({props,navigation}) => {


    


  return (

    <NavigationContainer>
    
      <Stack.Navigator initialRouteName='splash'>
        <Stack.Screen options={{headerShown:false}} name='splash' component={Splash} />
        
        <Stack.Screen options={{headerShown:false}} name='Home' component={Home} />
        <Stack.Screen name='Login' component={Login} />

      </Stack.Navigator>
    </NavigationContainer>


  )



}

export default SplashScreen;
