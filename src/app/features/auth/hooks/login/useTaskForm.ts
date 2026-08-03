// hooks/useTaskForm.ts
import { useState } from "react";

export function useTaskForm() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");

  const reset = () => {
    setTitle("");
    setStatus("");
  };

  return {
    title,
    setTitle,
    status,
    setStatus,
    reset,
  };
}