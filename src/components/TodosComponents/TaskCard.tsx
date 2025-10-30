'use client';

import { useEffect, useRef, useState } from 'react';
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
    const [isEditing, setIsEditing] = useState(false); // modal editing
    const [isInlineEditing, setIsInlineEditing] = useState(false); // local inline edit
    const cardRef = useRef<HTMLDivElement | null>(null);

    const handleDialogOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (open) {
            // opening dialog: initialize temp text and ensure modal edit mode is off
            setTempText(task.title);
            setIsEditing(false);
        } else {
            // closing dialog (including clicking outside) -> discard unsaved modal edits
            setTempText(task.title);
            setIsEditing(false);
        }
    };

    const handleSave = () => {
        onUpdate({ ...task, title: tempText });
        setIsEditing(false);
        setIsDialogOpen(false);
    };

    const cancelInlineEdit = () => {
        setTempText(task.title);
        setIsInlineEditing(false);
        if (task.editing) onUpdate({ ...task, editing: false });
    };

    useEffect(() => {
        setTempText(task.title);
    }, [task.title]);

    // verifica se clicou fora do card para fechar e nao editar
    useEffect(() => {
        if (!isInlineEditing) return;

        const handleOutside = (e: MouseEvent) => {
            const target = e.target as Node | null;
            if (cardRef.current && target && !cardRef.current.contains(target)) {
                cancelInlineEdit();
            }
        };

        document.addEventListener('mousedown', handleOutside);
        return () => document.removeEventListener('mousedown', handleOutside);
    }, [isInlineEditing, task, onUpdate]);

    return (
        <div
            ref={cardRef}
            key={task.id}
            className={`p-3 px-4 bg-[#c9c1b1] dark:bg-[#243649] border border-[#cab78f] dark:border-neutral-600 rounded-xl flex gap-2 transition-all  ${
                task.editing ? 'border-4 border-[#bb9448]   rounded-md ' : ''
            }`}
        >
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    {/* se nao estiver no modo de edicao, mostra um container sem scroll.
                        se estiver no modo edicao, usa o textarea para modificar. */}
                    {task.editing ? (
                        <Textarea
                            value={tempText}
                            onChange={e => setTempText(e.target.value)}
                            className="resize-none bg-transparent  xs:py-2 no-scrollbar border border-neutral-500 rounded-md p-2 text-stone-700 dark:text-neutral-200 focus-visible:ring-0 font-bold"
                        />
                    ) : (
                        <div
                            className="bg-transparent text-xs xs:text-sm font-bold w-60 xs:w-[350px] text-stone-700 dark:text-neutral-200 whitespace-pre-wrap overflow-hidden text-ellipsis"
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
                <div className="flex mt-4 gap-2 items-center">
                    {task.editing ? (
                        <>
                            <Button
                                className=" w-12 xs:w-16 h-6 xs:h-9 bg-[#a38760] dark:bg-[#1b2632] hover:scale-105 transition-all text-[9px] xs:text-xs hover:bg-[#6d542e] font-bold"
                                onClick={() => {
                                    onUpdate({ ...task, title: tempText, editing: false });
                                    setIsInlineEditing(false);
                                }}
                            >
                                Salvar
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    cancelInlineEdit();
                                }}
                            >
                                Cancelar
                            </Button>
                        </>
                    ) : (
                        <Button
                            className="w-12  xs:w-16 h-6 xs:h-9 bg-[#a38760] dark:bg-[#1b2632] hover:scale-105 transition-all text-[9px] xs:text-xs hover:bg-[#6d542e] font-bold"
                            onClick={() => {
                                setTempText(task.title);
                                setIsInlineEditing(true);
                                onUpdate({ ...task, editing: true });
                            }}
                        >
                            Editar
                        </Button>
                    )}

                    <Button className="w-12 xs:w-16 h-6 xs:h-9 bg-red-900/80 transition-all font-bold text-[9px] xs:text-xs hover:bg-red-800 hover:scale-105" onClick={() => onDelete(task.id)}>
                        Remover
                    </Button>

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
                </div>
            </div>

            <div className="flex flex-col justify-evenly items-center gap-2">
                <Select value={task.status} disabled={!task.editing} onValueChange={val => onUpdate({ ...task, status: val })}>
                    <SelectTrigger className={` w-20 xs:w-[96px] h-6 xs:h-8 font-black  text-[9px] xs:text-xs text-neutral-100 bg-white ${getStatusColor(task.status)}`}>
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
                <p className="text-neutral-500 dark:text-neutral-400 text-[8px] xs:text-xs" suppressHydrationWarning>
                    {mounted ? task.id : null}
                </p>
            </div>

            {/* Modal */}
            <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
                <DialogContent className=" h-3/5 xs:h-3/6 flex flex-col justify-center max-w-80 xs:max-w-lg bg-[#c9c1b1] dark:bg-[#243649] rounded-lg">
                    <DialogHeader>
                        <DialogTitle className="text-lg text-start font-bold text-neutral-900 dark:text-neutral-100 border-b">Detalhes da tarefa</DialogTitle>
                    </DialogHeader>

                    {/* Área de conteúdo com altura máxima e scroll interno */}
                    <div className={`mt-2 overflow-auto px-1`}>
                        {isEditing ? (
                            <Textarea
                                value={tempText}
                                onChange={e => setTempText(e.target.value)}
                                className={`resize-none max-h-[350px]  xs:max-h-[95%] overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-lg font-semibold mt-2 border border-black p-2 rounded-md  text-neutral-900 dark:text-neutral-100 `}
                                rows={25}
                            />
                        ) : (
                            <p className="mt-2 h-[350px] xs:max-h-[95%] n p-2  text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-lg">
                                {tempText}
                            </p>
                        )}
                    </div>
                    <DialogFooter className="flex flex-row items-center justify-center   gap-2 mt-4">
                        {isEditing ? (
                            <>
                                <Button className="bg-[#a38760] dark:bg-[#334e6b]  hover:bg-[#6d542e] dark:hover:bg-[#41658b] text-white font-bold" onClick={handleSave}>
                                    Salvar
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setTempText(task.title);
                                    }}
                                >
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
