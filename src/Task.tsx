import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { Task as TaskEntity } from './task/entity';
import { get } from './task/models';

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

  return (
    task && (
      <View style={styles.container}>
        <BouncyCheckbox isChecked={task.completed} />
        <TextInput
          placeholder="Something..."
          placeholderTextColor="rgba(2,8,23, 0.6)"
          value={task.text}
        />
      </View>
    )
  );
}
