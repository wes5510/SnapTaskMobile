import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
});

export default function Task() {
  return (
    <View style={styles.container}>
      <BouncyCheckbox />
      <TextInput
        placeholder="Something..."
        placeholderTextColor="rgba(2,8,23, 0.6)"
      />
    </View>
  );
}
