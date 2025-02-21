import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string){
        return this.authService.register(name, email, password)
    }

    @Post('login')
    async login(@Body('email') email: string, @Body('password') password: string){
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            return { message: 'Credenciales inválidas' };
        }
        const token = this.authService.generateToken(user);
        return { token };
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    async profile(@Request() req) {
        return req.user;
    }

}
