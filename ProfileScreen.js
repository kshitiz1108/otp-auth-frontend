import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to the Service App</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Request a Service"
          onPress={() => navigation.navigate('RequestService')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View All Requests"
          onPress={() => navigation.navigate('AllRequests')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});

export default ProfileScreen;