import { IsString, IsDateString, IsOptional, IsBoolean, IsIn } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsDateString()
    dueDate?: string;
  
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
  
    @IsOptional()
    @IsString()
    assignedTo?: string; 

    @IsOptional()
    @IsIn(['completed', 'pending'], {
        message: 'El estado debe ser "completed" o "pending"',
    })
    status?: 'completed' | 'pending'
  }