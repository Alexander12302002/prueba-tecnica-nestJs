import { IsString, IsDateString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({
        description: 'Título de la tarea',
        example: 'Crear una api con nestJs',
    })
    @IsString({ message: 'El título es requerido' })
    title: string;

    @ApiProperty({
        description: 'Descripción de la tarea',
        example: 'Crear una ApiRest con nestJs para el backend',
    })
    @IsString({ message: 'La descripción  es requerido' })
    description: string;

    @IsDateString({}, { message: 'La fecha de vencimiento es requerida y debe ser válida' })
    @ApiProperty({
        description: 'Fecha de vencimiento de la tarea (formato YYYY-MM-DD)',
        example: '2025-21-02',
    })
    dueDate: string;

    @IsString({ message: 'El usuario es requerido y debe ser valido' })
    @ApiProperty({
        description: 'El ID del usuario en formato ID de mongo',
        example: '67b89375e95e57b668dea4bf',
    })
    assignedTo: string;

    @IsOptional()
    @ApiProperty({
        description: 'El estado de la tarea',
        example: 'completed',
        required: false,
      })
    @IsIn(['completed', 'pending'], {
        message: 'El estado debe ser "completed" o "pending"',
    })
    status?: 'completed' | 'pending'
}