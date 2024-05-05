/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 30,
  },
  taskCreator: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    borderColor: 'rgb(226, 232, 240)',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgb(15, 23, 42)',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: 'rgb(248,250,252)',
    fontWeight: 600,
  },
});

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.taskCreator}>
          <TextInput
            style={styles.input}
            placeholder="What do you want to do?"
            placeholderTextColor="rgba(2,8,23, 0.6)"
          />
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>+ Add</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentInsetAdjustmentBehavior="automatic" />
      </View>
    </SafeAreaView>
  );
}
