# Frontend Development

## Table of Contents
1. [Next.js App Router](#nextjs-app-router)
2. [State Management & Data Fetching](#state-management--data-fetching)
3. [Styling](#styling)
4. [Protected Routes](#protected-routes)

---

## Next.js App Router

The frontend uses the Next.js `app` directory structure, which introduces Server Components and a new routing paradigm.

### Route Groups
Folders wrapped in parentheses, like `(auth)` or `(website)`, are **Route Groups**. They allow you to organize files into logical groups and apply shared layouts without affecting the URL path.
- `src/app/(auth)/login/page.js` is accessed at `/login`.
- `src/app/dashboard/page.js` is accessed at `/dashboard`.

### Layouts
Each directory can have a `layout.js` file. The root `layout.js` contains global providers (like React Query Provider, Auth Provider, and Socket Provider).

## State Management & Data Fetching

### React Query (`@tanstack/react-query`)
Instead of `useEffect` for fetching data, the application uses React Query. 
This provides:
- Automatic caching.
- Background refetching.
- Loading and error states out-of-the-box.
- Cache invalidation (e.g., when a user adds a post, we invalidate the `posts` query to trigger a refresh).

### API Layer
All Axios calls are centralized in the `src/services` folder. Components should never import Axios directly. Instead, they import the specific service function.

```javascript
// Example in a Component
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/services/postsService';

const { data, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: getPosts,
});
```

## Styling

- **Tailwind CSS:** All styling is handled via Tailwind utility classes directly in the JSX.
- **Global CSS:** `src/app/globals.css` contains custom variables and base layer overrides.

## Protected Routes

To ensure users cannot access pages they aren't authorized for, the frontend implements Route Guards.

- A custom Hook (e.g., `useAuth`) checks the user's authentication state.
- If a user tries to access `/dashboard` without an active session, they are redirected to `/login` using Next.js `useRouter` or `redirect`.
- Role-based rendering is also handled here (e.g., hiding the "Post Ad" button if the user is an `errand` role and not a `client`).
