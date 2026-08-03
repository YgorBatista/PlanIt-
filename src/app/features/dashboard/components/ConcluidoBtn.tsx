import { CircleCheckBig } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskFilterConcluidoProps } from '@/types/dashboard/TaskFilter';

export default function ConcluidoBtn({ filterStatus, concluidoTasks, onFilterChange }: TaskFilterConcluidoProps) {
    return (
        <Button
            onClick={() => onFilterChange('concluido')}
            className={`flex flex-col md:flex-row justify-center md:justify-start items-center sm:items-center gap-3 md:gap-8 rounded-xl transition-all duration-300 flex-1 max-w-28 md:max-w-60 h-24 md:h-36 md:border md:border-l-8 border-l-[#166534] ${
                filterStatus === 'concluido' ? 'bg-[#166534]  hover:bg-[#166534] scale-105 ' : 'bg-white dark:bg-transparent  hover:bg-[#16653420] dark:hover:bg-[#16653420] text-[#166534] '
            }`}
        >
            <CircleCheckBig
                className={` size-8 p-2 mx-4 border rounded-full  bg-opacity-20 dark:bg-opacity-40 border-[#ffffff23] box-content ${filterStatus === 'concluido' ? 'text-white bg-[#ffffff30]' : 'text-[#166534] bg-[#16653440]'} `}
            />
            <div className="flex flex-col justify-center md:items-start gap-1">
                <p className="text-xs sm:text-sm font-bold">Concluído</p>
                <div className="hidden md:block">
                    <p className={`my-2 text-[8px] sm:text-xl ${filterStatus === 'concluido' ? 'text-white' : 'text-[#166534]'} `}>{concluidoTasks}</p>
                    <p>tarefa{concluidoTasks === 1 ? '' : 's'}</p>
                </div>
            </div>
        </Button>
    );
}
