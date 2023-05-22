import  React,{useEffect, useState} from 'react';
import {
  StyleSheet, Text, Button, View, StatusBar, Image,FlatList, ImageBackground, TouchableOpacity, SafeAreaView,
  ScrollView, Easing
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


 const WishList = ({navigation})=>{

  const [vals,setValues]=useState([]);

  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      WishItems();
    });
    return unsubscribe;
  }, [navigation]);

 const WishItems = async()=>{


  let values = await AsyncStorage.getItem('wishItems');


  values = JSON.parse(values);

 // console.log('WishList',values);
 setValues(values)


 }


  return(
    <SafeAreaView >
    <FlatList
      data={vals}
      renderItem={({ item }) => (
        <View style={{
          flex: 1,
          marginLeft: 3,
          borderWidth: 1,
          borderColor: '#F2C688',
          borderRadius: 10,
          marginTop: 10,
          backgroundColor: '#fff',
          padding: 3,
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          elevation: 3,
        }}>

          <View style={{ width: 170, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }} >
            <TouchableOpacity onPress={() => wishList(item)} style={{ marginLeft: 120, marginTop: 5 }}><FontAwesome name='heart-o' color='#000' size={30} /></TouchableOpacity>
            <Text style={{ marginRight: 125, marginTop: -30, backgroundColor: '#6BFE5C', color: '#000' }}>10% Off</Text>
            <Image source={item.productImage} style={{ width: 135, height: 135 }}></Image>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.productName}</Text>
            <Text style={{ fontSize: 15 }}>&#x20b9; {item.productPrice}</Text>
            <Text style={{ marginLeft: 120 }}> <AntDesign name='plussquare' color='#FF7B7D' size={30} /></Text>
            <Text style={{ marginRight: 70, marginTop: -20 }}>
              <MaterialIcons name='star-rate' color='#FCB224' size={15} />
              <MaterialIcons name='star-rate' color='#FCB224' size={15} />
              <MaterialIcons name='star-rate' color='#FCB224' size={15} />
              <MaterialIcons name='star-rate' color='#FCB224' size={15} />
              <MaterialIcons name='star-rate' color='#FCB224' size={15} />
            </Text>

          </View>


        </View>



      )


      }
      numColumns={2}
      keyExtractor={item => item.id}
    />
  </SafeAreaView>

  );

}
export default WishList;
