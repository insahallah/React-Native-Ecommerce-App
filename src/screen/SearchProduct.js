import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  StatusBar,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView, Easing
} from 'react-native'

import filter from 'lodash.filter';

import { items } from '../database/database'
const SearchProduct = () => {

  const [data, setQuery] = useState(items);
  const [searchvalues, setSearchValues] = useState("");

  const SearchHandler = (text) => {

    //console.log(query);


    setSearchValues(text);

    const formatedQuery = text.toLowerCase();

    const filterData = filter(items, (product) => {

      return containts(product, formatedQuery);

    });
    setQuery(filterData)


  }

  const containts = ({ productName }, text) => {


    if (productName.includes(text)) {

      return true;

    } else {

      return false;

    }


  }


  return (
    <View>
      <TextInput clearButtonMode="always" value={searchvalues} onChangeText={(text) => SearchHandler(text)} placeholder="Search..." style={{ borderRadius: 5, borderWidth: 2, borderColor: 'gray', marginTop: 10, marginHorizontal: 5, padding: 10 }} />

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (

          <View style={{ flexDirection: 'row', marginHorizontal: 10, padding: 5, backgroundColor: '#fff', marginTop: 5, borderRadius: 5, }}>
            <Image source={item.productImage} style={{ height: 50, width: 50 }}></Image>
            <Text>{item.productName}</Text>
            <Text style={{ paddingLeft: 20 }}>&#x20b9;{item.productPrice}</Text>


          </View>

        )}
      />

    </View>



  );


}

export default SearchProduct;
