import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ToggleButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isEnabled ? styles.buttonEnabled : styles.buttonDisabled]}
        onPress={toggleSwitch}
      >
        <Text style={styles.buttonText}>{isEnabled ? 'ON' : 'OFF'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonEnabled: {
    backgroundColor: 'green',
  },
  buttonDisabled: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ToggleButton;
