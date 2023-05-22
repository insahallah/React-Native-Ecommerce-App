import React, { useEffect, useState } from 'react';
import {
    StyleSheet, Text, Button, View, StatusBar, ToastAndroid, Image, Dimensions, FlatList, ImageBackground, TouchableOpacity, SafeAreaView,
    ScrollView, Animated, Easing
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNUpiPayment from 'react-native-upi-payment' 


import AsyncStorage from '@react-native-async-storage/async-storage';


const Payment=({navigation})=>{

   const GooglePay=()=>{


    RNUpiPayment.initializePayment({
        vpa: '8578860442@paytm', // or can be john@ybl or mobileNo@upi
        payeeName: 'React Tutorial web',
        amount: '1',
        transactionRef: 'aasf-332-aoei-fn'
      }, successCallback, failureCallback);


      function successCallback(data) {
       console.log(data);
      }
      
      function failureCallback(data) {
        console.log(data);
      }


   }



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            paymentData();
        });
        return unsubscribe;
    }, [navigation]);


    const paymentData = async () => {

        let data = await AsyncStorage.getItem('checkoutData');
        data = JSON.parse(data);
      ///console.log('Payment Data',data);
        //setProducts(values)
    }


return(


    <View style={{justifyContent:'center',alignItems:'center'}}>
     <Button
          title="Pay now"
          onPress={GooglePay
          }
        />
    </View>
)

}

export default Payment;
