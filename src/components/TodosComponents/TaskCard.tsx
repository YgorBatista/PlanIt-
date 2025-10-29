'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { TaskItem } from '@/app/hooks/useTasks';
import { useIsMounted } from '@/app/hooks/useIsMounted';

type TaskCardProps = {
    task: TaskItem;
    onUpdate: (task: TaskItem) => void;
    onDelete: (id: string) => void;
    getStatusColor: (status: string) => string;
};

export function TaskCard({ task, onUpdate, onDelete, getStatusColor }: TaskCardProps) {
    const mounted = useIsMounted();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tempText, setTempText] = useState(task.title);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        onUpdate({ ...task, title: tempText });
        setIsEditing(false);
        setIsDialogOpen(false);
    };

    return (
        <div
            key={task.id}
            className={`p-3 px-4 bg-[#c9c1b1] dark:bg-[#243649] border border-[#cab78f] dark:border-neutral-600 rounded-xl flex gap-2 transition-all duration-200 ${
                task.editing ? 'border-2 border-[#bb9448] scale-105  rounded-md p-2' : ''
            }`}
        >
            <div className="flex-1 flex flex-col justify-between">
                <div className="">
                    <Textarea
                        value={task.title}
                        readOnly={!task.editing}
                        onChange={e => onUpdate({ ...task, title: e.target.value })}
                        className={`resize-none bg-transparent py-2  no-scrollbar border-transparent text-stone-700 dark:text-neutral-200 focus-visible:ring-0 font-bold ${
                            task.editing ? 'border border-neutral-500 rounded-md p-2' : ''
                        }`}
                    />
                </div>
                <div className="flex mt-4 gap-4">
                    {task.editing ? (
                        <Button
                            className="w-16 bg-[#a38760] dark:bg-[#1b2632] hover:scale-105 transition-all text-xs hover:bg-[#6d542e] font-bold"
                            onClick={() => onUpdate({ ...task, editing: false })}
                        >
                            Salvar
                        </Button>
                    ) : (
                        <Button
                            className="w-16 bg-[#a38760] dark:bg-[#1b2632] hover:scale-105 transition-all text-xs hover:bg-[#6d542e] font-bold"
                            onClick={() => onUpdate({ ...task, editing: true })}
                        >
                            Editar
                        </Button>
                    )}

                    <Button className="w-16 bg-red-900/80 transition-all font-bold text-xs hover:bg-red-800 hover:scale-105" onClick={() => onDelete(task.id)}>
                        Remover
                    </Button>

                    {/* Botão Ver completo */}
                    {task.title.length > 100 && ( // Exibe o botão se o texto for longo
                        <Button
                            variant="ghost"
                            className="text-xs hover:scale-105 transition-all dark:bg-transparent hover:text-white hover:bg-[#a3876070] dark:hover:bg-[#41658b6b]"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            Ver completo
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-evenly items-center">
                <Select value={task.status} disabled={!task.editing} onValueChange={val => onUpdate({ ...task, status: val })}>
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
                <p className="text-neutral-500 dark:text-neutral-400 text-xs" suppressHydrationWarning>
                    {mounted ? task.id : null}
                </p>
            </div>

            {/* Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-lg bg-neutral-100 dark:bg-neutral-800">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Detalhes da tarefa</DialogTitle>
                    </DialogHeader>

                    {isEditing ? (
                        <Textarea
                            value={tempText}
                            onChange={e => setTempText(e.target.value)}
                            className="resize-none mt-2 bg-white dark:bg-neutral-700 border dark:border-neutral-600 p-2 rounded-md text-neutral-900 dark:text-neutral-100"
                            rows={8}
                        />
                    ) : (
                        <p className="mt-2 text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap">{tempText}</p>
                    )}

                    <DialogFooter className="flex justify-end gap-2 mt-4">
                        {isEditing ? (
                            <>
                                <Button className="bg-[#a38760] dark:bg-[#334e6b]  hover:bg-[#6d542e] dark:hover:bg-[#41658b] text-white font-bold" onClick={handleSave}>
                                    Salvar
                                </Button>
                                <Button variant="outline" onClick={() => setIsEditing(false)}>
                                    Cancelar
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                    Fechar
                                </Button>
                                <Button className="bg-[#a38760] dark:bg-[#334e6b] hover:bg-[#6d542e] dark:hover:bg-[#41658b] text-white font-bold" onClick={() => setIsEditing(true)}>
                                    Editar
                                </Button>
                            </>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
