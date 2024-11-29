import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasks') // Maps to a "tasks" table in the database
export class Task {
//@PrimaryGeneratedColumn('uuid')
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isComplete: boolean;
}
