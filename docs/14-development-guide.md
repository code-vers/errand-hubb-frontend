# Development Guide

## Table of Contents
1. [Adding a New API Endpoint (Backend)](#adding-a-new-api-endpoint-backend)
2. [Adding a New Database Table](#adding-a-new-database-table)
3. [Adding a New Page (Frontend)](#adding-a-new-page-frontend)
4. [Coding Conventions](#coding-conventions)

---

## Adding a New API Endpoint (Backend)

Follow these steps to implement a new feature (e.g., `Reviews`):

1. **Generate the Module, Controller, and Service:**
   Use the NestJS CLI inside the `errand-hubb-backend` directory:
   ```bash
   nest g module reviews
   nest g controller reviews
   nest g service reviews
   ```
   
2. **Create DTOs:**
   Create a `dto/create-review.dto.ts` inside the `reviews` folder.
   ```typescript
   import { IsString, IsNumber, Min, Max } from 'class-validator';

   export class CreateReviewDto {
     @IsNumber()
     @Min(1)
     @Max(5)
     rating: number;

     @IsString()
     comment: string;
   }
   ```

3. **Implement the Service logic:**
   Inject `PrismaService` and write the database logic.

4. **Implement the Controller:**
   Use decorators (`@Post()`, `@Body()`, `@UseGuards()`) to hook up the HTTP route to the Service method.

---

## Adding a New Database Table

1. Open `errand-hubb-backend/prisma/schema.prisma`.
2. Add your new model:
   ```prisma
   model Review {
     id        String   @id @default(uuid())
     rating    Int
     comment   String
     createdAt DateTime @default(now()) @map("created_at")
     
     @@map("reviews")
   }
   ```
3. Run `npx prisma migrate dev --name add_reviews_table`.
4. The database is updated, and the Prisma client is regenerated.

---

## Adding a New Page (Frontend)

1. **Create the Route:**
   In `errand-hubb-frontend/src/app`, create a new folder (e.g., `dashboard/reviews`).
2. **Create `page.js`:**
   Inside that folder, create a `page.js` file.
   ```javascript
   export default function ReviewsPage() {
     return <div>My Reviews</div>;
   }
   ```
3. **Fetch Data:**
   Create a fetching function in `src/services/reviewsService.js`.
4. **Use React Query:**
   Inside `page.js` or a child component, use `useQuery` to fetch and render the data.

---

## Coding Conventions

- **Casing:**
  - Files/Folders: `kebab-case` (e.g., `user-profile.tsx`, `ads-subscriptions.module.ts`)
  - Variables/Functions: `camelCase` (e.g., `fetchUserData()`)
  - Classes/Interfaces/Types: `PascalCase` (e.g., `CreateUserDto`, `UserProfile`)
- **Imports:** Use absolute imports where configured (`@/components/...`).
- **Styles:** Stick to Tailwind utility classes. If complex, extract to a reusable component. Do not write raw CSS unless absolutely necessary.
- **Git Commits:** Use conventional commits (e.g., `feat: add reviews`, `fix: header alignment`, `chore: update deps`).
