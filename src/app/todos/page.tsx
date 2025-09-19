'use client';
import { Input } from '@/components/ui/input';
import Footer from './footer';
import Header from './header';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type TaskItem = {
    id: string;
    title: string;
    status: string;
    editing: boolean;
};

type Page = {
    id: number;
    title: number;
};

const Page = () => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [filterStatus, setFilterstatus] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const [currentPage, setCurrentPage] = useState(0);
    const limit = 5;

    const filteredTasks = filterStatus === '' ? tasks : tasks.filter(t => t.status === filterStatus);
    const totalPages = Math.ceil(tasks.length / limit);

    const start = currentPage * limit;
    const end = start + limit;

    const currentTasks = filteredTasks.slice(start, end);

    const showStart = start + 1;
    const showEnd = Math.min(end, tasks.length);

    const totalTasks = tasks.length;
    const pendenteTasks = tasks.filter(t => t.status === 'pendente').length;
    const concluidoTasks = tasks.filter(t => t.status === 'concluido').length;
    const fazendoTasks = tasks.filter(t => t.status === 'fazendo').length;
    const removeTask = (id: string) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pendente':
                return 'bg-orange-900';
            case 'concluido':
                return 'bg-green-900';
            case 'fazendo':
                return 'bg-blue-900';
            default:
                return 'bg-gray-900';
        }
    };

    const addTask = () => {
        if (!title || !status) return;

        const now = new Date();
        const dateTime = now.toLocaleString('pt-BR');

        const newTask = { id: dateTime, title, status, editing: false };

        setTasks(prev => [newTask, ...prev]);
        setTitle('');
        setStatus('');
        setCurrentPage(0);
    };

    const handlePendente = () => {
        setFilterstatus(filterStatus === 'pendente' ? '' : 'pendente');
        setCurrentPage(0);
    };
    const handleConcluido = () => {
        setFilterstatus(filterStatus === 'concluido' ? '' : 'concluido');
        setCurrentPage(0);
    };
    const handleFazendo = () => {
        setFilterstatus(filterStatus === 'fazendo' ? '' : 'fazendo');
        setCurrentPage(0);
    };
    useEffect(() => {
        const someEditing = tasks.some(t => t.editing);
        if (!someEditing && inputRef.current) {
            inputRef.current?.focus();
        }
    }, [tasks]);

    return (
        <div className="w-screen min-h-screen  font-open_sans  bg-neutral-50 dark:bg-neutral-700   shadow-red-900 flex flex-col justify-between ">
            <Header />
            <div className="flex h-5/6 flex-1 container mx-auto flex-col w-screen justify-between">
                <div className="   py-8">
                    <div className=" flex container font-black flex-col gap-2">
                        <h1 className="text-4xl text-neutral-700 dark:text-neutral-300 mt-14 ">Olá, USERNAME!</h1>
                        <h2
                            onClick={() => setFilterstatus('')}
                            className="w-56 px-2 text-xl  text-neutral-600  hover:text-neutral-200 dark:hover:text-neutral-700 hover:bg-neutral-700 dark:hover:bg-neutral-300 dark:text-neutral-300 font-semibold transition-all duration-200 cursor-pointer rounded-xl"
                        >
                            {totalTasks} tarefa{totalTasks > 1 ? 's' : ''} cadastrada{totalTasks > 1 ? 's' : ''}
                        </h2>
                    </div>
                    <div className=" flex container justify-evenly mt-6 gap-6">
                        <Button
                            onClick={handlePendente}
                            className=" bg-neutral-600 hover:bg-neutral-700 dark:bg-neutral-500 hover:dark:bg-neutral-400 flex  flex-col rounded-xl  justify-around items-center flex-1 max-w-60 h-24 "
                        >
                            <span className="text-sm font-bold">Pendentes</span>{' '}
                            <p className="text-neutral-400 dark:text-neutral-100 text-xs">
                                {pendenteTasks} tarefa{pendenteTasks > 1 ? 's' : ''}
                            </p>
                        </Button>

                        <Button
                            onClick={handleConcluido}
                            className=" bg-neutral-600 hover:bg-neutral-700 dark:bg-neutral-500 hover:dark:bg-neutral-400  flex  flex-col  rounded-xl justify-around items-center flex-1 max-w-60 h-24 "
                        >
                            <span className="text-sm font-bold">Concluído</span>{' '}
                            <p className="text-neutral-400 dark:text-neutral-100 text-xs">
                                {concluidoTasks} tarefa{concluidoTasks > 1 ? 's' : ''}
                            </p>
                        </Button>
                        <Button
                            onClick={handleFazendo}
                            className=" bg-neutral-600 hover:bg-neutral-700 dark:bg-neutral-500 hover:dark:bg-neutral-400  flex  flex-col  rounded-xl justify-around items-center flex-1 max-w-60 h-24 "
                        >
                            <span className="text-sm font-bold">Fazendo</span>{' '}
                            <p className="text-neutral-400 dark:text-neutral-100 text-xs">
                                {fazendoTasks} tarefa{fazendoTasks > 1 ? 's' : ''}
                            </p>
                        </Button>
                    </div>
                </div>

                <div className="mt-6 flex flex-col  font-tinos container gap-4">
                    {currentTasks.map(task => (
                        <div key={task.id} className="p-2 px-4 bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-xl flex gap-2">
                            <div className="flex-1">
                                <Input
                                    value={task.title}
                                    readOnly={!task.editing}
                                    onChange={e => setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, title: e.target.value } : t)))}
                                    className={`bg-transparent border-transparent dark:text-neutral-200 text-xl focus-visible:ring-0 font-bold ${task.editing ? 'border border-black ' : ''}`}
                                />

                                <div className="flex mt-4  gap-4">
                                    {task.editing ? (
                                        <Button
                                            className="w-16 bg-neutral-600/80 text-xs hover:bg-neutral-700  font-bold"
                                            onClick={() => setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, editing: false } : t)))}
                                        >
                                            Salvar
                                        </Button>
                                    ) : (
                                        <Button
                                            className="w-16 bg-neutral-700/80 text-xs hover:bg-neutral-600  font-bold"
                                            onClick={() => setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, editing: true } : t)))}
                                        >
                                            Editar
                                        </Button>
                                    )}
                                    <Button className="w-16 bg-red-900/80 font-bold text-xs hover:bg-red-800" onClick={() => removeTask(task.id)}>
                                        Remover
                                    </Button>
                                </div>
                            </div>

                            <div className="flex flex-col justify-evenly items-center">
                                <Select value={task.status} disabled={!task.editing} onValueChange={val => setTasks(prev => prev.map(t => (t.id === task.id ? { ...t, status: val } : t)))}>
                                    <SelectTrigger className={`w-[96px] font-black text-xs text-neutral-100 bg-white ${getStatusColor(task.status)}`}>
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="pendente">Pendente</SelectItem>
                                            <SelectItem value="concluido">Concluído</SelectItem>
                                            <SelectItem value="fazendo">Fazendo</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <p className="text-neutral-500 dark:text-neutral-400 text-xs">{task.id}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* input  */}

                <div
                    className={`container border border-neutral-300 dark:border-neutral-700  mt-20 px-4 py-6 rounded-xl bg-neutral-500 transition-all duration-500 delay-150 ${
                        currentTasks.length > 0 ? 'mt-8' : 'mb-20'
                    }`}
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-3">
                            <Input
                                value={title}
                                ref={inputRef}
                                onChange={e => setTitle(e.target.value)}
                                className="bg-neutral-100 text-neutral-800 border-none placeholder:text-neutral-500"
                                type="text"
                                placeholder="adicionar nova tarefa"
                            />

                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="w-[180px] font-semibold border border-neutral-300  bg-neutral-200 text-black hover:bg-neutral-600 hover:text-white transition-all duration-100  ">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="pendente">Pendente</SelectItem>
                                        <SelectItem value="concluido">Concluído</SelectItem>
                                        <SelectItem value="fazendo">Fazendo </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={addTask}
                            className="w-24 bg-neutral-200 border border-neutral-300   font-semibold text-neutral-800 dark:text-neutral-800  hover:bg-neutral-600 hover:text-neutral-100 dark:hover:text-neutral-100 "
                        >
                            Adicionar
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div className="flex flex-col gap-4 ">
                        {/* Barra de navegação */}
                        <div className="flex items-center  justify-center gap-2">
                            <div className="flex items-center gap-3 my-4">
                                <Button
                                    className="rounded-full  bg-neutral-300  dark:bg-neutral-800 hover:bg-neutral-400 w-8 h-8"
                                    variant="outline"
                                    onClick={() => setCurrentPage(p => Math.max(p - 1, 0))}
                                    disabled={currentPage === 0}
                                >
                                    {'<'}
                                </Button>
                                <span className="text-sm text-neutral-700 dark:text-neutral-50">
                                    {start} - {end} de {filteredTasks.length} tarefas
                                </span>

                                <Button
                                    className="rounded-full bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-400 dark:hover:bg-neutral-600  dark:text-white w-8 h-8"
                                    variant="outline"
                                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages - 1))}
                                    disabled={currentPage >= totalPages - 1}
                                >
                                    {'>'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Page;
