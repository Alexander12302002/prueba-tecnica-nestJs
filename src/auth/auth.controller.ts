import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @ApiOperation({
        summary: 'Registrar un nuevo usuario',
        description: 'Crea una nueva cuenta de usuario.',
      })
    @ApiBody({
        description: 'Datos del usuario',
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Alex',
              description: 'Nombre del usuario',
            },
            email: {
              type: 'string',
              example: 'Alexander@gmail.com',
              description: 'Correo electrónico del usuario',
            },
            password: {
              type: 'string',
              example: '12345678',
              description: 'Contraseña del usuario',
            },
          },
          required: ['name', 'email', 'password'],
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Usuario registrado exitosamente',
      })
    @ApiResponse({
        status: 400,
        description: 'Datos inválidos o el correo ya está registrado',
    })
    async register(@Body('name') name: string, @Body('email') email: string, @Body('password') password: string){
        return this.authService.register(name, email, password)
    }

    @Post('login')
    @ApiOperation({
        summary: 'Iniciar sesión',
        description: 'Autentica a un usuario y genera un token JWT.',
      })
    @ApiBody({
        description: 'Credenciales del usuario',
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              example: 'Alexander@gmail.com',
              description: 'Correo electrónico del usuario',
            },
            password: {
              type: 'string',
              example: '12345678',
              description: 'Contraseña del usuario',
            },
          },
          required: ['email', 'password'],
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Inicio de sesión exitoso',
        schema: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlb',
              description: 'Token JWT generado',
            },
          },
        },
    })
    @ApiResponse({
        status: 401,
        description: 'Credenciales inválidas',
    })
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
    @Post('profile')
    @ApiOperation({
        summary: 'Obtener perfil del usuario',
        description: 'Obtiene la información del perfil del usuario autenticado.',
    })
    @ApiBearerAuth() 
    @ApiResponse({
        status: 200,
        description: 'Perfil del usuario obtenido exitosamente',
    })
    @ApiResponse({
        status: 401,
        description: 'No autorizado',
    })
    async profile(@Request() req) {
        return req.user;
    }

}
