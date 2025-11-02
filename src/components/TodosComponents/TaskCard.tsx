'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { TaskItem } from '@/app/hooks/useTasks';
import { useIsMounted } from '@/app/hooks/useIsMounted';
import { SelectCard } from './TaskSelectCard';
import { ModalTask } from './ModalTask';
import { useTaskEdit } from '@/app/hooks/useTaskEdit';
import { useOutsideClick } from '@/app/hooks/useOutsideClick';

type TaskCardProps = {
    task: TaskItem;
    onUpdate: (task: TaskItem) => void;
    onDelete: (id: string) => void;
    getStatusColor: (status: string) => string;
};

export function TaskCard({ task, onUpdate, onDelete, getStatusColor }: TaskCardProps) {
    const { tempText, setTempText, tempStatus, setTempStatus, isEditing, setIsEditing, isInlineEditing, setIsInlineEditing, handleSave, cancelInlineEdit, cardRef } = useTaskEdit(task, onUpdate);

    const mounted = useIsMounted();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDialogOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (open) {
            // opening dialog: initialize temp text and ensure modal edit mode is off
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
    useOutsideClick(cardRef, () => {
        if (isInlineEditing) cancelInlineEdit();
    });

    return (
        <div
            ref={cardRef}
            key={task.id}
            className={`py-2 px-2 bg-[#c9c1b1] dark:bg-[#243649] border border-[#cab78f] dark:border-neutral-600  rounded-xl flex justify-between transition-all  ${
                task.editing ? 'border-4 border-[#bb9448]   rounded-md ' : ''
            }`}
        >
            <div className=" flex flex-col w-[70%] justify-between">
                <div>
                    {/* se nao estiver no modo de edicao, mostra um container sem scroll.
                        se estiver no modo edicao, usa o textarea para modificar. */}
                    {task.editing ? (
                        <Textarea
                            value={tempText}
                            onChange={e => setTempText(e.target.value)}
                            className="resize-none h- bg-transparent  xs:py-2 no-scrollbar border border-neutral-500 rounded-md px-2 text-stone-700 dark:text-neutral-200 font-bold"
                        />
                    ) : (
                        <div
                            className="bg-transparent text-xs font-bold w-60 xs:w-[100%] text-stone-700 dark:text-neutral-200 whitespace-pre-wrap overflow-hidden text-ellipsis"
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                            }}
                        >
                            {task.title}
                        </div>
                    )}
                </div>
                <div className="flex mt-8 gap-2 items-center">
                    {/* Esconde Editar/Salvar/Cancelar se tiver "Ver completo" */}
                    {task.title.length <= 90 && (
                        <>
                            {task.editing ? (
                                <>
                                    <Button
                                        className=" w-12 xs:w-24 h-6 xs:h-9 bg-[#a38760] dark:bg-[#1b2632] hover:scale-105 transition-all text-[9px] xs:text-xs hover:bg-[#6d542e] font-bold"
                                        onClick={() => {
                                            onUpdate({ ...task, title: tempText, status: tempStatus, editing: false });
                                            setIsInlineEditing(false);
                                        }}
                                    >
                                        Salvar
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    className="w-12  xs:w-16 h-6 xs:h-9 bg-[#a38760] dark:bg-[#1b2632] hover:scale-105 transition-all text-[9px] xs:text-xs hover:bg-[#6d542e] font-bold"
                                    onClick={() => {
                                        // Open modal directly in edit mode instead of inline edit
                                        setTempText(task.title);
                                        setTempStatus(task.status);
                                        setIsInlineEditing(false);
                                        setIsDialogOpen(true);
                                        setIsEditing(true);
                                    }}
                                >
                                    Editar
                                </Button>
                            )}
                        </>
                    )}{' '}
                    {/* Botão Ver completo */}
                    {task.title.length > 90 && (
                        <Button
                            variant="ghost"
                            className=" w-[70px] xs:w-24 h-6 xs:h-9  text-[9px] xs:text-xs hover:scale-105 transition-all dark:bg-transparent hover:text-white hover:bg-[#a3876070] dark:hover:bg-[#41658b6b]"
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
                <SelectCard
                    value={isInlineEditing || isEditing ? tempStatus : task.status}
                    disabled={!(isInlineEditing || isEditing)}
                    onChange={val => (isInlineEditing || isEditing) && setTempStatus(val)}
                    getStatusColor={getStatusColor}
                />
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
