import { IsString, IsDateString, IsOptional, IsBoolean, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
    @ApiProperty({
        description: 'Título de la tarea',
        example: 'Crear una api con nestJs',
        required: false,
    })
    @IsOptional()
    @IsString()
    title?: string;
  
    @ApiProperty({
        description: 'Descripción de la tarea',
        example: 'Crear una ApiRest con nestJs para el backend',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;
  
    @ApiProperty({
        description: 'Fecha de vencimiento de la tarea (formato YYYY-MM-DD)',
        example: '2025-02-21',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    dueDate?: string;
  
    @ApiProperty({
        description: 'Indica si la tarea está completada',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
  
    @ApiProperty({
        description: 'ID del usuario asignado a la tarea',
        example: '67b89375e95e57b668dea4bf',
        required: false,
    })
    @IsOptional()
    @IsString()
    assignedTo?: string; 

    @ApiProperty({
        description: 'Estado de la tarea',
        example: 'completed',
        enum: ['completed', 'pending'],
        required: false,
    })
    @IsOptional()
    @IsIn(['completed', 'pending'], {
        message: 'El estado debe ser "completed" o "pending"',
    })
    status?: 'completed' | 'pending'
  }