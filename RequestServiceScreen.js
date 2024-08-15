import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';

const RequestServiceScreen = () => {
  const [userName, setUserName] = useState('');
    const [serviceType, setServiceType] = useState('');

    const handleServiceTypeSelect = (type) => {
      setServiceType(type);
    };

    const handleSubmit = () => {
      if (!userName || !serviceType) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      // Submit the form data
      const requestData = {
        userName,
        serviceType,
      };

      console.log('Request Data:', requestData);
      Alert.alert('Request Submitted', `Service Type: ${serviceType} for ${userName}`);


      navigation.navigate('ServiceStatus', { requestData });
    };

    return (
      <View style={styles.container}>
        <Text style={styles.label}>User Name:</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Service Type:</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.serviceButton, serviceType === 'medical' && styles.selectedButton]}
            onPress={() => handleServiceTypeSelect('medical')}
          >
            <Text style={styles.buttonText}>Medical Assistance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.serviceButton, serviceType === 'roadside' && styles.selectedButton]}
            onPress={() => handleServiceTypeSelect('roadside')}
          >
            <Text style={styles.buttonText}>Roadside Assistance</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.serviceButton, serviceType === 'fire' && styles.selectedButton]}
            onPress={() => handleServiceTypeSelect('fire')}
          >
            <Text style={styles.buttonText}>Fire Rescue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.serviceButton, serviceType === 'police' && styles.selectedButton]}
            onPress={() => handleServiceTypeSelect('police')}
          >
            <Text style={styles.buttonText}>Police Assistance</Text>
          </TouchableOpacity>
        </View>

        <Button title="Request Service" onPress={handleSubmit} />

      </View>
    );
};

export default RequestServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
