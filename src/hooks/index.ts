// Re-export all hooks from this index file for easier imports
export { useCurrentUser } from '@/app/features/auth/hooks/login/useCurrentUser';
export { useIsMounted } from '@/app/features/dashboard/hooks/useIsMounted';
export { useLocalStorage } from '@/hooks/useLocalStorage';
export { useOutsideClick } from '@/app/features/dashboard/hooks/useOutsideClick';
export { usePagination } from '@/app/features/dashboard/hooks/usePagination';
export { useTaskEdit } from '@/app/features/dashboard/hooks/useTaskEdit';
export { useTaskForm } from '@/app/features/auth/hooks/login/useTaskForm';
export { useTasks } from '@/app/features/dashboard/hooks/useTasks';

// Re-export types from task types
export type { TaskItem } from '@/types/dashboard/TaskItem';
