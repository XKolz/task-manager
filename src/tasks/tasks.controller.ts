import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  @Get()
  getAllTasks(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('search') search?: string,
  @Query('isComplete') isComplete?: string,
    ) {
  // Convert 'isComplete' to a boolean if it's provided
  const isCompleteBoolean =
    isComplete !== undefined ? isComplete === 'true' : undefined;

  return this.tasksService.getAllTasks(
    Number(page),
    Number(limit),
    search,
    isCompleteBoolean,
  );
}

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() body: { title: string; description: string }) {
    return this.tasksService.createTask(body.title, body.description);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: { isComplete: boolean }) {
    return this.tasksService.updateTask(id, body.isComplete);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id);
  }
}
