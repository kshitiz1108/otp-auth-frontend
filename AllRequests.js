import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import io from 'socket.io-client';
//import requests from './data'

const socket = io('http://localhost:3000');

const AllRequests = () => {
  const [requests, setRequests] = useState([
                                           {
                                             name: 'aadi',
                                             typeOfHelp: 'medical',
                                             hospital: 'arihant',
                                             tipAmount: '200'
                                           }
                                           ]);
    console.log(requests)
  useEffect(() => {
    socket.connect();

    socket.on('request:recieved', (newRequest) => {
//      setRequests(newRequest);

    });
//    Alert.alert('Success', JSON.stringify(newRequest));
    return () => {
      socket.disconnect();
    };
  }, []);

  const renderRequest = ({ item }) => (
    <View style={styles.requestItem}>
      <Text style={styles.requestText}>Name: {item.name}</Text>
      <Text style={styles.requestText}>Type of Help: {item.typeOfHelp}</Text>
      {item.hospital ? <Text style={styles.requestText}>Hospital: {item.hospital}</Text> : null}
      <Text style={styles.requestText}>Tip Amount: ${item.tipAmount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>All Service Requests</Text>
      <FlatList
        data={requests}
        renderItem={renderRequest}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  requestItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  requestText: {
    fontSize: 16,
  },
});

export default AllRequests;