import { forwardRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type TaskInputProps = {
    title: string;
    status: string;
    hasTasks: boolean;
    onTitleChange: (title: string) => void;
    onStatusChange: (status: string) => void;
    onAddTask: () => void;
};

export const TaskInput = forwardRef<HTMLInputElement, TaskInputProps>(({ title, status, onTitleChange, onStatusChange, onAddTask, hasTasks }, ref) => {
    return (
        <div>
            <div
                className={`container border border-neutral-300 dark:border-neutral-700   px-4 py-6  rounded-xl bg-[#b39b6c] dark:bg-[#334e6b] transition-all duration-500 delay-150 ${
                    hasTasks ? 'mt-8' : 'sm:mb-4 mb-12'
                }`}
            >
                <div className="flex flex-col gap-4">
                    <div className="flex gap-3">
                        <Input
                            value={title}
                            ref={ref}
                            onChange={e => onTitleChange(e.target.value)}
                            className="bg-neutral-100 text-neutral-800 border-none "
                            type="text"
                            placeholder="adicionar nova tarefa"
                        />

                        <Select value={status} onValueChange={onStatusChange}>
                            <SelectTrigger className="w-[180px] font-bold border border-neutral-300  bg-[#dfd1b9] dark:bg-[#4e749c]  text-black dark:text-neutral-200 dark:hover:text-black hover:bg-[#6d542e] dark:hover:bg-[#9bb8d6] hover:font-bold  hover:text-white transition-all duration-100  ">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#bda886] dark:bg-[#4e749c]">
                                <SelectGroup>
                                    <SelectItem value="pendente">Pendente</SelectItem>
                                    <SelectItem value="concluido">Concluído</SelectItem>
                                    <SelectItem value="fazendo">Fazendo </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={onAddTask}
                        className="w-28 bg-[#dfd1b9]  dark:bg-[#4e749c] dark:hover:bg-[#9bb8d6]  border border-neutral-300   font-semibold text-neutral-800 dark:text-neutral-200 dark:hover:text-black hover:bg-[#6d542e] hover:text-neutral-100 hover:font-bold "
                    >
                        Adicionar
                    </Button>
                </div>
            </div>
        </div>
    );
});

TaskInput.displayName = 'TaskInput';
