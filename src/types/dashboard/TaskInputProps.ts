type TaskInputProps = {
    title: string;
    status: string;
    hasTasks: boolean;
    onTitleChange: (title: string) => void;
    onStatusChange: (status: string) => void;
    onAddTask: () => void;
};
