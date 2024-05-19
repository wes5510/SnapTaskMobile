import React from 'react';
import { ScrollView } from 'react-native';
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import Task from './Task';
import { Task as TaskEntity } from './task/entity';
import { get } from './task/models';

export default function TaskList() {
  const { data: taskIds } = useSuspenseQuery(
    queryOptions({
      queryKey: ['tasks'],
      queryFn: async (): Promise<Map<TaskEntity['id'], TaskEntity>> => {
        const tasks = await get();
        return new Map(tasks.map((t) => [t.id, t]));
      },
      select: (tasks) => [...tasks.keys()],
    }),
  );

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      {taskIds.map((tid) => (
        <Task key={tid} id={tid} />
      ))}
    </ScrollView>
  );
}
