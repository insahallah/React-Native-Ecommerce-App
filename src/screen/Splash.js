import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native'


const Splash = ({ navigation }) => {
    setTimeout(() => {
        navigation.replace('Home');
    }, 3000)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#080B3D' }}>
            <StatusBar barStyle={'light-content'} backgroundColor='#080B3D' />
            <Text style={{ fontSize: 40, color: '#fff' }}>Welcome To</Text>
            <Text style={{ fontSize: 40, color: '#fff' }} >Splash Screen</Text>
            <Image source={require('../assets/images/pngwing.com.png')} style={{ width: 300, height: 300 }} />
        </View>

    )

}

export default Splash;