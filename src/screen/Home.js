
import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Pressable, Image, SafeAreaView, TouchableOpacity, ToastAndroid } from 'react-native'
import { items } from '../database/database'
import { FlatList } from 'react-native-gesture-handler'
import { Button } from '@rneui/base'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SideMenuCustom from '../components/SideMenu'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchProduct from './SearchProduct'
import WishList from './Wishlist'
import SingalProduct from './SingleProduct'
import MyCart from './Mycart'
import Payment from './Payment'


const Drawer = createDrawerNavigator();

function SignUp({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ justifyContent: 'center', alignItems: 'center' }}>SignUp Screen</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Login({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Login Screen</Text>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
function Setting({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Setting Screen</Text>

      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

export default function App() {

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <SideMenuCustom {...props} />}>
        <Drawer.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Drawer.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
        <Drawer.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Drawer.Screen options={{ headerShown: false }} name="Setting" component={Setting} />
        <Drawer.Screen options={{ headerShown: false }} name="Search Products" component={SearchProduct} />
        <Drawer.Screen options={{ headerShown: true }} name="WishList" component={WishList} />
        <Drawer.Screen options={{ headerShown: true }} name="SingalProduct" component={SingalProduct} />
        <Drawer.Screen options={{ headerShown: false }} name="MyCart" component={MyCart} />
        <Drawer.Screen options={{ headerShown: true }} name="Payment Page" component={Payment} />


        

      </Drawer.Navigator>
    </NavigationContainer>
  );
}



const Home = ({ navigation }) => {

//AsyncStorage.clear();


const Products = async (item)=>{

  try{
  await AsyncStorage.setItem('products', JSON.stringify(item));
    navigation.navigate('SingalProduct');
  }catch(error){

    console.log(error);
  }






}

  const [count, setCount] = useState(0);
  const [allId, setAllId] = useState('');

  const wishList = async (item) => {

    let values = await AsyncStorage.getItem('wishItems');
    values = JSON.parse(values);

    let itemWish = [...new Set(values)];

    let array = itemWish;
    array.push(item);
    let arra = [...new Set(array)];
    setAllId(arra)
    const cnt = Object.keys(arra).length;
    setCount(cnt);

    try {
      await AsyncStorage.setItem('wishItems', JSON.stringify(arra));
      ToastAndroid.show(
        'Item Added Successfully to Wishlist',
        ToastAndroid.SHORT,
      );
      //navigation.navigate('Home');
    } catch (error) {
      return error;
    }




  }


  return (

    <View style={{ flex: 1, marginBottom: 50 }}>

      <View style={{
        flexDirection: 'row',
        marginRight: 15,
        marginTop: 10,
        justifyContent: 'flex-end',
        backgroundColor: '#fff',
        height: 60, width: '100%',
        padding: 8,
        marginTop: 0
      }}>
        <TouchableOpacity style={{ marginLeft: 15 }} onPress={() => navigation.navigate('Search Products')}>
          <Ionicons name='search-outline' color='#000' size={30} />
        </TouchableOpacity >
        <TouchableOpacity onPress={()=>navigation.navigate('WishList')} style={{
          position: "absolute",
          zIndex: 100, left: 260, top: 25, paddingLeft: 6, color: '#fff', backgroundColor: '#000', borderRadius: 100 / 2, height: 20,
          width: 20,
        }}>
        <Text style={{color:'#fff'}}>{count} </Text>
        </TouchableOpacity>
        <Text style={{ marginLeft: 15 }}><FontAwesome name='heart-o' color='#000' size={30} /> </Text>
        <Text style={{ marginLeft: 15 }}><FontAwesome name='bell-o' color='#000' size={30} /> </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}> 
          <Text style={{ marginLeft: 15 }}><Ionicons name='cart' color='#000' size={30} />
           </Text></TouchableOpacity>


      </View>


      <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: 'bold', color: '#000', marginTop: 15 }}>
        Mobiles & Services
      </Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginTop: -35, marginLeft: 8 }}>
        <MaterialIcons name='menu' color='#000' size={40} />
      </TouchableOpacity>

      <SafeAreaView >
        <FlatList
          data={items}
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
               <TouchableOpacity onPress={()=>Products(item)}>
                 <Text style={{ marginLeft: 120 }}> <AntDesign name='plussquare' color='#FF7B7D' size={30} /></Text>
               </TouchableOpacity>
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



    </View>

  )


}




const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#FFA801'
  },
  text: {
    fontSize: 16,
    lineHeight: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

