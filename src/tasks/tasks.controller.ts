import {Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Request, BadRequestException, Query} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto'; 
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
        try {
            return await this.tasksService.create(createTaskDto, req.user.userId);
          } catch (error) {
            if (error instanceof BadRequestException) {
              throw new BadRequestException(error.message);
            }
            throw error; 
          }
    }

    @Get()
    async findAll(@Request() req, 
    @Query('status') status?: 'completed' | 'pending',
    @Query('dueDate') dueDate?: string,
    @Query('assignedTo') assignedTo?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    ) {
        return this.tasksService.findAll(
            req.user.userId,
            status,
            dueDate,    
            assignedTo,
            limit,
            offset,
        );
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Request() req) {
        return this.tasksService.findOne(id, req.user.userId);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req,) {
        return this.tasksService.update(id, updateTaskDto, req.user.userId);
    }

    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req) {
        return this.tasksService.remove(id, req.user.userId);
    }
}
