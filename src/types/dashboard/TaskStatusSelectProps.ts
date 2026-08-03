type TaskStatusSelectProps = {
    value: string;
    disabled?: boolean;
    onChange: (val: string) => void;
    getStatusColor: (status: string) => string;
};