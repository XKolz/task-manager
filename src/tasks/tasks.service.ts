import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

async getAllTasks(
    page: number,
    limit: number,
    search?: string,
    isComplete?: boolean,
  ) {
    const query = this.taskRepository.createQueryBuilder('task');
  
    if (search) {
      query.andWhere('task.title LIKE :search OR task.description LIKE :search', {
        search: `%${search}%`,
      });
    }
  
    if (isComplete !== undefined) {
      query.andWhere('task.isComplete = :isComplete', { isComplete });
    }
  
    query.skip((page - 1) * limit).take(limit);
  
    const [tasks, total] = await query.getManyAndCount();
  
    return {
      total,
      page,
      limit,
      data: tasks,
    };
  }
  
  getTaskById(id: string) {
    return this.taskRepository.findOne({ where: { id } });
  }

  createTask(title: string, description: string) {
    const task = this.taskRepository.create({ title, description });
    return this.taskRepository.save(task);
  }

  async updateTask(id: string, isComplete: boolean) {
    const task = await this.getTaskById(id);
    if (task) {
      task.isComplete = isComplete;
      return this.taskRepository.save(task);
    }
    return null;
  }

  deleteTask(id: string) {
    return this.taskRepository.delete(id);
  }
}
