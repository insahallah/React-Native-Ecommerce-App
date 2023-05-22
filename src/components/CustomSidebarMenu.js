import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,ImageBackground,storedValue
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomSidebarMenu = (props) => {
	const [data,setName]=useState('');
  const BASE_PATH =
    '"../../src/assets/images/menu_header.jpg"';
  const proileImage = 'react_logo.png';

//const route = useRoute();
useEffect(() => {
  retrieveData();
}, []);

const retrieveData = async () => {
  try {
    const storedValue = await AsyncStorage.getItem('token');
	
	console.log(storedValue);
	
	
	const obj = JSON.parse(storedValue);
	setName(storedValue);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}

       <View style={styles.sideMenuProfileHeader}>
	   
	   <View style={{color:"#ffffff",fontWeight: 'bold',fontSize:15,alignSelf: 'center',justifyContent: 'center',textAlign:"center"}}>
<Image source={require("../../src/assets/images/men.jpg")} style={styles.sideMenuProfileIcon}/>


 <View>
<Text style={{color:"#ffffff",fontWeight: 'bold',fontSize:15,marginLeft:-40,textAlign:"left",marginTop:10}}>Welcome  Mr.{data}</Text>

    </View>

	   
       </View>
 </View>

 
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />


      </DrawerContentScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
	borderWidth:2,
	borderColor: "#DDD9D9"
   
  },
   sideMenuProfileHeader: {

	
    
    height: 170,
	backgroundColor:"#6236FF",
     },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
