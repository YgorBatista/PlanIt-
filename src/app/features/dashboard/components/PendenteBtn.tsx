import { Clock3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskFilterPendenteProps } from '@/types/dashboard/TaskFilter';

export default function PendenteBtn({ filterStatus, pendenteTasks, onFilterChange }: TaskFilterPendenteProps) {
    return (
        <Button
            onClick={() => onFilterChange('pendente')}
            className={` flex flex-col md:flex-row justify-center md:justify-start items-center sm:items-center gap-3 md:gap-8 rounded-xl transition-all duration-300 flex-1 max-w-28 md:max-w-60 h-24 md:h-36 md:border md:border-l-8 border-l-[#fd8b09] ${
                filterStatus === 'pendente'
                    ? ' bg-[#fd8b09] hover:bg-[#fd8b09]  text-white delay-0 scale-105   '
                    : 'bg-white dark:bg-transparent hover:bg-[#fd8b0920] dark:hover:bg-[#fd8b0920] text-[#fd8b09]  '
            } `}
        >
            <Clock3
                className={` size-8 p-2 md:mx-4 border rounded-full  bg-opacity-20 dark:bg-opacity-40 border-[#ffffff23] box-content ${filterStatus === 'pendente' ? 'text-white bg-[#ffffff30]' : 'text-[#fd8b09] bg-[#fd8b0940]'} `}
            />
            <div className="flex flex-col justify-center md:items-start gap-1">
                <p className="text-xs sm:text-sm font-bold">Pendente</p>
                <div className="hidden md:block">
                    <p className={`my-2 text-[8px] sm:text-xl ${filterStatus === 'pendente' ? 'text-white' : 'text-[#fd8b09]'}`}>{pendenteTasks}</p>
                    <p>tarefa{pendenteTasks === 1 ? '' : 's'}</p>
                </div>
            </div>
        </Button>
    );
}
