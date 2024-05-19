import React, { useCallback } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  useSuspenseQuery,
  queryOptions,
  useMutation,
  QueryClient,
} from '@tanstack/react-query';
import { Task as TaskEntity } from './task/entity';
import { get, remove, updateText } from './task/models';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
});

export interface TaskProps {
  id: string;
}

export default function Task({ id }: TaskProps) {
  const queryClient = new QueryClient();

  const { data: task } = useSuspenseQuery(
    queryOptions({
      queryKey: ['tasks'],
      queryFn: async (): Promise<Map<TaskEntity['id'], TaskEntity>> => {
        const tasks = await get();
        return new Map(tasks.map((t) => [t.id, t]));
      },
      select: (tasks) => tasks.get(id),
    }),
  );

  const { mutateAsync: _updateText } = useMutation({
    mutationFn: ({ _id, text }: { _id: string; text: string }) =>
      updateText({ id: _id, text }),
    onMutate: async ({ _id, text }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (old: Map<string, TaskEntity>) => {
        const newTasks = new Map(old);
        const _task = newTasks.get(_id);
        if (_task) {
          newTasks.set(_id, { ..._task, text });
        }
        return newTasks;
      });
      return { previousTasks };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const { mutateAsync: _remove } = useMutation({
    mutationFn: (_id: string) => remove(_id),
    onMutate: async (_id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (old: Map<string, TaskEntity>) => {
        const newTasks = new Map(old);
        newTasks.delete(_id);
        return newTasks;
      });
      return { previousTasks };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleKeyPress = useCallback(
    (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (event.nativeEvent.key === 'Backspace' && task?.text === '') {
        _remove(id);
      }
    },
    [_remove, id, task?.text],
  );

  const handleChangeText = useCallback(
    (text: string) => {
      _updateText({ _id: id, text });
    },
    [_updateText, id],
  );

  return (
    task && (
      <View style={styles.container}>
        <BouncyCheckbox isChecked={task.completed} />
        <TextInput
          placeholder="Something..."
          placeholderTextColor="rgba(2,8,23, 0.6)"
          value={task.text}
          onChangeText={handleChangeText}
          onKeyPress={handleKeyPress}
        />
      </View>
    )
  );
}
