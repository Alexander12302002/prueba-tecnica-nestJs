# Prueba Técnica

Este proyecto es un sistema de gestión de tareas (todo list) con autenticación y autorización. El sistema permite a los usuarios registrarse, iniciar sesión, crear tareas, asignarlas a otros usuarios y filtrar/buscar tareas.

# Tecnologías

- **Backend**: NestJs
- **Base de datos**: MongoDB 
- **Autenticación**: Local
- **Arquitectura**: MVC

## Características principales

- **Registro y Login local**: Permite a los usuarios crear una cuenta y loguearse
- **Protección de Endpoints**: Los endpoints sensibles (como crear, actualizar o eliminar tareas) están protegidos con un guard (`JwtAuthGuard`).
- **Gestión de Tareas (CRUD)**: Los usuarios autenticados pueden crear, filtrar, actualizar, borrar tareas.

## Instrucciones de Instalación

1. Clona el repositorio:

   ```
   git clone https://github.com/Alexander12302002/prueba-tecnica-nestJs.git
   cd prueba-tecnica-nestJs
   ```

2. Instala las dependencias del proyecto:

   ```
   npm install
   ```

3. Configura las variables de entorno (ver sección siguiente).

4. Inicia la aplicación:

   ```
   npm run start:dev
   ```

## Configuración del Entorno (.env)

Crea un archivo `.env` en la carpeta con las siguientes variables:`

```
MONGO_URI="Aqui ira la URL de la base de datos"
JWT_SECRET="tu-clave-secreta-de-JWT"
```

# Configurar token

Incluye el token en el encabezado `Authorization` de las solicitudes HTTP a los endpoints protegidos.

```
Authorization: Bearer <token>
```

# Ver documentación EndPoints

```
http://localhost:3000/Api
```

