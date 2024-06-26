import { Column, Entity, PrimaryColumn } from 'typeorm/browser';

@Entity('task')
export class Task {
  @PrimaryColumn('varchar')
  id: string;

  @Column('text')
  text: string;

  @Column('boolean')
  completed: boolean;
}
