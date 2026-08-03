// hooks/useTasks.ts
import { useCurrentUser } from "../../auth/hooks/login/useCurrentUser";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { TaskItem } from "@/types/dashboard/TaskItem";
import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";


export function useTasks() {
  const { userEmail } = useCurrentUser();

  const storageKey = userEmail
    ? `tasks_${userEmail}`
    : null;

  const [tasks, setTasks] =
    useLocalStorage<TaskItem[]>(storageKey, []);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [manualName, setManualName] = useState<string | null>(null);
  const [manualEmail, setManualEmail] = useState<string | null>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setManualName(localStorage.getItem("manualName"));
    setManualEmail(localStorage.getItem("userEmail"));
  }, []);

  const addTask = (
    title: string,
    status: string
  ) => {

    const trimmedTitle = title.trim();

    if (!trimmedTitle || !status) return;

    const newTask = {
      id: uuid(),
      title: trimmedTitle,
      status,
    };

    setTasks(prev => [newTask, ...prev]);
    setTitle("");
    setStatus("");
  };

  const removeTask = (id: string) => {
    setTasks(prev =>
      prev.filter(task => task.id !== id)
    );
  };

  return {
    tasks,
    setTasks,
    addTask,
    removeTask,
    title,
    setTitle,
    status,
    setStatus,
    manualName,
    setManualName,
    manualEmail,
    setManualEmail,
    inputRef,
    
  };
}