Install NestJS CLI:
npm i -g @nestjs/cli

Create a New Project:
nest new task-manager

Choose npm or yarn as your package manager.
Navigate into the project directory:
cd task-manager


Step 2: Generate a Task Module
Generate a module, controller, and service for tasks:
nest generate module tasks
nest generate controller tasks
nest generate service tasks

Step 1: Install the uuid Package
Run the following command to install the uuid library and its type definitions:
npm install uuid
npm install --save-dev @types/uuid

Step 1: Install PostgreSQL with TypeORM


npm install @nestjs/typeorm typeorm pg



### Add User Authentication
1. Install Authentication Dependencies
Run the following commands to install necessary packages:
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install --save-dev @types/passport-jwt

2. Create an Auth Module
Generate an auth module, controller, and service:
nest generate module auth
nest generate controller auth
nest generate service auth


npm install class-validator class-transformer
