'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTaskEdit } from '@/hooks';
import { ModalTask } from './ModalTask';
import { TaskCardProps } from '@/types/dashboard/TaskCardProps';
import { CircleCheckBig, Clock3, Eye, Pen, Timer, Trash2 } from 'lucide-react';

export function TaskCard({ task, onUpdate, onDelete, getStatusColor }: TaskCardProps) {
    const { tempText, setTempText, tempStatus, setTempStatus, isEditing, setIsEditing, handleSave, cardRef } = useTaskEdit(task, onUpdate);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const taskConfig = {
        pendente: {
            icon: Clock3,
            color: '#FD8C09',
            bg: '#FD8C0930'
        },
        fazendo: {
            icon: Timer,
            color: '#2858EC',
            bg: '#2858EC30'
        },
        concluido: {
            icon: CircleCheckBig,
            color: '#166534',
            bg: '#16653430'
        }
    };

    const config = taskConfig[task.status as keyof typeof taskConfig];
    const Icon = config.icon;

    const handleDialogOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (open) {
            // abrindo
            setTempText(task.title);
            setTempStatus(task.status);
            setIsEditing(false);
        } else {
            // closing dialog (including clicking outside) -> discard unsaved modal edits
            setTempText(task.title);
            setTempStatus(task.status);
            setIsEditing(false);
        }
    };
    // useOutsideClick: cancela edição inline quando clicar fora do card

    return (
        // card individual
        <div
            ref={cardRef}
            key={task.id}
            className=" py-2 px-2 shadow-lg bg-neutral-100 dark:bg-[#aaaaaa11] border border-[#b1b9c0] dark:border-neutral-600 border-l-8 rounded-xl  transition-all"
            style={{ borderLeftColor: config.color }}
        >
            {/* icone e input  */}
            <div className="flex items-center justify-center  sm:items-center ">
                <Icon className={`size-10 p-2 mr-2 rounded-lg `} style={{ background: config.bg, color: config.color }} />

                <div className="flex gap-2 items-center justify-start sm:items-center w-[calc(100%-64px)] ">
                    <div
                        className="bg-transparent flex-1 border-b pb-1 text-sm text-stone-700 dark:text-neutral-200 whitespace-pre-wrap overflow-hidden text-ellipsis"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        {task.title}
                    </div>
                </div>
            </div>

            {/* botoes editar remover e ver  */}
            <div className=" flex flex-col px-2 mt-2 mb-2 ml-14 gap-4 justify-between">
                <div className="flex gap-2   ">
                    {/* Esconde Editar/Salvar/Cancelar se tiver "Ver completo" */}
                    {task.title.length <= 90 && (
                        <Button
                            className="   h-6 xs:h-9 bg-transparent text-black border shadow-md  transition-all text-[9px] xs:text-xs font-bold hover:bg-blue-800/80 hover:text-white dark:bg-transparent dark:hover:bg-blue-800/80 dark:hover:text-white  dark:border border-neutral-300/20"
                            onClick={() => {
                                // Open modal directly in edit mode instead of inline edit
                                setTempText(task.title);
                                setTempStatus(task.status);
                                setIsDialogOpen(true);
                                setIsEditing(true);
                            }}
                        >
                            <Pen className="size-4" /> Editar
                        </Button>
                    )}

                    {/* Botão Ver completo */}
                    {task.title.length > 90 && (
                        <Button
                            variant="ghost"
                            className="  h-6 xs:h-9 bg-transparent text-black border shadow-md   text-[9px] xs:text-xs  transition-all  dark:bg-transparent hover:bg-gray-300/80 hover:text-black dark:hover:bg-gray-700/80 dark:hover:text-white  dark:border border-neutral-300/20"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <Eye className="size-4" /> Ver
                        </Button>
                    )}
                    {/* Remover sempre visível */}
                    <Button
                        className=" h-6 xs:h-9 bg-transparent hover:bg-red-800/80 text-red-600 hover:text-white border shadow-md   text-[9px] xs:text-xs  transition-all   dark:bg-transparent dark:hover:bg-red-800/80 dark:hover:text-white  dark:border border-neutral-300/20"
                        onClick={() => onDelete(task.id)}
                    >
                        <Trash2 className="size-4" /> Remover
                    </Button>
                </div>
            </div>

            <ModalTask
                isOpen={isDialogOpen}
                onOpenChange={handleDialogOpenChange}
                task={task}
                tempText={tempText}
                setTempText={setTempText}
                tempStatus={tempStatus}
                setTempStatus={setTempStatus}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handleSave={handleSave}
                getStatusColor={getStatusColor}
            />
            {/* Modal */}
        </div>
    );
}
