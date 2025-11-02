'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TaskItem } from '@/app/hooks/useTasks';
import { SelectCard } from './TaskSelectCard';

type ModalTaskProps = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    task: TaskItem;
    tempText: string;
    setTempText: (text: string) => void;
    tempStatus: string;
    setTempStatus: (status: string) => void;
    isEditing: boolean;
    setIsEditing: (editing: boolean) => void;
    handleSave: () => void;
    getStatusColor: (status: string) => string;
};

export function ModalTask({ isOpen, onOpenChange, task, tempText, setTempText, tempStatus, setTempStatus, isEditing, setIsEditing, handleSave, getStatusColor }: ModalTaskProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="h-3/5 xs:h-3/6 flex flex-col justify-between max-w-80 xs:max-w-md bg-[#c9c1b1] dark:bg-[#243649] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg text-start font-bold text-neutral-900 dark:text-neutral-100 border-b">Detalhes da tarefa</DialogTitle>
                </DialogHeader>

                {/* Área de conteúdo */}
                <div className="mt-2 overflow-auto px-1">
                    {isEditing ? (
                        <Textarea
                            value={tempText}
                            onChange={e => setTempText(e.target.value)}
                            className={`resize-none max-h-[350px] xs:max-h-[95%] overflow-y-scroll 
              [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-lg 
              font-semibold mt-2 border border-neutral-400 p-2 rounded-md text-neutral-900 dark:text-neutral-100`}
                            rows={30}
                        />
                    ) : (
                        <p
                            className="mt-2 h-[calc(1.5rem*30)] max-h-[350px] xs:max-h-[95%] border rounded border-[#a38760] 
              p-2 text-sm text-neutral-800 dark:text-neutral-200 whitespace-pre-wrap overflow-y-scroll text-start align-top 
              [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-thumb]:rounded-lg"
                        >
                            {tempText}
                        </p>
                    )}
                </div>

                {/* Rodapé */}
                <DialogFooter className="flex flex-row items-center justify-between gap-2 mt-4">
                    <div className="flex-1">
                        <SelectCard value={isEditing ? tempStatus : task.status} disabled={!isEditing} onChange={setTempStatus} getStatusColor={getStatusColor} />
                    </div>

                    <div className="flex gap-4">
                        {isEditing ? (
                            <>
                                <Button className="bg-[#a38760] dark:bg-[#334e6b] hover:bg-[#6d542e] dark:hover:bg-[#41658b] text-white font-bold" onClick={handleSave}>
                                    Salvar
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setTempText(task.title);
                                        setTempStatus(task.status);
                                    }}
                                >
                                    Cancelar
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline" onClick={() => onOpenChange(false)}>
                                    Fechar
                                </Button>
                                <Button className="bg-[#a38760] dark:bg-[#334e6b] hover:bg-[#6d542e] dark:hover:bg-[#41658b] text-white font-bold" onClick={() => setIsEditing(true)}>
                                    Editar
                                </Button>
                            </>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
