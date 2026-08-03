import { TaskItem } from '@/types/dashboard/TaskItem';

export type TaskCardProps = {
    task: TaskItem;
    onUpdate: (task: TaskItem) => void;
    onDelete: (id: string) => void;
    getStatusColor: (status: string) => string;
};