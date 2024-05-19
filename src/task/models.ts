import { AppDataSource } from '../dataSource';
import { Task } from './entity';

export const create = ({ id, text, completed }: Task) =>
  AppDataSource().getRepository(Task).save({ id, text, completed });

export const get = () => {
  return AppDataSource().getRepository(Task).find();
};

export const updateText = ({ id, text }: Pick<Task, 'id' | 'text'>) => {
  return AppDataSource().getRepository(Task).update({ id }, { text });
};

export const remove = (id: Task['id']) => {
  return AppDataSource().getRepository(Task).delete({ id });
};
