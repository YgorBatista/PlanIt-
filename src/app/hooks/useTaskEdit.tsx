import { useState, useEffect, useRef } from 'react';
import { TaskItem } from '@/app/hooks/useTasks';

export function useTaskEdit(task: TaskItem, onUpdate: (task: TaskItem) => void) {
    const [tempText, setTempText] = useState(task.title);
    const [tempStatus, setTempStatus] = useState(task.status);
    const [isEditing, setIsEditing] = useState(false);
    const [isInlineEditing, setIsInlineEditing] = useState(false);

    useEffect(() => {
        setTempText(task.title);
        setTempStatus(task.status);
    }, [task.title, task.status]);

    function handleSave() {
        onUpdate({ ...task, title: tempText, status: tempStatus });
        setIsEditing(false);
        setIsInlineEditing(false);
    }

    function cancelInlineEdit() {
        setTempText(task.title);
        setTempStatus(task.status);
        setIsInlineEditing(false);
        onUpdate({ ...task, editing: false });
    }

    return {
        tempText,
        setTempText,
        tempStatus,
        setTempStatus,
        isEditing,
        setIsEditing,
        isInlineEditing,
        setIsInlineEditing,
        handleSave,
        cancelInlineEdit,
        cardRef: useRef<HTMLDivElement>(null)
    };
}
