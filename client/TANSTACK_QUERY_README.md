# TanStack Query Setup Guide

This project has been configured with TanStack Query (React Query) for efficient data fetching, caching, and state management.

## What's Been Added

1. **Dependencies**: `@tanstack/react-query` and `@tanstack/react-query-devtools`
2. **QueryClient Configuration**: Set up in `src/index.tsx` with optimized defaults
3. **Custom Hooks**: Pre-built hooks in `src/hooks/useApi.ts` for common API operations
4. **DevTools**: React Query DevTools for debugging (accessible in development)

## Configuration

The QueryClient is configured with the following defaults:
- **staleTime**: 5 minutes (data considered fresh for 5 minutes)
- **gcTime**: 10 minutes (cached data kept for 10 minutes)
- **retry**: 1 attempt on failure
- **refetchOnWindowFocus**: Disabled

## Usage Examples

### Basic Query Hook

```tsx
import { useUsers } from './hooks/useApi';

function UsersList() {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {users?.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Mutation Hook

```tsx
import { useCreateUser } from './hooks/useApi';

function CreateUserForm() {
  const createUserMutation = useCreateUser();

  const handleSubmit = (userData) => {
    createUserMutation.mutate(userData, {
      onSuccess: () => {
        console.log('User created successfully!');
      },
      onError: (error) => {
        console.error('Failed to create user:', error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button 
        type="submit" 
        disabled={createUserMutation.isPending}
      >
        {createUserMutation.isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}
```

### Custom Query with Parameters

```tsx
import { useQuery } from '@tanstack/react-query';
import { apiFunctions } from './hooks/useApi';

function UserProfile({ userId }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => apiFunctions.getUserById(userId),
    enabled: !!userId, // Only run if userId exists
  });

  if (isLoading) return <div>Loading user...</div>;
  
  return <div>{user?.name}</div>;
}
```

## Available Hooks

From `src/hooks/useApi.ts`:

- `useUsers()` - Get all users
- `useUser(id)` - Get a specific user
- `useCreateUser()` - Create a new user
- `useUpdateUser()` - Update an existing user
- `useDeleteUser()` - Delete a user

## DevTools

In development mode, you can access the React Query DevTools by:
1. Opening your browser's developer tools
2. Looking for the "React Query" tab
3. Or clicking the floating React Query icon in the bottom-right corner

## Best Practices

1. **Query Keys**: Use descriptive, hierarchical query keys like `['users']`, `['user', id]`
2. **Error Handling**: Always handle loading and error states
3. **Optimistic Updates**: Use `setQueryData` for immediate UI updates
4. **Cache Invalidation**: Invalidate related queries after mutations
5. **Stale Time**: Adjust `staleTime` based on how often your data changes

## Environment Variables

Set your API base URL in `.env`:
```
REACT_APP_API_URL=http://your-api-url.com/api
```

## Next Steps

1. Update your existing components to use the new hooks
2. Add more API functions to `useApi.ts` as needed
3. Configure error boundaries for better error handling
4. Add loading skeletons for better UX 