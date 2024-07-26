import React, { useState } from 'react';
import { View, TouchableHighlight, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const BaseURL = 'http://10.0.2.2:3000';

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
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingLeft: 30 }}>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => navigation.navigate('prevPage')}
          style={{ marginTop: 40, marginBottom: 20 }}
        >
          <Text style={{ textDecorationLine: 'underline' }}>Go Back</Text>
        </TouchableHighlight>
        <Text style={[CStyle.baseText, CStyle.titleText, { marginBottom: 20 }]}>
          Verify your phone number
        </Text>
        <Text style={[CStyle.baseText, { marginBottom: 20, maxWidth: 300 }]}>
          Your cell phone number will be used for account verification and notifications. Standard rates will apply.
        </Text>
      </View>
      <View style={{ marginBottom: 20, alignSelf: 'center' }}>
        <TextInput
          style={CStyle.textContainer}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholder="Enter phone number with country code"
          editable={!phoneInserted}
        />
      </View>
      {waitMessage && (
        <Text style={[CStyle.baseText, { marginBottom: 20, paddingLeft: 30, maxWidth: 300 }]}>
          Wait for verification code to be sent
        </Text>
      )}
      {!phoneInserted ? (
        <View style={CStyle.buttonContainer}>
          <Button title="Send Code" onPress={sendCode} />
        </View>
      ) : (
        <View>
          <TextInput
            style={[
              CStyle.shadow,
              CStyle.textContainer,
              { display: !waitMessage ? 'flex' : 'none' },
            ]}
            onChangeText={setVerification}
            value={verification}
            keyboardType="numeric"
            placeholder="Verification Code"
          />
          <View style={{ display: !waitMessage ? 'flex' : 'none', alignSelf: 'center' }}>
            <Button onPress={verifyCode} title="Verify" />
          </View>
        </View>
      )}
      {retry && (
        <View style={{ display: !waitMessage ? 'flex' : 'none', alignSelf: 'center' }}>
          <Button onPress={retryCode} title="Retry" />
        </View>
      )}
    </View>
  );
};

export default App;
