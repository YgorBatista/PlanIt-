'use client';
import Footer from '../../layout/footer';
import Header from '../../layout/header';
import { ClipboardList, SearchX } from 'lucide-react';
import { useState } from 'react';
import { useTasks, usePagination } from '../../../hooks';
import { TaskCard } from '@/app/features/dashboard/components/TaskCard';
import useNameUser from '@/app/features/auth/hooks/login/useNameUser';
import { motion, AnimatePresence } from 'framer-motion';
import { TaskFilters } from '@/app/features/dashboard/components/taskFilters';
import { TaskInput } from '@/app/features/dashboard/components/TaskInput';
import TaskPagination from '@/app/features/dashboard/components/TaskPagination';
import EmptyState from '@/app/features/dashboard/components/EmptyState';

type Page = {
    id: number;
    title: number;
};

const Page = () => {
    const name = useNameUser();
    const { addTask, inputRef, removeTask, setStatus, setTasks, setTitle, status, tasks, title } = useTasks();

    const handleAddTasks = () => {
        addTask(title, status);
    };

    const [filterStatus, setFilterstatus] = useState('');

    const filteredTasks = filterStatus === '' ? tasks : tasks.filter(t => t.status === filterStatus);
    const { currentItems: currentTasks, currentPage, end, setCurrentPage, start, totalPages, goNext, goPrev } = usePagination(filteredTasks, 5);

    const handleFilterChange = (status: string) => {
        setFilterstatus(prev => (prev === status ? '' : status));
        setCurrentPage(0);
    };

    const totalTasks = tasks.length;

    const totalPendenteTasks = tasks.filter(t => t.status === 'pendente').length;
    const totalConcluidoTasks = tasks.filter(t => t.status === 'concluido').length;
    const totalFazendoTasks = tasks.filter(t => t.status === 'fazendo').length;

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

    return (
        <div className="w-full min-h-screen  bg-[#F8FAFC]  dark:bg-gradient-to-tr dark:from-[#181818] dark:to-[#111111] flex flex-col sm:justify-between transition-colors duration-500">
            <Header />
            <div className="flex flex-1 px-2 container mx-auto flex-col w-screen justify-between">
                <div className="sm:py-8">
                    <div className=" flex container font-bold flex-col text-[#2c3d4b] gap-2">
                        <h1 className=" text-xl sm:text-3xl flex  dark:text-neutral-300 px-3 mt-14 ">Olá, {name}!</h1>
                        <h2
                            onClick={() => setFilterstatus('')}
                            className="w-fit text-left px-1 ml-3  sm:text-lg hover:px-4  hover:text-neutral-200 dark:hover:text-[#2c3d4b] hover:bg-[#2c3d4b] dark:hover:bg-neutral-300 dark:text-neutral-300 font-semibold transition-all duration-300 cursor-pointer rounded-xl"
                        >
                            {totalTasks} tarefa{totalTasks > 1 ? 's' : ''} cadastrada{totalTasks > 1 ? 's' : ''}
                        </h2>
                    </div>

                    {/* botoes para filtrar por status  */}

                    <TaskFilters
                        concluidoTasks={totalConcluidoTasks}
                        fazendoTasks={totalFazendoTasks}
                        pendenteTasks={totalPendenteTasks}
                        filterStatus={filterStatus}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                <div className="flex flex-col justify-center items-stretch flex-1 ">
                    {/* renderizar tarefas  */}
                    <AnimatePresence mode="wait">
                        {tasks.length === 0 ? (
                            <EmptyState icon={<ClipboardList size={48} />} title="Não há tarefas cadastradas" description="Adicione sua primeira tarefa utilizando o campo abaixo." />
                        ) : filteredTasks.length === 0 ? (
                            <EmptyState icon={<SearchX size={48} />} title="Nenhuma tarefa encontrada" description="Tente selecionar outro filtro." />
                        ) : (
                            <motion.div
                                key={currentPage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="  flex flex-col font-tinos sm:-mt-12 gap-4"
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
                        )}
                    </AnimatePresence>

                    {/* navegação entre as tarefas  */}
                    {totalPages > 1 && <TaskPagination start={start} end={end} total={filteredTasks.length} currentPage={currentPage} totalPages={totalPages} onPrev={goPrev} onNext={goNext} />}
                </div>

                {/* input para adicionar tarefas  */}

                <AnimatePresence>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: 'backInOut' }}>
                        <TaskInput title={title} status={status} ref={inputRef} onTitleChange={setTitle} onStatusChange={setStatus} onAddTask={handleAddTasks} hasTasks={currentTasks.length > 0} />
                    </motion.div>
                </AnimatePresence>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Page;
