import React, { useState } from 'react';
import { View, TouchableHighlight, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const BaseURL = 'http://10.0.2.2:3000';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileScreen from './ProfileScreen';
import ProvideServiceScreen from './ProvideServiceScreen';
import RequestServiceScreen from './RequestServiceScreen';

const Stack = createNativeStackNavigator();


const CStyle = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  textContainer: {
    width: '80%',
    paddingHorizontal: '4%',
    paddingVertical: '3%',
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'black',
    marginBottom: '2%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  buttonContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});

const isValidNumber = (number) => {
  const phoneNumberPattern = /^\+[1-9]\d{1,14}$/;
  return phoneNumberPattern.test(number);
};

const App = ({ navigation }) => {
  const [phoneInserted, setPhoneInserted] = useState(false);
  const [phone, setPhone] = useState('');
  const [verification, setVerification] = useState('');
  const [waitMessage, setWaitMessage] = useState(false);
  const [checkedNumber, setCheckedNumber] = useState('');
  const [retry, setRetry] = useState(false);


  const reset = () => {
    setPhoneInserted(false);
    setPhone('');
    setVerification('');
    setWaitMessage(false);
    setCheckedNumber('');
    setRetry(false);
  };

  const retryCode = () => {
    setVerification('');
  };

  const sendCode = async () => {
    if (!isValidNumber(phone)) {
      Alert.alert('Invalid phone number');
      return;
    }
    setPhoneInserted(true);
    setWaitMessage(true);
    try {
        console.log(phone);
      const response = await fetch(`${BaseURL}/verify/${phone}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();
      console.log(res);
      if (res.status === 'pending'){
        setCheckedNumber(phone);
        setWaitMessage(false);
      } else {
        throw new Error('Verification pending status not received');
      }
    } catch (error) {
      setPhoneInserted(false);
      setWaitMessage(false);
      setPhone('');
      console.log(error);
      Alert.alert('Error', error.message);
    }
  };

  const verifyCode = async () => {
    if (!isValidNumber(checkedNumber)) {
      return false;
    }
    try {
      const response = await fetch(`${BaseURL}/check/${checkedNumber}/${verification}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();
      if (res.status === 'approved') {
        Alert.alert('Phone Verified');
        navigation.navigate('nextPage');
      } else {
        Alert.alert('Verification failed. Try again.');
        setRetry(true);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (

        <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  component={ProfileScreen}
                />
                <Stack.Screen name="ProvideService" component={ProvideServiceScreen} />
                <Stack.Screen name="RequestService" component={RequestServiceScreen} />
              </Stack.Navigator>
            </NavigationContainer>

  );
};

export default App;
