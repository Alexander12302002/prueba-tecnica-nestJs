import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>, private jwtService: JwtService,) {}

    async register(name: string, email: string, password: string): Promise<User> {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
        throw new ConflictException('El email ya está registrado'); // Lanza un error 409
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ name, email, password: hashedPassword });
        return newUser.save();
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
          return user;
        }
        return null;
    }

    generateToken(user: User): string {
        const payload = { email: user.email, sub: user._id, name: user.name };
        return this.jwtService.sign(payload); 
      }
}
