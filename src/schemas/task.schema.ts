import { Schema, Document } from 'mongoose';

export const TaskSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, require: true},
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending',},
    completed: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
})

export interface Task extends Document {
    title: string;
    description: string;
    dueDate: Date;
    status: 'pending' | 'completed';
    completed: boolean;
    createdBy: Schema.Types.ObjectId; 
    assignedTo?: Schema.Types.ObjectId; 
    createdAt: Date;
  }