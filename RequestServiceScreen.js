import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://10.0.2.2:3000');

const RequestServiceScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    typeOfHelp: '',
    hospital: '',
    tipAmount: '',
  });

  useEffect(() => {
    socket.connect();
    socket.on("connect:error", (error) => {
        console.log(error)
    })
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.typeOfHelp) {
      socket.emit('request:sent', formData);
      Alert.alert('Success', JSON.stringify(formData));

    } else {
      Alert.alert('Error', 'Please fill all required fields.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Request Service</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={formData.name}
        onChangeText={(value) => handleChange('name', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Type of Help"
        value={formData.typeOfHelp}
        onChangeText={(value) => handleChange('typeOfHelp', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Preferred Hospital"
        value={formData.hospital}
        onChangeText={(value) => handleChange('hospital', value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Tip Amount"
        keyboardType="numeric"
        value={formData.tipAmount}
        onChangeText={(value) => handleChange('tipAmount', value)}
      />

      <Button title="Request Service" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default RequestServiceScreen;