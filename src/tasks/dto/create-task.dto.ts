import { IsString, IsDateString, IsOptional, IsIn } from 'class-validator';

export class CreateTaskDto {
    @IsString({ message: 'El título es requerido' })
    title: string;

    @IsString({ message: 'La descripción  es requerido' })
    description: string;

    @IsDateString({}, { message: 'La fecha de vencimiento es requerida y debe ser válida' })
    dueDate: string;

    @IsString({ message: 'El usuario es requerido y debe ser valido' })
    assignedTo: string;

    @IsOptional()
    @IsIn(['completed', 'pending'], {
        message: 'El estado debe ser "completed" o "pending"',
    })
    status?: 'completed' | 'pending'
}