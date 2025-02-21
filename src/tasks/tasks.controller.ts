import {Controller, Post, Body, Get, Param, Put, Delete, UseGuards, Request, BadRequestException, Query} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto'; 
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Post()
    @ApiOperation({
        summary: 'Crear una nueva tarea',
        description: 'Crea una nueva tarea asignada al usuario autenticado.',
    })
    @ApiBody({
        type: CreateTaskDto,
        examples: {
          example1: {
            summary: 'Ejemplo de creación de tarea',
            value: {
              title: 'Hacer una ApiRest con nestJs',
              description: 'Crear una ApiRest con nestJs para el backend',
              dueDate: '2025-02-21',
              status: 'pending',
              assignedTo: '67b89375e95e57b668dea4bf',
            },
          },
        },
      })
    @ApiResponse({
        status: 201,
        description: 'Tarea creada exitosamente',
    })
    @ApiResponse({
        status: 400,
        description: 'Datos inválidos o el usuario asignado no existe',
    })
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
    @ApiOperation({
        summary: 'Obtener todas las tareas asignadas al usuario autenticado',
        description:
          'Obtiene una lista de tareas asignadas al usuario autenticado, con opciones de filtrado y paginación.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de tareas obtenida exitosamente',
    })
    @ApiQuery({
        name: 'status',
        required: false,
        description: 'Filtrar por estado de la tarea (completed o pending)',
        example: 'pending',
    })
    @ApiQuery({
        name: 'dueDate',
        required: false,
        description: 'Filtrar por fecha de vencimiento (formato YYYY-MM-DD)',
        example: '2025-06-11',
    })
    @ApiQuery({
        name: 'assignedTo',
        required: false,
        description: 'Filtrar por ID del usuario asignado',
        example: '65a1b2c3d4e5f6g7h8i9j0k',
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        description: 'Límite de resultados por página',
        example: 10,
    })
    @ApiQuery({
        name: 'offset',
        required: false,
        description: 'Número de resultados a omitir',
        example: 0,
    })
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
    @ApiOperation({
        summary: 'Obtener una tarea por ID',
        description: 'Obtiene los detalles de una tarea específica por su ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID de la tarea',
        example: '65a1b2c3d4e5f6g7h8i9j0k',
    })
    @ApiResponse({
        status: 200,
        description: 'Tarea encontrada exitosamente',
    })
    @ApiResponse({
        status: 404,
        description: 'Tarea no encontrada',
    })
    async findOne(@Param('id') id: string, @Request() req) {
        return this.tasksService.findOne(id, req.user.userId);
    }

    @Put(':id')
    @ApiOperation({
        summary: 'Actualizar una tarea por ID',
        description:
          'Actualiza una tarea existente. Solo el creador o el usuario asignado pueden actualizarla.',
    })
    @ApiBody({
        type: UpdateTaskDto, 
        examples: {
          example1: {
            summary: 'Ejemplo de actualización de tarea',
            value: {
              title: 'Hacer una ApiRest con nestJs (actualizado)',
              description: 'Crear una ApiRest con nestJs para el backend',
              dueDate: '2025-02-21',
              status: 'completed',
            },
          },
        },
    })
    @ApiParam({
        name: 'id',
        description: 'ID de la tarea',
        example: '65a1b2c3d4e5f6g7h8i9j0k',
    })
    @ApiResponse({
        status: 200,
        description: 'Tarea actualizada exitosamente',
    })
    @ApiResponse({
        status: 403,
        description: 'No tienes permiso para actualizar esta tarea',
    })
    @ApiResponse({
        status: 404,
        description: 'Tarea no encontrada',
    })
    async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @Request() req,) {
        return this.tasksService.update(id, updateTaskDto, req.user.userId);
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Eliminar una tarea por ID',
        description:
          'Elimina una tarea existente. Solo el creador de la tarea puede eliminarla.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID de la tarea',
        example: '65a1b2c3d4e5f6g7h8i9j0k',
    })
    @ApiResponse({
        status: 204,
        description: 'Tarea eliminada exitosamente',
    })
    @ApiResponse({
        status: 403,
        description: 'No tienes permiso para eliminar esta tarea',
    })
    @ApiResponse({
        status: 404,
        description: 'Tarea no encontrada',
    })
    async remove(@Param('id') id: string, @Request() req) {
        return this.tasksService.remove(id, req.user.userId);
    }
}
