import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../schemas/user.schema'

@Injectable()
export class TasksService {
    constructor(
        @InjectModel('Task') private taskModel: Model<Task>,
        @InjectModel('User') private userModel: Model<User>,
    ) {}

    async create(createTaskDto: CreateTaskDto, userId: string): Promise<Task> {
        if (createTaskDto.assignedTo) {
            const assignedUser = await this.userModel.findById(createTaskDto.assignedTo).exec();
            if (!assignedUser) {
              throw new BadRequestException('El usuario asignado no existe'); 
            }   
          }
        const newTask = new this.taskModel({...createTaskDto, createdBy: userId,});
        return newTask.save();
    }

    async findAll(
        userId: string,
        status?: 'completed' | 'pending',
        dueDate?: string,
        assignedTo?: string,
        limit?: number,
        offset?: number,): Promise<Task[]> {
            const filter: any = { createdBy: userId }; 
            if (status) {
              filter.completed = status === 'completed'; 
            }
            if (dueDate) {
              filter.dueDate = new Date(dueDate); 
            }
            if (assignedTo) {
              filter.assignedTo = assignedTo;
            }
            const query = this.taskModel.find(filter);
            if (limit) {
              query.limit(limit);
            }
            if (offset) {
              query.skip(offset); 
            }
            return query.exec();
    }

    async findOne(id: string, userId: string): Promise<Task> {
        const task = await this.taskModel.findOne({ _id: id, createdBy: userId }).exec();
        if (!task) {
          throw new NotFoundException('Tarea no encontrada');
        }
        return task;
    }

    async update(id: string, updateTaskDto: UpdateTaskDto, userId: string): Promise<Task> {
        const task = await this.taskModel.findById(id).exec();
        if (!task) {
          throw new NotFoundException('Tarea no encontrada');
        }

        if (task.createdBy.toString() !== userId && task.assignedTo?.toString() !== userId) {
            throw new ForbiddenException('No tienes permiso para actualizar esta tarea',);
        }

        const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec()
        if (!updatedTask) {
            throw new NotFoundException('Tarea no encontrada');
        }
        return updatedTask;
    }

    async remove(id: string, userId: string): Promise<void> {
        const task = await this.taskModel.findById(id).exec();
        if (!task) {
            throw new NotFoundException('Tarea no encontrada');
        }

        if (task.createdBy.toString() !== userId) {
            throw new ForbiddenException('No tienes permiso para eliminar esta tarea');
        }

        await this.taskModel.findByIdAndDelete(id).exec();
    }
}
