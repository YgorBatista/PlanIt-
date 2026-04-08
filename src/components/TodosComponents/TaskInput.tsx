import { forwardRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowRight } from 'lucide-react';

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
        <div
            className={`container border border-gray-200 dark:border-neutral-700 px-2 xs:px-4 py-2 xs:py-4  rounded-sm bg-gray-300 shadow-lg dark:bg-[#334e6b] transition-all duration-500 delay-150 ${
                hasTasks ? 'my-2 mb-8 xs:mb-14' : 'xs:mb-4 mb-12'
            }`}
        >
            <div className="flex items-center gap-2  ">
                <Select value={status} onValueChange={onStatusChange}>
                    <SelectTrigger className="w-[58px] xs:w-[90px] px-0 rounded-sm h-11 text-[11px] xs:text-sm font-bold border border-neutral-300  bg-gray-200 dark:bg-[#4e749c]  text-black dark:text-neutral-200 dark:hover:text-black hover:bg-gray-500 dark:hover:bg-[#9bb8d6] hover:font-bold  hover:text-white transition-all   ">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-300  dark:bg-[#4e749c]">
                        <SelectGroup>
                            <SelectItem value="pendente">Pendente</SelectItem>
                            <SelectItem value="concluido">Concluído</SelectItem>
                            <SelectItem value="fazendo">Fazendo </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="flex flex-1 border bg-[#0000002f] dark:border-neutral-400 p-1 rounded-sm ">
                    <Input
                        value={title}
                        ref={ref}
                        onChange={e => onTitleChange(e.target.value)}
                        className="  text-xs xs:text-sm text-gray-100 placeholder:text-gray-200  dark:placeholder:text-gray-300"
                        type="text"
                        placeholder="adicionar nova tarefa"
                    />

                    <Button
                        onClick={onAddTask}
                        className="w-10 mr-1 bg-gray-200 dark:bg-[#4e749c] dark:hover:bg-[#9bb8d6]  font-semibold text-neutral-800 dark:text-neutral-200 dark:hover:text-black hover:bg-gray-500 hover:text-neutral-100 hover:font-bold flex items-center justify-center"
                    >
                        <ArrowRight />
                    </Button>
                </div>
            </div>
        </div>
    );
});

TaskInput.displayName = 'TaskInput';
