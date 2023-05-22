import React, { useEffect, useState } from 'react';
import {
    StyleSheet, Text, Button, View, StatusBar, ToastAndroid, Image, Dimensions, FlatList, ImageBackground, TouchableOpacity, SafeAreaView,
    ScrollView, Animated, Easing
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SingalProduct = ({ navigation }) => {

//AsyncStorage.clear();

    const [products, setProducts] = useState([]);

    //const [prices, setPrices] = useState([]);

    const width = Dimensions.get('window').width;

    const scrollX = new Animated.Value(0);

    let position = Animated.divide(scrollX, width);


    //console.log(products);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            singlaproducts();
        });
        return unsubscribe;
    }, [navigation]);

    const singlaproducts = async () => {

        let values = await AsyncStorage.getItem('products');
        values = JSON.parse(values);
        //console.log('SingleProduct',values);
        setProducts(values)
    }


    const renderProduct = ({ item, index }) => {
        return (
            <View
                style={{
                    width: width,
                    height: 300,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Image
                    source={item}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                    }}
                />
            </View>
        );
    };


  

    const addToCart = async products => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray;

            let itemsVal = array.find((element) => element.id === products.id);

            if (itemsVal) {
                let updateItems = array.map((curElem) => {

                    if (curElem.id === products.id){

                        qty = + curElem.quantity + 1;

                        price = + curElem.productPrice + products.productPrice;

                        return { ...curElem, quantity: qty,productPrice:price}

                    }else{

                        return curElem;

                    }

                })


                try {
                    await AsyncStorage.setItem('cartItems', JSON.stringify(updateItems));
                    ToastAndroid.show(
                        'Item Added Successfully to cart',
                        ToastAndroid.SHORT,
                    );
                    navigation.navigate('Home');
                } catch (error) {
                    return error;
                }



            }else{



                array.push(products);
                try {
                    await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                    ToastAndroid.show(
                        'Item Added Successfully to cart',
                        ToastAndroid.SHORT,
                    );
                    navigation.navigate('Home');
                } catch (error) {
                    return error;
                }



            }



        } else {
            let array = [];

            array.push(products);
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                ToastAndroid.show(
                    'Item Added Successfully to cart',
                    ToastAndroid.SHORT,
                );
                navigation.navigate('Home');
            } catch (error) {
                return error;
            }
        }
    };


    return (
        <>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                <FlatList
                    data={products.productImageList}
                    horizontal
                    renderItem={renderProduct}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0.8}
                    snapToInterval={width}
                    bounces={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false },
                    )}
                />
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16,
                        marginTop: 32,
                    }}>
                    {products.productImageList
                        ? products.productImageList.map((data, index) => {
                            let opacity = position.interpolate({
                                inputRange: [index - 1, index, index + 1],
                                outputRange: [0.2, 1, 0.2],
                                extrapolate: 'clamp',
                            });
                            return (
                                <Animated.View
                                    key={index}
                                    style={{
                                        width: '16%',
                                        height: 2.4,
                                        backgroundColor: 'black',
                                        opacity,
                                        marginHorizontal: 4,
                                        borderRadius: 100,
                                    }}></Animated.View>
                            );
                        })
                        : null}
                </View>
            </View>

            <View style={{ flex: 1, backgroundColor: '#EFF1F0' }}>
                <Text style={{ marginHorizontal: 20, color: '#1F5DD7', fontSize: 25, letterSpacing: 1 }}>

                    <Ionicons name='cart' size={25} color='#1F5DD7' />Shopping
                </Text>
                <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 30, marginVertical: 10 }}>
                    {products.productName}
                </Text>
                <Text style={{ marginHorizontal: 20, color: '#777A76', fontSize: 15, marginVertical: 10 }}>
                    {products.description}
                </Text>

                <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 30, marginVertical: 10 }}>&#x20b9;
                    {products.productPrice}
                </Text>

                <Text style={{ marginHorizontal: 20, color: 'black', fontSize: 15, marginVertical: 10 }}>Tax &#x20b9;0:00
                </Text>

                <TouchableOpacity onPress={() => addToCart(products)}
                    style={{
                        width: '86%',
                        height: '15%',
                        backgroundColor: 'blue',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 30,
                        marginVertical: 30
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '500',
                            letterSpacing: 1,
                            color: '#fff',
                            textTransform: 'uppercase',
                        }}>
                        {products.isAvailable ? 'Add to cart' : 'Not Avialable'}
                    </Text>
                </TouchableOpacity>
            </View>


        </>
    )
}
export default SingalProduct;

