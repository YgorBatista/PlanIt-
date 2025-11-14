'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TaskItem } from '@/app/hooks/useTasks';
import { useIsMounted } from '@/app/hooks/useIsMounted';
import { SelectCard } from './TaskSelectCard';
import { ModalTask } from './ModalTask';
import { useTaskEdit } from '@/app/hooks/useTaskEdit';

type TaskCardProps = {
    task: TaskItem;
    onUpdate: (task: TaskItem) => void;
    onDelete: (id: string) => void;
    getStatusColor: (status: string) => string;
};

export function TaskCard({ task, onUpdate, onDelete, getStatusColor }: TaskCardProps) {
    const { tempText, setTempText, tempStatus, setTempStatus, isEditing, setIsEditing, handleSave, cardRef } = useTaskEdit(task, onUpdate);

    const mounted = useIsMounted();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        <div
            ref={cardRef}
            key={task.id}
            className={`py-2 px-2 shadow-md bg-gray-300 dark:bg-[#24364950] border border-[#b1b9c0] dark:border-neutral-600  rounded-sm flex justify-between transition-all `}
        >
            <div className=" flex flex-col p-1  w-[66%] gap-4 justify-between">
                <div>
                    {/* se nao estiver no modo de edicao, mostra um container sem scroll.
                        se estiver no modo edicao, usa o textarea para modificar. */}

                    <div
                        className="bg-transparent text-xs font-bold w-60  xs:w-[100%] text-stone-700 dark:text-neutral-200 whitespace-pre-wrap overflow-hidden text-ellipsis"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        {task.title}
                    </div>
                </div>
                <div className="flex gap-2  items-center">
                    {/* Esconde Editar/Salvar/Cancelar se tiver "Ver completo" */}
                    {task.title.length <= 90 && (
                        <Button
                            className="w-12  xs:w-16 h-6 xs:h-9 bg-[#7ca0c7] dark:bg-[#1b2632] hover:scale-105 transition-all text-[9px] xs:text-xs hover:bg-[#7da7d4] font-bold"
                            onClick={() => {
                                // Open modal directly in edit mode instead of inline edit
                                setTempText(task.title);
                                setTempStatus(task.status);
                                setIsDialogOpen(true);
                                setIsEditing(true);
                            }}
                        >
                            Editar
                        </Button>
                    )}

                    {/* Botão Ver completo */}
                    {task.title.length > 90 && (
                        <Button
                            variant="ghost"
                            className=" w-[70px] xs:w-24 h-6 xs:h-9  text-[9px] xs:text-xs hover:scale-105 transition-all dark:bg-transparent hover:text-white hover:bg-[#7f9ab8b2] dark:hover:bg-[#41658b6b]"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Ver completo
                        </Button>
                    )}
                    {/* Remover sempre visível */}
                    <Button className="w-12 xs:w-16 h-6 xs:h-9 bg-red-900/80 transition-all font-bold text-[9px] xs:text-xs hover:bg-red-800 hover:scale-105" onClick={() => onDelete(task.id)}>
                        Remover
                    </Button>
                </div>
            </div>

            <div className="flex flex-col justify-evenly items-center gap-2">
                <SelectCard value={isEditing ? tempStatus : task.status} disabled={!isEditing} onChange={val => isEditing && setTempStatus(val)} getStatusColor={getStatusColor} />
                <p className="text-neutral-500 dark:text-neutral-400 text-[8px] xs:text-xs" suppressHydrationWarning>
                    {mounted ? task.id : null}
                </p>
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
