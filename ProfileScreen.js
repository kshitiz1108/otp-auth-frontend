import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Switch } from 'react-native';

const BaseURL = 'http://10.0.2.2:3000';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [seatCapacity, setSeatCapacity] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');
  const [isProvidingService, setIsProvidingService] = useState(false);
  const [loading, setLoading] = useState(false);


  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${BaseURL}/user/profile`);
      const data = await response.json();
      setName(data.name || '');
      setAddress(data.address || '');
      setAadhaar(data.aadhaar || '');
      setVehicleNumber(data.vehicleNumber || '');
      setSeatCapacity(data.seatCapacity || '');
      setDrivingLicense(data.drivingLicense || '');
      setIsProvidingService(data.isProvidingService || false);
    } catch (error) {
      console.log('Error fetching user profile:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!name || !aadhaar) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const profileData = {
      name,
      address,
      aadhaar,
      vehicleNumber,
      seatCapacity,
      drivingLicense,
      isProvidingService,
    };

    try {
      setLoading(true);
      const response = await fetch(`${BaseURL}/user/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully');
        navigation.navigate(isProvidingService ? 'ProvideService' : 'RequestService');
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.log('Error saving profile:', error);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name *</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your address"
      />

      <Text style={styles.label}>Aadhaar Number *</Text>
      <TextInput
        style={styles.input}
        value={aadhaar}
        onChangeText={setAadhaar}
        placeholder="Enter your Aadhaar number"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Vehicle Number</Text>
      <TextInput
        style={styles.input}
        value={vehicleNumber}
        onChangeText={setVehicleNumber}
        placeholder="Enter your vehicle number"
      />

      <Text style={styles.label}>Seat Capacity</Text>
      <TextInput
        style={styles.input}
        value={seatCapacity}
        onChangeText={setSeatCapacity}
        placeholder="Enter seat capacity"
        keyboardType="numeric"
      />


      <Button
        title={loading ? "Saving..." : "Save Profile"}
        onPress={handleSaveProfile}
        disabled={loading}
      />

      <Button title="Request Service" onPress={() => navigation.navigate('RequestService')}/>

    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
});
