/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import TaskCreator from './TaskCreator';
import Task from './Task';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 30,
    gap: 20,
  },
});

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TaskCreator />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Task />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
