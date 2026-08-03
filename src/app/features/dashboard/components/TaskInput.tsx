import { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ListFilter, Plus, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TaskInput = forwardRef<HTMLInputElement, TaskInputProps>(({ title, status, onTitleChange, onStatusChange, onAddTask, hasTasks }, ref) => {
    return (
        <div
            className={` container border border-gray-300 dark:border-neutral-700 px-2 xs:px-4 py-2 xs:py-4  rounded-xl bg-white  shadow-lg dark:bg-[#363636] transition-all duration-500 delay-150 ${
                hasTasks ? 'my-2 mb-8 xs:mb-14' : 'xs:mb-4 mb-12'
            }`}
        >
            <div className="flex items-center gap-2  ">
                <Select value={status} onValueChange={onStatusChange}>
                    <SelectTrigger
                        hideValue
                        icon={
                            <ListFilter
                                className={cn(
                                    '  rounded-lg transition-colors size-5',
                                    status === 'pendente' && ' text-[#ca720e] ',
                                    status === 'fazendo' && ' text-[#2858EC]',
                                    status === 'concluido' && ' text-[#166534]',
                                    status === '' && ' text-[#808080]'
                                )}
                            />
                        }
                        className={cn(
                            'w-11 h-11  flex items-center justify-center rounded-xl font-bold border transition-all ',
                            status === 'pendente' && ' bg-[#FD8C0930]  border-[#FD8C0980]',
                            status === 'fazendo' && ' bg-[#2858EC30] border-[#2858EC80]',
                            status === 'concluido' && ' bg-[#16653430] border-[#16653480]',
                            status === '' && ' bg-[#80808030] border-[#80808050]'
                        )}
                    >
                        <ListFilter />

                        <SelectValue className="hidden" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-300  dark:bg-neutral-800 ">
                        <SelectGroup>
                            <SelectItem value="pendente">pendente</SelectItem>
                            <SelectItem value="concluido">concluído</SelectItem>
                            <SelectItem value="fazendo">fazendo</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="group relative flex-1 items-center">
                    <Input
                        value={title}
                        ref={ref}
                        onChange={e => onTitleChange(e.target.value)}
                        className="peer  rounded-xl  h-11 border focus:border-gray-400 border-gray-300 dark:border-gray-300 text-xs xs:text-sm text-gray-900 dark:text-gray-200 placeholder:pl-6 placeholder:font-normal focus:placeholder:text-transparent focus:dark:placeholder:text-transparent placeholder:text-gray-800  dark:placeholder:text-gray-300 "
                        type="text"
                        placeholder="Adicionar uma nova tarefa..."
                    />
                    <Plus className="  peer-focus:hidden  peer-[&:not(:placeholder-shown)]:opacity-0 size-4 absolute  left-3 top-1/2 transform -translate-y-1/2 dark:text-white" />
                </div>

                <Button
                    onClick={onAddTask}
                    className="group size-10  bg-blue-800  font-semibold text-neutral-800 dark:text-neutral-300 hover:bg-gray-200    dark:hover:bg-neutral-200   hover:font-bold flex items-center justify-center"
                >
                    <PlusCircle className="size-5 text-white group-hover:text-blue-800 " />
                </Button>
            </div>
        </div>
    );
});

TaskInput.displayName = 'TaskInput';
