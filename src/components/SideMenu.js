import * as React from 'react';
import {
  StyleSheet, Text, Button, View, StatusBar, Image, ImageBackground, TouchableOpacity, SafeAreaView,
  ScrollView, Easing
} from 'react-native'
import {

    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  


const SideMenuCustom=(props)=>{

return(

    <SafeAreaView style={{flex:1}}>
   <View style={{flex:1}}>

<ImageBackground source={require("../../src/assets/images/backbround.jpg")} style={{color:"#ffffff",fontWeight: 'bold',fontSize:15,alignSelf: 'center',justifyContent: 'center',textAlign:"center", width:'100%',backgroundColor:'#B104C1'}}>
<Image source={require("../../src/assets/images/p-img.png")} style={{ width:100,height:110,borderRadius:100/2,borderWidth:2,marginLeft:90}} />

  <Text style={{ textAlign:'center',color:'#fff',fontWeight:'bold'}}>Mr.Sanjay</Text>
 </ImageBackground>

  
 <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />


      </DrawerContentScrollView>
   </View> 

   </SafeAreaView>

)

}

export default SideMenuCustom;
