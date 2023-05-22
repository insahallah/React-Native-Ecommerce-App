import React, { Component, useState } from 'react';
import { Text, ActivityIndicator, View, TextInput, StyleSheet, SafeAreaView, StatusBar, Image, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import { Button, ThemeProvider } from '@rneui/base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';


const SignUp = ({navigation}) => {

    const [fullname, setName] = useState('');
    const [mobileNo, setMobile] = useState('');
    const [emailid, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [passwd, setPassword] = useState('');

    const Registration = () => {


        fetch('http://192.168.239.233:80/reactapp/registration.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                // we will pass our input data to server
                fullname: fullname,
                mobileNo: mobileNo,
                emailid: emailid,
                address: address,
                passwd: passwd
            })

        })
            .then((response) => response.json())

            .then((responseJson) => {

                console.log('XXXXX', responseJson);

                if (responseJson == "Ok") {

                 navigation.navigate('Delete');

                } else {


                }
            })

    }






    return (

        <View style={{ Flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>SignUp Screen</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '90%', borderColor: '#A5D0CF', borderWidth: 1, borderRadius: 10, height: 50, paddingLeft: 20, marginTop: 5, marginLeft: 20 }} >
                <Icon name="user" size={25} color="#1CBCB7" />
                <TextInput onChangeText={text => setName({ text })} style={styles.input} placeholder="Full Name" placeholderTextColor="#818181" />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '90%', borderColor: '#A5D0CF', borderWidth: 1, borderRadius: 10, height: 50, paddingLeft: 20, marginTop: 5, marginLeft: 20 }} >
                <Icon name="mobile" size={25} color="#1CBCB7" />
                <TextInput onChangeText={text => setMobile({ text })} style={styles.input} placeholder="Mobile No" placeholderTextColor="#818181" keyboardType="numeric" />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '90%', borderColor: '#A5D0CF', borderWidth: 1, borderRadius: 10, height: 50, paddingLeft: 20, marginTop: 5, marginLeft: 20 }} >
                <Fontisto name="email" size={25} color="#1CBCB7" />
                <TextInput onChangeText={text => setEmail({ text })} style={styles.input} placeholder="Email Address" placeholderTextColor="#818181" />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '90%', borderColor: '#A5D0CF', borderWidth: 1, borderRadius: 10, height: 50, paddingLeft: 20, marginTop: 5, marginLeft: 20 }} >
                <Entypo name="address" size={25} color="#1CBCB7" />
                <TextInput onChangeText={text => setAddress({ text })} style={styles.input} placeholder="Address" placeholderTextColor="#818181" />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '90%', borderColor: '#A5D0CF', borderWidth: 1, borderRadius: 10, height: 50, paddingLeft: 20, marginTop: 5, marginLeft: 20 }} >
                <MaterialCommunityIcons name="onepassword" size={25} color="#1CBCB7" />
                <TextInput onChangeText={text => setPassword({ text })} style={styles.input} placeholder="Password" placeholderTextColor="#818181" />
            </View>

            <Button onPress={Registration} title="Next"
                buttonStyle={{
                    backgroundColor: '#0CBDB7',
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 30,
                }}
                containerStyle={{
                    width: '80%',
                    marginTop: 10,
                    marginHorizontal: 50,
                }}
                titleStyle={{ fontWeight: 'bold' }}
            />
            <View style={styles.flexContainer}>
                <Text style={{ textAlign: 'left', fontSize: 15, backgroundColor: '#fff', color: '#A5A2A2', flexDirection: 'row', marginLeft: 80, marginBottom: 10 }}>Are you a secretary?</Text>
                <Text style={{ fontSize: 20, backgroundColor: '#fff', flexDirection: 'row', marginLeft: 5, color: '#000', marginBottom: 10, marginRight: 75 }} onPress={() => navigation.navigate('Login')}>Login</Text>
                <Text style={{ fontSize: 20, backgroundColor: '#fff', flexDirection: 'row', marginLeft: 23, color: '#000', marginBottom: 10, textAlign: 'right' }}></Text>


            </View>

        </View>
    );


}


export default SignUp;


const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    }, input: {
        height: 40,
        width: 300,
        margin: 5,
        borderWidth: 0,
        padding: 10,
        color: '#818181'
    },
    container: {
        flex: 1,

        backgroundColor: '#fff',
    }, dropdown: {
        margin: 16,
        height: 50,
        width: '90%',
        backgroundColor: '#EEEEEE',
        borderRadius: 22,
        paddingHorizontal: 20,
        marginLeft: 20,
        borderColor: '#A5D0CF',
        borderWidth: 1,
        borderRadius: 10,
        color: '#818181'
    },

    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#1CBCB7',

    },
    placeholderStyle: {
        fontSize: 16,
        color: '#818181'
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
        color: '#818181'
    },
});