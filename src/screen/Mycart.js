import React, { useEffect, useState } from 'react';
import {
    StyleSheet, Text, Button, View, StatusBar, ToastAndroid, Image, Dimensions, FlatList, ImageBackground, TouchableOpacity, SafeAreaView,
    ScrollView, Animated, Easing
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';


import AsyncStorage from '@react-native-async-storage/async-storage';


const MyCart = ({ navigation }) => {
    //AsyncStorage.clear();
    const [cartdata, setData] = useState([]);
    const [totalamt, setSubTotal] = useState(0);
    const [priceOriginal, setOriginal] = useState([]);

    const[counterItem,setCounterItem]=useState(0)
  


    const checkOut = async () => {

        try {

            await AsyncStorage.setItem('checkoutData', JSON.stringify(cartdata));
         navigation.navigate('Payment Page')
        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            cartItems();
        });
        return unsubscribe;
    }, [navigation]);


    const cartItems = async () => {

        let vals = await AsyncStorage.getItem('cartItems');
        Data = JSON.parse(vals);
        setData(Data);
        setOriginal(Data)

        let count = Object.keys(Data).length;
        setCounterItem(count)

        


    }

    const qtyIncrements = (id) => {

        let iteams = [...cartdata];

        console.log('QTY', iteams);
        let quanityItems = iteams.map((val, key) => {

            if (val.id === id) {
                qty = + val.quantity + 1;
                return { ...val, quantity: qty, productPrice: val.originalPrice * qty }
            }
            else {
                return val;
            }
        })

        return setData(quanityItems);

    }


    const qtyDecrement = (id) => {

        let iteams = [...cartdata];
        let quanityItems = iteams.map((val, key) => {

            if (val.id === id) {

                //console.log('Old Price',priceOldValues[key]);

                //console.log('New Price',val.productPrice);


                qty = + val.quantity - 1;
                return { ...val, quantity: qty, productPrice: val.productPrice - val.originalPrice }
            }
            else {
                return val;
            }
        })

        return setData(quanityItems);

    }



    const cartRemoveItems = (index) => {


        let removeItems = [...cartdata];

        if (Object.keys(removeItems).length == 1) {

            ToastAndroid.show(
                'Your cart is empty.',
                ToastAndroid.SHORT,
            );

            AsyncStorage.clear().then(() => navigation.navigate('Home'));

        }

        console.log(index);

        removeItems.splice(index, 1);

        setData(removeItems);


    }






    const cartProduct = ({ item, index }) => {




        const sumTotal = cartdata.reduce((acc, next) => {
            return acc + next.productPrice;
        }, 0)
        // console.log('test', sumTotal);

        setSubTotal(sumTotal);






        return (

            <View style={{ flexDirection: 'row', borderColor: '#FAE5CA', borderRadius: 10, borderWidth: 2, marginHorizontal: 10, marginTop: 5, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, width: 10, height: 125 }}>
                    <Image source={item.productImage} style={{ width: 100, height: 100, marginVertical: 23, }} />

                </View>
                <View style={{ flex: 1, width: '50%', fontWeight: 'bold', fontSize: 20, color: '#000', marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#000', paddingLeft: 8 }}>{item.productName}</Text>

                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity onPress={() => qtyDecrement(item.id)} style={{
                            width: 40,
                            marginTop: 25
                        }}>
                            <Text style={{
                                borderWidth: 0,
                                borderColor: '#CBBAA7',
                                backgroundColor: '#FAE5CA',
                                fontWeight: 'bold',
                                fontSize: 30,
                                color: '#000',
                                borderRadius: 15,
                                paddingLeft: 15,
                                paddingBottom: 1
                            }}>
                                -
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 30, marginTop: 10, paddingLeft: 20, padding: 15 }}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => qtyIncrements(item.id)} style={{
                            width: 40,

                            marginTop: 25
                        }}>
                            <Text style={{
                                borderWidth: 0,
                                marginLeft: 4,

                                borderColor: '#000',
                                backgroundColor: '#FAE5CA',
                                fontWeight: 'bold',
                                fontSize: 30,
                                color: '#000',

                                borderRadius: 15,
                                paddingLeft: 10,
                                paddingBottom: 1
                            }}>
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => cartRemoveItems(index)} style={{ marginLeft: 70, marginTop: 20 }}><AntDesign name='delete' color='red' size={30} /></TouchableOpacity>
                    <Text style={{ marginLeft: 40, fontSize: 20, color: '#000', marginVertical: 30 }}>&#x20b9; {item.productPrice}

                    </Text>

                </View>

            </View>

        )



    }

    return (
        <>
            <View style={{ backgroundColor: '#EFEEEC', flex: 1, marginTop: 10 }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} />

                <View style={{ flexDirection: 'row', width: '100%',backgroundColor:'#fff' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '10%', fontWeight: 'bold', fontSize: 40, marginVertical: 30, color: '#000', textAlign: 'center' }}>
                        <Ionicons name='arrow-back' size={30} color='#000' />
                    </TouchableOpacity>
                    <Text style={{ width: '60%', fontWeight: 'bold', fontSize: 20, marginVertical: 30, color: '#000',marginLeft:70}}>
                        Added Items ({counterItem})
                    </Text>
                    <Text style={{ width: '30%', marginHorizontal: 5, marginVertical: 30 }}>
                        <Ionicons name='home' size={30} color='#FD9C00' />
                    </Text>
                </View>
                <ScrollView style={{ marginBottom: 200 }}>
                    <View >
                        <FlatList
                            data={cartdata}
                            keyExtractor={item => item.id}
                            renderItem={cartProduct} />
                    </View>
                </ScrollView>

                <View style={styles.footer}>

                    <Text style={{ color: '#545454', padding: 5, fontSize: 20 }}> Sub Total : &#x20b9;{totalamt}.00 </Text>
                    <Text style={{ color: '#545454', padding: 5, fontSize: 20 }}> Tax : &#x20b9;0.00 </Text>
                    <Text style={{ color: '#545454', padding: 5, fontSize: 20 }}> Service: &#x20b9;45 </Text>
                    <Text style={{ color: '#545454', padding: 5, fontSize: 20, fontWeight: 'bold' }}> Total: &#x20b9;{totalamt + 45}.00 </Text>


                    <TouchableOpacity onPress={checkOut}>
                        <Text style={{
                            backgroundColor: '#FC8F00',
                            fontSize: 25,
                            color: '#fff',
                            padding:8,
                            borderRadius: 5,
                            textAlign: 'center',

                        }}>Checkout</Text>
                    </TouchableOpacity>
                </View>

            </View>


        </>
    )


}
export default MyCart;

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        backgroundColor: '#FAE5CA',
        height: 220,
        left: 0,
        right: 0,
        bottom: 0,
        padding: 10,
        flex: 1


    }


})

