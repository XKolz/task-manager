Steps to Create a Project
Install the NestJS CLI:

bash
Copy code
npm install -g @nestjs/cli
Create a New Project:

bash
Copy code
nest new task-manager
The CLI scaffolds the project structure.
You choose a package manager (e.g., npm or yarn).
Run the Development Server:

bash
Copy code
npm run start:dev
The app starts on http://localhost:3000 by default.


2. Basic CRUD Operations
We started with a simple Task Manager API. Here's what we did:

Modules in NestJS
A module is a class annotated with the @Module decorator.
We generated a Tasks Module:
bash
Copy code
nest generate module tasks
Controllers in NestJS
Controllers handle incoming requests and return responses.
We generated a Tasks Controller:
bash
Copy code
nest generate controller tasks
Services in NestJS
Services handle the business logic of the app.
We generated a Tasks Service:
bash
Copy code
nest generate service tasks


2. Basic CRUD Operations
We started with a simple Task Manager API. Here's what we did:

Modules in NestJS
A module is a class annotated with the @Module decorator.
We generated a Tasks Module:
bash
Copy code
nest generate module tasks
Controllers in NestJS
Controllers handle incoming requests and return responses.
We generated a Tasks Controller:
bash
Copy code
nest generate controller tasks
Services in NestJS
Services handle the business logic of the app.
We generated a Tasks Service:
bash
Copy code
nest generate service tasks
Building the Task Manager API
Define a Task Model: We created a Task interface to represent our tasks:

typescript
Copy code
export interface Task {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
}
In-Memory Storage: Initially, we stored tasks in an in-memory array in the TasksService:

typescript
Copy code
private tasks: Task[] = [];
Basic Endpoints in TasksController:

GET /tasks: Fetch all tasks.
POST /tasks: Add a new task.
PATCH /tasks/:id: Update a task.
DELETE /tasks/:id: Delete a task.
3. Database Integration
To make data persistent, we integrated SQLite and later discussed using SQL databases like PostgreSQL.

Why SQLite?
Lightweight and easy to set up.
Ideal for learning and prototyping.
Steps:
Install TypeORM and SQLite:

bash
Copy code
npm install @nestjs/typeorm typeorm sqlite3
Configure TypeORM in AppModule:

typescript
Copy code
imports: [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'tasks.db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, // Automatically sync schema
  }),
],
Create a Task Entity:

typescript
Copy code
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isComplete: boolean;
}
Replace the in-memory array in TasksService with a TypeORM Repository for database operations.

4. Authentication with JWT
To secure our API, we implemented authentication using JWT.

Steps:
Install dependencies:

bash
Copy code
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install --save-dev @types/passport-jwt
Create an Auth Module, Controller, and Service:

bash
Copy code
nest generate module auth
nest generate controller auth
nest generate service auth
Create a User Entity:

typescript
Copy code
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: 'user' | 'admin';
}
Register a User:

Hash passwords with bcrypt.
Save users in the database.
Authenticate Users:

Validate credentials during login.
Return a JWT token.
Protect Routes:

Use JwtAuthGuard to secure routes.
Apply guards to restrict access based on roles.

5. Role-Based Access Control
We introduced RolesGuard to restrict certain actions (e.g., promoting users to admins).

Steps:
Create a custom @Roles decorator:

typescript
Copy code
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
Implement a RolesGuard:

typescript
Copy code
canActivate(context: ExecutionContext): boolean {
  const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
  const request = context.switchToHttp().getRequest();
  const user = request.user;

  return user && requiredRoles.includes(user.role);
}
Protect endpoints:

typescript
Copy code
@Patch('promote/:id')
@Roles('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
async promoteToAdmin(@Param('id') id: string) {
  return this.authService.promoteToAdmin(Number(id));
}
Key Concepts of NestJS Covered
Modules: Organize the app into feature-based modules.
Controllers: Handle incoming requests and map them to services.
Services: Encapsulate business logic.
Entities: Represent database tables using TypeORM.
Guards: Protect routes and apply custom logic (e.g., JWT authentication).
Decorators: Extend functionality (e.g., @Roles, @UseGuards).
