import { DataSource } from 'typeorm/browser';
import { Task } from './task/entity';

let appDataSource: DataSource;

export function AppDataSource(database?: string) {
  if (!appDataSource) {
    if (database === undefined) {
      throw new Error('database is required');
    }

    appDataSource = new DataSource({
      type: 'react-native',
      database: 'demo.db',
      location: 'Library',
      logging: true,
      synchronize: true,
      entities: [Task],
      extra: {
        createFromLocation: database,
      },
    });
  }

  return appDataSource;
}
