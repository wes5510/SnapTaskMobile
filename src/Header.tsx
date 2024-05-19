import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { AppDataSource } from './dataSource';

const styles = StyleSheet.create({
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

export default function Header({
  onInit,
}: {
  onInit: (init: boolean) => void;
}) {
  const handlePress = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
      });
      await AppDataSource(response.uri).initialize();
      onInit(AppDataSource().isInitialized);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Load File</Text>
      </TouchableOpacity>
    </View>
  );
}
