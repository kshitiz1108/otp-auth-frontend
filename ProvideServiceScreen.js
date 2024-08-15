import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProvideServiceScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Provide Service Screen</Text>
    </View>
  );
};

export default ProvideServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
