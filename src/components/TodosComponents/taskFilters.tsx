'use client ';
import { Button } from '@/components/ui/button';

type TaskFiltersProps = {
    filterStatus: string;
    pendenteTasks: number;
    concluidoTasks: number;
    fazendoTasks: number;
    onFilterChange: (status: string) => void;
};

export function TaskFilters({ filterStatus, pendenteTasks, concluidoTasks, fazendoTasks, onFilterChange }: TaskFiltersProps) {
    return (
        <div className=" flex justify-evenly   mt-4 gap-6">
            <Button
                onClick={() => onFilterChange('pendente')}
                className={` flex-col rounded-sm  justify-around items-center flex-1 transition-all duration-300 delay-0 max-w-80  h-20 sm:h-28 ${
                    filterStatus === 'pendente'
                        ? 'bg-[#7C2D12] dark:bg-[#334e6b] hover:dark:bg-[#41658b] hover:bg-[#983311] scale-110 text-white delay-0'
                        : 'bg-[#ffcebc] hover:bg-[#f6bda8] dark:bg-[#243649] hover:dark:bg-[#41658b]  text-neutral-600'
                } `}
            >
                <span className="text-xs sm:text-sm font-bold">Pendente</span>{' '}
                <p className={`text-neutral-600 dark:text-white transition-all duration-300 text-[8px] sm:text-xs ${filterStatus === 'pendente' ? 'text-white' : ''}`}>
                    {pendenteTasks} tarefa{pendenteTasks > 1 ? 's' : ''}
                </p>
            </Button>

            <Button
                onClick={() => onFilterChange('concluido')}
                className={` flex  flex-col  rounded-sm transition-all duration-300 delay-75 justify-around items-center flex-1 max-w-80 h-20 sm:h-28 ${
                    filterStatus === 'concluido'
                        ? 'bg-[#14532D]  hover:bg-[#1e7e44] dark:bg-[#334e6b] hover:dark:bg-[#41658b] scale-110 text-white delay-0'
                        : 'bg-[#c0eed4] hover:bg-[#b1eccb] dark:bg-[#243649]  hover:dark:bg-[#41658b]  text-neutral-600'
                }`}
            >
                <span className="text-xs sm:text-sm font-bold">Concluído</span>{' '}
                <p className={` text-neutral-600 dark:text-white transition-all duration-300 text-[8px] sm:text-xs ${filterStatus === 'concluido' ? 'text-white' : ''} `}>
                    {concluidoTasks} tarefa{concluidoTasks > 1 ? 's' : ''}
                </p>
            </Button>
            <Button
                onClick={() => onFilterChange('fazendo')}
                className={`  flex  flex-col  rounded-sm transition-all duration-300 delay-75 justify-around items-center flex-1  max-w-80 h-20 sm:h-28  ${
                    filterStatus === 'fazendo'
                        ? 'bg-[#1E3A8A] hover:bg-[#284eb7]  dark:bg-[#334e6b] hover:dark:bg-[#41658b] scale-110 text-white delay-0'
                        : 'bg-[#b4c5f4] hover:bg-[#a3b8f2] dark:bg-[#243649] hover:dark:bg-[#41658b] text-neutral-600'
                }`}
            >
                <span className="text-xs sm:text-sm font-bold">Fazendo</span>{' '}
                <p className={`text-neutral-600 dark:text-white transition-all duration-300   text-[8px] sm:text-xs ${filterStatus === 'fazendo' ? 'text-white' : ''}`}>
                    {fazendoTasks} tarefa{fazendoTasks > 1 ? 's' : ''}
                </p>
            </Button>
        </div>
    );
}
