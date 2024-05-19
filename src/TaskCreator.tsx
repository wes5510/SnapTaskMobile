import React, { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Task } from './task/entity';
import { create } from './task/models';

const styles = StyleSheet.create({
  container: {
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

export default function TaskCreator() {
  const [text, setText] = useState('');
  const queryClient = useQueryClient();

  const addTask = useMutation({
    mutationFn: (newTask: Task) => create(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handlePress = async () => {
    addTask.mutate({
      id: nanoid(),
      text,
      completed: false,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What do you want to do?"
        placeholderTextColor="rgba(2,8,23, 0.6)"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );
}
