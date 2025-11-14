import { useState, useEffect, useRef } from 'react';
import { TaskItem } from '@/app/hooks/useTasks';

export function useTaskEdit(task: TaskItem, onUpdate: (task: TaskItem) => void) {
    const [tempText, setTempText] = useState(task.title);
    const [tempStatus, setTempStatus] = useState(task.status);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setTempText(task.title);
        setTempStatus(task.status);
    }, [task.title, task.status]);

    function handleSave() {
        onUpdate({ ...task, title: tempText, status: tempStatus });
        setIsEditing(false);
    }

    return {
        tempText,
        setTempText,
        tempStatus,
        setTempStatus,
        isEditing,
        setIsEditing,
        handleSave,
        cardRef: useRef<HTMLDivElement>(null)
    };
}
