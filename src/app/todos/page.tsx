'use client';
import Footer from '../screens/footer';
import Header from '../screens/header';
import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { usePagination } from '../hooks/usePagination';
import { TaskCard } from '@/components/TodosComponents/TaskCard';
import NameUser from './NameUser';
import { motion, AnimatePresence } from 'framer-motion';

import { TaskFilters } from '@/components/TodosComponents/taskFilters';
import { TaskInput } from '@/components/TodosComponents/TaskInput';
import TaskPagination from '@/components/TodosComponents/TaskPagination';

type Page = {
    id: number;
    title: number;
};

const Page = () => {
    const { addTask, inputRef, removeTask, setStatus, setTasks, setTitle, status, tasks, title } = useTasks();

    const [filterStatus, setFilterstatus] = useState('');

    const filteredTasks = filterStatus === '' ? tasks : tasks.filter(t => t.status === filterStatus);
    const { currentItems: currentTasks, currentPage, end, setCurrentPage, start, totalPages } = usePagination(filteredTasks, 5);

    const totalTasks = tasks.length;
    const pendenteTasks = tasks.filter(t => t.status === 'pendente').length;
    const concluidoTasks = tasks.filter(t => t.status === 'concluido').length;
    const fazendoTasks = tasks.filter(t => t.status === 'fazendo').length;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pendente':
                return 'bg-orange-900 ';
            case 'concluido':
                return 'bg-green-900';
            case 'fazendo':
                return 'bg-blue-900';
            default:
                return 'bg-gray-900';
        }
    };

    const handleFilterChange = (status: string) => {
        setFilterstatus(prev => (prev === status ? '' : status));
        setCurrentPage(0);
    };

    return (
        <div className="w-screen min-h-screen font-open_sans bg-[#eee9df] dark:bg-[#1b2632] flex flex-col sm:justify-between ">
            <Header />
            <div className="flex h-5/6 flex-1 px-2 container mx-auto flex-col w-screen justify-between">
                <div className="sm:py-8 mb-8">
                    <div className=" flex container font-bold flex-col gap-2">
                        <h1 className=" text-xl sm:text-3xl flex text-[#2c3d4b] dark:text-neutral-300 px-3 mt-14 ">
                            Olá, <NameUser />
                        </h1>
                        <h2
                            onClick={() => setFilterstatus('')}
                            className="w-fit text-left px-1 ml-3  sm:text-lg  text-neutral-600  hover:text-neutral-200 dark:hover:text-neutral-700 hover:bg-neutral-700 dark:hover:bg-neutral-300 dark:text-neutral-300 font-semibold transition-all duration-300 cursor-pointer rounded-xl"
                        >
                            {totalTasks} tarefa{totalTasks > 1 ? 's' : ''} cadastrada{totalTasks > 1 ? 's' : ''}
                        </h2>
                    </div>

                    {/* botoes para filtrar por status  */}

                    <TaskFilters concluidoTasks={concluidoTasks} fazendoTasks={fazendoTasks} pendenteTasks={pendenteTasks} filterStatus={filterStatus} onFilterChange={handleFilterChange} />
                </div>
                {/* renderizar tarefas  */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="  flex flex-col font-tinos -mt-12 gap-2"
                    >
                        {currentTasks.map(task => (
                            <motion.div key={task.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                                <TaskCard
                                    task={task}
                                    onUpdate={updated => setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)))}
                                    onDelete={removeTask}
                                    getStatusColor={getStatusColor}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* input para adicionar tarefas  */}
                <TaskInput title={title} status={status} ref={inputRef} onTitleChange={setTitle} onStatusChange={setStatus} onAddTask={addTask} hasTasks={currentTasks.length > 0} />
            </div>
            <div>
                {/* navegação entre as tarefas  */}
                <TaskPagination
                    start={start}
                    end={end}
                    total={filteredTasks.length}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={() => setCurrentPage(p => Math.max(p - 1, 0))}
                    onNext={() => setCurrentPage(p => Math.max(p + 1, totalPages - 1))}
                />

                <Footer />
            </div>
        </div>
    );
};

export default Page;
