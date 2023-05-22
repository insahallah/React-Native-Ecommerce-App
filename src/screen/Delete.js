import React, { Component, useEffect, useState } from 'react';
import { View, Text, FlatList,Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Delete = () => {
    const [Data1, setData] = useState([]);
    console.log('Database', Data1);

    useEffect(() => {
        details();
    }, []);

    

    const details = () => {

        fetch('http://192.168.239.233:80/reactapp/delete.php')

            .then((response) => response.json())

            .then((responseJson) => {

                setData(responseJson);

                //console.log('XXXXX', responseJson);

                //if (responseJson == "Ok") {

                //navigation.navigate('Delete');

                // } else {


                // }
            })

    }


    const removeItems=(id)=>{

       let removedata = [...Data1];

       for (let index = 0; index < removedata.length; index++) {


        if(removedata[index].id==id){

            removedata.splice(index,1);

        }


        setData(removedata);


       }

      
       fetch('http://192.168.239.233:80/reactapp/deletefile.php', {
        method: 'post',
        header: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            // we will pass our input data to server
            id: id,
            Mode:'Delete'
         
        })

    })
        .then((response) => response.json())

        .then((responseJson) => {

    //console.log('Test XXX',responseJson);

            if(responseJson=="Ok"){

          alert('Data deleted successfully');
          ;

        }
        })




    }



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <FlatList contentContainerStyle={{ felx: 1, justifyContent: 'center', alignItems: 'center' }}
                data={Data1}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item ,index}) => {

                    return (
                        <>
                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                            <Text style={{ fontSize: 20, color: 'blue' }}>{item.fullname} {item.emailid}</Text>
                            <TouchableOpacity style={{ fontSize: 20, color: 'red', marginLeft: 15 }} onPress={()=>removeItems(item.id)}>
                                <Text style={{ fontSize: 20, color: 'red'}}>Delete</Text></TouchableOpacity>
                            <Text style={{ fontSize: 20, color: 'blue', marginLeft: 15 }}>Edit</Text>

                        </View>
                        </>
                    );

                }}
            />

        </View>
    );

}

export default Delete;
