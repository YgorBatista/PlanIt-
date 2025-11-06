'use client'
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export type TaskItem = {
  id: string;
  title: string;
  status: string;
  editing: boolean;
};

export function useTasks() {
  const { data: session } = useSession();

  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // manual login fallback
  const [manualName, setManualName] = useState<string | null>(null);
  const [manualEmail, setManualEmail] = useState<string | null>(null);

  // carrega manualmente na montagem
  useEffect(() => {
    setManualName(localStorage.getItem('manualName'));
    setManualEmail(localStorage.getItem('userEmail'));
  }, []);

  // dados do usuário (prioridade para next-auth)
  const userEmail = session?.user?.email || manualEmail;

  // chave única baseada no email
  const storageKey = userEmail ? `tasks_${userEmail}` : null;

  // carregar tasks
  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    setTasks(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  // salvar tasks
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  // foco automático
  useEffect(() => {
    if (!tasks.some(t => t.editing) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [tasks]);

const addTask = () => {
  // Rejeita titles vazios ou compostos apenas por espaços
  const trimmedTitle = title.trim();
  if (!trimmedTitle || !status) return;

  const now = new Date();
  const hora = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second:'2-digit' });
  const dia = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
  const id = `${dia} - ${hora}`;

  // Use o título 'trimado' para evitar tarefas com apenas espaços
  const newTask = { id, title: trimmedTitle, status, editing: false };
  setTasks(prev => [newTask, ...prev]);

  // Limpa campos
  setTitle('');
  setStatus('');
};

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { 
    tasks, setTasks, 
    title, setTitle, 
    status, setStatus, 
    inputRef, addTask, removeTask,
    setManualEmail, setManualName 
  };
}
