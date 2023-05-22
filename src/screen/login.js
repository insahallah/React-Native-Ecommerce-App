import React, { useState, Component, useCallback } from 'react'
import { Text, ActivityIndicator, View, TextInput, StyleSheet, SafeAreaView, StatusBar, Image, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button, ThemeProvider } from '@rneui/base';

const Login = ({ navigation }) => {

    const [number, onChangeNumber] = React.useState('');

    const [password, setPassword] = useState('');

    const Sign = () => {

        // console.log('User',number);
        //console.log('Password',password.text);



        fetch('https://castedheights.com/ajax-login.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                // we will pass our input data to server
                mobile: number,
                login_password: password.text,
                UserId: 1,
                mode: "login"
            })

        })
            .then((response) => response.json())

            .then((responseJson) => {

                //console.log('Test',responseJson);


                if (responseJson.success == "success") {
                    navigation.navigate('dashBoard');
                    
                    console.log('Success Loged In ');

                } else {
                    alert("Wrong User Password!!");
                }

            })
            .catch((error) => {
                console.error(error);
            });

    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/images/pngwing.com.png')} style={{ width: 320, height: 300, marginTop: 30 }} />
            </View>
            <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
                <ScrollView>

                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '90%', borderColor: '#A5D0CF', borderWidth: 1, borderRadius: 10, height: 60, paddingLeft: 20, marginTop: 8, marginLeft: 20 }} >
                            <Icon name="mobile" size={35} color="#0CBDB7" />
                            <TextInput onChangeText={text => onChangeNumber({ text })} style={styles.input} placeholder="Enter Mobile Number" placeholderTextColor="#818181" keyboardType="numeric" />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '90%', borderColor: '#A5D0CF', borderWidth: 1, borderRadius: 10, height: 60, paddingLeft: 20, marginTop: 15, marginLeft: 20 }} >
                            <Icon name="mobile" size={35} color="#0CBDB7" />
                            <TextInput onChangeText={text => setPassword({ text })} style={styles.input} placeholder="Enter Mobile Number" placeholderTextColor="#818181" />
                        </View>

                        <Button onPress={Sign} title="Next"
                            buttonStyle={{
                                backgroundColor: '#0CBDB7',
                                borderWidth: 2,
                                borderColor: 'white',
                                borderRadius: 30,
                            }}
                            containerStyle={{
                                width: '80%',
                                marginHorizontal: 50,
                                marginVertical: 20,
                            }}
                            titleStyle={{ fontWeight: 'bold' }}
                        />

                        <View style={styles.flexContainer}>
                            <Text style={{ textAlign: 'left', fontSize: 15, backgroundColor: '#fff', color: '#A5A2A2', flexDirection: 'row', marginLeft: 80, marginTop: 0, marginBottom: 10 }}>Are you a secretary?</Text>
                            <Text style={{ fontSize: 20, backgroundColor: '#fff', flexDirection: 'row', marginLeft: 5, marginTop: 0, color: '#000', marginBottom: 10, marginRight: 75 }} onPress={() => navigation.navigate('SignUp')}>Register</Text>
                        </View>
                    </View>


                </ScrollView>
            </SafeAreaView>
        </>

    );

}

export default Login;

const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

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
        height: 60,
        width: '90%',
        backgroundColor: '#EEEEEE',
        borderRadius: 22,
        paddingHorizontal: 20,
        marginLeft: 20,
        borderColor: '#A5D0CF', borderWidth: 1, borderRadius: 10
    },
    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#0CBDB7'
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
        color: '#818181'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});