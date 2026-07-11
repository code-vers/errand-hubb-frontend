# Backend Development

## Table of Contents
1. [NestJS Core Concepts](#nestjs-core-concepts)
2. [Validation & DTOs](#validation--dtos)
3. [Global Interceptors & Filters](#global-interceptors--filters)
4. [Prisma Integration](#prisma-integration)

---

## NestJS Core Concepts

The backend is built with NestJS, which forces a modular, object-oriented architecture.

### Modules (`*.module.ts`)
Every logical feature is a module. A module encapsulates Controllers and Services. For instance, `UsersModule` imports everything needed to manage users. The root `AppModule` imports all feature modules.

### Controllers (`*.controller.ts`)
Controllers handle incoming HTTP requests and return responses to the client. They are responsible *only* for routing, extracting parameters/body, and delegating to the Service.

### Services (`*.service.ts`)
Services contain the core business logic and interact with the database. They are decorated with `@Injectable()` so they can be injected into Controllers via dependency injection.

---

## Validation & DTOs

Data Transfer Objects (DTOs) define the shape of data coming into the network.

- NestJS uses `class-validator` to enforce rules.
- Instead of manual `if (!body.email)` checks, we use decorators:

```typescript
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
```
If a request fails this validation, the global `ValidationPipe` automatically returns a `400 Bad Request` without ever reaching the controller logic.

---

## Global Interceptors & Filters

Located in `src/common/`.

### TransformInterceptor
Intercepts all successful responses and formats them into:
```json
{
  "success": true,
  "data": <original_response>
}
```

### HttpExceptionFilter
Catches all thrown Exceptions (like `NotFoundException`, `BadRequestException`) and formats them consistently to prevent stack traces from leaking and to ensure the frontend receives predictable error objects.

---

## Prisma Integration

The `PrismaModule` and `PrismaService` are globally accessible.

Instead of raw SQL, the backend queries the DB like so:

```typescript
// Inside a Service
async findUserById(id: string) {
  return this.prisma.user.findUnique({
    where: { id },
    include: { profile: true } // Joins the profile table automatically
  });
}
```
